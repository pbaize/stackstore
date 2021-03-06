let router = require('express').Router()
let Category = require('../../../../db/models/category.js')
const m = require('../middleware')
// let Products = require('../../../../db/models/product.js')
// let Review = require('../../../../db/models/review.js')
module.exports = router

router.get('/', m.getAll(Category))
router.post('/', function (req, res, next) {
  let type = req.body.type
  Category.create({type: type})
    .then(created => res.status(202).send(created))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  let id = req.params.id
  Category.findAndDelete(id)
    .then(function () {
      res.status(202).end()
    }).catch(next)
})

// router.get('/:id', function (req, res, next) {
//   let categoryId = req.params.id
//   Products.findAll({
//     include: [{
//       model: Category,
//       where: {id: categoryId}
//     }, Review]
//   }).then(function (products) {
//     res.send(products)
//   }).catch(next)
// })

// router.post('/addCategory', function (req, res, next) {
//   let productId = req.body.productId
//   let categoryId = req.body.categoryId

//   Products.findById(productId)
//     .then(function (product) {
//       return product.addCategory(categoryId)
//     })
//     .then(function () {
//       res.status(202).send({message: 'Successful add of category!'})
//     }).catch(next)
// })

// router.post('/', function (req, res, next) {
//   let productId = req.body.id
//   let type = req.body.type
//   Category.findOrCreate({where: {type: type}})
//     .then(function (newCategory) {
//       return newCategory.addProduct(productId)
//     }).then(function () {
//       res.status(202).send({message: 'New category created for the product'})
//     }).catch(next)
// })

// router.post('/removeCategory', function (req, res, next) {
//   let productId = req.body.productId
//   let categoryId = req.body.categoryId

//   Products.findById(productId)
//     .then(function (product) {
//       return product.removeCategory(categoryId)
//     })
//     .then(function () {
//       res.status(202).send({message: 'Successful delete of category!'})
//     }).catch(next)
// })
