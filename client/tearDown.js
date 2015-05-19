module.exports = function ( _done ) {
	if ( global.backendServer ) {
		try {
			global.backendServer.kill();
			global.backendServer = null;
		} catch ( e ) {
			console.log( 'error killing backend server', e );
		}
	}
	helpers.dropTestDatabase( _done );
};