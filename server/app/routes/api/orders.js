'use strict'

const router = require('express').Router()
const Order = require('../../../db/models/order.js')
// const User = require('../../../db/models/user.js')
const Product = require('../../../db/models/product.js')
// const ProductOrder = require('../../../db/models/product_order.js')
// const Review = require('../../../db/models/review.js')

module.exports = router

// getting all the orders for the login user (login user should have req.user.id)
router.get('/', function (req, res, next) {
  console.log('hitting order route', req.user.id)
  Order.findAll({
    where: {userId: req.user.id},
    include: [Product]
  }).then(function (orders) {
    res.send(orders)
  }).catch(next)
})

router.post('/newOrder', function (req, res, next) {
  let newOrder = {status: 'pre-purchase'}
  Order.create(newOrder)
    .then(function (createdOrder) {
      return createdOrder.setUser(req.user.id)
    })
    .then(function (finalOrder) {
      res.status(200).json(finalOrder)
    }).catch(next)
})

router.put('/:id/:status', function (req, res, next) {
  let orderId = req.params.id
  let newStatus = req.params.status
  Order.findById(orderId)
    .then(function (order) {
      return order.update({status: newStatus})
    })
    .then(function (updatedOrder) {
      res.send(updatedOrder)
    }).catch(next)
})
