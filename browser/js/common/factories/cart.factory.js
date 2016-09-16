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
    findQuantity: function () {
      return $http.get('/api/cart/quantity')
        .then(function (myRows) {
          return myRows.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    },
    modifyQuantity: function (productId, quantity) {
      return $http.put('/api/cart/quantity', {productId: productId, quantity: quantity})
        .then(function (updatedRow) {
          return updatedRow.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    }
  }
})
