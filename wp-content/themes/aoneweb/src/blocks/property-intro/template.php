<?php

/**
 * Property intro block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$address_1 = get_field( 'address_line_1' );
$address_2 = get_field( 'address_line_2' );
$guests    = get_field( 'guests' );
$bedrooms  = get_field( 'bedrooms' );
$bathrooms = get_field( 'bathrooms' );
$size      = get_field( 'size' );
$text      = get_field( 'description' );
?>

<section id="<?php printf('property-intro-%s', esc_attr($block['id'])); ?>" <?php create_block_classes( $block ); ?>>
	<div class="block-container box-width-site-full has-line-divider" data-aos="line-animation">
		<div class="two-column">
			<div class="property-intro__title text-width-small" data-aos="fade-down">
				<?php
					if ( $address_1 || $address_2 ) :
						printf('<h2 class="heading-size-normal"><span>%s</span><span>%s</span></h2>', esc_html( $address_1 ), esc_html( $address_2 ) );
					endif;
				?>
			</div>

			<div class="property-intro__content text-width-small">
				<h3 class="property-intro__meta_data text-size-large" data-aos="fade-down" data-aos-delay="200">
				<?php
					if ( $guests ) :
						printf('<span>%s: %s</span>', __( 'Guests', 'dc' ), esc_html( $guests ) );
					endif;
					if ( $bedrooms ) :
						printf('<span>%s: %s</span>', __( 'Bedrooms', 'dc' ), esc_html( $bedrooms ) );
					endif;
					if ( $bathrooms ) :
						printf('<span>%s: %s</span>', __( 'Bathrooms', 'dc' ), esc_html( $bathrooms ) );
					endif;
					if ( $size ) :
						printf('<span>%s: %s m2</span>', __( 'Size', 'dc' ), esc_html( $size ) );
					endif;
				?>
				</h3>
				<?php
					if ( $text ) :
						printf('<p class="property-intro__text heading-size-small" data-aos="fade-down" data-aos-delay="800">%s</p>',esc_html( $text ) );
					endif;
				?>
			</div>
		</div>

		<!-- <div class="line-divider" data-aos="line-animation"></div> -->
	</div>
</section>
