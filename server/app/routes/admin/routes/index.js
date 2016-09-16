const router = require('express').Router()
const middle = require('../middleware')
module.exports = router

router.get('/', (req, res, next) => {
  res.send(Object.keys(middle))
})
router.get('/products', (req, res, next) => {
  middle.getProducts()
    .then(data => res.send(data))
    .catch(console.log)
})
router.get('/orders', (req, res, next) => {
  console.log(middle.getOrders.toString())
  middle.getOrders()
    .then(data => res.send(data))
    .catch(console.log)
})
router.get('/users', (req, res, next) => {
  middle.getUsers()
    .then(data => res.send(data))
    .catch(console.log)
})
router.post('/do/:funcName', function (req, res, next) {
  if (middle[req.params.funcName]) {
    middle[req.params.funcName](req.body)
  } else res.send('error')
})
