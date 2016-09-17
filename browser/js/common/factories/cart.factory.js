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
          $q.reject({message: 'Error finding quantity in cart!'})
        })
    },
    modifyQuantity: function (productId, quantity) {
      return $http.put('/api/cart/quantity', {productId: productId, quantity: quantity})
        .then(function (updatedRow) {
          return updatedRow.data
        })
        .catch(function () {
          $q.reject({message: 'Error modifying quantity in cart!'})
        })
    },
    removeFromCart: function () {
      return $http.delete('/api/cart/:id')
        .then(function (deletedRow) {
          return deletedRow.data
        })
        .catch(function () {
          $q.reject({message: 'Error removing from cart!'})
        })
    },
    addToCart: function () {
      return $http.post('/api/cart/:id')
        .then(function (createdRow) {
          return createdRow.data
        })
        .catch(function () {
          $q.reject({message: 'Error adding to cart!'})
        })
    }
  }
})
