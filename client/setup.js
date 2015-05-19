module.exports = function ( _done ) {
	var tearDown = require( './tearDown.js' );

	async.waterfall( [

		// Start the app & server
		function ( _next ) {
			if ( global.serverRunning ) return _next();
			global.serverRunning = true;

			require( path.join( process.cwd(), 'bin/grailed' ) );

			global.grailed.once( 'ready', function () {
				_next();
			} );
		},

		// Start the api server
		function ( _next ) {
			var child_process = require( 'child_process' ),
				request = require( 'request' ),
				clc = require( 'cli-color' ),
				_ = require( 'underscore' );

			if ( global.backendServer ) {
				return _next();
			}

			var cwd = process.cwd(),
				env = _.clone( process.env ),
				program;

			env.NODE_ENV = 'test';
			env.PORT = '8889';
			env.GRAILED_PATH_GRAILED = path.join( cwd, 'node_modules/grailed' );
			env.GRAILED_PATH_API = path.join( cwd, 'node_modules/@iixlabs/portal-node-api/src/api/' );
			env.GRAILED_PATH_CONFIG = path.join( cwd, 'node_modules/@iixlabs/portal-node-api/config' );

			global.backendServer = program = child_process.spawn(
				'node', [ './node_modules/@iixlabs/portal-node-api/bin/grailed' ], {
					cwd: __dirname + '/../../',
					env: env
				} );

			// program.stdout.on( 'data', function ( data ) {
			//     console.log( 'API_SERVER', data.toString() );
			// } );
			//
			// program.stderr.on( 'data', function ( data ) {
			//     console.log( 'API_SERVER', data.toString() );
			// } );

			program.on( 'error', function ( err ) {
				console.log( clc.blueBright( 'portal-node-api ERROR' ), err );
			} );

			//TODO: Express emits an event. Use that instead.
			var checkServer = function () {
				request.get( config.baseApiUrl, function ( err, res ) {
					if ( err ) {
						return setTimeout( checkServer, 10 );
					}
					_next();
				} );
			};

			setTimeout( checkServer, 100 );
		},

		// Drop the database
		function ( _next ) {
			helpers.dropTestDatabase( _next );
		}

	], _done );
};