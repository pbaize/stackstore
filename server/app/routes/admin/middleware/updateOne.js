module.exports = function updateOne (db) {
  return function (req, res, next) {
    console.log(req.body)
    db.findOne({where: {id: req.params.id}})
      .then(data => data.update(req.body))
      .then(() => res.sendStatus(200))
      .catch(console.log)
  }
}
