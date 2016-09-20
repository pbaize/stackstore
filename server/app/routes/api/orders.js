'use strict'

const router = require('express').Router()
const Order = require('../../../db/models/order.js')
// const User = require('../../../db/models/user.js')
const User = require('../../../db/models/user.js')
const Product = require('../../../db/models/product.js')
// const ProductOrder = require('../../../db/models/product_order.js')
// const Cart = require('../../../db/models/cart.js')
// const ProCar = require('../../../db/models/product_cart.js')
// const Review = require('../../../db/models/review.js')

module.exports = router

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    User.findOne({
      where: {
        email: req.session.id
      }
    })
      .then(function (myUser) {
        req.user = {
          id: myUser.id
        }
        next()
      })
      .catch(next)
  }
}

// getting all the orders for the login user (login user should have req.user.id)
router.get('/', ensureAuthenticated, function (req, res, next) {
  console.log('hitting order route', req.user.id)
  Order.findAll({
    where: {userId: req.user.id},
    include: [Product]
  }).then(orders => res.send(orders))
    .catch(next)
})

router.post('/newOrder', ensureAuthenticated, function (req, res, next) {
  // expecting incoming req.body.productsData = [{id: 1,quantity: 3},{id:2,qunatitiy:4},{}..........]
  console.log('getting into post order route........')
  let settingProductAndQuantity = []
  let productsData = req.body.productsData.sort((a, b) => a.id - b.id) // sort all elements id in acending order
  let newProductID = productsData.map(data => data.id)
  let newProductQuantity = productsData.map(data => data.quantity)
  Product.findAll({
    where: {id: newProductID}
  })
    .then(function (products) { // this operation will get the total price base on product quantity and price
      let totalPrice = products.reduce(function (pre, cur, i) {
        return pre + cur.price * newProductQuantity[i]
      }, 0)
      return Order.create({totalPrice})
    })
    .then(function (order) { // this operation will set the newly created order to client order product and quantity
      productsData.forEach(function (product) {
        let adding = order.addProduct(product.id, {quantity: product.quantity})
        settingProductAndQuantity.push(adding) // each operation result in promise which will be push in to promise array
      })
      return order.setUser(req.user.id)
    })
    .then(function () {
      return Promise.all(settingProductAndQuantity)
    })
    .then(function () {
      console.log('order place Successful...........')
      res.status(200).send({message: 'Successful post of order!'})
    }).catch(next)
})

router.put('/:id/:status', ensureAuthenticated, function (req, res, next) {
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

router.get('/test', function (req, res, next) {
  res.redirect('/')
})
