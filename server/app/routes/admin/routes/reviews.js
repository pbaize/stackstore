const db = require('../../../../db/models/review')
const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  db.findAll()
    .then(data => res.send(data))
    .catch(console.log)
})
