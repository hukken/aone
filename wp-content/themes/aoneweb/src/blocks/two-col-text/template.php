<?php

/**
 * Two column text block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */
?>

<section id="<?php printf('two-col-text-%s', esc_attr($block['id'])); ?>" <?php create_block_classes( $block ); ?>>
	<div class="block-container box-width-site-full">
		<div class="two-col__content two-column">
			<?php
				foreach ( [ get_field('column_1'), get_field('column_2') ] as $i => $col ) {
					if ( ! $col ) {
						continue;
					}
					printf('<div class="two-col__col column_%s text-width-small" data-aos="fade-down" data-aos-delay="%s">', $i + 1, $i * 200 );
					$title  = $col['title'];
					$text   = $col['text'];
					$button = $col['button'];

					if ( $title ) :
						printf('<h2 class="two-col__title text-size-normal">%s</h2>', esc_html( $title ) );
					endif;

					if ( $text ) :
						printf('<p class="two-col__text text-size-large">%s</p>', wp_kses( $text, get_allowed_html_tags(['br']) ) );
					endif;

					if ( $button ) {
						( new Button( $button ) )->set_class_names( 'outlined dark margin' )->render();
					}
					echo '</div>';
				}
			?>
		</div>
	</div>
</section>
