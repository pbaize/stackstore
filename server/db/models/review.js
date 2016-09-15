'use strict'
const Sequelize = require('sequelize')
const db = require('../_db')

/* the Review model will include
comment: should be text represesent the customer feedback on certain product
score: should be integer with minimum value of 0 and max value of 5
---------------------------
properties after association
productId: this property hold the foreign key to the product table
userId: this property hold the foreign key to the user table
*/

// Author is surprisingly complicated, that is something that we will
// have to add on review creation.

module.exports = db.define('review', {
  comment: {
    type: Sequelize.TEXT
  },
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.DECIMAL,
    validate: {
      max: 5,
      min: 0
    }
  }
})
