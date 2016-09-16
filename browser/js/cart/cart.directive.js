app.directive('cart', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/cart/templates/cart.html',
    controller: 'CartCtrl'
  //   link: function (scope, element, attr) {
  //     // we can add more function (function that assign to ng-click)
  //     // if we decided the product preview is clickable
  //   }
  }
})
