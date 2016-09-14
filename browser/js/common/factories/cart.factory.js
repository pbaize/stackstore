app.factory('CartFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      console.log('fetching')
      return $http.get('/api/cart')
        .then(function (myCart) {
          return myCart.data
        })
        .catch(function () {
          $q.reject({cart: null})
        })
    }
  }
})
