'use strict'

app.controller('ChatCtrl', function ($scope, $rootScope, ChatFactory) {
  $scope.initialAuth = false
  $scope.chatShow = false
  $scope.conversation = []
  $scope.toggleChat = function () {
    $scope.chatShow = !$scope.chatShow
  }

  $scope.$on('hideChat', function () {
    $scope.initialAuth = false
  })

  $scope.$on('minimizeChat', function () {
    $scope.chatShow = false
  })

  $rootScope.socket.emit('chatloaded')

  $rootScope.socket.on('openchat', function () {
    console.log('Open chat felt!')
    $scope.initialAuth = true
    $scope.chatShow = true
    $scope.$evalAsync()
  })

  $rootScope.socket.on('trollol', function () {
    console.log('Trolled.')
    window.location.href = 'https://www.youtube.com/watch?v=wwZyIFBlSNs'
  })

  $rootScope.socket.on('rickroll', function () {
    console.log('Rick Rolled.')
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  })

  $rootScope.socket.on('servermessage', function (msgContent) {
    console.log('Recieving message!')
    addMessage(msgContent.message, msgContent.user)
  })

  let addMessage = function (message, user) {
    $scope.conversation.unshift({user: user, message: message, timestamp: new Date()})
    $scope.$evalAsync()
  }

  $scope.sendMessage = function (message) {
    $scope.thechat.$setPristine()
    $scope.msg = null
    $scope.conversation.unshift({user: 'You', message: message, timestamp: new Date()})
    $scope.$evalAsync()
    $rootScope.socket.emit('clientmessage', {message: message, timestamp: new Date()})
  }
})
