app.directive('cart', function ($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/navbar/cart.html',
    controller: 'CartCtrl'
  //   link: function (scope, element, attr) {
  //     // we can add more function (function that assign to ng-click)
  //     // if we decided the product preview is clickable
  //   }
  }
})
