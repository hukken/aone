<?php

/**
 * Text & Media Block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$item = apply_filters(
	'dc_get_block_post_data',
	[
		'media'  => get_field( 'featured_images' ),
		'title'  => get_field( 'title' ),
		'text'   => get_field( 'text' ),
		'tag'    => get_field( 'tagline' ),
		'button' => get_field( 'button' ),
	],
	'text-media'
);

$is_two_images = is_array( $item[ 'media' ] ) && count( $item[ 'media' ] ) > 1;
$media_size    = $is_two_images ? 'portrait' : 'big-square';
$media_class   = $is_two_images ? 'has-two-images' : '';
$media_ID      = ( is_array( $item[ 'media' ] ) ) ? $item[ 'media' ][0] : $item[ 'media' ];

?>

<section id="<?php printf( 'text-media-%s', esc_attr( $block['id'] ) ); ?>" <?php create_block_classes( $block, $media_class ); ?>>
	<div class="grid-container box-width-site-full">
		<figure class="text-media__thumbnail text-media-box">
			<?php
				if ( $is_two_images ) {
					foreach ( $item[ 'media' ] as $key => $image_ID ) {
						echo wp_get_attachment_image( $image_ID, $media_size , false, [ 'data-aos' => 'fade-up', 'data-aos-delay' => $key * 50,'loading' => 'lazy' ] );
					}
				}
				echo wp_get_attachment_image( $media_ID, 'big-square', false, [ 'class' => 'original', 'data-aos' => 'fade-up' ] );
			?>
		</figure>
		<div class="text-media-box right">
			<div class="text-media__content">
			<?php
				if ( $item[ 'tag' ] ) :
					printf( '<h3 class="text-media__tagline %s" %s>%s</h3>', 'text-size-normal', 'data-aos="fade-down" data-aos-delay="100"', esc_html( $item[ 'tag' ] ) );
				endif;
				echo '<div data-aos="fade-down" data-aos-delay="150">';
				if ( $item[ 'title' ] ) :
					printf( '<h2 class="text-media__title heading-size-normal" %s>%s</h2>', 'heading-medium', esc_html( $item[ 'title' ] ) );
				endif;

				if ( $item[ 'text' ] ) :
					printf( '<p class="text-media__text text-size-large">%s</p>', wp_kses( $item[ 'text' ], get_allowed_html_tags(['br']) ) );
				endif;
				echo '</div>';

				if ( $item[ 'button' ] ) {
					( new Button( $item[ 'button' ] ) )
						->set_class_names( 'margin outlined dark' )
						->set_attribute( 'data-aos', 'fade-down' )
						->set_attribute( 'data-aos-delay', 320 )
						->render();
				}
			?>
			</div>
		</div>
	</div>
</section>
