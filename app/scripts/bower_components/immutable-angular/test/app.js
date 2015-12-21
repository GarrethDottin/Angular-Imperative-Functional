(function(){
'use strict'

angular.module('immutable', ['mutable'])
  .controller("sampleCtrl", ['$scope', '$timeout', 'mutableFilter',function($scope, $timeout, mutableFilter){
    var vm = $scope
    $scope.immutableList = Immutable.fromJS([{name: 'Ragnar'}, {name: 'Rollo'}, {name: 'Ecbert'}]);
    $scope.mutableListWithImmutables = [Immutable.fromJS({name: 'Ragnar'}),Immutable.fromJS({name: 'Rollo'}),Immutable.fromJS({name: 'Ecbert'})]
    
    $timeout(function(){
      console.log($scope.immutableList)
      $scope.immutableList = $scope.immutableList.push({name: "Bjorn"})
      console.log("Bjorn")
    }, 3000)

  }])
  .config(function($provide){
    var mutableFilter
    $provide.decorator('ngRepeatDirective', function($delegate, $parse){
      var directive = $delegate[0]

      var compile = directive.compile

      directive.compile = function(tElement, tAttrs){
        $parse
        var link = compile.apply(this, arguments);

        return function(scope, element, attrs){

          var expression = attrs.ngRepeat;
          var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
          var rhs = match[2]
          var list = $parse(rhs)(scope);

          if(list && list instanceof Immutable.Collection) {
            scope.$watch(list, function(){
              var list = $parse(rhs)(scope).toJS() 
              scope[rhs] = list        
            })
          }

          link.apply(this, arguments);
        }
      }
      return $delegate
    })
  })
})()