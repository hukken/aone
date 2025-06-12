<?php
/*
	SOCIAL MEDIA LINKS
	$args['settings'] can now change content field name, show / hide text or icon.
	$args['accounts'] can now change social media account link or icon name.
	$args['buttonClass'] can add special classes to buttons.
	@author: Cecce
	@version: 1.0
*/

/*
	Default settings
*/
$SETTINGS = [
	'field_name' => 'social_media',
	'show_text'  => false,
	'show_icon'  => true
];

$btnClasses = ['social-media-button'];

// $social_media_accounts: Match by social media type, custom link and custom icon.
$social_media_accounts  = [
	'email'     => [ 'mailto:', null ],
	'facebook'  => [ 'https://facebook.com/', 'facebook-alt' ],
	'instagram' => [ 'https://instagram.com/', null ],
	'linkedin'  => [ 'https://linkedin.com/company/', null ],
	'pinterest' => [ 'https://pinterest.com/', null ],
	'spotify'   => [ 'https://spotify.com/user/', null ],
	'twitch'    => [ 'https://twitch.tv/', null ],
	'twitter'   => [ 'https://twitter.com/', null ],
	'whatsapp'  => [ 'https://wa.me/', null ],
	'youtube'   => [ 'https://youtube.com/c/', null ],
	'twitter'   => [ 'https://twitter.com/', null ],
];

$newsletter_toggle_btn = get_field( 'newsletter_toggle_button', 'options' );
get_template_part( 'template-parts/partials/newsletter-form' ); 


/*
	Overwrite settings
*/
if ( isset( $args['settings'] ) ) {
	$SETTINGS = array_merge( $SETTINGS, $args['settings'] );
}

if ( isset( $args['accounts'] ) ) {
	$social_media_accounts = array_merge( $social_media_accounts, $args['accounts'] );
}

if ( isset( $args['buttonClass'] ) ) {
	$btnClasses = array_merge( $btnClasses, $args['buttonClass'] );
}

/*
	Add extra button classes
*/
if ( $SETTINGS['show_text'] ) {
	array_push( $btnClasses, 'has-text');
}

if ( $SETTINGS['show_icon'] ) {
	array_push( $btnClasses, 'has-icon');
}


/*
	Render content
*/
if ( have_rows( $SETTINGS['field_name'], 'options' ) ) :
	echo '<ul class="social-media-buttons-wrapper">';
	while ( have_rows( $SETTINGS['field_name'], 'options' ) ) : the_row();
		$social = get_sub_field( 'social_media', 'options' );

		$url = "https://".$social.".com/";
		if ( isset( $social_media_accounts[ $social ] ) ) {
			$social_media = $social_media_accounts[ $social ];
			$url          = $social_media[0];
			$icon_slug    = $social_media[1] ?? $social;
		}
		$icon = 'dashicons dashicons-'. $icon_slug;

		if ( $username = get_sub_field( 'username', 'options' ) ) :
			$text = ( $SETTINGS['show_text'] ) ? $social : '';
			$icon = ( $SETTINGS['show_icon'] ) ? $icon : '';

			printf(
				'<li class="%s"><a href="%s" target="_blank" title="%s">%s %s</a></li>',
				implode( " ", $btnClasses ),
				esc_url( $url.$username ),
				$social,
				'<span class="' . $icon . '"></span>',
				$text
			);
		endif;

	endwhile;
	if( !empty($newsletter_toggle_btn)) {
        echo '<li><button class="newsletter-toggle-btn">' . esc_html($newsletter_toggle_btn) . '</button></li>';
    }
			
	echo '</ul>';
endif;
