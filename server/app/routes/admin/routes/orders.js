const db = require('../../../../db/models/order')
const Product = require('../../../../db/models/product')
const router = require('express').Router()
const m = require('../middleware')
module.exports = router

router.get('/', m.getAll(db, {include: [Product]}))
router.get('/:id', m.getOne(db))
router.put('/:id', m.updateOne(db))
router.get('/status/:status', (req, res, next) => {
  db.findAll({where: {status: req.params.status}})
    .then(data => res.send(data))
    .catch(console.log)
})
