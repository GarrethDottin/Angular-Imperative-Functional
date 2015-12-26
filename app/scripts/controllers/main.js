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


  	// Edit Modal 
  	$scope.showModal = true;
    vm.toggleModal = function(row){
    	$scope.showModal = !$scope.showModal;
    	return editFunction(row);

    };

    function editFunction (row) { 
    	$scope.name = row.entity.model_name;
    	$scope.model_number = row.entity.model_number;
    };


  	// Table Configurations
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
    }];

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

    // 

  	// HTTP Calls 
  	var editCall = function (data) {
  		$.post('http://localhost:3000/drones/' + data.modelNumber, data, function(data) { 
  			return data; 
  		});
  	};

  	vm.createCall = function(modelName, modelNumber) {
  		var postUrl = 'http://localhost:3000/drones'
  		var data = { 
  			model_number: modelNumber, 
  			model_name: modelName
  		};
  		$.post(postUrl, JSON.stringify(data), function(data) { 
  			vm.gridOptions.data.push(data);
  		});
  	}; 

  	var detailsCall = function (id) {
  		$.get(rootUrl + '/' + id, function() { 
  			vm.detailedOptions.data = data;
  		})
  	};


  	var type = "The Original ";
  	var parseObj = function (obj) { 
  		for (var i = 0; i < obj.length; i++) { 
  			obj[i].model_name = type + obj[i].model_name;
  		};
  		return obj;
  	};

  	$.get(rootUrl, function(data) { 
  		vm.gridOptions.data = parseObj(data);
  		$.get(firstDetailedItem).then(function(data){
  			vm.detailedOptions.data = data;
  		});
  	})
  		// .success(function(data){
  		// 	vm.gridOptions.data = parseObj(data);
  		// 	$http.get(firstDetailedItem).then(function(data){
  		// 		vm.detailedOptions.data = data;
  		// 	});
  		// });
});