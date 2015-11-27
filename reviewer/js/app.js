var app = angular.module('reviewer', ['firebase', 'ui.router']);

app.constant('firebaseUrl', {
	url: 'https://dishrater.firebaseio.com/'
})

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('placeList', {
			url: '/placeList',
			controller: 'placeListCtrl',
			templateUrl: 'templates/placeList.html',
			resolve: {
				placeListRef: function(placeService) {
					return placeService.getPlaces();
				},
				latestReviewRef: function(placeService){
					return placeService.getLatestReview();
				}
			}
		})
		.state('place', {
			url: '/placeList/:placeId',
			controller: 'placeCtrl',
			templateUrl: 'templates/place.html',
			resolve: {
				placeRef: function(placeService, $stateParams) {
					return placeService.getPlace($stateParams.placeId);
				},
				dishesRef: function(placeService, $stateParams) {
					return placeService.getDishes($stateParams.placeId);
				},
				placeListRef: function(placeService) {
					return placeService.getPlaces();
				}
			}
		})
		.state('place.dish', {
			url: '/placeList/:placeId/:dishId',
			controller: 'dishCtrl',
			templateUrl: 'templates/dish.html',
			resolve: {
				placeRef: function(placeService, $stateParams) {
					return placeService.getPlace($stateParams.placeId);
				},
				dishesRef: function(placeService, $stateParams) {
					return placeService.getDishes($stateParams.placeId);
				},
				reviewsRef: function(placeService, $stateParams) {
					return placeService.getReviews($stateParams.placeId, $stateParams.dishId);
				},
				singleDishRef: function(placeService, $stateParams) {
					return placeService.getDishData($stateParams.placeId, $stateParams.dishId);
				},
				placeListRef: function(placeService) {
					return placeService.getPlaces();
				},
				rootRef: function(placeService){
					return placeService.getRoot();
				}
			}
		})

	$urlRouterProvider.otherwise('/placeList');

});
