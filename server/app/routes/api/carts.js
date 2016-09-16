'use strict'
var router = require('express').Router()
var Cart = require('../../../db/models/cart.js')
var User = require('../../../db/models/user.js')
var ProCar = require('../../../db/models/product_cart.js')
var Products = require('../../../db/models/product.js')
// eslint-disable-line new-cap
module.exports = router

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    // This is where we will deal with users in session storage.
    console.log('Not logged in user.')
    console.log(req.session.id)
    // Need to use created date to delete session carts after
    // x amount of time, but session carts are functional., it
    // can use the @ symbol to find what it needs.
    User.findOrCreate({
      where: {
        email: req.session.id,
        isAdmin: false
      }
    })
      .spread(function (myUser, wasCreated) {
        if (wasCreated) {
          console.log('Created User for Session')
        } else {
          console.log('Found Session User')
        }
        return Cart.findOrCreate({
          where: {
            userId: myUser.id
          }
        })
      })
      .spread(function (myCart, wasCreated) {
        if (wasCreated) {
          console.log('Created Cart for Session User')
        } else {
          console.log('Found Cart for Session User')
        }
        return myCart.getProducts()
      })
      .then(function (myProducts) {
        res.status(200).json(myProducts)
      })
      .catch(function (err) {
        res.status(400).send({message: err.message})
      })
  }
}

router.get('/', ensureAuthenticated, function (req, res, next) {
  Cart.findOne({
    where: {
      userId: req.user.id
    },
    include: [{model: Products, through: {attributes: ['quantity']}}]
  })
    .then(function (myProducts) {
      res.status(200).json(myProducts)
    })
    .catch(next)
})

router.get('/quantity', ensureAuthenticated, function (req, res, next) {
  Cart.findOne({
    userId: req.user.id || req.session.id
  })
    .then(function (myCart) {
      return ProCar.findAll({
        where: {
          cartId: myCart.id
        }
      })
    })
    .then(function (myRows) {
      res.status(200).json(myRows)
    })
    .catch(next)
})

router.put('/quantity', ensureAuthenticated, function (req, res, next) {
  Cart.findOne({
    userId: req.user.id || req.session.id
  })
    .then(function (myCart) {
      return ProCar.findOne({
        where: {
          cartId: myCart.id,
          productId: req.body.productId
        }
      })
    })
    .then(function (myRow) {
      myRow.quantity = req.body.quantity
      myRow.save()
    })
    .then(function (updatedRow) {
      res.status(200).json({message: 'Updated Quantity Successfully!', row: updatedRow})
    })
    .catch(next)
})
