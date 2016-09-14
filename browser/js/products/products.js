'use strict'

app.config(function ($stateProvider) {
  $stateProvider.state('allProducts', {
    url: '/products',
    templateUrl: '/js/products/product.html',
    controller: 'ProductCtrl',
    resolve: {
      allProducts: function (ProductsFactory) {
        return ProductsFactory.fetchAll()
      }
    }
  })
})

app.controller('ProductsCtrl', function ($scope, AuthService, $state, ProductsFactory, allProducts) {
  $scope.products = allProducts
})
