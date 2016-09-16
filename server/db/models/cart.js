'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

// CART
/*
As agreed:
  belongsToUser
  hasManyProducts || A JSON Data Type w/ { id: 1, quantity: 1 } ...

  #We also discussed potential setters for this.

  #Still interesting how orders and this will interact.
*/

module.exports = db.define('cart', {
  status: {
    type: Sequelize.STRING
  },
  totalPrice: {
    type: Sequelize.DECIMAL(16, 2),
    defaultValue: 0
  },
  discounts: {
    type: Sequelize.DECIMAL(16, 2),
    defaultValue: 0
  }
})
