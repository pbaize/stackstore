'use strict'
let router = require('express').Router()
let Category = require('../../../db/models/category.js')
let Products = require('../../../db/models/product.js')
module.exports = router

router.get('/:type', function (req, res, next) {
  let desireType = req.params.type

  Products.findAll({
    include: [{
      model: Category,
      throught: {
        where: {type: desireType}
      }
    }]
  })
})
