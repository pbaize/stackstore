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
      function updateUser (id, update) {
        return AdminFactory.updateOne(view, id, update)
      }
      $scope.makeAdmin = function (id) {
        return updateUser(id, {isAdmin: true})
      }
      $scope.forceReset = function (id) {
        return updateUser(id, {passwordReset: true})
      }
      $scope.delete = function (id) {
        return AdminFactory.deleteOne(view, id)
      }
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
  $stateProvider.state('admin.chat', {
    url: '/admin/chats',
    templateUrl: 'js/admin/admin.chats.html',
    controller: 'AdminChatCtrl'
  })
  $stateProvider.state('admin.products', {
    url: '/products?query',
    templateUrl: 'js/admin/admin.products.html',
    resolve: {},
    controller: ($scope, AdminFactory, $stateParams, $state) => {
      const view = 'products'
      const refresh = () => AdminFactory.getAll(view)
        .then(data => {
          console.log(data)
          $scope.data = data
        })
      AdminFactory.getAll(view)
        .then(data => {
          console.log(data)
          $scope.data = data
        })
      $scope.query = $stateParams.query
      $scope.edit = id => $state.go('admin.editProduct', {id: id})
      $scope.makeNew = () => {
        AdminFactory.makeProduct()
          .then(id => {
            console.log(id)
            $state.go('admin.editProduct', {id: id})
          })
      }
      $scope.delete = function (id) {
        return AdminFactory.deleteOne(view, id).then(() => $scope.$evalAsync(refresh))
      }
    }
  })
  $stateProvider.state('admin.editProduct', {
    url: '/admin/product/:id/edit',
    templateUrl: 'js/admin/admin.editProduct.html',
    resolve: {
      product: function ($stateParams, AdminFactory) {
        let id = $stateParams.id
        return AdminFactory.getOne('products', id)
      }
    },
    controller: ($scope, AdminFactory, product, $state, $stateParams) => {
      const view = 'products'
      console.log(product)
      $scope.product = product
      $scope.toggleAvailability = () => {
        $scope.product.availability = !$scope.product.availability
      }
      $scope.discard = () => {
        $state.reload()
      }
      $scope.save = () => {
        AdminFactory.updateOne(view, $stateParams.id, $scope.product)
          .then(() => $state.reload())
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
  function getOne (type, id) {
    return $http.get('api/admin/' + type + '/' + id).then(res => res.data)
  }
  function deleteOne (type, id) {
    return $http.delete('api/admin/' + type + '/' + id)
  }
  function makeProduct () {
    return $http.post('api/admin/products', {})
      .then(res => res.data.id)
  }
  return {checkAdmin, getAll, updateOne, getOne, deleteOne, makeProduct}
})
