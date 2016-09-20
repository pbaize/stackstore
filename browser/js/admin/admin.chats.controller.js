'use strict'

app.controller('AdminChatCtrl', function ($scope, $rootScope, $state, ChatFactory) {
  $scope.allLiveDiscussions = []
  $scope.currentConversation = []
  $scope.currentSelection = {user: null}

  $scope.fetchChats = function () {
    console.log('ADMIN: Attempting to authenticate and fetch live chats.')
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
    $scope.currentSelection.user = aChat.userName
    $scope.$evalAsync()
  }

  $scope.sendAdMessage = function (message) {
    if ($scope.currentSelection) {
      console.log('ADMIN: Attempting to authenticate and send message to proper user.')
      ChatFactory.findMyId()
        .then(function (myId) {
          $rootScope.socket.emit('adminmessage', {id: myId, user: $scope.currentSelection.user, message: {message: message, timestamp: new Date(), user: 'Another Hipster'}})
          $scope.currentConversation.push({message: message, timestamp: new Date(), user: 'You'})
          $scope.thechat.$setPristine()
          $scope.msg = null
          $scope.$evalAsync()
          console.log('ADMIN: Sending message up.')
        })
    } else {
      console.log('Must select a conversation first!')
    }
  }
})
