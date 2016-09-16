'use strict'

const router = require('express').Router()
const Order = require('../../../db/models/order.js')
// const User = require('../../../db/models/user.js')
const Product = require('../../../db/models/product.js')
const ProductOrder = require('../../../db/models/product_order.js')
// const Cart = require('../../../db/models/cart.js')
// const ProCar = require('../../../db/models/product_cart.js')
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
  console.log(req.body)
  // let cartId = req.body.id
  // [{id: 1,quantity: 3},{id:2,qunatitiy:4},{}..........]
  let newOrder
  let settingQuantities = []
  let newProduct = req.body.productsData.map(function (data) {
    return data.id
  })

  Order.create({}).then(function (order) {
    newOrder = order
    return order.setProducts(newProduct)
  }).then(function () {
    req.body.productsData.forEach(function (data) {
      let settingQuantity = ProductOrder.findOne({
        where: {
          orderId: newOrder.id,
          productId: data.id
        }
      })
        .then(function (myRow) {
          myRow.quantity = data.quantity
          return myRow.save()
        })
      settingQuantities.push(settingQuantity)
    })
  }).then(function () {
    return Promise.all(settingQuantities)
  }).then(function () {
    res.status(200).send({message: 'Successful post of order!'})
  }).catch(next)

  // let creatingNewOrder = Order.create({})
  // let gettingProducts = Cart.findById(cartId)
  //   .then(function (cart) {
  //     return cart.getProducts()
  //   })

  // let settingOrderAndProduct = Promise.all(creatingNewOrder, gettingProducts)
  //   .then(function (result) {
  //     newOrder = result[0]
  //     newProduct = result[1]
  //     return [
  //       newOrder.setProducts(newProduct),
  //       newOrder.setUser(req.user.id)
  //     ]
  //   })

  // settingOrderAndProduct.then(function () {})

  // Promise.all([gettingProducts, creatingNewOrder])
  //   .then(function (result) {
  //     let Products = result[0]
  //     Products.forEach(function (product) {
  //       ProCar.findOne({
  //         where: {cartId: cartId, productId: product.id}
  //       }).then(function (myRow) {
  //         myRow.quantity = 1
  //       })
  //     })
  //   })

  // let products = req.body.productsData.map(function (product) {
  //   return product.id
  // })
  // let prductQuantity = req.body.productsData.map(function (product) {
  //   return product.quantity
  // })
  // let settingQuantity = []
  // let newOrderId

  // let CreatingNewOrder = Order.create({})

  // let SettingUser = CreatingNewOrder.then(function (createdOrder) {
  //   return createdOrder.setUser(req.user.id)
  // })

  // let SettingProduct = CreatingNewOrder.then(function (createdOrder) {
  //   newOrderId = createdOrder.id
  //   return createdOrder.setProducts(products)
  // })

// Order.create({})
//   .then(function (createdOrder) {
//     return createdOrder.setUser(req.user.id)
//   })
//   .then(function (finalOrder) {
//     res.status(200).json(finalOrder)
//   }).catch(next)
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
