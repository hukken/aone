<?php
/**
 * The template for displaying all search results
 *
 * @package dc
 */

get_header();
?>

	<main id="primary" class="search-results-main">

		<div class="grid-container">

			<div class="grid-x grid-margin heading-wrapper">
				<div class="cell small-12 medium-8 large-6 medium-offset-2 large-offset-3 text-align-center">
					<h1 class="page-title"><?php _e('Search results', 'dc'); ?></h1>
				</div>
			</div>

			<div class="grid-x grid-margin-x search-wrapper">
				<div class="cell small-12 medium-8 large-6 medium-offset-2 large-offset-3 text-align-center">
					<?php get_template_part('template-parts/misc/search-form'); ?>
				</div>
			</div>

			<div class="grid-x grid-margin-x">
				<div class="cell small-12 total-results-wrapper">
					<?php
					global $wp_query;
					$total_results = $wp_query->found_posts;
					printf(__('Your search query returned %1$s results', 'dc'), $total_results);
					?>
				</div>

				<?php
				if ( $wp_query->have_posts() ) :
					while ( $wp_query->have_posts() ) :
						$wp_query->the_post();
						get_template_part('template-parts/partials/search', 'card', array($post));
					endwhile;
				endif; ?>
			</div>

		</div>


	</main>

<?php
get_footer();
