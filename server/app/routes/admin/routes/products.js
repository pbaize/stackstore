const db = require('../../../../db/models/product')
const cat = require('../../../../db/models/category')
const rev = require('../../../../db/models/review')
const router = require('express').Router()
const m = require('../middleware')
module.exports = router

router.get('/', m.getAll(db, {include: [cat]}))
router.get('/:id', m.getOne(db, [rev, cat]))
router.put('/:id', m.updateOne(db))
