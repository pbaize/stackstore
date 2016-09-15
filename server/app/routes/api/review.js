'use strict'

const router = require('express').Router()
const Review = require('../../../db/models/review.js')
const User = require('../../../db/models/user.js')

module.exports = router

router.post('/', function (req, res, next) {
  let myReview = {}
  let myUser = {}
  let myData = req.body

  User.findOne({
    where: {
      id: req.user.id
    }
  })
    .then(function (foundUser) {
      myUser = foundUser
      return Review.create({
        title: myData.review.title,
        comment: myData.review.comment,
        score: myData.review.score,
        author: foundUser.email
      })
    })
    .then(function (createdReview) {
      myReview = createdReview
      let myAssociations = [myReview.setUser(myUser), myReview.addProduct(myData.productId)]
      return Promise.all(myAssociations)
    })
    .then(function () {
      res.status(200).send({message: 'Success posting message!'})
    })
    .catch(function (err) {
      next(err)
    })
})
