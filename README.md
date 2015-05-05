# angular-laravel-pagination
An angular module for easy server side pagination. Hooks directly into laravel's paginate function.

Usage
------

Simply include the module 'Paginator', it will give you access to the '\<paginate>\</paginate>' directive.
This directive takes two attributes 'data', 'url'.

```
data - the variable on the scope which is repeated using ng-repeat
url - the api endpoint
```

example:

```
<ul>
  <li ng-repeat="user in data"> {{user.name}} - {{user.email}}</li>
</ul>

<paginate data="data" url="url"></paginate>

<script>
		angular.module('TestApp', ['ngResource', 'Paginator'])
		  .controller('MainCtrl', ['$scope', function ($scope) {
		  	$scope.url = 'http://tool.gensplash.com/users';
		  }]);

</script>
```
