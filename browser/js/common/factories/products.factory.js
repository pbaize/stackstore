/* global app */
app.factory('ProductsFactory', function ($http, $log, $q) {
  let cachProduct = []
  let ProductsFactory = {}

  ProductsFactory.fetchAll = function () {
    return $http.get('/api/products')
      .then(function (response) {
        let allProducts = response.data
        return allProducts
      }).catch($log.error)
  }

  ProductsFactory.fetchById = function (id) {
    if (cachProduct[id] === undefined) {
      return $http.get('/api/products/' + id)
        .then(function (response) {
          console.log('loading new product')
          let oneProduct = response.data
          cachProduct[id] = oneProduct // put the result to cach
          return oneProduct
        }).catch($log.error)
    } else {
      console.log('using cach result')
      let deferred = $q.defer()
      deferred.resolve(cachProduct[id])
      return deferred.promise
    }
  }

  return ProductsFactory
})
