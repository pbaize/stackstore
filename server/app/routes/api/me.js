const User = require('../../../db/models/user.js')
var router = require('express').Router()

module.exports = router

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    User.findOne({
      where: {
        email: req.session.id
      }
    })
      .then(function (myUser) {
        req.user = {
          id: myUser.id
        }
        next()
      })
      .catch(next)
  }
}

router.get('/', ensureAuthenticated, function (req, res, next) {
  console.log('Client attempting ID check.')
  res.status(200).json(req.user.id)
})
