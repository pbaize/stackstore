'use strict'

app.controller('CartCtrl', function ($scope, $state, CartFactory) {
  $scope.getCart = function () {
    CartFactory.fetchAll().then(cart => {
      $scope.cartItems = cart
    })
  }

  $scope.getCart()
  $scope.getTotal = function () {
    var total = 0
    for (let i = 0; i < $scope.cartItems.length; i++) {
      var product = $scope.cartItems[i]
      if (!Number(product.quantity)) {
        total += Number(product.price)
      } else {
        total += (Number(product.price) * Number(product.quantity))
      }
    }
    return total
  }
})
