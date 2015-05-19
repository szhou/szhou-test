module.exports = function elementIsPresent( _element, _callback ) {
	var async = require( 'async' ),
		elements = Array.isArray( _element ) ? _element : [ _element ],
		elementsPresent = [];

	async.until( function () {
		return elementsPresent.length >= elements.length;
	}, function ( _check ) {
		elementsPresent = [];
		async.eachSeries( elements, function ( _element, _next ) {
			element.all( _element ).then( function ( _modal ) {
				if ( _modal && _modal.length ) elementsPresent.push( _element );
				_next();
			} );
		}, function () {
			setTimeout( _check, 100 );
		} );
	}, function () {
		setTimeout( _callback, 500 );
	} );
};