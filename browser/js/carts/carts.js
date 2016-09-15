'use strict'

app.controller('CartCtrl', function ($scope, $state, CartFactory) {
  $scope.getCart = function () {
    CartFactory.fetchAll().then(cart => {
      $scope.cartItems = cart
    // $scope.$evalAsync()
    })
  }
  $scope.getCart()
})
