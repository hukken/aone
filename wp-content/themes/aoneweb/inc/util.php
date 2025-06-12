<?php

/**
 * Echoes html meta tags for favicons.
 *
 * @param string $dir
 * @param string $theme_color
 * @param string $tile_color
 * @return void
 */
function render_favicons($dir, $theme_color = '', $tile_color = '') {
	$iconSizes = [
		'favicon' => [
			'rel' => 'icon',
			'tags' => 'type="image/png"',
			'sizes' => [ '16x16', '32x32', '96x96', '192x192' ],
		],
		'apple-touch-icon' => [
			'rel' => 'apple-touch-icon',
			'tags' => '',
			'sizes' => [ '57x57','60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152', '180x180' ],
		]
	];

	foreach ( $iconSizes as $sizeName => $data ) {
		foreach ( $data['sizes'] as $i => $size ) {
			printf( '<link rel="%1$s" sizes="%2$s" href="%4$s/%3$s-%2$s.png" %5$s>', $data['rel'], $size, $sizeName, $dir, $data['tags'] );
		}
	}
	// printf('<link rel="mask-icon" href="%1$s/safari-pinned-tab.svg" color="%2$s">', $dir, $tile_color);
	printf('<meta name="msapplication-TileColor" content="%s">', $tile_color);
	printf('<meta name="theme-color" content="%s">', $theme_color);
	// printf('<link rel="manifest" href="%s/manifest.json">', $dir);
}

/**
 * Gets back url to front page or parent page
 *
 * @return array
 */
function get_back_url() {
	global $post;

	$link = [ 'title' => __( 'overview', 'dc' ), 'url' => get_home_url() ];

	$post_parent = $post->post_parent;
	if ( get_post_type() === 'post' ) {
		$categories = get_the_category( $post->id );
		foreach ( $categories as $key => $cat ) {
			$page_parent = get_page_by_title( $cat->cat_name );

			if ( $page_parent ) {
				$post_parent = $page_parent;
			}
		}
	}

	if ( $post_parent ) {
		$link = [
			'title' => get_the_title( $post_parent ),
			'url'   => get_permalink( $post_parent )
		];
	}

	return $link;
}


/**
 * Gets icons from 'template-parts/svg' folder
 *
 * @param string $name – Name of icon
 * @param string $path – Path of file folder (optional)
 *
 * @return string
 */
function get_svg_icon( string $name, string $path = 'template-parts/svg/' ) {
	ob_start();
	get_template_part( $path . $name );
	return ob_get_clean();
}


/**
 * Returns array of allowed html tags (used with wp_kses)
 *
 * @param array|null $allowed_tags – Select only wanted tags.
 * @return array
 */
function get_allowed_html_tags( array $allowed_tags = array() ) {
	$tags = [
		'a' => [
			'href'   => [],
			'title'  => [],
			'target' => [],
		],
		'ul'     => [],
		'ol'     => [],
		'li'     => [],
		'br'     => [],
		'h2'     => [],
		'p'      => [],
		'b'      => [],
		'em'     => [],
		'strong' => [],
	];

	if ( count( $allowed_tags ) > 0 ) {
		$new_allowed_tags = array();
		foreach ( $allowed_tags as $key => $tag ) {
			if ( isset( $tags[ $tag ] ) ) {
				$new_allowed_tags[ $tag ] = $tags[ $tag ];
			} else {
				$new_allowed_tags[ $tag ] = array();
			}
		}
		$tags = $new_allowed_tags;
	}

	return $tags;
}

/**
 * Returns SVG of the Design Container Logo
 *
 * @return string
 */
