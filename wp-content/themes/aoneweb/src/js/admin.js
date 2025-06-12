/*
	Sets height for ACF wysiwyg fields.
*/
if ( typeof acf !== 'undefined' ) {
	acf.add_action( 'wysiwyg_tinymce_init', function( ed, id, mceInit, $field ) {

		let newHeight = false;

		if ( $field.hasClass( 'one-line' ) ) {
			newHeight = '1.8rem';
		}

		if ( $field.hasClass( 'short-height' ) ) {
			newHeight = '3rem';
		}

		if ( newHeight ) {
			let minHeight = newHeight;
			let mceHeight = jQuery( ed.iframeElement ).contents().find( 'html' ).height() || minHeight;

			if ( mceHeight < minHeight ) {
				mceHeight = minHeight;
			}

			jQuery( ed.iframeElement ).css( {
				'height': mceHeight,
				'min-height': minHeight
			} );

			$field.css( {
				'min-height': minHeight
			} );
		}
	} );
}
