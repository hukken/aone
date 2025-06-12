<?php
/**
 * WPML/Translations Adjustments and helpers.
 * @package DesignContainer
 */

declare( strict_types=1 );
namespace DC\Translations;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

/**
 * Get current language
 *
 * @return string
 */
function get_current_lang() : string {
	return ICL_LANGUAGE_CODE;
}

/**
 * Get url for translated post by url.
 *
 * @param string $url - Original url
 * @return string
 */
function get_translated_post_by_url( $url ) : string {
	return apply_filters( 'wpml_permalink', $url, ICL_LANGUAGE_CODE );
}

/**
 * Get url with title for translated post by url.
 *
 * @param array $link - Original link object
 * @param string $fallback_title - Fallback title in case none found
 * @return array
 */
function get_translated_post_obj_by_url( $link, $original_language = 'no' ) : array {
	if ( ICL_LANGUAGE_CODE !== $original_language ) {
		$parsed_url  = wp_parse_url( rtrim($link['url'], '/') );
		$post        = get_page_by_path( $parsed_url['path'], OBJECT, 'page' );
		$new_post_id = apply_filters( 'wpml_object_id', $post->ID, $post->post_type, false, ICL_LANGUAGE_CODE );

		$title   = $new_post_id ? get_the_title( $new_post_id ) : $link['title'];
		$new_url = $new_post_id ? get_the_permalink( $new_post_id ) : $link['url'];

		return [ 'url' => $new_url, 'title' => $title, 'post_id' => $new_post_id ?? $post->ID  ];
	}

	return $link;
}

/**
 * Get obj for language switcher on current page. Only switches between english and Norwegian.
 *
 * @return array
 */
function get_language_switcher_obj() : array {
	$languages             =  apply_filters( 'wpml_active_languages', NULL, 'orderby=id&order=desc' );
	$target_language_code  = ( ICL_LANGUAGE_CODE === 'no' ) ? 'en' : 'no';

	return $languages[$target_language_code] ?? $languages['no'];
}


/**
 * Get all languages listed
 *
 * @return array
 */
function get_all_site_languages() : array {
	return apply_filters( 'wpml_active_languages', NULL, 'orderby=id&order=desc' );
}

// hook into meta box
// add_action( 'icl_post_languages_options_after', function() {
// 	echo 'Add more content';
// 	$edit_link = apply_filters( 'wpml_get_link_to_edit_translation', get_the_permalink(), get_the_ID(), 'en' );
// });

/**
 * Disable wpml translation editor.
 */
add_action( 'save_post', __NAMESPACE__ . '\\disable_wpml_editor', 99999, 3 );
function disable_wpml_editor() {
	update_post_meta( get_the_ID(), '_wpml_post_translation_editor_native', false );
}
