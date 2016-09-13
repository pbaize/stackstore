'use strict'
var db = require('./_db')
module.exports = db

// eslint-disable-next-line no-unused-vars
var User = require('./models/user')
var Product = require('./models/product')
var Cart = require('./models/cart')
var Order = require('./models/order')

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Cart.hasMany(Product)
Order.hasMany(Product)
User.hasOne(Cart)
User.hasMany(Order)
