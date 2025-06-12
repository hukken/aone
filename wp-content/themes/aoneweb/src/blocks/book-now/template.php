<?php

/**
 * Book now button block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

?>

<section id="<?php printf( 'book-now-%s', esc_attr( $block['id'] ) ); ?>" <?php create_block_classes( $block ); ?>>
	<?php
		( new Button( ['title' => __('Book now', 'dc'), 'url' => '#mews', 'target' => '_blank' ] ) )->set_class_names( 'dark' )->render();
	?>
</section>
