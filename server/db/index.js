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

Cart.belongsToMany(Product, {through: 'product_cart'})
Product.belongsToMany(Cart, {through: 'product_cart'})
Order.belongsToMany(Product, {through: 'product_order'})
Product.belongsToMany(Order, {through: 'product_order'})
Cart.belongsTo(User)
User.hasOne(Cart)
Order.belongsTo(User)
