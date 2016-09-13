'use strict'
var router = require('express').Router()
var Products = require('../../../db/models/product.js')
// eslint-disable-line new-cap
module.exports = router

router.get('/', function (req, res, next) {
  Products.findAll({
    where: req.query
  })
    .then(function (products) {
      res.status(200).send(products)
    })
    .catch(next)
})

router.get('/:id', function (req, res, next) {
  var id = req.params.id

  Products.findById(id)
    .then(function (products) {
      if (products === null) {
        return res.send(404).end()
      }
      res.status(200).send(products)
    })
    .catch(next)
})
