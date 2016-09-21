app.factory('OrderFactory', function ($http, $log, $q) {
  return {
    fetchAll: function () {
      return $http.get('/api/order')
        .then(res => res.data)
        .catch(function () {
          $q.reject({order: null})
        })
    },
    checkout: function (products, token) {
      // re-format the data before firing the ajax request
      let datas = products.map(product => {
        return {id: product.id, quantity: product.product_cart.quantity}
      })
      console.log('sending the order..........', datas)
      return $http.post('/api/order/newOrder', {productsData: datas, token: token})
    }
  }
})
