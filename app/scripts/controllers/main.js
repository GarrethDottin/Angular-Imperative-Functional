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
  		rootUrl =  "http://localhost:3000/drones";

    vm.modelNames = [];
    vm.rowCollection = [];
    vm.displayCollection = [];
    vm.showModal = false;
    allItems();

    vm.toggleModal = function(row){
        vm.showModal = !vm.showModal;
        vm.currentModelNumber = row.get('model_number');
        vm.currentModelName = row.get('model_name');
    };

    var anonymous = function (input) { return input };

    var formatObj = function(input, drone) { 
    	var immutableObj = {model_name: input + drone.get('model_name'), 
      model_number: drone.get('model_number')};
    	return Immutable.fromJS(immutableObj);
    };

    var modifyName = R.partial(formatObj, ["The Original "]);


  	vm.parsedData = R.compose(anonymous, modifyName);

  	function setTable (obj) {
  		var immutableData = Immutable.fromJS(obj.data); 
  		vm.rowCollection = immutableData.map(vm.parsedData);
  	}; 


	  //http calls 
  	vm.updateDetails = function (currentModelNumber, currentModelName) {
    	var url = 'http://localhost:3000/drones/' + currentModelNumber;
    	var data = {model_number: currentModelNumber, model_name: currentModelName};
    	$http.post(url, data)
    		.then(vm.toggleModal);
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

  	function firstDetailCall() {
  		var firstDetailedItem = "http://localhost:3000/drones/1";
  		return $http.get(firstDetailedItem).then(function(obj) { 
  			vm.detailCollection = Immutable.fromJS(obj.data);
  		});
  	}; 

  	// All Items
  	function allItems () { 
  		return $http.get(rootUrl)
  			.then(setTable)
  			.then(firstDetailCall);
  	}; 

    function showUserProfile() { 
      var userProfile = 'http://localhost:3000/user/laars'
      return $http.get(userProfile)
        .then(generalUser)
        .then(detailUser)
    };
    function generalUser (response) { 
      var id = response.data.id;
      var userDetails = 'http://localhost:3000/user/details/'+ id;
      // vm.userName = response.name;
      // vm.details.url = response.url;
      return $http.get(userDetails)
    }; 

    function detailUser (response) {
    // vm.details.bio = response.bio; 
    // vm.details.roleType = response.role;
    // var profileDetails = 'http://localhost:3000/role/' + response.role; 
      console.log(response)
    };

    function roleInformation (response) { 


    };

    // var userProfile = 'http://localhost:3000/user/laars'
    //     $.get(userDetails, function (response, err) {
    //       vm.details.bio = response.bio; 
    //       vm.details.roleType = response.role;
    //       var profileDetails = 'http://localhost:3000/role/' + response.role;
    //       // Display userProfile info 
          
    //       $.get(profileDetails, function (response, err) {
    //         vm.details.role = response.admin;
    //       });
    //     }); 

    //   });
    // };

    showUserProfile();
    function userDetails (response, err) {
      var userDetails = 'http://localhost:3000/user/details/'+ id;
      return $http.get(userDetails)
      var userDetails = 'http://localhost:3000/user/details/'+ id;
      vm.details.bio = response.bio; 
      vm.details.roleType = response.role;
      var profileDetails = 'http://localhost:3000/role/' + response.role;

          // Display userProfile info 

    };

  });