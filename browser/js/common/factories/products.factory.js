/* global app */
app.factory('ProductsFactory', function ($http, $log, $q) {
  let cachProducts = []
  let ProductsFactory = {}
  let oneProduct

  ProductsFactory.forcingReviewUpdate = false

  ProductsFactory.fetchAll = function () {
    return $http.get('/api/products')
      .then(function (response) {
        let allProducts = response.data
        return allProducts
      }).catch($log.error)
  }

  ProductsFactory.fetchById = function (id) {
    let usingCach = false
    cachProducts.forEach((product) => {
      if (product.id === id) {
        oneProduct = product
        usingCach = true
      }
    })

    if (usingCach === false || this.forcingReviewUpdate === true) {
      return $http.get('/api/products/' + id)
        .then(function (response) {
          console.log('loading new product')
          oneProduct = response.data
          cachProducts.push(oneProduct) // put the result to cach
          this.forcingReviewUpdate = false
          return oneProduct
        }).catch($log.error)
    } else {
      console.log('using cach result')
      let deferred = $q.defer()
      deferred.resolve(oneProduct)
      return deferred.promise
    }
  }

  return ProductsFactory
})
