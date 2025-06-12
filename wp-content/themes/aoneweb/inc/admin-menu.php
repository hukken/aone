<?php
/**
 * ADMIN MENU ORDER
 * @package DesignContainer
 */

function wpse_custom_menu_order( $menu_ord ) {
	if ( !$menu_ord ) return true;

	return array(
		'index.php', // Dashboard
		'separator1', // First separator
		'edit.php', // Posts
		'edit.php?post_type=page', // Pages
		'edit.php?post_type=property', // Pages
		'separator2', // Second separator
		'upload.php', // Media
		'link-manager.php', // Links
		'edit-comments.php', // Comments
		'separator2', // Second separator
		'themes.php', // Appearance
		'acf-options-menu-settings', // Theme settings
		'acf-options-hovedmeny', // Theme settings
		'plugins.php', // Plugins
		'users.php', // Users
		'tools.php', // Tools
		'options-general.php', // Settings
		'separator-last', // Last separator
	);
}
add_filter( 'custom_menu_order', 'wpse_custom_menu_order', 10, 1 );
add_filter( 'menu_order', 'wpse_custom_menu_order', 10, 1 );
