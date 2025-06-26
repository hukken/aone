<?php

/**
 * Ingress block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$title = get_field('text');
$text = get_field('sub_text');
$link  = get_field('link');
$fullwidth  = get_field('full_width');
$use_decor = is_front_page();
?>

<section id="<?php printf('ingress-%s', esc_attr($block['id'])); ?>" <?php create_block_classes($block, ( $use_decor? 'has-decor': '' ) ); ?>>
	<div class="block-container box-width-content-full <?php echo ($fullwidth) ? "fullwidth": ""; ?>">
		<div class="ingress__content" data-aos="fade-in">
		<?php
			if ( $title ) :
				printf('<h2 class="ingress-title text-width-small heading-size-normal">%s</h2>', esc_html( $title ) );
			endif;
			if ( $text ) :
				// temporary support for shortcodes
				printf('<p class="ingress-text text-width-small text-size-large">%s</p>', do_shortcode( $text ) );
			endif;
			if ( $link ) {
				( new Button( $link ) )->set_class_names( 'outlined dark margin' )->render();
			}
		?>
		</div>

		<?php
			if ( $use_decor) :
				echo '<div class="ingress__decor"><div class="decor__container" data-aos="fade-in" data-aos-delay="100" data-aos-id="lottie">';
				echo '<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_rkd8u8tb.json" background="transparent" speed="1" style="width: 400px; height: 400px;"></lottie-player>';
				echo '</div></div>';
			endif;
		?>
	</div>

	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</section>
