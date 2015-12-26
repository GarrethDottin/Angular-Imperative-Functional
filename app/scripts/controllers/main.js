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

  	vm.createCall = function(modelName, modelNumber) {
  		var postUrl = 'http://localhost:3000/drones';
  		var data = { 
  			model_number: modelNumber, 
  			model_name: modelName
  		};
  		return $http.post(postUrl, JSON.stringify(data))
  			.success(function(data) {
  				var modifiedData = Immutable.fromJS(data);
  				vm.rowCollection = vm.rowCollection.push(modifiedData);
  			});
  	}; 


	var anonymous = function (input) { return input };
	var formatObj = function(input, drone) { 
		var immutableObj = {model_name: input + drone.get('model_name'), model_number: drone.get('model_number')};
		return Immutable.fromJS(immutableObj);
	};
	var modifyName = R.partial(formatObj, ["The Original "]);


	vm.parsedData = R.compose(anonymous, modifyName);

  	$http.get(rootUrl)
  		.success(function(data){ 
  			var immutableData = Immutable.fromJS(data);
  			vm.rowCollection = immutableData.map(vm.parsedData)
  			$http.get(firstDetailedItem).success(function(data){ 
  				vm.detailCollection = Immutable.fromJS(data);
  			});
  		});


  });
