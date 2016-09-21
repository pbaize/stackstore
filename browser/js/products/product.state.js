'use strict'

app.config(function ($stateProvider) {
  $stateProvider.state('viewProducts', {
    url: '/products/:totes',
    templateUrl: '/js/products/products.html',
    controller: 'ProductsCtrl',
    resolve: {
      allProducts: function (ProductsFactory) {
        return ProductsFactory.fetchAll()
      },
      onlyTotes: function ($stateParams) {
        return $stateParams.totes === 'totes'
      }
    }
  })
    .state('singleProduct', {
      url: '/product/:id',
      templateUrl: '/js/products/SingleProductPage.html',
      controller: 'ProductCtrl',
      resolve: {
        product: function (ProductsFactory, $stateParams) {
          return ProductsFactory.fetchById($stateParams.id)
        }
      }
    })
})

app.controller('ProductsCtrl', function ($scope, allProducts, onlyTotes, CartFactory) {
  $scope.products = allProducts.filter(product => {
    console.log(product.categories)
    return onlyTotes
      ? product.categories.some(category => category.type === 'Totes')
      : product.categories.every(category => category.type !== 'Totes')
  })
})

app.controller('ProductCtrl', function ($scope, product) {
  $scope.product = product
})
