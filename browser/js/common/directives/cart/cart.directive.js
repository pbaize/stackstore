app.directive('cartItem', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    scope: {
      myItem: '='
    },
    templateUrl: 'js/common/directives/cart/cartItem.html',
    controller: 'CartCtrl',
    link: function (scope) {
      scope.incrementValue = function () {
        for (let i = 0; i < scope.cartItems.length; i++) {
          var value = +scope.cartItems[i].quantity
          value = isNaN(value) ? 0 : value
          if (value < 10) {
            value++
            scope.cartItems[i].quantity = +value
          }
        }
      }

      scope.decrementValue = function () {
        for (let i = 0; i < scope.cartItems.length; i++) {
          var value = +scope.cartItems[i].quantity
          value = isNaN(value) ? 0 : value
          if (value > 1) {
            value--
            scope.cartItems[i].quantity = +value
          }
        }
      }
      scope.getTotal = function () {
        var total = 0
        for (let i = 0; i < scope.cartItems.length; i++) {
          var product = scope.cartItems[i]
          if (!parseInt(product.quantity)) {
            total += parseInt(product.price)
          } else {
            total += (parseInt(product.price) * parseInt(product.quantity))
          }
        }
        return total
      }
    }
  }
})
