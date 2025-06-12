<?php

/**
 * Slider
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$title    = get_field( 'title' );
$text     = get_field( 'text' );
$type     = get_field( 'type' );
$link     = get_field( 'cta_button' );
$content  = get_field( $type ) ?? [];
$img_size = 'square';
$button_txt = ($type === 'properties') ? 'Explore home' : 'Read more';

if (!$content) {
	$content = [];
}

?>

<section <?php create_block_classes( $block ); ?>>
	<div>
		<?php
			echo '<div class="slider__header box-width-site-full">';
				echo '<div class="slider__heading text-width-x-small" data-aos="fade-down">';
					if ( $title ) :
						printf('<h2 class="slider__title heading-size-normal">%s</h2>', esc_html( $title ) );
					endif;
					if ( $text ) :
						printf('<p class="slider__text text-size-large">%s</p>', esc_html( $text ) );
					endif;
				echo '</div>';
				echo '<div class="slider__navigation-wrapper">';
					if ( $link ) {
						( new Button( $link ) )->set_class_names( 'outlined dark' )->set_attribute('data-aos', "fade-down")->render();
					}
					get_template_part( 'src/blocks/block-slider/slide-nav-buttons', '', [ 'count' => count( $content ), 'pagination' => false ] );
				echo '</div>';
			echo '</div>';

			ob_start();
			foreach ( $content as $i => $id ) {
				$aos = 'data-aos="fade-up" data-aos-delay="' . ( 300 * $i ) . '"';
				if ( $type === 'images' ) :
					$figure = sprintf( '<figure class="item__thumbnail">%s %s</figure>', wp_get_attachment_image( $id, $img_size ), wp_get_attachment_image( $id, 'portrait', false, ['loading' => 'lazy'] )  );
					printf( '<div class="dc-slideshow-reel-item" %s>%s</div>', '', $figure );
				else:
			?>
				<a class="dc-slideshow-reel-item" href="<?php the_permalink( $id );?>">
					<?php
						if ( get_field( 'premium_selection', $id ) ) {
							printf('<div class="post-tag-box top darker" %s>%s</div>', 'data-aos="fade-down"', __( 'Premium selection', 'dc' ) );
						}
					?>

					<figure class="item__bg">
						<?php echo wp_get_attachment_image( get_post_thumbnail_id( $id ), $img_size ); ?><!-- desktop -->
						<?php echo wp_get_attachment_image( get_post_thumbnail_id( $id ), 'portrait' ); ?><!-- mobile -->
					</figure>
					<div class="item__content-wrapper" <?php echo $aos; ?>>
						<div class="item__content">
							<h2 class="item__tag text-size-large"><?php echo get_property_tag( $id );?></h2>
							<h3 class="item__title heading-size-normal"><?php echo get_the_title( $id );?></h3>
							<p class="item__text text-size-large"><?php echo get_the_excerpt( $id );?></p>
						</div>
						<?php

						( new Button( [ 'url' => null, 'title' => __( $button_txt, 'dc' ), 'target' => '' ] ) )->set_class_names( 'outlined' )->set_tag( 'span' )->render();
						?>

					</div>
				</a>
			<?php
				endif;
			}
			$items = ob_get_clean();

			get_template_part( 'src/blocks/block-slider/slide', '', [ 'items' => $items, 'hide-nav' => true,'classes' => 'is-' . $type ] );

		?>
	</div>

</section>
