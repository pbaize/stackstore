app.factory('CartFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      return $http.get('/api/cart')
        .then(function (myCart) {
          return myCart.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    },
    findQuantity: function (aProduct) {
      return $http.get('/api/cart/quantity')
        .then(function (myRows) {
          return myRows.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    },
    modifyQuantity: function (aProduct, aQuantity) {
      return $http.put('/api/cart/quantity', {productId: aProduct.id, quantity: aQuantity})
        .then(function (updatedRow) {
          return updatedRow.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    }
  }
})
