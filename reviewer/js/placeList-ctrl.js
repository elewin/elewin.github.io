angular.module('reviewer').controller('placeListCtrl', function(placeListRef, latestReviewRef, $scope, $firebaseArray, $firebaseObject) {


	$scope.placeList = $firebaseArray(placeListRef);
	$scope.latestReview = $firebaseObject(latestReviewRef);


	$scope.placeList.$loaded().then(function(placeList) { //load the list
	});

	var myDate = new Date();
	var dateStr = myDate.getMonth()+1 + '/' +myDate.getDate() + '/' + myDate.getFullYear() ;
	$scope.createPlace = function(name) { //add a new object, and initialize its keys
		$scope.placeList.$add({
			name: name,
			address: '',
			phone: '',
			photoUrl: '',
			totalDishes: 0,
		  totalReviews: 0,
			genre: '',
			dateAdded: dateStr,
			addedBy: '', //user who added place
		});
		$scope.newPlaceName = "";
	};

});
