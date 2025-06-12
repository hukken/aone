<?php
/**
 * The template for displaying the 404 page.
 *
 * @package WordPress
 * @subpackage dc
 */

get_header();

$not_found_title = get_field('not_found_title', 'options') ?: __('Wops, something went wrong', 'dc');
$not_found_text = get_field('not_found_text', 'options') ?: __('(404) This site does not exist.', 'dc');
$not_found_button_text = get_field('not_found_button_text', 'options') ?: __('Go to homepage', 'dc');

?>

	<main id="primary" class="not-found-content">

		<div class="entry-content">

			<h1 class="page-404-header__title"><?php echo esc_attr($not_found_title); ?></h1>
			<div>
				<?php echo wp_kses_post($not_found_text); ?>
			</div>
			<?php (new Button(get_home_url()))->set_class_names('outlined dark')->set_title($not_found_button_text)->render(); ?>

		</div>


	</main>

<?php
get_footer();
