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
  	var vm, 
  		rootUrl =  "http://localhost:3000/drones",
  		firstDetailedItem = "http://localhost:3000/drones/1";
  	$location.$$port = 3000;

  	vm = $scope; 
  	vm.ModelNames = [];

  	/// Table Configurations
  	vm.detailedOptions = {};
  	vm.detailedOptions.columnDefs = [{ 
  		name: "year", 
  		field: "year", 

  	},
  	{
  		name: "description", 
  		field: "description"

  	}, 
  	{
  		name: "name",
  		field: "name"

  	},
  	{ 
		name: "price",
  		field: "price"

  	}, 
  	{ 
  		name: "range", 
  		field: "range"
  	}]; 
  	
  	vm.detailedOptions.data;
  	vm.gridOptions = {}; 
  	vm.gridOptions.columnDefs = [{
        name: 'modelNumber',
        field: 'model_number'
    }, {
        name: 'lastNamer',
        field: 'model_name'
    }];


  	var parser = { 
  		changeModelNames: function(ModelNames) { 
  			for (var i = 0; i < ModelNames.length; i++) { 
  				vm.ModelNames[i].model_name = "The Original " + vm.ModelNames[i].model_name;
  			}
  			vm.gridOptions.data = vm.ModelNames;
  		}, 
  		displayFirstUser: function(model) {

  		}


  	}

  	$http.get(rootUrl)
  		.success(function(data){ 
  			vm.gridOptions.data = data;
  			$http.get(firstDetailedItem).success(function(data){ 
  				vm.detailedOptions.data = data;
  			});
  		});


  });
