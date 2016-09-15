'use strict'
var crypto = require('crypto')
var _ = require('lodash')
var Sequelize = require('sequelize')

var db = require('../_db')

var User = db.define('user', {
  email: {
    type: Sequelize.STRING
  /*
  validate: {
  isUnique: function (username, done) {
    User.find({
      where: {
        email: this.email
      }
    })
      .done(function (err, user) {
        if (err) {
          done(err)
        }

        if (user) {
          done(new Error('Username already in use'))
        }

        done()
      })
  }
  }
  */
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  twitter_id: {
    type: Sequelize.STRING
  },
  facebook_id: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  instanceMethods: {
    sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt', 'isAdmin'])
    },
    correctPassword: function (candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password
    },
    isAdmin: function () {
      return this.isAdmin === true
    }
  },
  classMethods: {
    generateSalt: function () {
      return crypto.randomBytes(16).toString('base64')
    },
    encryptPassword: function (plainText, salt) {
      var hash = crypto.createHash('sha1')
      hash.update(plainText)
      hash.update(salt)
      return hash.digest('hex')
    }
  },
  hooks: {
    beforeCreate: function (user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt()
        user.password = user.Model.encryptPassword(user.password, user.salt)
      }
    },
    beforeUpdate: function (user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt()
        user.password = user.Model.encryptPassword(user.password, user.salt)
      }
    }
  }
})

module.exports = User
