<?php

/**
 * Heading & divider block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */


$title = get_field('title');
?>

<section id="<?php printf('heading-divider-%s', esc_attr($block['id'])); ?>" <?php create_block_classes( $block ); ?>>
	<div class="block-container box-width-site-full">
		<?php
			printf('<h2 class="two-col__title dc-heading heading-size-normal" data-aos="line-animation">%s</h2>', esc_html( $title ) );
		?>
	</div>
</section>
