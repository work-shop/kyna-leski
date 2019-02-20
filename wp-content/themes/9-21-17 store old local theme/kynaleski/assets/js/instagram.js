var more = $('#more-button')
var targ = $( '#instafeed' );

var feed = new Instafeed({
	clientId:  				'6533c82d30a5412192e0de0659d3441b',
	get: 					'tagged',
	tagName: 				'maine',	
	limit: 					4,
	sortBy: 				'most-recent',
	mock: 					true,

	success: function( resp ) {

		 //console.log( resp );

		// function tagsAsClasses( resp ) {
		// 	return resp.tags.reduce( function( prev, curr ) {
		// 		return prev + curr + " ";
		// 	}, "");
		// }

		for ( var i = 0; i < resp.data.length; i++ ) {

			var captionLong = resp.data[i].caption.text;
			var captionShort = captionLong.trimToLength(140);

			var html = '<div class="col-sm-2">'
			         + '<a href="' + resp.data[ i ].link + '" target="_blank">'
			         + '<img src="' + resp.data[ i ].images.low_resolution.url + '" />'
			         + '</a>'
			         + '<p class="small centered mt1">' + resp.data[i].user.username + '</p>'
			         + '<h5 class="centered">' + captionShort + '</h5>'
			         + '</div>';
			         //console.log(html);

			//$( '#instafeed' ).append( html );

		}	
	},

	error: function( err ) {
		targ.append( '<div class="col-sm-12 error"><p>'+err+'</p></div>' );
	},

	after: function() {
		//console.log( this );
		if ( !this.hasNext() ) {
			more.attr( 'disabled', 'disabled' );
		}
		targ.trigger("insta-ready");
	}
});
