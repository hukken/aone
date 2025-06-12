<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package dc
 */
	/* $newsletter_header = get_field( 'newsletter_header', 'options' ); */
/* 	$newsletter_toggle_btn = get_field( 'newsletter_toggle_button', 'options' );
	get_template_part( 'template-parts/partials/newsletter-form' );  */

?>
	<footer class="footer text-size-normal">
		<div class="footer-container box-width-site-full">

		<?php
			get_template_part( 'template-parts/partials/booking-bar' );
		?>

		<div class="footer-content">

			<div class="col left">
				<?php
					get_template_part( 'template-parts/partials/social-media-links', null, ['settings' => ['show_icon' => false, 'show_text' => true, 'field_name' => 'column_1_social_media']] );
					
				?>
	
				<div class="logo-container footer-part">
					<a accesskey="1" href="<?php echo home_url(); ?>">
						<?php get_template_part('template-parts/svg/logo');  ?>
					</a>
				</div>
			</div>

			<div class="col right">
				<div class="footer-inner-columns">
				<?php
					echo '<div class="footer-inner-col">';
					if ( have_rows( 'column_2_menu', 'options' ) ) :
						echo '<nav><ul>';
						while ( have_rows( 'column_2_menu', 'options' ) ) : the_row();
							$social = get_sub_field( 'menu_item', 'options' );
							if ( !empty( $social)) {
								printf( '<li><a href="%s">%s</a></li>', $social['url'], $social['title'] );
							}
							
						endwhile;
						echo '</ul></nav>';
					endif;
					echo '</div>';

					echo '<div class="footer-inner-col">';
					if ( have_rows( 'column_3_menu', 'options' ) ) :
						echo '<nav><ul>';
						while ( have_rows( 'column_3_menu', 'options' ) ) : the_row();
							$link = get_sub_field( 'menu_item', 'options' );
							printf( '<li><a href="%s">%s</a></li>', $link['url'], $link['title'] );
						endwhile;
						echo '</ul></nav>';
					endif;

					if ( $email = get_field( 'column_3_email', 'options' ) ) {
						printf( '<a href="mailto:%s">%s</a>', $email, $email );
					}
					if ( $phone = get_field( 'column_3_phone', 'options' ) ) {
						printf( '<a href="tel: %s">%s</a>', $phone, $phone );
					}

					echo '</div>';

				?>
				</div>
				<div class="footer-right-col-bottom">
				<?php
				echo '<div class="mobile-lang-switcher">';
				get_template_part( 'template-parts/partials/language-switcher', null, ['id' => 'lang-switch-mobile-foot', 'label' => true ] );
				echo '</div>';
				$cookie_link = get_field( 'cookie_page_link', 'options' );
				// var_dump($cookie_link );
					if ( $cookie_link = get_field( 'cookie_page_link', 'options' ) ) {
						$translated_cookie = DC\Translations\get_translated_post_obj_by_url( $cookie_link );
						// var_dump($translated_cookie );
						printf( '<a class="text-size-small" href="%s">%s</a>', $translated_cookie['url'], $translated_cookie['title'] );
					}
					printf( '<a class="text-size-small" href="%s">%s</a>', 'http://stem.no', __('Design and development by Stem Agency', 'dc') );
				?>
				</div>
			</div>
		</div>

		<?php
			if (is_admin()) :
				edit_post_link(esc_html__('Edit', 'dc'), '<span class="edit-link">', '</span>');
			endif;

			wp_footer();
		?>
		</div>
	</footer>
</body>

</html>
