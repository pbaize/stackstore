var router = require('express').Router()
const admin = require('../admin')
module.exports = router

router.use('/products', require('./products'))
router.use('/cart', require('./carts'))
router.use('/createuser', require('./createuser'))
router.use('/me', require('./me'))
router.use('/review', require('./review'))
router.use('/admin', admin.check, admin.router)
router.use('/order', require('./orders.js'))
router.use(function (req, res) {
  res.status(404).end()
})
