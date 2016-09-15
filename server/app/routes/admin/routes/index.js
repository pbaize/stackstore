// const User = require('../../../db').model('user')
const router = require('express').Router()
module.exports = router
router.get('/', function (req, res, next) {
  res.send('admin')
})
