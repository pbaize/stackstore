app.directive('productPreview', function (CartFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/products/productPreview.html',
    scope: {
      product: '=product'
    },
    link: function (scope, element, attr) {
      scope.addToCart = function (myId) {
        CartFactory.addToCart(myId)
          .then(function (addInfo) {
            console.log('Added to cart! (BTW, cannot add more than one instance of same item, change quantity instead)')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
})
