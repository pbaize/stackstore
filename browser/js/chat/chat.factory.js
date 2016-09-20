app.factory('ChatFactory', function ($http, $log, $q, $rootScope) {
  return {
    hideClientChat: function () {
      $rootScope.$broadcast('hideChat')
    },
    minimizeClientChat: function () {
      $rootScope.$broadcast('minimizeChat')
    }
  }
})
