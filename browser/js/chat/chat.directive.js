app.directive('chat', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/chat/chat.html',
    controller: 'ChatCtrl'
  //   link: function (scope, element, attr) {
  //     // we can add more function (function that assign to ng-click)
  //     // if we decided the product preview is clickable
  //   }
  }
})
