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

	$.ajax({
	    url: 'https://url.com',
	    type: 'post',
	    data: {
	        access_token: 'XXXXXXXXXXXXXXXXXXX'
	    },
	    headers: {
	        Header_Name_One: 'Header Value One',   //If your header name has spaces or any other char not appropriate
	        "Header Name Two": 'Header Value Two'  //for object property name, use quoted notation shown in second
	    },
	    dataType: 'json',
	    success: function (data) {
	        console.info(data);
	    }
	});
	
}]);



var middlewareServerApp = angular.module('middlewareServerApp', []);

middlewareServerApp.controller('MiddlewareServerController', ['$scope', '$http', '$location', 
	function($scope, $http, $location) {

	var ctrl = this;
	this.extensionIds = ["1234"];
	this.authenticationToken = getHashParams()["/access_token"];

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
	
}]);