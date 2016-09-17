app.factory('OrderFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      return $http.get('/api/order')
        .then(function (myOrder) {
          return myOrder.data[0]
        // I couldn't figure out how to access the array, in data.. So hardcoded it. Can you please look into it.
        })
        .catch(function () {
          $q.reject({order: null})
        })
    }
  }
})
