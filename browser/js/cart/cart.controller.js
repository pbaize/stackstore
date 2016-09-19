'use strict'

app.controller('CartCtrl', function ($scope, $state, CartFactory, OrderFactory, $log) {
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

  // checkout all the product in the cart, use cartfactory firing
  // an ajax request hit the post order route with all the products info
  $scope.checkout = function () {
    OrderFactory.checkout($scope.cartItems)
      .then(function (res) {
        console.log(res.data)
        $scope.showCart = !$scope.showCart
        $scope.toggleOrder()
      })
  }
})
