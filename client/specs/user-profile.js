var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'user profile', function () {
	var Login = require( '../page-objects/login.js' ),
		UserProfile = require( '../page-objects/user-profile.js' );

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'process', function () {
		var login = new Login(),
			userProfile = new UserProfile();

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'stan',
					email: 'stan@smith.com',
					password: 'Password1'
				} ),
				login.login(),
				userProfile.load()
			], _done );
		} );

		it( 'should have the logged in users details loaded in the profile page', function () {
			expect( element( userProfile.emailInput ).getAttribute( 'value' ) ).toEqual( 'stan@smith.com' );
			expect( element( userProfile.nameInput ).getAttribute( 'value' ) ).toEqual( 'stan' );
		} );

		it( 'should not show the password validation error when editing other fields', function () {
			element( userProfile.phoneInput ).sendKeys( '123' );
			expect( element( userProfile.invalidPasswordMessage ).isDisplayed() ).toBe( false );
		} );

		it( 'should show the password validation error when editing the password field', function () {
			element( userProfile.passwordInput ).sendKeys( 'wat' );
			expect( element( userProfile.invalidPasswordMessage ).isDisplayed() ).toBe( true );
		} );

		it( 'should be able to update stans name', function ( _done ) {
			element( userProfile.passwordInput ).clear();
			element( userProfile.nameInput ).clear();
			element( userProfile.nameInput ).sendKeys( 'mr stan' );
			element( userProfile.tcAgreeCheckBox ).click();
			element( userProfile.profileFormSubmitButton ).click();

			helpers.elementIsPresent( userProfile.profileFormSaved, function () {
				browser.refresh().then( function () {
					helpers.elementIsPresent( userProfile.wrapper, function () {
						expect( element( userProfile.nameInput ).getAttribute( 'value' ) ).toEqual( 'mr stan' );
						_done();
					} );
				} );
			} );

		} );

		it( 'should be able to update stans password', function ( _done ) {
			element( userProfile.passwordInput ).sendKeys( 'FransNewPassword1' );
			element( userProfile.passwordAgainInput ).sendKeys( 'FransNewPassword1' );
			element( userProfile.tcAgreeCheckBox ).click();
			element( userProfile.profileFormSubmitButton ).click();

			helpers.elementIsPresent( userProfile.profileFormSaved, function () {
				browser.refresh().then( function () {
					helpers.elementIsPresent( userProfile.logoutButton, function () {
						login.logout()( function () {
							login.login( 'stan@smith.com', 'FransNewPassword1' )( _done );
						} );
					} );
				} );
			} );
		} );

	} );

} );
