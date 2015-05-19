/**
 * Test Globals
 */
global._ = require( 'underscore' );
global.async = require( 'async' );
global.path = require( 'path' );
global.includeAll = require( 'include-all' );
global.request = require( 'request' ).defaults( {
	json: true,
	jar: true
} );

global.test = {
	setup: require( './setup' ),
	tearDown: require( './tearDown' )
};

global.helpers = includeAll( {
	dirname: path.join( __dirname, 'helpers' ),
	filter: /(.+)\.js$/
} );

/**
 * Config
 */
exports.config = global.config = {

	framework: 'jasmine2',

	specs: [
		path.join( __dirname, 'specs/login.js' )
	],

	seleniumAddress: process.env.SELENIUM_ADDRESS,

	// A base URL for your application under test.
	baseUrl: 'http://' + (process.env.HTTP_HOST || 'brant.qe.eng.iix.net') + ':' + (process.env.PORT || '3000'),
	baseApiUrl: process.env.API_BASE_URL || 'http://api.brant.qe.eng.iix.net',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': (process.env.TEST_BROWSER_NAME || 'chrome'),
		'version': (process.env.TEST_BROWSER_VERSION || 'ANY')
	},

	jasmineNodeOpts: {
		print: function () {
		}
	},

	onPrepare: function () {
		var SpecReporter = require( 'jasmine-spec-reporter' );
		jasmine.getEnv().addReporter( new SpecReporter( { displayStacktrace: true } ) );
	}

};
