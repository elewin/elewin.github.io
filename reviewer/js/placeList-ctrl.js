angular.module('reviewer').controller('placeListCtrl', function(placeListRef, latestReviewRef, $scope, $firebaseArray, $firebaseObject) {


	$scope.placeList = $firebaseArray(placeListRef);
	$scope.latestReview = $firebaseObject(latestReviewRef);

	$scope.options = [
		{
			name: 'Name',
			value: 'name',
		},
		{
			name: 'Most dishes',
			value: '-totalDishes',
		},
		{
			name: 'Most reviews',
			value: '-totalReviews',
		},
		{
			name: 'Highest rated dish',
			value: '-bestDish.avgScorePct',
		},
		{
			name: 'Most recent review',
			value: '-latestReviewTimeStamp',
		}

	]; //for ng-repeat sortBy


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
			latestReviewId: '',
			latestReviewTimeStamp: 0,
		}).then(function(ref) {
			ref.update({ //initialize child keys
				bestDish: {
					avgScore: 0,
					avgScorePct: 0,
					name: "Add a review!",
					ratingColor: "#ffffff",
				},
			});
		});
		$scope.newPlaceName = "";
	};

});
