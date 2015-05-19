var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'company public profile', function () {
	var Login = require( '../page-objects/login.js' );

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'process', function () {

		// TODO: uncomment when companies are complete
		//it( 'should load the fbi companies public profile', function ( _done ) {
		//	browser.get( config.baseUrl + '/company/fbi' ).then( function () {
		//		element.all( by.css( 'body.error404' ) ).then( function ( _errors ) {
		//			expect( _errors.length ).toBe( 0 );
		//			_done();
		//		} );
		//
		//	} );
		//} );

		it( 'should respond with a 404 when a company profile could not be found', function ( _done ) {
			browser.get( config.baseUrl + '/company/cia' ).then( function () {
				element.all( by.css( 'body.error404' ) ).then( function ( _errors ) {
					expect( _errors.length ).toBe( 1 );
					_done();
				} );

			} );
		} );

	} );

} );
