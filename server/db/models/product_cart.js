'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

module.exports = db.define('product_cart', {
  quantity: {
    type: Sequelize.INTEGER,
    default: 0
  }
})
