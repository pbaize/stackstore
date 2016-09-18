module.exports = function updateOne (db) {
  return function (req, res, next) {
    db.findOne({where: {id: req.params.id}})
      .then(data => data.update(req.body))
      .catch(console.log)
  }
}
