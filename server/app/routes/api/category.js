'use strict'
let router = require('express').Router()
let Category = require('../../../db/models/category.js')
let Products = require('../../../db/models/product.js')
let Review = require('../../../db/models/review.js')
module.exports = router

router.get('/:type', function (req, res, next) {
  let desireType = req.params.type

  Products.findAll({
    include: [{
      model: Category,
      where: {type: desireType}
    }, Review]
  }).then(function (products) {
    res.send(products)
  }).catch(next)
})

router.post('/addCategory', function (req, res, next) {
  let productId = req.body.productId
  let categoryId = req.body.categoryId

  Products.findById(productId)
    .then(function (product) {
      return product.addCategory(categoryId)
    })
    .then(function () {
      res.status(202).end()
    })
})

router.post('/removeCategory', function (req, res, next) {
  let productId = req.body.productId
  let categoryId = req.body.categoryId

  Products.findById(productId)
    .then(function (product) {
      return product.removeCategory(categoryId)
    })
    .then(function () {
      res.status(202).end()
    }).catch(next)
})

router.delete('/:id', function (req, res, next) {
  let id = req.params.id
  Category.findAndDelete(id)
    .then(function () {
      res.status(202).end()
    }).catch(next)
})
