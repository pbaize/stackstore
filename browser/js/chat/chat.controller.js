'use strict'

app.controller('ChatCtrl', function ($scope, $rootScope, ChatFactory) {
  $scope.initialAuth = false
  $scope.chatShow = false
  $scope.conversation = []
  $scope.toggleChat = function () {
    $scope.chatShow = !$scope.chatShow
  }

  $rootScope.socket.emit('chatloaded')

  $rootScope.socket.on('openchat', function () {
    console.log('Open chat felt!')
    $scope.initialAuth = true
    $scope.chatShow = true
    $scope.$evalAsync()
  })

  $rootScope.socket.on('servermessage', function (msgContent) {
    console.log('Recieving message!')
    addMessage(msgContent.message, msgContent.user)
  })

  let addMessage = function (message, user) {
    $scope.conversation.push({user: user, message: message, timestamp: new Date()})
    $scope.$evalAsync()
  }

  $scope.sendMessage = function (message) {
    $scope.thechat.$setPristine()
    $scope.msg = null
    $scope.conversation.push({user: 'You', message: message, timestamp: new Date()})
    $scope.$evalAsync()
    $rootScope.socket.emit('clientmessage', {message: message, timestamp: new Date()})
  }
})
