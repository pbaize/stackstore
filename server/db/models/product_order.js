'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

module.exports = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})
