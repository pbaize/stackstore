app.directive('navbar', function ($rootScope, CartFactory, AuthService, AUTH_EVENTS, $state) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/navbar/navbar.html',
    link: function (scope) {
      scope.items = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about' },
        { label: 'Documentation', state: 'docs' },
        { label: 'Members Only', state: 'membersOnly', auth: true }
      ]
      scope.showCart = false
      scope.toggleCart = function () {
        CartFactory.fetchAll()
          .then(cart => {
            scope.cartItems = cart
          })
        scope.showCart = !scope.showCart
      }
      scope.user = null

      scope.incrementValue = function () {
        for (let i = 0; i < scope.cartItems.length; i++) {
          var value = +scope.cartItems[i].quantity
          value = isNaN(value) ? 0 : value
          if (value < 10) {
            value++
            scope.cartItems[i].quantity = +value
          }
        }
      }

      scope.decrementValue = function () {
        for (let i = 0; i < scope.cartItems.length; i++) {
          var value = +scope.cartItems[i].quantity
          value = isNaN(value) ? 0 : value
          if (value > 1) {
            value--
            scope.cartItems[i].quantity = +value
          }
        }
      }

      scope.getQuantity = function (item) {
        return CartFactory.findQuantity()
          .then(function (allRows) {
            console.log(allRows)
            return allRows[allRows.indexOf(item.id)].quantity
          })
      }

      scope.isLoggedIn = function () {
        return AuthService.isAuthenticated()
      }
      // scope.getTotal = function () {
      //   var total = 0
      //   for (let i = 0; i < scope.cartItems.length; i++) {
      //     var product = scope.cartItems[i]
      //     if (!parseInt(product.quantity)) {
      //       total += parseInt(product.price)
      //     } else {
      //       total += (parseInt(product.price) * parseInt(product.quantity))
      //     }
      //   }
      //   return total
      // }

      scope.cartIncrementQ = function (productId) {
        CartFactory.modifyQuantity(productId, 1)
          .then(function (updatedQuantity) {
            return updatedQuantity
          })
      }

      scope.cartDecrementQ = function (productId) {
        CartFactory.modifyQuantity(productId, -1)
          .then(function (updatedQuantity) {
            return updatedQuantity
          })
      }

      scope.logout = function () {
        AuthService.logout().then(function () {
          $state.go('home')
        })
      }

      var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
          scope.user = user
        })
      }

      var removeUser = function () {
        scope.user = null
      }

      setUser()

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser)
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser)
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser)
    }

  }
})
