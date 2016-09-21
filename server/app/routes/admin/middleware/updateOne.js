module.exports = function updateOne (db, include = []) {
  return function (req, res, next) {
    console.log(req.body)
    db.findOne({where: {id: req.params.id}, include: include})
      .then(data => data.update(req.body))
      .then(() => res.sendStatus(200))
      .catch(console.log)
  }
}
