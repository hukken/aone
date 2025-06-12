<?php

if ( ! function_exists( 'the_theme_setup' ) ) {
	function the_theme_setup() {
		load_theme_textdomain( 'dc' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		add_theme_support( 'post-thumbnails' );

		add_theme_support( 'align-wide' );

		// image sizes
		add_image_size( 'hero', 2500, 1800, true );
		add_image_size( 'article-hero', 2400, 800, false );
		add_image_size( 'tile-small', 1200, 768, true );
		add_image_size( 'tile-big', 2400, 1340, true );
		add_image_size( 'highlight', 1600, 750, true );
		add_image_size( 'logo', 260, 198, false );
		add_image_size( 'big-square', 1000, 950, true );
		add_image_size( 'square', 964*2, 792*2, true );
		add_image_size( 'portrait', 370*2, 490*2, true );
	}
}
add_action( 'after_setup_theme', 'the_theme_setup' );

/**
 * Upscale thumbnails.
 * This way you don't end up with smaller images that the defined image sizes.
 */
function dc_thumbnail_upscale( $default, $orig_w, $orig_h, $new_w, $new_h, $crop ) {
	if (!$crop) return null; // let the wordpress default function handle this

	$aspect_ratio = $orig_w / $orig_h;
	$size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

	$crop_w = round($new_w / $size_ratio);
	$crop_h = round($new_h / $size_ratio);

	$s_x = floor(($orig_w - $crop_w) / 2);
	$s_y = floor(($orig_h - $crop_h) / 2);

	return array(0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h);
}
add_filter( 'image_resize_dimensions', 'dc_thumbnail_upscale', 10, 6 );

/**
 * Disable Image Compression in WordPress
 */
add_filter( 'jpeg_quality', function ( $arg ) {
	return 100;
});

/**
 * Removes or edits the 'Protected:' part from posts titles
 */
add_filter( 'protected_title_format', 'dc_remove_protected_text' );
function dc_remove_protected_text() {
	return __('%s');
}

/**
 * Change the dist filder for DC Post Grid
 */
add_filter( 'dc_post_grid_assets_dir', function () {
	return '/dist';
}, 10, 0);



/**
 * REMOVE POSTS FROM ADMIN
 */
// Remove side menu
add_action( 'admin_menu', 'remove_default_post_type' );
function remove_default_post_type() {
	remove_menu_page( 'edit.php' );
}

// Remove +New post in top Admin Menu Bar
add_action( 'admin_bar_menu', 'remove_default_post_type_menu_bar', 999 );
function remove_default_post_type_menu_bar( $wp_admin_bar ) {
	$wp_admin_bar->remove_node( 'new-post' );
}

// Remove Quick Draft Dashboard Widget
add_action( 'wp_dashboard_setup', 'remove_draft_widget', 999 );
function remove_draft_widget(){
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
}
