app.factory('CategoryFactory', function ($http, $log, $q) {
  return {
    getCategories: function () {
      return $http.get('/api/category/categories')
          .then(res => res.data)
          .catch(() => $q.resolve({categories: null}))
    },
    fetchByType: function (categoryId) {
      return $http.get('/api/category/' + categoryId)
        .then(res => res.data)
        .catch(() => $q.resolve({products: null}))
    },
    // below is method that reserve for admin, subject to change later to integrate with admin factory
    addCategory: function (productId, categoryId) {
      return $http.post('/api/admin/category/addCategory', {productId: productId, categoryId: categoryId})
        .then(res => res.data)
        .catch(() => $q.resolve({message: 'could not add product to the category'}))
    },
    addAndCreateCategory: function (productId, type) {
      return $http.post('/api/admin/category/addAndCreateCategory,', {id: productId, type: type})
          .then(res => res.data)
          .catch(() => $q.resolve({message: 'could not create category to the product'}))
    },
    createCategory: function (type) {
      return $http.post('/api/admin/category/createCategory', {type: type})
        .then(res => res.data)
        .catch(() => $q.resolve({message: 'could not create the category'}))
    },
    deleteCategory: function (categoryId) {
      return $http.delete('/api/admin/category/' + categoryId)
        .then(res => res.data)
        .catch(() => $q.resolve({message: 'could not delete the category'}))
    }
  }
})
