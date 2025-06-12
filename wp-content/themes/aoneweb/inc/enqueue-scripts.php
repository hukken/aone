<?php
function the_theme_scripts() {
	wp_enqueue_script('jquery');

	$js_dir_uri = get_template_directory_uri() . '/dist/js';
	$js_dir = get_template_directory() . '/dist/js';

	$css_dir_uri = get_template_directory_uri() . '/dist/css';
	$css_dir = get_template_directory() . '/dist/css';

	wp_enqueue_style('main-style', $css_dir_uri . '/app.css', array(), filemtime($css_dir . '/app.css'));
	wp_enqueue_style('dashicons');
	wp_enqueue_script('main-script', $js_dir_uri . '/app.js', array(), filemtime($js_dir . '/app.js'), true);
}
add_action('wp_enqueue_scripts', 'the_theme_scripts');

// Add styles and scripts to Gutenberg
function admin_style() {
	wp_enqueue_style('admin-block-styles', get_template_directory_uri() . '/dist/css/admin.css');

	wp_enqueue_script('admin-scripts', get_template_directory_uri() . '/dist/js/admin-blocks.js', array(
		'wp-i18n',
		'wp-components',
		'wp-plugins',
		'wp-edit-post',
		'wp-element'
	), '1.0.1', true);
}
add_action('enqueue_block_editor_assets', 'admin_style');


function enqueue_custom_admin( $hook ) {
	wp_enqueue_script('dc-admin-custom-js',  get_template_directory_uri() . '/dist/js/admin.js', array(
		'wp-i18n',
		'wp-components',
		'wp-plugins',
		'wp-edit-post',
		'wp-element'
	), '1.0.1', true );
}

add_action('admin_enqueue_scripts', 'enqueue_custom_admin', 99 );
