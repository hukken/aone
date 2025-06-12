<?php
ob_start();
get_template_part( 'src/blocks/block-slider/icons/icon-nav-left' );
$icon_left = apply_filters( 'block_slider_icon_left', ob_get_clean() );


ob_start();
get_template_part( 'src/blocks/block-slider/icons/icon-nav-right' );
$icon_right = apply_filters( 'block_slider_icon_right', ob_get_clean() );

?>
<div class="dc-slideshow-navigation prev-next-wrapper partial"  data-aos="fade-up" data-aos-delay="300">
	<button class="dc-slideshow-button-prev dc-slideshow-button" disabled type="button">
		<?php echo $icon_left;  ?>
		<span class="screen-reader-text"><?php esc_attr_e(__('Previous', 'dcblocklibrary')); ?></span>
	</button>

	<?php
		if ( $args['pagination'] ) {
			get_template_part( 'src/blocks/block-slider/slide-nav-pagination', '', $args );
		}
	?>
	<button class="dc-slideshow-button-next dc-slideshow-button" type="button">
		<?php echo $icon_right;  ?>
		<span class="screen-reader-text"><?php esc_attr_e(__('Next', 'dcblocklibrary')); ?></span>
	</button>
</div>
