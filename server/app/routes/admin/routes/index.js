const router = require('express').Router()
module.exports = router

router.use('/products', require('./products'))
router.use('/carts', require('./carts'))
// router.use('/createuser', require('./createuser'))
router.use('/reviews', require('./reviews'))
router.use('/users', require('./users.js'))
router.use('/orders', require('./orders.js'))
router.use('/category', require('./category.js'))
router.use('/chats', require('./chats'))
router.get('/', (req, res, next) => {
  console.log('isAdmin')
  res.send({show: true})
})
router.use(function (req, res) {
  res.status(404).end()
})

// router.get('/products', (req, res, next) => {
//   middle.getProducts()
//     .then(data => res.send(data))
//     .catch(console.log)
// })
// router.get('/orders', (req, res, next) => {
//   console.log(middle.getOrders.toString())
//   middle.getOrders()
//     .then(data => res.send(data))
//     .catch(console.log)
// })
// router.get('/users', (req, res, next) => {
//   middle.getUsers()
//     .then(data => res.send(data))
//     .catch(console.log)
// // })
// router.post('/do/:funcName', function (req, res, next) {
//   if (middle[req.params.funcName]) {
//     middle[req.params.funcName](req.body)
//   } else res.send('error')
// })
