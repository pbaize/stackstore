app.directive('productPreview', function () {
  return {
  	restrict: 'E',
  	templateUrl: 'js/products/productPreview.html'
  	scope: {
  		product: '='
  	}
  	link: function(scope,element,attr){
  		
  	}
  }
})
