const users = require('./users')
const orders = require('./orders')
const products = require('./products')

module.exports = {
  getUsers: users.get,
  getOrders: orders.get,
  getProducts: products.get
}
