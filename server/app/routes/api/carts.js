'use strict'
var router = require('express').Router()
var Cart = require('../../../db/models/cart.js')
// eslint-disable-line new-cap
module.exports = router

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    // This is where we will deal with users in session storage.
    res.status(401).end()
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
