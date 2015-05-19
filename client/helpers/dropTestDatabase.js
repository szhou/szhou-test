module.exports = function () {
	var cb = _.last( arguments ),
		exec = require( 'child_process' ).exec;

	exec( 'mongo ' + grailed.database.databaseName + ' --eval \"db.dropDatabase()\" > /dev/null', function ( _error ) {
		cb && cb( _error );
	} );
};