angular.module('reviewer').service('placeService', function(firebaseUrl, Firebase, $stateParams, $firebaseObject) {

	this.getPlaces = function() {
		return new Firebase(firebaseUrl.url+'/placeList');
	};
	this.getPlace = function(placeId) {
		return new Firebase(firebaseUrl.url+'/placeList/'+placeId);
	};
	this.getDishes = function (placeId) {
    return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes');
  };
	this.getReviews = function (placeId, dishId) {
    return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes/'+dishId+'/reviews');
  };
	this.getDishData = function (placeId, dishId){
		  return new Firebase(firebaseUrl.url+'/placeList/'+placeId+'/dishes/'+dishId);
	};

	this.getLatestReview = function(){
		return new Firebase(firebaseUrl.url+'/latestReview');
	};

	this.getRoot = function(){
		return new Firebase(firebaseUrl.url);
	};

	/// https://www.firebase.com/docs/web/guide/retrieving-data.html
	this.getTopDishesObj = function(placeId, num){ //return an object of the the highest num rated dishs
		var ref = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/');
		return $firebaseObject(ref.orderByChild("avgScore").limitToLast(num)); //return the top num dishes by highest avg score
	};

	this.getTopDishesArr = function(obj, num){ //returns an array of the top num dishes
		var results = [];
		obj.orderByChild("avgScore").limitToLast(num).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
				results.push({
					data: data.val(), //add the data
					key: data.key(),  //add its own key for linking
				});
			});
		});
		return results.reverse(); //reverses the array so the highest rated dish is [0]
	};

	/////////this is broken, moving to controller for now :(
	// this.loadTopDishes = function(obj, num, dishRef, placeRef, place){ //make sure data is loaded before trying to put it on $scope, num is number of top dishes to get
	// 	var results = []; //placeService.getTopDishesArr(dishesRef, num);
	// 	obj.$loaded(function(data){
	//
	// 		dishRef.orderByChild("avgScore").limitToLast(num).on("value", function(snapshot) {
	// 			snapshot.forEach(function(data) {
	// 				results.push({
	// 					data: data.val(), //add the data
	// 					key: data.key(),  //add its own key for linking
	// 				});
	// 			});
	// 		});
	//
	// 		//while the top dishes are loaded, set the properties for the best dish for this place so it can be displayed along side the place on the palceList:
	// 		var bestDishRef = placeRef.child("bestDish");
	//
	// 		// make sure we have at least 1 dish
	// 		if (place.totalDishes > 0){
	// 			bestDishRef.set({
	// 				name: results[0].data.name,
	// 				avgScorePct: results[0].data.avgScorePct,
	// 				ratingColor: results[0].data.ratingColor,
	// 				avgScore: results[0].data.avgScore,
	// 			});
	// 		}else{ //set the best dish to empty if we dont have any dishes
	// 			bestDishRef.set({
	// 				name: 'None',
	// 				avgScorePct: 0,
	// 				ratingColor: '#ffffff',
	// 				avgScore: 0,
	// 			});
	// 		 }
	// 	},
	// 	function(error){
	// 		console.error("error:", error); //uh oh :(
	// 	});
	// 	console.log("service");
	// 	return results.reverse(); //reverses the array so the highest rated dish is [0]
	// }


	this.colorYtoR = function(pct){ //return a color ranging from yellow to red based on a percent given 0-100
		var reverse = false; //set this to true to go from red to yellow instead

		//this will determine what direction in colors we go from low score to high
		var dir = 100;
		if (reverse){
			dir = 0;
		}

		var r = 'ff'; //we dont change red, it stays at #ff
		var g = 0;
		var b = '00'; //we dont change blue, it stays at #00

		g = Math.round(((dir-pct)/100)*255).toString(16); //convert the green value to hex
		if (g === '0'){g = '00';} //set 0 to 00
		var htmlColorCode = '#'+r+g+b; //put html color code together
		return htmlColorCode;
	};


	// *****************BUG? does this skip the yellow range?
	this.colorGtoR = function(pct){ //return a color ranging from green to red based on a percent given 0-100
	  var r = 0;
	  var g = 0;
	  var b = '00'; //we dont change blue, it stays at #00
	  pct = pct/100
	  if ((0 <= pct) && (pct < 0.5)){ //if between 0-49%
	    g = 'ff';
	    r = Math.round((2 * pct)*100);
	    r = r.toString(16); //convert to hex
	  }
	  if ((0.5 <= pct) && (pct <= 1)){ //if between 50-100%
	    r= 'ff';
	    g = Math.round(((1 - 2*(pct-0.5))*100));
	    g = g.toString(16); //convert to hex
	  }
	  if (r === '0'){r = '00';} //set 0 to 00
	  if (g === '0'){g = '00';} //set 0 to 00
	  var htmlColorCode = '#'+r+g+b; //put color together
	  return htmlColorCode;
	};



	//////// old
	// this.getTopDishes3 = function(placeId, num){
	// 	var results = [];
	// 	var ref = new Firebase(firebaseUrl.url+'/placeList/'+$stateParams.placeId+'/dishes/');
	// 	ref.orderByChild("avgScore").limitToLast(num).on("value", function(snapshot) {
  // 	snapshot.forEach(function(data) {
  //   	console.log(data.key() , data.val());
	// 		results.push(data.val());
  // 		});
	// 	});
	// 	console.log('results:',results);
	// 	return results;
	// }



	///////  https://calendee.com/2014/09/18/use-loaded-with-firebase-and-angularfire/
	// obj.$loaded(
	// 	function(data) {
	// 		console.log(data === obj); // true
	// 	},
	// 	function(error) {
	// 		console.error("Error:", error);
	// 	}
	// );

});
