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
  	$location.$$port = 3000;

  	vm.modelNames = [];
  	vm.showModal = false;
  	$scope.showModal = false;
    $scope.toggleModal = function(row){
    	$scope.showModal = true;
        // vm.showModal = !vm.showModal;
    };

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
  	}
  	]; 

  	vm.detailedOptions = {};
  	vm.detailedOptions.data;
  	vm.gridOptions = {}
  	vm.gridOptions.enableRowSelection = true;
  	vm.gridOptions.columnDefs = [{
        name: 'modelNumber',
        field: 'model_number'
    }, {
        name: 'Model Name',
        field: 'model_name'
    }, 
    { 
    	name: 'Edit', 
    	field: 'edit', 
    	cellTemplate: '<a href="#" ng-click="grid.appScope.toggleModal(row)"> Edit</a>'
    }
    ];

    vm.gridOptions.onRegisterApi = function (data) { 
		data.selection.on.rowSelectionChanged(vm,function(row){
			var currentRow = this.grid.selection.lastSelectedRow;
			this.selection.clearSelectedRows(); 
			currentRow.isSelected = true; 
			detailsCall(currentRow.entity.model_number);
			// Call the current row with a http call 
			// 
      	});
    };

  	var parser = { 
  		changemodelNames: function(modelNames) { 
  			for (var i = 0; i < modelNames.length; i++) { 
  				vm.modelNames[i].model_name = "The Original " + vm.modelNames[i].model_name;
  			}
  			vm.gridOptions.data = vm.modelNames;
  		}
  	}; 



  	vm.editClicked = function(drone) { 
  		// Make an impure function 
  		// Make it similar to delete and dont use partial application 
  	};

  	vm.deleteClicked = function () { 
  		//
  		// 
  	}; 

  	var detailsCall = function (id) { 
  		$http.get(rootUrl + '/' + id)
  			.success(function(data) { 
  				vm.detailedOptions.data = data;
  			})
  			.error(function(data) { 
  				console.log(data);
			});
  	};

  	$http.get(rootUrl)
  		.success(function(data){ 
  			vm.gridOptions.data = data;
  			$http.get(firstDetailedItem).success(function(data){ 
  				vm.detailedOptions.data = data;
  			});
  		});


  });
