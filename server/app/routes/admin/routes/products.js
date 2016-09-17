const db = require('../../../../db/models/product')
const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  db.findAll()
    .then(data => res.send(data))
    .catch(console.log)
})
router.put('/:id', (req, res, next) => {
  db.findOne({where: {id: req.params.id}})
    .then(prod => prod.update(req.body))
    .catch(console.log)
})
