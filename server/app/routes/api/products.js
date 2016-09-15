'use strict'
var router = require('express').Router()
var Products = require('../../../db/models/product.js')
// eslint-disable-line new-cap
module.exports = router

router.get('/', function (req, res, next) {
  Products.findAll()
    .then(function (products) {
      res.status(200).send(products)
    })
    .catch(next)
})

router.get('/:id', function (req, res, next) {
  var id = req.params.id
  var foundProduct = {}
  var foundReviews = {}
  var foundCategory = {}

  Products.findById(id)
    .then(function (products) {
      if (products === null) {
        return res.send(404).end()
      }
      foundProduct = products
      return products.getReviews()
    })
    .then(function (myReviews) {
      foundReviews = myReviews
      return foundProduct.getCategories()
    })
    .then(function (myCategories) {
      foundCategory = myCategories
      res.status(200).send({product: foundProduct, reviews: foundReviews, categories: foundCategory})
    })
    .catch(next)
})
