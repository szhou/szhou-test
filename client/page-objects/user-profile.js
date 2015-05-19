module.exports = function () {
	var self = this;

	self.wrapper = by.css( '.profile.wrapper.ready' );
	self.emailInput = by.model( 'self.data.profile.email' );
	self.nameInput = by.model( 'self.data.profile.name' );
	self.invalidPasswordMessage = by.css( '.yellow.invalid-password.message' );
	self.phoneInput = by.model( 'self.data.profile.phone' );
	self.passwordInput = by.model( 'self.data.profile.password' );
	self.passwordAgainInput = by.model( 'self.data.profile.passwordAgain' );
	self.profileForm = by.css( 'form[name=profileForm]' );
	self.tcAgreeCheckBox = by.css( 'form[name=profileForm] .ui.terms-agreed.checkbox' );
	self.profileFormSaved = by.css( 'form[name=profileForm].saved' );
	self.profileFormSubmitButton = by.css( 'form[name=profileForm] .ui.button[type=submit]' );
	self.logoutButton = by.css( '.logout.button' );

	self.load = function () {
		return function () {
			var cb = _.last( arguments );

			browser.get( config.baseUrl + '/dashboard/profile' ).then( function () {
				helpers.elementIsPresent( self.wrapper, cb );
			} );
		};
	};

};