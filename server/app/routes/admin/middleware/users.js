const db = require('../../../../db/models/user')

const get = (data = {}) => db.findAll({}).catch(console.log)

module.exports = {get}
