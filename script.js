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

	this.send = function() {
		window.location.href = "https://monsharen.github.io/middleware/mockserver.html#/access_token=" + ctrl.authenticationToken;
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



var middlewareServerApp = angular.module('middlewareServerApp', []);

middlewareServerApp.controller('MiddlewareServerController', ['$scope', '$http', '$location', 
	function($scope, $http, $location) {

	var ctrl = this;

	this.phoneNumber = "07428378687";
	this.requests = {};
	this.requests.addcall = { url: "https://eu11.salesforce.com/services/data/v20.0/sobjects/task/", method: "POST", body: "", headers: {} };
	this.requests.addcall.body = {"WhatId": this.phoneNumber, "Description": "This is a call from Thomas", "ActivityDate": "2014-11-20T14:23:44.000+0000", "Priority": "Normal", "Subject": "Call", "Status": "Completed"};

	this.getHashParams = function() {

	    var hashParams = {};
	    var e,
	        a = /\+/g,  // Regex for replacing addition symbol with a space
	        r = /([^&;=]+)=?([^&;]*)/g,
	        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	        q = window.location.hash.substring(1);

	    while (e = r.exec(q))
	       hashParams[d(e[1])] = d(e[2]);

	    return hashParams;
	};

	this.sendRequest = function(request) {
		$.ajax({
		    url: request.url,
		    type: request.method,
		    data: JSON.stringify(request.body),
		    contentType: "application/json",
		    headers: {
				"Authorization": "Bearer " + ctrl.authenticationToken
		    },
		    jsonp: "callback",
		    dataType: 'jsonp',
		    processData: false,
		    success: function (data) {
		    	console.log("request successfully sent");
		        console.info(data);
		    }
		});
	};

	this.extensionIds = ["1234"];
	this.authenticationToken = this.getHashParams()["/access_token"];
	
}]);