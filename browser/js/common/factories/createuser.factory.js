/* global app */
app.factory('CreateUserFactory', function ($http, $log, $q) {
  // Need to create this route.
  return {
    createUser: function (loginInfo) {
      return $http.post('/api/createuser', loginInfo)
        .then(function () {
          return $q.resolve({message: 'User created!'})
        })
        .catch(function () {
          return $q.reject({ message: 'Unable to create user.' })
        })
    }
  }
})
