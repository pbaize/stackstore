const db = require('../../../../db/models/product')

const get = (data = {}) => db.findAll({}).catch(console.log)

module.exports = {get}
