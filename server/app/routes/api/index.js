var router = require('express').Router() // eslint-disable-line new-cap
module.exports = router

router.use('/products', require('./products'))
router.use(function (req, res) {
  res.status(404).end()
})
