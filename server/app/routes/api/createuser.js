'use strict'
var router = require('express').Router()
var User = require('../../../db/models/user.js')
var Cart = require('../../../db/models/cart.js')
// eslint-disable-line new-cap
module.exports = router

router.post('/', function (req, res, next) {
  var madeUser = {}
  let inputData = req.body
  User.create(inputData)
    .then(function (createdUser) {
      madeUser = createdUser
      return Cart.create()
    })
    .then(function (createdCart) {
      return createdCart.setUser(madeUser)
    })
    .then(function () {
      res.status(200).send('User/Cart created successfully!')
    }).catch(next)
})
