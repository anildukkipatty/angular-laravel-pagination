(function () {
	'use strict';
	
	angular.module('Paginator', [])
	.factory('Objects', ['$resource', function ($resource) {
			var resource = null;
			var current = 1;
			var last = 1;
			return {
				setUrl: function (url) {
					resource = $resource(url + '/:id', null, {all: {method: 'get'}});
				},
				all: function (page) {
					if (!page) page = 1;
					return resource.all({page: page}).$promise
						.then(function (data) {
							current = data.current_page;
							last = data.last_page;
							return data.data;
						});
				},
				next: function () {
					if (current == last) return current;
					return ++current;
				},
				previous: function () {
					if (current == 1) return current;
					return --current;
				},
				current: function () {
					return current;
				},
				last: function () {
					return last;
				}
			}
		}])
	.directive('paginate', ['Objects', function (Objects) {
		return {
			restrict: 'E',
			template: '<button ng-click="previous()" class="btn btn-xs btn-default">&laquo Previous</button> <button ng-click="next()" class="btn btn-xs btn-default">Next &raquo</button> <select ng-change="change()" ng-model="current"  ng-options="r as r for r in range"></select> ',
			scope: {
				url: '=',
				data: '='
			},
			link: function ($scope, el, attrs) {
				if (!$scope.url) {
					alert('Please provide resource URL');
					return false;
				}
				Objects.setUrl($scope.url);
				Objects.all()
					.then(function (data) {
						render(data);
					});
				$scope.next = function () {
					Objects.all(Objects.next()).then(function (data) { render(data); });
				}

				$scope.previous = function () {
					Objects.all(Objects.previous()).then(function (data) { render(data); });
				}

				$scope.change = function () {
					if (Objects.current() == $scope.current) return;
					Objects.all($scope.current).then(function (data) { render(data); });
				}

				function render(data) {
					$scope.data = data;
					$scope.current = Objects.current();
					$scope.range = _.range(1, Objects.last()+1);
				}
			}
		};
	}])
	
}());