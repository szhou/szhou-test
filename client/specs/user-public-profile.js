var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'user public profile', function () {
	var Login = require( '../page-objects/login.js' );

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'process', function () {
		var login = new Login()

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'stan',
					email: 'stan@smith.com',
					username: 'stan',
					password: 'Password1'
				} )
			], _done );
		} );

		it( 'should load stans public profile', function ( _done ) {
			browser.get( config.baseUrl + '/user/stan' ).then( function () {
				element.all( by.css( 'body.error404' ) ).then( function ( _errors ) {
					expect( _errors.length ).toBe( 0 );
					_done();
				} );

			} );
		} );

		it( 'should respond with a 404 when a profile could not be found', function ( _done ) {
			browser.get( config.baseUrl + '/user/fran' ).then( function () {
				element.all( by.css( 'body.error404' ) ).then( function ( _errors ) {
					expect( _errors.length ).toBe( 1 );
					_done();
				} );

			} );
		} );

	} );

} );
