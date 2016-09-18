app.factory('OrderFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      return $http.get('/api/order')
        .then(res => res.data)
        .catch(function () {
          $q.reject({order: null})
        })
    }
  }
})
