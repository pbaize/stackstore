'use strict'
var router = require('express').Router()
var User = require('../../../db/models/user.js')
// eslint-disable-line new-cap
module.exports = router

router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(function (createdUser) {
      res.status(200).send('User created successfully!')
    }).catch(next)
})
