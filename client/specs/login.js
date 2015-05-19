var config = require( process.cwd() + '/config' ).config;

describe( 'login', function () {
	var Login = require( '../page-objects/login' );

//	beforeAll( test.setup );
//	afterAll( test.tearDown );

	describe( 'process', function () {
		var login = new Login();

		it( 'should load the login page', function ( _done ) {
			async.waterfall( [
				login.load()
			], function () {
				expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/' );
				_done();
			} );
		} );

		it( 'should have a username field that is empty', function () {
			expect( element( login.username ).getAttribute( 'value' ) ).toBe( '' );
		} );

		it( 'should have a password field that is empty', function () {
			expect( element( login.password ).getAttribute( 'value' ) ).toBe( '' );
		} );

		it( 'should be able to login and redirect to a landing page', function ( _done ) {
			async.waterfall( [
				login.register( {
					email: 'stan@smith.com',
					password: 'Password1'
				} ),
				login.login()
			], function () {
				expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/dashboard' );
				_done();
			} );
		} );

	} );

} );
