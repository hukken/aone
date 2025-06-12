

/**
 * Cards slideshow
 */
import '../../block-slider/dc-slideshow';
let blocks = document.querySelectorAll( 'section.slider .dc-slideshow' );
blocks.forEach( function( block, i ) {
	block.HorizontalSlider( { slideType: 'full' } );
});
