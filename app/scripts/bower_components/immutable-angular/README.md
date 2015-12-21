# Immutable Angular

Immutable Angular is a set of helpers to allow better interaction between [Immutable.js](https://github.com/facebook/immutable-js) and Angular, to be used with more than just primitive data, and to allow for more complex use cases.



# Demo

### Install

```
bower install immutable-angular --save
```

Include 'mutable' in your apps dependencies

```javascript
var sampleApp = angular.module('sampleApp', ['mutable']);
```

## Using Immutable Collections in ng-repeat

```javascript
var sampleApp = angular.module('sampleApp', ['mutable']);

function SampleCtrl($scope) {
  $scope.list = Immutable.fromJS([{name: 'Ragnar'}, {name: 'Rollo'}, {name: 'Ecbert'}]);
}

sampleApp.controller('SampleCtrl', SampleCtrl);
```

```html
<body ng-app="sampleApp" ng-controller="SampleCtrl">
<ul>
  <li ng-repeat="viking in list | mutable">
    {{viking.get('name')}}
  </li>
</ul>
<script src="/javascripts.js"></script>
</body>
```

### Result

* Ragnar
* Rollo
* Ecbert

## Using Immutable Collections or Maps in 3rd party directives, or wherever you need a mutable version on the scope

```javascript
var sampleApp = angular.module('sampleApp', ['mutable']);

function SampleCtrl($scope) {
  $scope.immutableList = Immutable.fromJS([{name: 'Ragnar'}, {name: 'Rollo'}, {name: 'Ecbert'}]);
  $scope.immutableList2 = Immutable.fromJS([{name: 'Rhaegar'}, {name: 'Tyrion'}, {name: 'Jon Snow'}])
}

sampleApp.controller('SampleCtrl', SampleCtrl);
```
### Simple syntax
```html
<body ng-app="sampleApp" ng-controller="SampleCtrl">
  <!-- Here selectize is the 3rd party directive, and it needs a mutable collection to function
  so we put our immutable list as an attribute of the immutable directive, and can then access it as 'mutable' -->
  <selectize immutable='immutableList' options="mutable">
<script src="/javascripts.js"></script>
</body>
```
### Object Syntax
If we want to specifically name our collection then it can be done in the following way

```html
<body ng-app="sampleApp" ng-controller="SampleCtrl">
  <!-- Here selectize is the 3rd party directive, and it needs a mutable collection to function
  so we put the name of our immutable collection (or map) as the key, and what we want to access it
  as, as the value -->
  <selectize immutable="{'immutableList': 'mutableList'}" options="mutableList">
<script src="/javascripts.js"></script>
</body>
```

### Object Syntax with multiple immutable datastructures 

```html
<body ng-app="sampleApp" ng-controller="SampleCtrl">
  <selectize immutable="{'immutableList': 'mutableList', 'immutableList2': 'mutableList2'}" options="mutableList" also-options="mutableList2">
<script src="/javascripts.js"></script>
</body>
```

## How it works

### mutable filter
With the way Immutable.js works, if you call .toJS() on an immutable object, it will return a new object, saved at 
a new place in memory, which is how Angularjs knows how to re-render.

The mutable filter works by memoizing the input so that if the input is the same, it wont tell ng-repeat to update.

### immutable directive
The immutable directive also only re-calculates if there has been a change to the immutable datastructure, i.e if it is new.

It then binds the mutable to the scope, for directives that need objects bound to the scope in order to function.
MIT