var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'login', function () {
	var Dashboard = require( '../page-objects/dashboard.js' ),
		Login = require( '../page-objects/login.js' );

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'as a data center operator', function () {
		var dashboard = new Dashboard(),
			login = new Login();

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'stan',
					email: 'stan@smith.com',
					role: 'DATA_CENTER_OPERATOR',
					password: 'Password1'
				} ),
				login.login()
			], _done );
		} );


		afterAll( function ( _done ) {
			async.waterfall( [
				login.logout()
			], _done );
		} );

		it( 'should load the data center operators dashboard', function () {
			expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/dashboard' );
			expect( element( dashboard.dataCenterOperatorRoleWrapper ).isPresent() ).toBe( true );
		} );

	} );

	describe( 'as an enterprise user', function () {
		var dashboard = new Dashboard(),
			login = new Login();

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'fran',
					email: 'fran@smith.com',
					password: 'Password1'
				} ),
				login.login( 'fran@smith.com' )
			], _done );
		} );

		it( 'should load the enterprise users dashboard', function () {
			expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/dashboard' );
			expect( element( dashboard.enterpriseRoleWrapper ).isPresent() ).toBe( true );
		} );

	} );

	describe( 'as a user without a role', function () {
		var dashboard = new Dashboard(),
			login = new Login();

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'hayley',
					email: 'hayley@smith.com',
					password: 'Password1'
				} ),
				login.login( 'hayley@smith.com' )
			], _done );
		} );

		it( 'should load the enterprise users dashboard', function () {
			expect( browser.getCurrentUrl() ).toEqual( config.baseUrl + '/dashboard' );
			expect( element( dashboard.enterpriseRoleWrapper ).isPresent() ).toBe( true );
		} );

	} );

} );
