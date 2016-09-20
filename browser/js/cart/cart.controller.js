'use strict'

app.controller('CartCtrl', function ($rootScope, $scope, $state, CartFactory, OrderFactory, $log) {
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
  // $window.streetName = $scope.getTotal
  // $window.streetName = $scope.getTotal
  $scope.$on('cartUpdate', $scope.getTotal)

  $scope.checkNow = false

  $scope.toggleCheckout = function () {
    $scope.checkNow = !$scope.checkNow
  }

  // checkout all the product in the cart, use cartfactory firing
  // an ajax request hit the post order route with all the products info
  $scope.checkout = function () {
    OrderFactory.checkout($scope.cartItems)

      .then(function (newOrder) {
        console.log(newOrder)
        $scope.showCart = !$scope.showCart
        if ($rootScope.userName) {
          $scope.toggleOrder()
        }
        return CartFactory.clearCart()
      })
      .then(function (clearedCart) {
        $rootScope.$broadcast('cartUpdate')
        console.log('Success Clearing Cart.')
      })
  }
})
