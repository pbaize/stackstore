app.directive('inputReview', function (ReviewFactory, $state, $log, AuthService) {
  return {
    restrict: 'E',
    templateUrl: 'js/review/reviewForm.html',
    scope: {
      product: '='
    },
    link: function (scope, element, attr) {
      AuthService.getLoggedInUser()
        .then(function (user) {
          let index = user.email.indexOf('@')
          scope.userName = user.email.substring(0, index)
        }).catch($log.error)
      scope.addReview = function () {
        console.log('Testing before sending review', scope.product.id, scope.review)
        let sendObject = {
          productId: scope.product.id,
          review: scope.review
        }
        ReviewFactory.addReview(sendObject)
          .then(function () {
            $state.go('singleProduct', {id: scope.product.id}, {reload: true})
          }).catch($log.error)
      }
    }
  }
})
