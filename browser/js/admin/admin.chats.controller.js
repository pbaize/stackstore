'use strict'

app.controller('AdminChatCtrl', function ($scope, $rootScope, $state, ChatFactory) {
  $scope.allLiveDiscussions = []
  $scope.currentConversation = []

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

  $scope.loadChat = function (aChat) {
    $scope.currentConversation = aChat.chatHistory.map(function (a) {
      return {message: a.message, user: a.user, timestamp: a.timestamp}
    })
    console.log($scope.currentConversation)
    $scope.$evalAsync()
  }
})
