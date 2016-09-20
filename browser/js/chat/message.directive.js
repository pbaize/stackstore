app.directive('message', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/chat/message.html',
    controller: 'MsgCtrl',
    scope: {
      message: '=message'
    }
  }
})
