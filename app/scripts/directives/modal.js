'use strict';

/**
 * @ngdoc directive
 * @name angularImperativeCodebaseApp.directive:modal
 * @description
 * # modal
 */
angular.module('angularImperativeCodebaseApp')
  .directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ buttonClicked }} Edit Details</h4>' + 
              '</div>' + 
            	'<div class="modal-body">' + 
            	'<h4>Model Number</h4> <br>' + 
            	'<input type="text" ng-model="currentModelNumber"/>' + 
            	'<br> <h4> Model Name</h4>' + 
            	'<input type="text" ng-model="currentModelName"/>' + 
            	'<br> <button ng-click="updateDetails(currentModelNumber, currentModelName)"> Save</button>' + 
            	'</div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });
      }
    };
  });
