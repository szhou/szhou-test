var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'logout', function () {
	var Login = require( '../page-objects/login' );

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'process', function () {
		var login = new Login();

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					email: 'stan@smith.com',
					password: 'Password1'
				} ),
				login.login()
			], _done );
		} );

		it( 'should log the user out and redirect back to the login page', function ( _done ) {
			async.waterfall( [
				login.logout(),
				function ( _next ) {
					expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/' );
					_next();
				}
			], _done );
		} );

	} );

} );
