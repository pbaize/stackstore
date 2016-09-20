module.exports = function getOne (db, include = []) {
  return function (req, res, next) {
    db.findOne({where: {id: req.params.id}, include: include})
      .then(data => res.send(data))
      .catch(console.log)
  }
}
