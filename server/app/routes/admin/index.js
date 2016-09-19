const db = require('../../../db')
const User = db.model('user')
const Promise = require('sequelize').Promise
module.exports = {router: require('./routes')}

const isAdmin = req => req.isAuthenticated()
  ? User.findOne({where: {id: req.user.id}})
    .then(user => user.checkAdmin())
    .catch(console.log)
  : Promise.resolve(false)

module.exports.check = function (req, res, next) {
  isAdmin(req).then(adminStatus => {
    if (adminStatus) {
      console.log('Admin User: ' + req.user.email)
      next()
    } else {
      console.log('not an admin')
      res.status(401).send({show: false})
    }
  })
}
