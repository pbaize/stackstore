'use strict'

app.controller('AdminChatCtrl', function ($scope, $rootScope, $state, ChatFactory) {
  $scope.allLiveDiscussions = []

  $scope.fetchChats = function () {
    console.log('ADMIN: Attemptng to authenticate and fetch live chats.')
    ChatFactory.findMyId()
      .then(function (myId) {
        $rootScope.socket.emit('adminauth', {id: myId})
      })
  }

  $scope.fetchChats()

  $rootScope.socket.on('currentclients', function (allClients) {
    console.log('ADMIN: Recieved all chats.')
    $scope.allLiveDiscussions = allClients
    console.log(allClients)
    $scope.$evalAsync()
  })
})
