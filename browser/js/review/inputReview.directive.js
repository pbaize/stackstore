app.directive('inputReview', function (ReviewFactory, $state, $log, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/review/reviewForm.html',
    scope: {
      product: '='
    },
    link: function (scope, element, attr) {
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
