// const db = require('../../../../db')
const router = require('express').Router()
module.exports = router

router.get('/', function (req, res, next) {
  res.send('Admin Page')
})
