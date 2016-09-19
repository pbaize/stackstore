'use strict'
var crypto = require('crypto')
var _ = require('lodash')
var Sequelize = require('sequelize')

var db = require('../_db')

var User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isUnique: function (value, next) {
        var self = this
        User.find({
          where: {
            email: value
          }
        })
          .then(function (user) {
            if (user && self.id !== user.id) {
              return next('Email already in use!')
            }
            return next()
          })
          .catch(function (err) {
            return next(err)
          })
      }
    }
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
  },
  passwordReset: {
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
    checkAdmin: function () {
      return this.isAdmin === true
    },
    changePassword: function (newPassword) {
      this.password = newPassword
    },
    changeAdmin: function (adminStatus) {
      this.isAdmin = adminStatus
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
