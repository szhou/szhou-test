var config = require( process.cwd() + '/test/client/config' ).config;

describe( 'login', function () {
	var Login = require( '../page-objects/login' ),
		SearchResults = require( '../page-objects/search-results' );

	var login = new Login(),
		searchResults = new SearchResults();

	beforeAll( test.setup );
	afterAll( test.tearDown );

	describe( 'process', function () {

		beforeAll( function ( _done ) {
			async.waterfall( [
				login.load(),
				login.register( {
					name: 'stan',
					email: 'stan@smith.com',
					password: 'Password1',
					username: 'stansmith'
				} ),
				login.register( {
					name: 'fran',
					email: 'fran@smith.com',
					password: 'Password1',
					username: 'fransmith'
				} ),
				login.register( {
					name: 'steve',
					email: 'steve@smith.com',
					password: 'Password1',
					username: 'stevesmith'
				} ),
				login.register( {
					name: 'hayley',
					email: 'hayley@smith.com',
					password: 'Password1',
					username: 'hayleysmith'
				} )
			], _done );
		} );

		it( 'should show results below the search input when text is entered into the search input', function ( _done ) {
			element( login.searchInput ).sendKeys( 'st' );
			helpers.elementIsPresent( login.searchResults, function () {
				element.all( login.searchResultItems ).then( function ( _items ) {
					expect( _items.length ).toBe( 2 );
					_done();
				} );
			} );
		} );

		it( 'should show a public page when clicking on a result', function ( _done ) {
			element( login.searchResultFirstItem ).click().then( function () {
				element.all( by.css( 'body.error404' ) ).then( function ( _errors ) {
					expect( _errors.length ).toBe( 0 );
					_done();
				} );
			} );
		} );

		it( 'should be able to search by clicking the search button to show the full results', function ( _done ) {
			browser.get( config.baseUrl ).then( function () {
				element( login.searchInput ).sendKeys( 'smith' );
				element( login.searchButton ).click().then( function () {
					helpers.elementIsPresent( searchResults.results, function () {
						element.all( login.searchResultItems ).then( function ( _items ) {
							expect( _items.length ).toBe( 4 );
							_done();
						} );
					} );
				} );

			} );

		} );

	} );

} );
