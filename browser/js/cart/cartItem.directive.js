app.directive('cartItem', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    templateUrl: 'js/cart/templates/cartItem.html',
    controller: 'CartItemCtrl',
    scope: {
      item: '=item'
    }
  }
})
