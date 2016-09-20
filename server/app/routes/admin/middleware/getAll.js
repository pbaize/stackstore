module.exports = function getAll (db, param) {
  return function (req, res, next) {
    db.findAll(param)
      .then(data => res.send(data))
      .catch(console.log)
  }
}
