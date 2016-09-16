const db = require('../../../../db/models/order')

const get = (data = {}) => db.findAll({}).catch(console.log)

module.exports = {get}
