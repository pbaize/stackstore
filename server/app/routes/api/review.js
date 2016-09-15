'use strict'
let router = require('express').Router()
// let Review = require('../../../db/models/review.js')

module.exports = router

router.post('/', function (req, res, next) {
  console.log(req.body)
  console.log('user info', req.user.id)
})
