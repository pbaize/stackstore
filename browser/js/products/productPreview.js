app.directive('productPreview', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/products/productPreview.html',
    scope: {
      product: '=product'
    }
  //   link: function (scope, element, attr) {
  //     // we can add more function (function that assign to ng-click)
  //     // if we decided the product preview is clickable
  //   }
  }
})
