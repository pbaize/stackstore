'use strict'

app.controller('ChatCtrl', function ($scope, $rootScope, ChatFactory) {
  $scope.chatShow = false
  $scope.toggleChat = function () {
    $scope.chatShow = !$scope.chatShow
  }

  $rootScope.socket.emit('chatloaded')

  $rootScope.socket.on('openchat', function () {
    console.log('Open chat felt!')
    $scope.chatShow = true
    $scope.$evalAsync()
  })
})
