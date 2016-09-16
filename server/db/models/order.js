'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

// ORDER
/*
As agreed:
  hasManyProducts
  belongsToUser
  STRING || ENUM :
    pre-purchase, purchased, preparing-to-ship, shipped, delivered, closed

  #Still interesting how carts and this will interact.
*/

module.exports = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pre-purchase'
  },
  totalPrice: {
    type: Sequelize.DECIMAL(16, 2),
    defaultValue: 0
  },
  discounts: {
    type: Sequelize.DECIMAL(16, 2),
    defaultValue: 0
  },
  shipAddress: {
    type: Sequelize.STRING
  }
})
