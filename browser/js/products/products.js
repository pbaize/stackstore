'use strict'

app.config(function ($stateProvider) {
  $stateProvider.state('allProducts', {
    url: '/products',
    templateUrl: '/js/products/product.html',
    controller: 'ProductCtrl',
    resolve: {
      allProducts: function (ProductFactory) {
        return ProductFactory.fetchAll()
      }
    }
  })
})

app.controller('ProductCtrl', function ($scope, AuthService, $state, ProductFactory, allProducts) {
  $scope.products = allProducts
})
