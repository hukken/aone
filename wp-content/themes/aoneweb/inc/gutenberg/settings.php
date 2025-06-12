<?php
/**
 * Gutenberg settings
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Settings;

/**
 * Disable the dropcap setting
 */
function dc_disable_paragraph_dropcap_setting($editor_settings) {
	$editor_settings['__experimentalFeatures']['global']['typography']['dropCap'] = false;
	return $editor_settings;
}
add_filter('block_editor_settings_all', __NAMESPACE__ . '\\dc_disable_paragraph_dropcap_setting', 10, 1);

/**
 * Disable custom Gutenberg styling
 */
add_theme_support('disable-custom-gradients');
add_theme_support('disable-custom-colors');
add_theme_support('disable-custom-font-sizes');
add_theme_support( 'editor-font-sizes', array() );
add_theme_support('editor-gradient-presets', array());
remove_theme_support('core-block-patterns');



/**
 *  Remove the h1 tag from the WordPress editor.
 *
 *  @param   array  $settings  The array of editor settings
 *  @return  array             The modified edit settings
 */
function my_format_TinyMCE( $in ) {
	$in['block_formats'] = "Paragraph=p; Heading=h2;";
	return $in;
}
add_filter( 'tiny_mce_before_init', __NAMESPACE__ . '\\my_format_TinyMCE' );
