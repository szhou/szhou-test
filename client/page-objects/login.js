module.exports = function () {
	var self = this;

	self.username = by.model( 'login.data.user.email' );
	self.password = by.model( 'login.data.user.password' );
	self.loginFormSubmitButton = by.css( 'form[name=loginForm] button[type=submit]' );
	self.logoutButton = by.css( '.logout.button' );
	self.searchInput = by.model( 'login.data.search' );
	self.searchResults = by.css( '.ui.search .visible.results' );
	self.searchResultItems = by.css( '.ui.search .visible.results .result' );
	self.searchResultFirstItem = by.css( '.ui.search .visible.results .result:first-child' );
	self.searchButton = by.css( '.ui.search .primary.button' );

	self.login = function ( _username, _password ) {
		return function () {
			var cb = _.last( arguments );

			element( self.username ).sendKeys( _username || 'stan@smith.com' );
			element( self.password ).sendKeys( _password || 'Password1' );
			element( self.loginFormSubmitButton ).click();

			helpers.elementIsPresent( self.logoutButton, cb );
		};
	};

	self.load = function () {
		return function () {
			var cb = _.last( arguments );
			browser.get( config.baseUrl ).then( cb );
		};
	};

	self.logout = function () {
		return function () {
			var cb = _.last( arguments );

			element( self.logoutButton ).click();

			helpers.elementIsPresent( self.loginFormSubmitButton, cb );
		};
	};

	self.register = function ( _user ) {
		return function () {
			var cb = _.last( arguments );

			request.put( config.baseApiUrl + '/api/user', {
				body: _user
			}, function ( _error ) {
				_.isFunction( cb ) && cb( _error );
			} );
		};
	};

};