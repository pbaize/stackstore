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
      $scope.goChild = () => {
        $scope.inChild = true
      }
    }
  })
  $stateProvider.state('admin.users', {
    url: '/users?query',
    templateUrl: 'js/admin/admin.users.html',
    resolve: {},
    controller: ($scope, AdminFactory, $stateParams) => {
      const view = 'users'
      AdminFactory.getAll(view)
        .then(data => {
          console.log(data)
          $scope.data = data
        })
      $scope.query = $stateParams.query || ''
    }
  })
  $stateProvider.state('admin.products', {
    url: '/products?query',
    templateUrl: 'js/admin/admin.products.html',
    resolve: {},
    controller: ($scope, AdminFactory, $stateParams) => {
      const view = 'products'
      AdminFactory.getAll(view)
        .then(data => {
          console.log(data)
          $scope.data = data
        })
      $scope.query = $stateParams.query
    }
  })
  $stateProvider.state('admin.orders', {
    url: '/admin/orders?query',
    templateUrl: 'js/admin/admin.orders.html',
    resolve: {},
    controller: ($scope, AdminFactory, $stateParams) => {
      const view = 'orders'
      const refresh = () => AdminFactory.getAll(view)
        .then(data => {
          console.log(data)
          $scope.data = data
        })
      refresh()
      $scope.query = $stateParams.query || ''
      $scope.saveOrder = function (id, status) {
        AdminFactory.updateOne(view, id, {status})
          .then(() => $scope.$evalAsync(refresh))
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
  function getAll (type) {
    return $http.get('api/admin/' + type)
      .then(res => res.data)
  }
  function updateOne (type, id, body) {
    return $http.put('api/admin/' + type + '/' + id, body)
  }
  return {checkAdmin, getAll, updateOne}
})
