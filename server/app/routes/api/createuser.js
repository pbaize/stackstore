'use strict'
var router = require('express').Router()
var User = require('../../../db/models/user.js')
var Cart = require('../../../db/models/cart.js')
var Sequelize = require('sequelize')
// eslint-disable-line new-cap
module.exports = router

router.post('/', function (req, res, next) {
  var madeUser = {}
  let inputData = req.body
  inputData.isAdmin = false
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
    })
    .catch(Sequelize.ValidationError, function (err) {
      res.status(422).send(err.errors)
    })
    .catch(function (err) {
      res.status(400).send({
        message: err.message
      })
    })
})
