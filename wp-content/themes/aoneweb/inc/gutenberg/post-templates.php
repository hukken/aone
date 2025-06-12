<?php
/**
 * Gutenberg templates
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Templates;

/**
 *  Create default templates on new post
 */
 function register_default_templates() {
	 $post_type_page = get_post_type_object( 'page' );
	 $post_type_page->template = array(
		 array( 'acf/ingress' ),
	 );
 }
add_action( 'init', __NAMESPACE__ . '\\register_default_templates' );
