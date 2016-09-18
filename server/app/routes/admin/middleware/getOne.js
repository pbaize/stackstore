module.exports = function getOne (db) {
  return function (req, res, next) {
    db.findOne({where: {id: req.params.id}})
      .then(data => res.send(data))
      .catch(console.log)
  }
}
