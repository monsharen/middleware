middlewareApp.service('authService', ['$http', function($http) {

	var authService = this;

	//this.clientId = "3MVG9HxRZv05HarS3rJRxFkgo18MPaBPiBc4cpBo46lwG_9z5cVFWoSPOu82oF2YyJdSMPee5PLEXuWwd4bNv";
	this.clientId = "9fa80a44-17ae-4f99-bf5f-7e11296d1bb1";
	this.redirectUri = "https://monsharen.github.io/middleware";
	this.responseType = "token";

	this.authenticate = function() {
		var url = authService.getAuthenticationUrl();
		window.location.href = url;
	};
	

	this.getAuthenticationUrl = function() {
		/* return 'https://login.salesforce.com/services/oauth2/authorize?' + 
			'response_type=' + authService.responseType + 
			'&client_id=' + authService.clientId + 
			"&redirect_uri=" + authService.redirectUri;
			*/
		return 'https://login.mypurecloud.ie/oauth/authorize?' + 
			'response_type=' + authService.responseType + 
			'&client_id=' + authService.clientId + 
			"&redirect_uri=" + authService.redirectUri;
	};

	this.isUserAuthenticated = function(onSuccess, onError) {
		var params = authService.getHashParams();
		var authToken = params["/access_token"];

		if (authToken != null) {
			onSuccess(authToken);
		} else {
			onError();
		}
	};

	this.getUrlParams = function() {
		var urlParams = document.location.search.split('+').join(' ');

		var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(urlParams)) {
			params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		}
		return params;
	};

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
