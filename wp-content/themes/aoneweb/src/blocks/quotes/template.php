<?php

/**
 * Quotes block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */


$quotes_slider = get_field("quotes_slider");

?>

<section id="<?php printf('quotes-%s', esc_attr($block['id'])); ?>" <?php create_block_classes($block); ?>>
	<div class="block-container">
		<div class="swiper quotes_slider" data-aos="fade-in">
			<div class="swiper-wrapper">
				<?php
				foreach ($quotes_slider as $quote) {
					$title = $quote['text'];
					$text = $quote['sub_text'];

					echo '<div class="swiper-slide">';
						if ( $title ) :
							printf('<h2 class="quotes-title heading-size-small">"%s"</h2>', esc_html( $title ) );
						endif;
						if ( $text ) :
							printf('<p class="quotes-text text-size-large">%s</p>', esc_html( $text ) );
						endif;
					echo '</div>';
				}
				?>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</section>
