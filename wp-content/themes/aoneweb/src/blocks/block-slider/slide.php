<?php
/**
 * Slider plugin.
 * Plugin using css scroll snap and some js.
 * Can choose to use button navigation, pagination and indicators.
 * How to use: get_template_part( 'src/blocks/block-slider/slide', '', [ 'items' => $items, 'hide-nav' => true, 'pagination' => true ] );
 * @author: Cecce
 * @TODO: Make into a plugin.
 */
?>
<div class="dc-slideshow <?php echo $args['classes']; ?>">
	<div class="dc-slideshow-reel">
		<?php echo $args['items']; ?>
		<!-- <div class="dc-slideshow-reel-item"></div> -->
	</div>

	<?php
		if ( ! $args['hide-nav'] ) {
			get_template_part( 'src/blocks/block-slider/slide-nav-buttons', '', $args );
		}
	?>
</div>
