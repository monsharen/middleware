var middlewareApp = angular.module('middlewareApp', ["ngAlertify"]);

middlewareApp.controller('MiddlewareController', ['$scope', '$http', '$location', 'alertify', 'authService', 
	function($scope, $http, $location, alertify, authService) {

	var ctrl = this;
	this.extensionId = "";
	this.extensionIds = [];
	this.authenticationToken = "";

	this.login = function() {
		authService.authenticate();
	};

	this.addExtensionId = function() {
		if (ctrl.extensionId != "") {
			ctrl.extensionIds.push(ctrl.extensionId);
		}		
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