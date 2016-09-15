'use strict'
var db = require('./_db')
module.exports = db

// eslint-disable-next-line no-unused-vars
var User = require('./models/user')
var Product = require('./models/product')
var Cart = require('./models/cart')
var Order = require('./models/order')
var Review = require('./models/review')
var Category = require('./models/category')
var productcart = require('./models/product_cart')
var productorder = require('./models/product_order')

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Cart.belongsToMany(Product, {through: productcart})
Product.belongsToMany(Cart, {through: productcart})
Order.belongsToMany(Product, {through: productorder})
Product.belongsToMany(Order, {through: productorder})
Cart.belongsTo(User)
User.hasOne(Cart)
Order.belongsTo(User)
Product.belongsToMany(Review, {through: 'product_review'})
Review.belongsToMany(Product, {through: 'product_review'})
Product.belongsToMany(Category, {through: 'product_category'})
Category.belongsToMany(Product, {through: 'product_category'})
Review.belongsTo(User)
