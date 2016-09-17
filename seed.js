/*

Eliot's seed file. Should create all associations as well
as make 2 of each type of thing. Some may be reused for
laziness sake.

*/

var chalk = require('chalk')
var db = require('./server/db')
var User = db.model('user')
var Product = db.model('product')
var Cart = db.model('cart')
var Order = db.model('order')
var Review = db.model('review')
var Category = db.model('category')
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
    },
    {
      email: 'eliot@admin.com',
      password: 'admin123',
      isAdmin: true
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
      pictureUrl: 'http://i3.cpcache.com/product/643931876/i_love_hipsters_tote_bag.jpg?width=225&height=225&Filters=%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22F2F2F2%22%2C%22sequence%22%3A2%7D%5D',
      title: 'Mai Glasses - Tote',
      information: "A revolutionary tote, sporting some trendy glasses that'll let people know that you woke af.",
      availability: true
    },
    {
      price: 10.99,
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

var seedReviews = function () {
  var reviews = [
    {
      title: 'A Truly SJW Tote',
      author: 'Pierre',
      comment: 'This tote single handedly reminds people of what a warrior for all social issues I am. From the right to wear beanies, to the right to grow my own coffee.  Corporate pigs wont tell me otherwise!',
      score: 5
    },
    {
      title: 'Garbage',
      author: 'Eliot',
      comment: 'I got ridiculed every single day for wearing this, then to top it off, it spontaneously combusted',
      score: 0.1
    },
    {
      title: 'Favorite Free Tote',
      author: 'Tony',
      comment: 'A rat brought this over to me while waiting for the A train. I usually despise how dirty the subways are, but it added to the "Grunge" of this tote.',
      score: 4.2
    },
    {
      title: ') :',
      author: 'Dev',
      comment: 'I watched a homeless man die in this, and when I called the cops they removed it from his body and put it up for sale here. Makes it super retro.',
      score: 1.1
    }
  ]

  var creatingReviews = reviews.map(function (reviewObj) {
    return Review.create(reviewObj)
  })

  return Promise.all(creatingReviews)
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
      status: 'ordered'
    },
    {
      status: 'unordered'
    },
    {
      status: 'unordered'
    }
  ]

  var creatingCarts = carts.map(function (cartObj) {
    return Cart.create(cartObj)
  })

  return Promise.all(creatingCarts)
}

var seedCategories = function () {
  var categories = [
    {
      type: 'Totes'
    },
    {
      type: 'Not Totes'
    }
  ]

  var creatingCategories = categories.map(function (categoryObj) {
    return Category.create(categoryObj)
  })

  return Promise.all(creatingCategories)
}

var someCategories = []
var someProducts = []
var someCarts = []
var someOrders = []
var someUsers = []
var someReviews = []

User.sync({force: true})
  .then(function () {
    console.log(chalk.green('Force Sync of Users successful.'))
  })
  .catch(function (err) {
    console.error(err)
  })

db.sync({ force: true })
  .then(function () {
    console.log(chalk.green('Force Sync of DB successful.'))
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
    return seedCategories()
  })
  .then(function (myCategories) {
    someCategories = myCategories
    console.log(chalk.yellow('Categories seeded...'))
    return seedReviews()
  })
  .then(function (myReviews) {
    someReviews = myReviews
    console.log(chalk.yellow('Reviews seeded...'))
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
    return someOrders[0].setUser(someUsers[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-order association.'))
    return someUsers[1].setCart(someCarts[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-cart association 1.'))
    return someUsers[0].setCart(someCarts[1])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-cart association 2.'))
    return someUsers[2].setCart(someCarts[2])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-cart association 3.'))
    return someReviews[0].setUser(someUsers[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-review association 1.'))
    return someReviews[1].setUser(someUsers[1])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-review association 2.'))
    return someReviews[2].setUser(someUsers[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-review association 3.'))
    return someReviews[3].setUser(someUsers[1])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish user-review association 4.'))
    return someProducts[0].addReviews(someReviews)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish product-reviews association 1.'))
    return someProducts[1].addReviews(someReviews)
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish product-reviews association 2.'))
    return someProducts[0].addCategory(someCategories[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish product-category association 1.'))
    return someProducts[1].addCategory(someCategories[0])
  })
  .then(function () {
    console.log(chalk.red('Attempted to establish product-category association 2.'))
    console.log(chalk.green('Seed successful.'))
    process.exit(0)
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
