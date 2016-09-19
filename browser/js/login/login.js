app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  })
    .state('signUp', {
      url: '/signUp',
      templateUrl: 'js/login/signUp.html',
      controller: 'LoginCtrl'
    })
})

app.controller('LoginCtrl', function ($scope, AuthService, $state, CreateUserFactory) {
  $scope.login = {}
  $scope.error = null

  $scope.sendLogin = function (loginInfo) {
    $scope.error = null

    AuthService.login(loginInfo).then(function () {
      $state.go('home')
    }).catch(function () {
      $scope.error = 'Invalid login credentials.'
    })
  }

  $scope.createLogin = function (loginInfo) {
    $scope.error = null
    let tempLogin = loginInfo

    CreateUserFactory.createUser(loginInfo).then(function () {
      AuthService.login(tempLogin).then(function () {
        $state.go('home')
      }).catch(function () {
        $scope.error = 'Invalid login credentials.'
      })
    }).catch(function () {
      $scope.error = 'Could not create account.'
    })
  }
})
