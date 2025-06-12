<?php

function register_acf_options_pages() {

	// Check function exists.
	if( !function_exists('acf_add_options_page') )
		return;

	// register options page.
	$option_page = acf_add_options_page(array(
		'page_title'    => __('General theme options'),
		'menu_title'    => __('Theme'),
		'menu_slug'     => 'theme-settings',
		'capability'    => 'edit_posts',
		'icon_url'      => 'dashicons-cover-image',
		'redirect'      => true,
		'position' => '2'
	));

	acf_add_options_sub_page(array(
		'page_title'  => __('Mews settings'),
		'menu_title'  => __('Mews settings'),
		'parent_slug' => $option_page['menu_slug'],
	));

	$header_page = acf_add_options_sub_page(array(
		'page_title'  => __('Menu settings'),
		'menu_title'  => __('Menu settings'),
		'parent_slug' => $option_page['menu_slug'],
	));

	$footer_page = acf_add_options_sub_page(array(
		'page_title'  => __('Footer settings'),
		'menu_title'  => __('Footer settings'),
		'parent_slug' => $option_page['menu_slug'],
	));

	$not_found_page = acf_add_options_sub_page(array(
		'page_title'  => __('404 settings'),
		'menu_title'  => __('404 settings'),
		'parent_slug' => $option_page['menu_slug'],
	));

}

// Hook into acf initialization.
add_action('acf/init', 'register_acf_options_pages');
