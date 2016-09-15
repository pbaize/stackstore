const co = require('co')
const db = require('../../../db')
const User = db.model('user')
module.exports = {router: require('./routes')}

const isAdmin = req => req.isAuthenticated()
  ? co(function * () {
    let user = yield User.findOne({where: {id: req.user.id}})
    return user.checkAdmin()
  }).catch(console.log)
  : false

module.exports.check = function (req, res, next) {
  return co(function * () {
    let admin = yield isAdmin(req)
    if (admin) {
      console.log('Admin User: ' + req.user.email)
      next()
    } else {
      console.log('not an admin')
      res.status(401).end()
    }
  })
}
