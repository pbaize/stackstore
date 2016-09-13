/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk')
var db = require('./server/db')
var User = db.model('user')
var Product = db.model('product')
var Cart = db.model('cart')
var Order = db.model('order')
var Promise = require('sequelize').Promise

var seedUsers = function () {
  var users = [
    {
      email: 'testing@fsa.com',
      password: 'password'
    },
    {
      email: 'obama@gmail.com',
      password: 'potus'
    }
  ]

  var creatingUsers = users.map(function (userObj) {
    return User.create(userObj)
  })

  return Promise.all(creatingUsers)
}

var seedProducts = function () {
  var products = [
    {
      price: 25.99,
      category: 'Totes',
      pictureUrl: 'http://i3.cpcache.com/product/643931876/i_love_hipsters_tote_bag.jpg?width=225&height=225&Filters=%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22F2F2F2%22%2C%22sequence%22%3A2%7D%5D',
      title: 'Mai Glasses - Tote',
      information: "A revolutionary tote, sporting some trendy glasses that'll let people know that you woke af.",
      availability: true
    },
    {
      price: 10.99,
      category: 'Totes',
      pictureUrl: 'https://www.zazzle.com/rlv/hipster_tote_bag-r101af6cd5c864d6fafd2ef3872f06cb1_v9w6h_8byvr_324.jpg',
      title: "I'm a Hipster - Tote",
      information: "Don't have good enough style to be a hipster? Just tell people you are one.",
      availability: true
    }
  ]

  var creatingProducts = products.map(function (productObj) {
    return Product.create(productObj)
  })

  return Promise.all(creatingProducts)
}

var seedOrders = function () {
  var orders = [
    {
      status: 'purchased'
    },
    {
      status: 'pre-purchase'
    }
  ]

  var creatingOrders = orders.map(function (orderObj) {
    return Order.create(orderObj)
  })

  return Promise.all(creatingOrders)
}

var seedCarts = function () {
  var carts = [
    {
      myItems: [1]
    },
    {
      myItems: []
    }
  ]

  var creatingCarts = carts.map(function (cartObj) {
    return Cart.create(cartObj)
  })

  return Promise.all(creatingCarts)
}

var someProducts = []
var someCarts = []
var someOrders = []
var someUsers = []

db.sync({ force: true })
  .then(function () {
    return seedUsers()
  })
  .then(function (myUsers) {
    someUsers = myUsers
    console.log(chalk.yellow('Users seeded...'))
    return seedProducts()
  })
  .then(function (myProducts) {
    someProducts = myProducts
    console.log(chalk.yellow('Products seeded...'))
    return seedOrders()
  })
  .then(function (myOrders) {
    someOrders = myOrders
    console.log(chalk.yellow('Orders seeded...'))
    return seedCarts()
  })
  .then(function (myCarts) {
    someCarts = myCarts
    console.log(chalk.yellow('Carts seeded...'))
    return someCarts[0].addProducts(someProducts)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish cart association 1.'))
    return someCarts[1].addProducts(someProducts)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish cart association 2.'))
    return someOrders[0].addProducts(someProducts)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish orders association 1.'))
    return someOrders[1].addProducts(someProducts)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish orders association 2.'))
    return someUsers[0].addOrders(someOrders)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-orders association.'))
    return someUsers[1].setCart(someCarts[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-cart association.'))
    console.log(chalk.green('Seed successful.'))
    process.exit(0)
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
