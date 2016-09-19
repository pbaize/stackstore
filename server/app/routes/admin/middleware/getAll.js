module.exports = function getAll (db) {
  return function (req, res, next) {
    db.findAll()
      .then(data => res.send(data))
      .catch(console.log)
  }
}
