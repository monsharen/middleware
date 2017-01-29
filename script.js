var recipeApp = angular.module('recipeApp', ["ngAlertify"]);

recipeApp.controller('RecipeController', ['$scope', '$http', '$location', 'alertify', 'dropboxService', 'authService', 
	function($scope, $http, $location, alertify, dropboxService, authService) {

	var ctrl = this;
	this.$scope = $scope;
	this.searchResults = [];
	this.searchQuery = "";

	this.authenticationToken = "";
	this.loadingIndicators = 0;
	this.recipes = null;

	this.captureKeyPress = function(keyId) {
		if (keyId === 27) {
			ctrl.clearSearch();
		}
	};

	this.clearSearch = function() {
		this.searchQuery = "";
		this.searchResults = [];
	};

	this.showLoading = function() {
		ctrl.loadingIndicators++;
		console.log("showLoading. at " + ctrl.loadingIndicators);
	};

	this.hideLoading = function() {
		ctrl.loadingIndicators--;
		console.log("hideLoading. at " + ctrl.loadingIndicators);
	}

	this.refresh = function() {

		ctrl.showLoading();
		
		dropboxService.getData(ctrl.authenticationToken,
			function(data) {
				ctrl.recipes = data;
				ctrl.currentlySelectedList = 0;
			},
			function(error) {
				console.log("request failed: ");
				console.log(error);

				if ((error.status && error.status == 404) && (error.statusText && error.statusText == 'Not Found')) {
					console.log("data file do no yet exist. creating empty list");
					ctrl.recipes = dropboxService.getEmptyFile();
					console.log(ctrl.recipes);
					alertify.success("Hello there! A new file have been created on your dropbox account containing all of your data. It will automatically get updated when you make changes to your lists.");
				} else {
					alertify.error("Failed to load file from Dropbox account: " + error);
				}
			},
			function() {
				ctrl.hideLoading();
			}
		);
	};

	this.upload = function() {
		ctrl.showLoading();
		
		dropboxService.upload(ctrl.authenticationToken, ctrl.recipes,  
			function(response) {
				console.log("upload successful");
				console.log(response);
				alertify.success("Changes saved.");
			},
			function(error) {
				console.log("request failed: ");
				console.log(error);
				alertify.error("Failed to save changes to Dropbox: " + error);
			},
			function() {
				ctrl.hideLoading();
			}
		);
	};

	this.login = function() {
		authService.authenticate();
	};

	authService.isUserAuthenticated(
		function (token) {
			console.log("user is authenticated");
			ctrl.authenticationToken = token;
			ctrl.refresh();
		},
		function () {
			console.log("user is not authenticated");
		}
	);
	
}]);