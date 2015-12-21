(function () {
  "use strict";
  var memoize = require('memoizee');
  
  angular.module("mutable", [])
    .filter("mutable", [mutableFilter])
    .filter("toJS", [toJS])
    .filter("memoize", [memoizeFilter])
    .directive("immutable", ["$parse", immutableDirective]);

  function mutableFilter() {
    function toMutable(js) {
      return js.toArray();
    };
    var memoizedMutable = memoize(toMutable, 10);

    return function (val) {
      if (val && typeof val.toArray === "function"){
        return memoizedMutable(val);
      }
      return val;
    };
  };

  function toJS() {
    function toMutable(js) {
      return js.toJS()
    };
    var memoizedMutable = memoize(toMutable, 10);

    return function (val) {
      if (val && typeof val.toJS === "function"){
        return memoizedMutable(val);
      }
      return val;
    };
  };

  function immutableDirective ($parse) {
    return {
      restrict: "EA",
      link: function link(scope, element, attrs) {
        // Check if simple or object syntax
        if (attrs.immutable.indexOf("{") > -1) {
          (function () {
            var object = $parse(attrs.immutable)();
            angular.forEach(Object.keys(object), function (key) {
              scope.$watch(function () {
                return $parse(key)(scope);
              }, function (val) {
                if (val) {
                  scope[object[key]] = val.toJS();
                }
              });
            });
          })();
        } else {
          scope.$watch(function () {
            return $parse(attrs.immutable)(scope);
          }, function (val) {
            if (val) {
              scope.mutable = val.toJS();
            }
          });
        }
      }
    };
  };

  function memoizeFilter(){
    
    function memoizer(input){
      return input;
    }
    var memoizedMemoizer = memoize(memoizer, 10);
    
    return function(toBeMemoized){
      return memoizedMemoizer(toBeMemoized);
    }
  }

  
})();