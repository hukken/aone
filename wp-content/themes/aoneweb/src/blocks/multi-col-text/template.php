<?php

/**
 * Multi-column text block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$title        = get_field('title');
$subtitleTag  = ( $title ) ? 'h3' : 'h2';
$columns      = get_field('columns') ?? [];
$column_total = ( !empty( $columns ) ) ? count( $columns ) : 0;
$column_total = ( $column_total > 4 ) ? 4 : $column_total;
$column_class = [ 1 => 'one-column', 2 => 'two-column', 3 => 'three-column', 4 => 'four-column'];
?>

<section id="<?php printf('multi-col-text-%s', esc_attr($block['id'])); ?>" <?php create_block_classes( $block ); ?>>
	<div class="block-container box-width-site-full">
		<?php
			if ( $title ) :
				printf('<h2 class="multi-col__heading heading-size-normal dc-heading" data-aos="line-animation">%s</h2>', esc_html( $title ) );
			endif;
		?>

		<div class="multi-col__content <?php echo  $column_class[$column_total] ?? ''; ?>">
			<?php
				if( have_rows('columns') ):
					while( have_rows('columns') ) : the_row();
						$i = get_row_index();
						printf('<div class="multi-col__col column_%s text-width-small" data-aos="fade-down" data-aos-delay="%s">', $i + 1, $i * 200 );
						$title  = get_sub_field('title');
						$text   = get_sub_field('text');
						$button = get_sub_field('button');

						if ( $title ) :
							printf('<%2$s class="multi-col__title text-size-normal">%1$s</%2$s>', esc_html( $title ), $subtitleTag );
						endif;

						if ( $text ) :
							printf('<p class="multi-col__text text-size-large">%s</p>', wp_kses( $text, get_allowed_html_tags(['br']) ) );
						endif;

						if ( $button ) {
							( new Button( $button ) )->set_class_names( 'outlined dark margin' )->render();
						}
						echo '</div>';
					endwhile;
				endif;
			?>
		</div>
	</div>
</section>
