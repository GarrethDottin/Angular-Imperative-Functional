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
                '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' + 
              '</div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      replace:true,
      transclude: true, 
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.title = "Hit";
          scope.$watch(attrs.visible, function(value){
          if(value == true) {
            $(element).modal('show');
          }
          else {
            $(element).modal('hide');
          }
        });
      }
    };
  });
