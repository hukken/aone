<?php
/**
 * The template for displaying all single posts
 *
 * @package dc
 */

get_header();
?>

	<main id="primary" class="site-main">
		<?php
		while ( have_posts() ) :
			the_post();
			get_template_part( 'template-parts/content/content', get_post_type() );
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->


<?php get_footer();