function dc_icon() {
	return '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 305.36 305.75">
	<defs><style>.cls-1 {stroke: #000; stroke-miterlimit: 10; stroke-width: 6px; }</style></defs>
	<g>
	<path class="cls-1" d="M135,3.89A151.66,151.66,0,0,0,83.85,20c-40.3,20.8-68.2,57.9-78,103.9-3.3,15.1-3.3,42.9,0,58,9.8,46,37.6,83,78.1,103.9A149.82,149.82,0,0,0,124,300c15.1,3.3,42.9,3.3,58,0a149.82,149.82,0,0,0,40-14.2c40.5-20.9,68.3-57.9,78.1-103.9,3.3-15.1,3.3-42.9,0-58-9.8-46-37.6-83-78.1-103.9-21.5-11.1-40.3-15.9-65-16.6C148.45,3.19,138.55,3.39,135,3.89Zm46.2,12c26.7,5.6,48.6,17.2,68,35.9,21.7,20.8,34.6,43.9,41,73.4,3.1,14.6,3.1,40.8,0,55.4-5.9,27.4-17.3,49-36.1,68.5-20.8,21.7-43.9,34.6-73.4,41-14.6,3.1-40.8,3.1-55.4,0-29.5-6.4-52.6-19.3-73.4-41-18.8-19.5-30.2-41.1-36.1-68.5-3.1-14.6-3.1-40.8,0-55.4,5.9-27.3,17.3-49,35.9-68.4,22.8-23.7,48.4-37.1,80.8-42.4C144.85,12.39,168.25,13.09,181.15,15.89Z"/>
	<path class="cls-1" d="M90.35,87.29c-1.8,1.3-1.9,3-2.2,21.8-.3,19.5-.2,20.5,1.8,23.1s2.4,2.7,12.3,2.7a82.54,82.54,0,0,0,13.9-1c9.5-2.7,17.8-13.5,17.8-23.1,0-10-5.2-18.1-14.5-22.5-4.3-2.1-6.5-2.4-16.1-2.4C95.45,85.89,91.75,86.29,90.35,87.29Zm23.1,11c6.2,2.6,9.1,10.8,6.2,17.8-2,4.9-5.4,6.9-12.7,7.5l-6,.6V96.89h4.5A24.79,24.79,0,0,1,113.45,98.29Z"/>
	<path class="cls-1" d="M149.65,148.59c-34.5,34.6-63,63.8-63.4,65.1-.7,2.8,2.1,6.2,5.1,6.2,2.6,0,127.4-124.4,128.3-127.8.7-2.8-2.1-6.2-5.1-6.2C213.15,85.89,192.45,106,149.65,148.59Z"/>
	<path class="cls-1" d="M189,160.79c-11.1,3.4-17.9,12.8-18,24.7a25.09,25.09,0,0,0,34.1,23.6c8.6-3.2,12.2-7.6,9.5-11.6-2.2-3.4-4.9-3.7-10-1-10.5,5.6-20.6.1-20.6-11.1s9.6-16.6,20.5-11.3c4.2,2.1,4.8,2.1,7.3.7,3.6-2,4.1-6.3,1.1-9.5C208.75,161,196.15,158.59,189,160.79Z"/>
	</g>
	</svg>';
}

/**
 * Check if visitors user agent is equal to a search bot user agent.
 *
 * @return boolean If is search bot.
 */
function search_bot_detected(): bool {
	return (isset($_SERVER['HTTP_USER_AGENT']) &&
		preg_match(
			'/bot|crawl|slurp|spider|mediapartners/i',
			$_SERVER['HTTP_USER_AGENT']
		));
}

/**
 * Create an excerpt from a string.
 *
 * @param mixed $post
 * @param integer $limit
 * @return string
 */
function excerpt(mixed $post, int $limit = 16): string {
	$excerpt = explode(' ', get_the_excerpt($post), $limit);

	if (count($excerpt) >= $limit) {
		array_pop($excerpt);
		$excerpt = implode(" ", $excerpt) . '...';
	} else {
		$excerpt = implode(" ", $excerpt);
	}
	$excerpt = preg_replace('`[[^]]*]`', '', $excerpt);

	return $excerpt;
}

/**
 * Echo block class string from block array and custom array
 * @param array $block ACF block array
 * @param string ...$extra Custom classes
 * @return void
 */
function create_block_classes(array $block, string ...$extra): void {
	$block_classes = ['block-section'];
	$block_classes[] = substr($block['name'], 4);

	if (!empty($extra))
		foreach ($extra as $class) $block_classes[] = $class;

	if (!empty($block['className']))
		$block_classes[] = $block['className'];

	if (!empty($block['align']))
		$block_classes[] = 'align-' . $block['align'];

	if (!empty($block['backgroundColor']))
		$block_classes[] = 'has-background-' . $block['backgroundColor'] . ' has-background';

	if (!empty($block['color']))
		$block_classes[] = 'has-color-' . $block['color'] . ' has-color';

	if (!empty($block['block_index']))
		$block_classes[] = 'block-index-' . $block['block_index'];

	if (!empty($block['align_text']))
		$block_classes[] = 'align_text-' . $block['align_text'];

	$block_classes_str = implode(' ', $block_classes);
	printf('class="%s"', esc_attr($block_classes_str));
}

/**
 * Get header theme based on hero block.
 * Returns light if hero block contains a background image, else dark.
 *
 * @return string dark|light
 */
function get_header_theme(): string {
	$content = get_the_content();
	$first_block = parse_blocks($content)[0];

	// Return dark as default. Mainly used for single.php pages etc...
	$hero_theme = 'dark';

	if ($first_block['blockName'] === 'acf/hero') {
		$hero_theme = $first_block['data']['background_image'] ? 'light' : 'dark';
	}

	return $hero_theme;
}

/**
 * Return a Gutenberg helper instruction message.
 *
 * @param array $block
 * @return string
 */
function gutenberg_helper_text($block = null) {
	return sprintf(
		'<p class="gutenberg-helper-instructions notice notice-warning">
			<b class="gutenberg-helper-instructions__title">%1$s</b>
			%2$s
		</p>',
		$block ? $block['icon'] . $block['title'] . ' block' : null,
		esc_attr(__('Please switch to edit mode to begin editing this block.', 'katapult')),
	);
}

/**
 * Check if an ACF Gutenberg block has any data, and display a helper otherwise.
 *
 * @param array $block
 * @return string|null
 */
function gutenberg_helper_on_empty($block) {
	$all_empty = true;
	foreach ($block['data'] as $key => $value) :
		if (substr($key, 0, 1) === "_") continue;
		if (isset(get_field_object($key)['choices'])) continue;
		if (!empty($value)) :
			$all_empty = false;
		endif;
	endforeach;

	if ($all_empty === true && function_exists('gutenberg_helper_text')) :
		return gutenberg_helper_text($block);
	endif;
}

/**
 * Render a material icon svg.
 * Browse all icons here: https://fonts.google.com/icons.
 * Uses npm install: npm install @material-design-icons/svg@latest
 *
 * @param string $icon The icon slug.
 * @param string $type baseline | outline | round | sharp | twotone.
 * @return string|null SVG markup.
 */
function material_icon( string $icon, string $type = 'outlined' ): ?string {
	// if ( ! is_admin() ) return null; // Don't run outside admin panel.

	$icon = strtolower( trim( preg_replace( '/[^A-Za-z0-9-]+/', '_', $icon ) ) ); // Slugify icon $name.
	$type = strtolower( trim( $type ) ); // Lowercase and trim $type.
	$url  = get_template_directory(). "/dist/images/icons/material-icons/svg/{$type}/{$icon}.svg";
	return ( file_exists( $url ) ) ? file_get_contents( $url ) : null;
}

function get_property_tag( ?int $post_id ) : ?string {
	if ( $locations = get_the_terms( $post_id, 'location' ) ) {
		return ( $locations[0] ) ? $locations[0]->name : '';
	}
	return null;
}

add_post_type_support( 'page', 'excerpt' );

/**
 * Restrict image upload size to 5 MB
 * @param $file
 * @return mixed
 */
function restrict_image_upload_size($file) {
	// Set the maximum image file size in bytes (5 MB)
	$max_image_size = 5 * 1024 * 1024; // 5 MB in bytes

	$file_type = $file['type'];
	$file_size = $file['size'];

	// Check if the file is an image
	if (strpos($file_type, 'image') === 0) {
		if ($file_size > $max_image_size) {
			$file['error'] = 'Image files must be 5 MB or less. Please resize your image and try again.';
		}
	}

	return $file;
}
add_filter('wp_handle_upload_prefilter', 'restrict_image_upload_size');
