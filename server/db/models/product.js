'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

// PRODUCT
/*
As agreed:
  price: Up to 2 decimal places
  category: A string
  pictureUrl: A string
  title: A string
  information: Unlimited text
  availability: Boolean
*/

module.exports = db.define('product', {
  price: {
    type: Sequelize.DECIMAL(16, 2),
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pictureUrl: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  information: {
    type: Sequelize.TEXT
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})
