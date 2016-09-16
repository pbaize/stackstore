app.directive('cartItem', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    templateUrl: 'js/cart/templates/cartItem.html',
    controller: 'CartItemCtrl',
    scope: {
      item: '=item'
    }
    // link: function (scope) {
    // //   // scope.incrementValue = function ($index) {
    // //   //   var value = scope.cartItems[$index].quantity
    // //   //   console.log(typeof value)
    // //   //   value = isNaN(value) ? 0 : value
    // //   //   if (value < 10) {
    // //   //     value++
    // //   //     scope.cartItems[$index].quantity = +value
    // //   //   }
    // //   // }

    // //   // scope.decrementValue = function ($index) {
    // //   //   var value = scope.cartItems[$index].quantity
    // //   //   value = isNaN(value) ? 0 : value
    // //   //   if (value > 1) {
    // //   //     value--
    // //   //     scope.cartItems[$index].quantity = +value
    // //   //   }
    // //   // }

  // // }
  }
})
