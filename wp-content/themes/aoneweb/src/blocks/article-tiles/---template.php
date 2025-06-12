<?php

/**
 * Article tiles block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$title = get_field('text');
$text = get_field('sub_text');
$link  = get_field('link');
$show_all_articles = get_field('show_all_articles');
?>

<section id="<?php printf('article-tiles-%s', esc_attr($block['id'])); ?>" <?php create_block_classes($block); ?>>
	<div class="block-container">

		<header>
			<div class="header-left">
				<?php
				if ( $title ) :
					printf('<h2 class="ingress-title text-width-small heading-size-normal">%s</h2>', esc_html( $title ) );
				endif;
				if ( $text ) :
					printf('<p class="ingress-text text-width-small text-size-normal">%s</p>', esc_html( $text ) );
				endif;
				?>
			</div>
			<div class="header-right">
				<?php
				if ( $link ) {
					( new Button( $link ) )->set_class_names( 'outlined dark margin' )->render();
				}
				?>
			</div>
		</header>
		<div class="clearfix"></div>

		<?php
		$taxonomy = 'area';
		$show_filters = get_field('show_filters');
		$args = array(
				'post_type' => 'osloguide',
				'posts_per_page' => -1,
				'orderby' => 'date',
				'order' => 'DESC',
				'suppress_filters' => true,
		);

		if ( !$show_all_articles ) {
			/**
			 * Show articles by area
			 */
			$area = get_field('show_articles_by_area'); // term id

			if ( $show_filters && $area ) {
				$child_terms = get_terms([
						'taxonomy' => $taxonomy,
						'parent' => $area,
						'hide_empty' => true,
				]);

				if ( !empty($child_terms) && !is_wp_error($child_terms)) {
					$child_term_ids = wp_list_pluck($child_terms, 'term_id');
					$child_term_ids[] = $area;
					$args['tax_query'] = array(
							array(
									'taxonomy' => $taxonomy,
									'field' => 'term_id',
									'terms' => $child_term_ids,
									'operator' => 'IN',
							),
					);
				}
			}
			else if ( !$show_filters && $area ) {
				$args['tax_query'] = array(
						array(
								'taxonomy' => $taxonomy,
								'field' => 'term_id',
								'terms' => $area,
						),
				);
			}
		}

		$query = new WP_Query( $args );

		if ( !$query->have_posts() ) {
			// get posts from NO language
			//$args['lang'] = 'no';
			$args['suppress_filters'] = true;
			$query = new WP_Query( $args );
		}

		if ( $query->have_posts() ) : ?>
			<?php  ?>

			<?php
			if ($show_filters):
				$filter_parent_id = get_field('filter_parent_category');
				$subcategories = get_term_children($filter_parent_id, 'area');
				if ( !empty($subcategories) && !is_wp_error($subcategories) ) : ?>
					<div id="filter-buttons" class="filter-buttons">
						<button class="filter-button dc-button--has-title dc-button dc-button--color-orange dc-button--type-default outlined dark margin" data-filter="all">All</button>
						<?php foreach ($subcategories as $subcategory) : ?>
							<?php
							$term = get_term_by( 'id', $subcategory, 'area' );
							if ( intval($term->count) != 0 ):
								?>
								<button class="filter-button dc-button--has-title dc-button dc-button--color-orange dc-button--type-default outlined dark margin" data-filter="<?php echo esc_attr($term->slug); ?>">
									<?php echo esc_html($term->name); ?>
								</button>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>

				<?php endif; ?>
			<?php endif; ?>

			<div class="tile-layout">
				<?php
				$count = 1;
				while ( $query->have_posts() ) : $query->the_post();
					// Every third post is a large tile
					$tile_class = ($count % 5 === 3) ? 'tile large' : 'tile small';
					$background_image = get_the_post_thumbnail_url(get_the_ID(), $tile_class === 'tile large' ? 'tile-big' : 'tile-small');
					// get post terms slugs
					$terms = get_the_terms( get_the_ID(), $taxonomy );
					$term_slugs = array();
					if ( !empty($terms) && !is_wp_error($terms) ) {
						$term_slugs = wp_list_pluck($terms, 'slug');
					}
					$term_slugs = implode(' ', $term_slugs);
					?>

					<div class="og-article <?php echo $tile_class; ?>" data-terms="<?php echo $term_slugs; ?>">
						<a href="<?php the_permalink(); ?>" class="overlay">&nbsp;</a>
						<div class="background-image" style="background-image: url('<?php echo esc_url( $background_image ); ?>');"></div>
						<div class="content">
							<h3 class="heading-size-medium"><?php the_title(); ?></h3>
							<p class="text-size-normal"><?php echo wp_trim_words( get_the_excerpt(), 15 ); ?></p>
							<a href="<?php the_permalink(); ?>">
								<span class="dc-button--has-title dc-button dc-button--type-default outlined">Read More</span>
							</a>
						</div>
					</div>
					<?php
					$count++;
				endwhile;
				?>
			</div>
		<?php endif;
		wp_reset_postdata(); ?>

		<div style="display: none">
			<?php
			echo '<pre>';
			print_r($args);
			echo '</pre>';
			?>
		</div>

	</div>
</section>