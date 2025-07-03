<header id="hero">
	<?php
		$item =  apply_filters(
			'dc_get_block_post_data',
			[
				'title'  => get_field( 'hero_title' ) ?: get_the_title(),
				'text'   => get_field( 'hero_text' ),
				'tag'    => get_field( 'hero_tagline' ),
				'image_fallback'    => get_field( 'hero_image_fallback' ),
				'video'    => get_field( 'hero_video' ),
			],
			'hero'
		);
		$title     = $item['title'];
		$text     = $item['text'];
		$tagline   = $item['tag'];
		$image_fallback     = get_the_post_thumbnail_url();
		$video     = $item['video'];
		

		if (!empty($video)) {
			$thumbnail = '<video class="video" poster="' . $image_fallback . '" autoplay loop muted playsinline><source src="' . $video . '" type="video/mp4"></video>';
			
		} else {
			$thumbnail = wp_get_attachment_image( get_post_thumbnail_id(), 'hero', false, [ 'loading' => false ] );
		}

		printf('<figure class="hero-bg short-anim" data-aos="fade-in" data-aos-offset="0" data-aos-duration="2500">%s</figure>', $thumbnail );
		
	?>

	<?php if ( !empty( $video ) ) { ?>
		<button class="volume-btn" data-aos="fade-in" data-aos-delay="1600" data-aos-duration="1100">
			<span class="icon icon-volume-off"></span>
		</button>
	<?php } ?>

	<div class="hero-wrapper">
		<?php
			get_template_part( 'template-parts/partials/newsletter-hero-popup' )
		?>
		<span class="space-placeholder"></span>
		<?php
			echo '<div class="hero-content box-width-content-wide" data-aos="fade-up" data-aos-delay="1700" data-aos-duration="1000">';
				if ( $tagline ) :
					printf('<h2 class="hero-tagline heading-size-small">%s</h2>', esc_attr( $tagline ) );
				endif;

				if ( $title ) :
					$allowed_html    = get_allowed_html_tags( ['span', 'b', 'a', 'br', 'strong'] );
					$formatted_title = wp_kses( wpautop( wp_kses( $title, $allowed_html ) , true ), $allowed_html );
					printf('<h1 class="hero-title heading-size-hero">%s</h1>', $formatted_title );
				endif;

				if ( $text ) :
					printf('<p class="hero-text text-size-large">%s</p>', $text );
				endif;

				if ( get_post_type() === 'property' ) {
					( new Button( [
						'title' => __('Book now', 'dc'),
						'url' => get_field( 'custom_booking_link' ) ?: '#mews',
						'target' => get_field( 'custom_booking_link' ) ? '_self' : '_blank'
					] ) )->set_class_names( 'margin' )->render();
				}
			echo '</div>';

			if (  is_front_page() ) :
				echo '<div class="short-anim booking-bar-fade-wrapper box-width-content-wide" data-aos="fade-down" data-aos-delay="1700" data-aos-duration="1000">';
				get_template_part( 'template-parts/partials/booking-bar');
				echo '</div>';
			else :
				echo '<span class="space-placeholder"></span>';
			endif;
		?>
	</div>

	<?php
	if ( get_post_type() === 'property' && get_field( 'premium_selection' ) ) {
		printf('<div class="post-tag-box bottom" data-aos="fade-in" data-aos-delay="400" data-aos-duration="2500" data-aos-anchor=".hero-bg">%s</div>', __( 'Premium selection', 'dc' ) );
	}
	?>
</header>
