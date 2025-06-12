<?php
/**
 * General hooks onto blocks.
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Hooks;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}


/**
 * Change buttons for BLOCK SLIDER.
 *
 * @param string $icon - Original icon html
 * @return string
 */
// add_filter( 'block_slider_icon_right', function( $icon ) {
// 	ob_start();
// 	get_template_part( 'src/blocks/slider/icons/icon-nav-right' );
// 	return ob_get_clean();
// }, 10, 3 );
//
// add_filter( 'block_slider_icon_left', function( $icon ) {
// 	ob_start();
// 	get_template_part( 'src/blocks/slider/icons/icon-nav-left' );
// 	return ob_get_clean();
// }, 10, 3 );



/**
 * Get block post data by post id instead of custom fields.
 *
 * @param string $item - Block to be presented
 * @param string $block_type - name of block
 * @return array
 */

// add_filter( 'dc_get_block_post_data', function( $item, $block_type ) : array {
// 	$post_id = null;
//
// 	if ( get_field( 'type' ) === 'post' ) {
// 		$post_id = get_field( 'post_id' );
//
// 		$item    = [
// 			'media'  => get_post_thumbnail_id( $post_id ),
// 			'title'  => get_field( 'hero_title', $post_id ) ?? get_the_title( $post_id ),
// 			'text'   => get_the_excerpt( $post_id ),
// 			'tag'    => get_the_title( $post_id ),
// 			'button' => [
// 				'url'    => get_the_permalink( $post_id ),
// 				'title'  => get_field( 'button_text' ) ?: __( 'see more', 'stm' ),
// 				'target' => ''
// 			],
// 		];
// 	}
//
// 	return $item;
// }, 10, 3 );
