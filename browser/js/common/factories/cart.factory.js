app.factory('CartFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      $http.get('/api/cart')
        .then(function (myCart) {
          return myCart
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    }
  }
})
