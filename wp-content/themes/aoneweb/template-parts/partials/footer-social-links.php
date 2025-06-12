<?php

if ( have_rows( 'social_media', 'options' ) ) :
    echo '<ul class="social-media-buttons-wrapper">';
	while ( have_rows( 'social_media', 'options' ) ) :
		the_row();

        $social_media = get_sub_field( 'social_media', 'options' );
		$icon = 'dashicons dashicons-'.$social_media; // Default icons - Using dashicons

		switch ($social_media) {
			case "email":
				$url = "mailto:";
				break;
			case "facebook":
				$url = "https://facebook.com/";
				$icon = "dashicons dashicons-facebook-alt";
				break;
			case "instagram":
				$url = "https://instagram.com/";
				break;
			case "linkedin":
				$url = "https://linkedin.com/company/";
				break;
			case "pinterest":
				$url = "https://pinterest.com/";
				break;
			case "reddit":
				$url = "https://reddit.com/";
				break;
			case "spotify":
				$url = "https://spotify.com/user/";
				break;
			case "twitch":
				$url = "https://twitch.tv/";
				break;
			case "twitter":
				$url = "https://twitter.com/";
				break;
			case "whatsapp":
				$url = "https://wa.me/";
				break;
			case "youtube":
				$url = "https://youtube.com/c/";
				break;
			default:
				$url = "https://".$social_media.".com/";
		}

		if ( $username = get_sub_field( 'username', 'options' ) ) :
			echo '<li class="social-media-button"><a href="'.esc_url( $url.$username ).'" target="_blank" title="'.$social_media.'"><span class="'.$icon.'"></span></a></li>';
		endif;

	endwhile;
	echo '</ul>';
endif;
