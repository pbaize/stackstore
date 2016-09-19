module.exports = function deleteOne (db) {
  return function (req, res, next) {
    db.delete({where: {id: req.params.id}})
      .then(() => res.sendStatus(200))
      .catch(console.log)
  }
}
