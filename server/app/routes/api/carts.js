'use strict'
var router = require('express').Router()
var Cart = require('../../../db/models/cart.js')
var User = require('../../../db/models/user.js')
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
    userId: req.user.id
  })
    .then(function (myCart) {
      return myCart.getProducts()
    })
    .then(function (myProducts) {
      res.status(200).json(myProducts)
    })
    .catch(next)
})
