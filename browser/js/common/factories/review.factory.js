/* global app */
app.factory('ReviewFactory', function ($http, $log, $q, ProductsFactory) {
  let ReviewFactory = {}

  ReviewFactory.addReview = function (data) {
    ProductsFactory.forcingReviewUpdate = true
    return $http.post('/api/review', {review: data})
  }

  return ReviewFactory
})
