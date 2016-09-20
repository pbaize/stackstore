app.factory('ChatFactory', function ($http, $log, $q, $rootScope) {
  return {
    hideClientChat: function () {
      $rootScope.$broadcast('hideChat')
    },
    minimizeClientChat: function () {
      $rootScope.$broadcast('minimizeChat')
    },
    findMyId: function () {
      return $http.get('/api/me')
        .then(function (myId) {
          return myId.data
        })
        .catch($q.resolve({message: 'Could not fetch ID.'}))
    }
  }
})
