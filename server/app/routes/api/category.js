'use strict'
let router = require('express').Router()
let Category = require('../../../db/models/category.js')
let Products = require('../../../db/models/product.js')
let Review = require('../../../db/models/review.js')
module.exports = router

router.get('/categories', function (res, req, next) {
  Category.findAll()
    .then(function (categories) {
      res.send(categories)
    }).catch(next)
})

router.get('/:id', function (req, res, next) {
  let categoryId = req.params.id

  Products.findAll({
    include: [{
      model: Category,
      where: {id: categoryId}
    }, Review]
  }).then(function (products) {
    res.send(products)
  }).catch(next)
})
