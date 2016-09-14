'use strict'

app.config(function ($stateProvider) {
  $stateProvider.state('viewProducts', {
    url: '/products',
    templateUrl: '/js/products/products.html',
    controller: 'ProductsCtrl',
    resolve: {
      allProducts: function (ProductsFactory) {
        return ProductsFactory.fetchAll()
      }
    }
  })
    .state('singleProduct', {
      url: '/products/:id',
      templateUrl: '/js/products/SingleProductPage.html',
      controller: 'ProductCtrl',
      resolve: {
        product: function (ProductsFactory, $stateParams) {
          return ProductsFactory.fetchById($stateParams.id)
        }
      }
    })
})

app.controller('ProductsCtrl', function ($scope, AuthService, $state, ProductsFactory, allProducts) {
  $scope.products = allProducts
})

app.controller('ProductCtrl', function ($scope, product) {
  $scope.product = product
})
