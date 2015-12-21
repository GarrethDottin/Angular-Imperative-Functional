(()=>{
  'use strict'
  var memoize = require('memoizee');

  var mutableFilter = (function() {
    function toMutable(js){
      return js.toJS()
    };
    var memoizedMutable = memoize(toMutable);

    return (function(val) {
      if (val instanceof Immutable.Collection) {
        return memoizedMutable(val);
      }
      return val;
    });
  });

  var immutableDirective = ($parse)=>{
    return {
      restrict: 'EA',
      link: function(scope, element, attrs){
        // Check if simple or object syntax
        if(attrs.immutable.indexOf("{") > -1){
          let object = $parse(attrs.immutable)()
          angular.forEach(Object.keys(object), (key)=>{
            scope.$watch(()=>{
              return $parse(key)(scope)
            }, (val)=>{
              if(val){
                scope[object[key]] = val.toJS()
              }
            })
          })
        } else {
          scope.$watch(()=>{
            return $parse(attrs.immutable)(scope)
          }, (val) => {
            if(val){
              scope.mutable = val.toJS();
            }
          });
        }
      }
    }
  }

  angular.module('mutable', []).
  filter('mutable', [mutableFilter]).
  directive('immutable', ['$parse',immutableDirective])
})()