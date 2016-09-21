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

app.controller('ProductsCtrl', function ($scope, allProducts, CartFactory) {
  $scope.products = allProducts
})

app.controller('ProductCtrl', function ($scope, product, CartFactory, $rootScope, AuthService) {
  console.log('single product', product)
  $scope.product = product
  $scope.addToCart = function () {
    console.log('adding product id', product.product.id)
    CartFactory.addToCart(product.product.id)
      .then(function () {
        $rootScope.$broadcast('cartUpdate')
      }).catch(function (err) {
        console.log(err)
      })
  }

  $scope.logginStatus = function () {
    return AuthService.isAuthenticated()
  }
})
