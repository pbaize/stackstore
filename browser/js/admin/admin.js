app.config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'js/admin/admin.html',
    resolve: {
      adminStatus: function (AdminFactory) {
        return AdminFactory.checkAdmin()
      }
    },
    controller: function ($scope, adminStatus, $state) {
      $scope.admin = adminStatus
      if (!adminStatus) {
        setTimeout(() => {
          $state.go('home')
        }, 5045)
      }
    }
  })
})
app.factory('AdminFactory', function ($http) {
  function checkAdmin () {
    return $http.get('api/admin')
      .then(res => true)
      .catch(() => false)
  }
  return {checkAdmin}
})
