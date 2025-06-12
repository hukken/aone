<?php
class Article_Tiles {
	private $block;
	private $args;
	private $query;
	private $taxonomy = 'area';

	public function __construct($block) {
		$this->block = $block;
		$this->setup_query_args();
		$this->query = new WP_Query($this->args);
	}

	// Get Block ID
	public function get_block_id() {
		return sprintf('article-tiles-%s', esc_attr($this->block['id']));
	}

	// Render Block Classes
	public function render_block_classes() {
		create_block_classes($this->block);
	}

	// Render Title and Text
	public function render_title_and_text() {
		$title = get_field('text');
		$text = get_field('sub_text');

		if ($title) {
			printf('<h2 class="ingress-title text-width-small heading-size-normal">%s</h2>', esc_html($title));
		}
		if ($text) {
			printf('<p class="ingress-text text-width-small text-size-normal">%s</p>', esc_html($text));
		}
	}

	// Render Link Button
	public function render_link_button() {
		$link = get_field('link');
		if ($link) {
			(new Button($link))->set_class_names('outlined dark margin')->render();
		}
	}

	// Setup Query Args
	private function setup_query_args() {
		$this->args = [
				'post_type' => 'osloguide',
				'posts_per_page' => -1,
				'orderby' => 'date',
				'order' => 'DESC',
				'suppress_filters' => true,
		];

		$show_all_articles = get_field('show_all_articles');
		if (!$show_all_articles) {
			$area = get_field('show_articles_by_area'); // Parent Term ID
			$show_filters = get_field('show_filters');

			if ($show_filters && $area) {
				$child_terms = get_terms([
						'taxonomy' => $this->taxonomy,
						'parent' => $area,
						'hide_empty' => true,
				]);

				if (!empty($child_terms) && !is_wp_error($child_terms)) {
					$child_term_ids = wp_list_pluck($child_terms, 'term_id');
					$child_term_ids[] = $area;

					$this->args['tax_query'] = [
							[
									'taxonomy' => $this->taxonomy,
									'field' => 'term_id',
									'terms' => $child_term_ids,
									'operator' => 'IN',
							],
					];
				}
			} else if ($area) {
				$this->args['tax_query'] = [
						[
								'taxonomy' => $this->taxonomy,
								'field' => 'term_id',
								'terms' => $area,
						],
				];
			}
		}
	}

	// Render Filters
	public function render_filters() {
		$show_filters = get_field('show_filters');
		if ($show_filters) {
			$filter_parent_id = get_field('filter_parent_category');
			$subcategories = get_term_children($filter_parent_id, $this->taxonomy);

			if (!empty($subcategories) && !is_wp_error($subcategories)) {
				echo '<div id="filter-buttons" class="filter-buttons">';
				echo '<button class="filter-button dc-button outlined dark" data-filter="all">All</button>';

				foreach ($subcategories as $subcategory) {
					$term = get_term_by('id', $subcategory, $this->taxonomy);
					if ($term && intval($term->count) > 0) {
						printf(
								'<button class="filter-button dc-button outlined dark" data-filter="%s">%s</button>',
								esc_attr($term->slug),
								esc_html($term->name)
						);
					}
				}
				echo '</div>';
			}
		}
	}

	// Render Posts
	public function render_posts() {
		if ($this->query->have_posts()) {
			echo '<div class="tile-layout">';
			$count = 1;

			while ($this->query->have_posts()) {
				$this->query->the_post();

				$tile_class = ($count % 5 === 3) ? 'tile large' : 'tile small';
				//$background_image = get_the_post_thumbnail_url(get_the_ID(), $tile_class === 'tile large' ? 'tile-big' : 'tile-small');
				$background_image = get_the_post_thumbnail_url(get_the_ID(), 'tile large');
				$terms = get_the_terms(get_the_ID(), $this->taxonomy);
				$term_slugs = !empty($terms) ? implode(' ', wp_list_pluck($terms, 'slug')) : '';
				$tile_class = 'tile visible';

				printf(
						'<div class="og-article %s" data-terms="%s">
                        <a href="%s" class="overlay">&nbsp;</a>
                        <div class="background-image" style="background-image: url(%s);"></div>
                        <div class="content">
                            <h3>%s</h3>
                            <p>%s</p>
                            <a href="%s"><span class="dc-button outlined">%s</span></a>
                        </div>
                    </div>',
						esc_attr($tile_class),
						esc_attr($term_slugs),
						esc_url(get_permalink()),
						esc_url($background_image),
						esc_html(get_the_title()),
						esc_html(wp_trim_words(get_the_excerpt(), 15)),
						esc_url(get_permalink()),
						__('Read More', 'aoneweb')
				);

				$count++;
			}

			echo '</div>';
			wp_reset_postdata();
		}
	}
}
