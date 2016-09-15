var router = require('express').Router() // eslint-disable-line new-cap
module.exports = router

router.use('/products', require('./products'))
router.use('/cart', require('./carts'))
router.use('/createuser', require('./createuser'))
router.use('/review', require('./review')) // tony add review route
router.use('/category', require('./category'))
router.use(function (req, res) {
  res.status(404).end()
})
