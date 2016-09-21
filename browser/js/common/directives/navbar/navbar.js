app.directive('navbar', function ($rootScope, CartFactory, OrderFactory, AuthService, AUTH_EVENTS, $state, Socket, ChatFactory) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/navbar/navbar.html',
    link: function (scope) {
      $rootScope.socket = Socket

      scope.cartItems = []

      CartFactory.fetchAll()
        .then(cart => {
          scope.cartItems = cart.products
        })

      scope.$on('cartUpdate', () => {
        CartFactory.fetchAll()
          .then(cart => {
            scope.cartItems = cart.products
          })
      })

      scope.items = [
        { label: 'Home', state: 'home' },
        // { label: 'All Products', state: 'viewProducts' },
        { label: 'Totes', state: 'viewProducts({totes:"totes"})', totes: 'totes' },
        { label: 'Not Totes', state: 'viewProducts({totes:"not"})', totes: 'not' }
      ]
      scope.showCart = false
      scope.toggleCart = function () {
        CartFactory.fetchAll()
          .then(cart => {
            ChatFactory.minimizeClientChat()
            scope.cartItems = cart.products
            scope.showCart = !scope.showCart
          })
      }
      scope.showOrder = false
      scope.toggleOrder = function () {
        OrderFactory.fetchAll()
          .then(orders => {
            scope.orderItems = orders
            scope.showOrder = !scope.showOrder
          })
      }

      scope.user = null

      // scope.incrementValue = function () {
      //   for (let i = 0; i < scope.cartItems.length; i++) {
      //     var value = +scope.cartItems[i].quantity
      //     value = isNaN(value) ? 0 : value
      //     if (value < 10) {
      //       value++
      //       scope.cartItems[i].quantity = +value
      //     }
      //   }
      // }

      // scope.decrementValue = function () {
      //   for (let i = 0; i < scope.cartItems.length; i++) {
      //     var value = +scope.cartItems[i].quantity
      //     value = isNaN(value) ? 0 : value
      //     if (value > 1) {
      //       value--
      //       scope.cartItems[i].quantity = +value
      //     }
      //   }
      // }

      // scope.getQuantity = function (item) {
      //   return CartFactory.findQuantity()
      //     .then(function (allRows) {
      //       console.log(allRows)
      //       return allRows[allRows.indexOf(item.id)].quantity
      //     })
      // }

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

      scope.logout = function () {
        AuthService.logout().then(function () {
          ChatFactory.hideClientChat()
          $state.go('home')
        })
      }

      var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
          if (user) {
            $rootScope.socket.emit('authenticated', user.email)
            scope.user = user.email
            $rootScope.userName = user.email
          }
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
