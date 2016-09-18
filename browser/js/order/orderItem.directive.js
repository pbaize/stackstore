app.directive('orderItem', function ($rootScope, OrderFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    templateUrl: 'js/order/templates/orderItem.html'
  }
})
