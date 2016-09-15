module.exports = {router: require('./routes')}

module.exports.check = function (req, res, next) {
  if (req.isAdmin()) {
    next()
  } else {
    res.status(401).end()
  }
}
