app.controller('CartItemCtrl', function ($scope, $state, CartFactory) {
  $scope.increment = function (productId) {
    CartFactory.modifyQuantity(productId, $scope.item.product_cart.quantity + 1)
      .then(function (updatedQuantity) {
        $scope.$emit('cartUpdate')
        return updatedQuantity
      })
  }

  $scope.decrement = function (productId) {
    CartFactory.modifyQuantity(productId, $scope.item.product_cart.quantity - 1)
      .then(function (updatedQuantity) {
        $scope.$emit('cartUpdate')
        return updatedQuantity
      })
  }

  $scope.removeFromCart = function (productId) {
    CartFactory.removeFromCart(productId)
      .then(function (removedItem) {
        $scope.$emit('cartUpdate')
        return removedItem
      })
  }
})
