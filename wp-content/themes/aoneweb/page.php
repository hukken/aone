<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package dc
 */

get_header();
?>
	<?php
	while ( have_posts() ) : the_post(); ?>
		<?php if (true) : // IMPORTANT: Change to false before pushing to prod ?>
			<?php get_template_part( 'template-parts/content/content-page'); ?>
		<?php else :
				// @TODO: Remove on launch
			?>
			<main id="primary" class="site-main">
			<div class="splash-screen">
				<div class="grid-container">
					<div class="grid-x grid-margin-x align-center">
						<div class="cell small-10 large-4 text-center splash-screen--content-wrapper">
							<div>
								<img src="<?php echo get_template_directory_uri() . '/src/images/logo.svg'; ?>" alt="A-ONE Logo">

								<h1>
									Wellness homes for rental in Oslo
								</h1>
							</div>

							<h2>Full web <br/> coming soon</h2>

							<footer>
								<a href="tel:+4746779003">+47 467 79 003</a>
								<a href="mailto:booking@a-one.no">booking@a-one.no</a>
							</footer>
						</div>
					</div>
				</div>
			</div>
			</main>
		<?php endif; ?>
	<?php endwhile; ?>
<?php
get_footer();
