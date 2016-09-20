'use strict'

app.controller('ChatCtrl', function ($scope, $rootScope, ChatFactory) {
  $scope.chatShow = false
  $scope.conversation = []
  $scope.toggleChat = function () {
    $scope.chatShow = !$scope.chatShow
  }

  $rootScope.socket.emit('chatloaded')

  $rootScope.socket.on('openchat', function () {
    console.log('Open chat felt!')
    $scope.chatShow = true
    $scope.$evalAsync()
  })

  $rootScope.socket.on('servermessage', function (msgContent) {
    console.log('Recieving message!')
    $scope.addMessage(msgContent.message, msgContent.user)
  })

  $scope.addMessage = function (message, user) {
    $scope.conversation.push({user: user, message: message, timestamp: new Date()})
    $scope.$evalAsync()
  }
})
