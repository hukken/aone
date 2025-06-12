<?php

/**
 * Ingress block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$title = get_field('title');

$logo_list = get_field("logo_list");


?>

<section id="<?php printf('logo-list-%s', esc_attr($block['id'])); ?>" <?php create_block_classes($block); ?>>
	<div class="block-container box-width-content-wide">
		<?php 
		if (!empty($title)) {
			printf( '<p class="logo-list-title text-size-large">%s</p>', $title ); 
		}
		?>
		<div class="logo-list-wrapper" data-aos="fade-in">
			<?php
				foreach ($logo_list as $logo) {
					echo '<div class="logo-item">';
						if ( $logo["img"] ) :
							echo wp_get_attachment_image($logo["img"], "logo");
						endif;
					echo '</div>';
				}
			?>
		</div>
	</div>
</section>
