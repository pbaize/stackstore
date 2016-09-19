const db = require('../../../../db/models/user')
const router = require('express').Router()
const m = require('../middleware')
module.exports = router

router.get('/', m.getAll(db))
router.get('/:id', m.getOne(db))
router.put('/:id', m.updateOne(db))
router.delete('/:id', m.deleteOne(db))
