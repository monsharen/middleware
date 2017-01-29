var middlewareApp = angular.module('middlewareApp', ["ngAlertify"]);

middlewareApp.controller('MiddlewareController', ['$scope', '$http', '$location', 'alertify', 'authService', 
	function($scope, $http, $location, alertify, authService) {

	var ctrl = this;
	this.authenticationToken = "";

	this.login = function() {
		authService.authenticate();
	};

	authService.isUserAuthenticated(
		function (token) {
			console.log("user is authenticated");
			ctrl.authenticationToken = token;
		},
		function () {
			console.log("user is not authenticated");
		}
	);
	
}]);