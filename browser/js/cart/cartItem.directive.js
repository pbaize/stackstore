app.directive('cartItem', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    templateUrl: 'js/cart/templates/cartItem.html',
    controller: 'CartItemCtrl'
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
  // // // scope.getTotal = function () {
  // // //   var total = 0
  // // //   for (let i = 0; i < scope.cartItems.length; i++) {
  // // //     var product = scope.cartItems[i]
  // // //     if (!Number(product.quantity)) {
  // // //       total += Number(product.price)
  // // //     } else {
  // // //       total += (Number(product.price) * Number(product.quantity))
  // // //     }
  // // //   }
  // // //   return total
  // // // }
  // // }
  }
})
