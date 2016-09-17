'use strict'

app.controller('CartCtrl', function ($scope, $state, CartFactory) {
  $scope.getTotal = function () {
    var total = 0
    for (let i = 0; i < $scope.cartItems.length; i++) {
      var product = $scope.cartItems[i]
      if (Number(product.product_cart.quantity)) {
        total += (Number(product.price) * Number(product.product_cart.quantity))
      }
    }
    return total
  }
  $scope.$on('cartUpdate', $scope.getTotal)
})
