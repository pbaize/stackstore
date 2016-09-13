/* global app */
app.factory('CreateUserFactory', function ($http, $log, $q) {
  // Need to create this route.
  return {
    createUser: function (loginInfo) {
      $http.post('/api/createuser', loginInfo)
        .then(function () {
          return {message: 'User created!'}
        })
        .catch(function () {
          $q.reject({ message: 'Unable to create user.' })
        })
    }
  }
})
