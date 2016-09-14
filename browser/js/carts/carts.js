'use strict'

app.config(function ($stateProvider) {
  $stateProvider.state('theCart', {
    url: '/cart',
    templateUrl: '/js/carts/carts.html',
    controller: 'CartCtrl',
    resolve: {
      myCart: function (CartFactory) {
        return CartFactory.fetchAll()
      }
    }
  })
})

app.controller('CartCtrl', function ($scope, $state, CartFactory, myCart) {
  $scope.cartItems = myCart
})
