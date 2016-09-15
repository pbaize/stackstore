app.directive('cartItem', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'js/common/directives/cart/cart.html'
  }
})
