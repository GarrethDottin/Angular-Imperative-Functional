'use strict';

/**
 * @ngdoc function
 * @name angularImperativeCodebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularImperativeCodebaseApp
 */
angular.module('angularImperativeCodebaseApp')
  .controller('MainCtrl', function ($http, $scope, $location) {
  	var vm = $scope,
  		rootUrl =  "http://localhost:3000/drones",
  		firstDetailedItem = "http://localhost:3000/drones/1";

  	vm.modelNames = [];
  	vm.rowCollection = [];
  	vm.displayCollection = [];
  	vm.showModal = false;
    vm.toggleModal = function(row){
        vm.showModal = !vm.showModal;
        vm.currentModelNumber = row.get('model_number');
        vm.currentModelName = row.get('model_name');
    };


  	var detailsCall = function (id) { 
  		$http.get(rootUrl + '/' + id)
  			.success(function(data) { 
  				vm.rowCollection = Immutable.fromJS(data); 
  				vm.detailedOptions.data = Immutable.fromJS(data);
  			})
  			.error(function(data) { 
  				console.log(data);
			});
  	};

  	vm.saveDetails = function (currentModelNumber, currentModelName) { 
  		var url = 'http://localhost:3000/drones/' + currentModelNumber;
  		var data = {model_number: currentModelNumber, model_name: currentModelName};
  		$http.post(url, data)
  			.success(function() { 
  				vm.showModal = false;
  			});
  	};



	var anonymous  = function (input) { return input };
	var modifyData1 = function(input, drone) { 
		return {model_name: input + drone.get('model_name'), model_number: drone.get('model_number')}
	};
	var modifyData2 = R.partial(modifyData1, ["The Original"]);


	vm.parsedData = R.compose(anonymous, modifyData2);

  	$http.get(rootUrl)
  		.success(function(data){ 
  			vm.rowCollection = Immutable.fromJS(data);
  			$http.get(firstDetailedItem).success(function(data){ 
  				vm.detailCollection = Immutable.fromJS(data);
  			});
  		});


  });
