module.exports = function deleteOne (db) {
  return function (req, res, next) {
    db.find({where: {id: req.params.id}})
      .then(item => item.destroy())
      .then(() => res.sendStatus(200))
      .catch(console.log)
  }
}
