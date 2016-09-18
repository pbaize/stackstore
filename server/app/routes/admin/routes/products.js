const db = require('../../../../db/models/product')
const router = require('express').Router()
const m = require('../middleware')
module.exports = router

router.get('/', m.getAll(db))
router.get('/:id', m.getOne(db))
router.put('/:id', m.updateOne(db))
