<?php

/**
 * Highlight block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$is_post  = get_field( 'type' ) === 'post';
$show_tag = ( $is_post ) ? get_field( 'display_tagline' ) : true;
$item     =  apply_filters(
	'dc_get_block_post_data',
	[
		'media'  => get_field( 'featured_image' ),
		'title'  => get_field( 'title' ),
		'tag'    => get_field( 'tagline' ),
		'button' => get_field( 'button' ),
	],
	'highlight'
);

$tag      = $item[ 'button' ] ? 'a' : 'div';
$tag_link = $item[ 'button' ][ 'url' ] ?? '';

?>

<section id="<?php printf( 'highlight-%s', esc_attr( $block['id'] ) ); ?>" <?php create_block_classes( $block ); ?>>
	<?php
	printf( '<%s href="%s" class="highlight__link-wrapper box-width-site-full">', $tag, $tag_link );
	?>
		<div class="block-container" data-aos="fade-up" data-aos-duration="600" data-aos-offset="200">
		<?php
			if ( $item['media'] ) :
				printf( '<figure class="bg-image">%s</figure>', wp_get_attachment_image( $item['media'] , 'highlight', false, ['loading' => 'lazy'] ) );
			endif;

			echo '<div class="highlight__content text-width-small">';
				if ( $item[ 'tag' ] && $show_tag ) :
					printf( '<h3 class="tagline heading-size-small" data-aos="fade-up" data-aos-delay="400">%s</h3>', esc_html( $item[ 'tag' ] ) );
				endif;

				if ( $item[ 'title' ] ) :
					printf( '<h2 class="title heading-size-large" data-aos="fade-down" data-aos-delay="400">%s</h2>', wp_kses( $item[ 'title' ], get_allowed_html_tags( ['br'] ) ) );
				endif;

				if ( $item[ 'button' ] ) {
					( new Button( $item[ 'button' ] ) )
						->set_tag( 'button' )
						->set_class_names( 'margin' )
						->set_attribute( 'data-aos', 'fade-in' )
						->set_attribute( 'data-aos-delay', 600 )
						->render();
				}
			echo '</div>';
		?>
		</div>
	</<?php echo $tag; ?>>
</section>
