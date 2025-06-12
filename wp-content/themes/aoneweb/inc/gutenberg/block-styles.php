<?php
/**
 * Gutenberg Block Styles
 * Add additional style class for blocks
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Templates;

function dc_register_block_styles() {
	if ( function_exists( 'register_block_style' ) ) {

		// register_block_style(
		// 	'core/paragraph',
		// 	array(
		// 		'name'  => 'ingress',
		// 		'label' => __( 'Ingress', 'stm' ),
		// 		'is_default'   => true,
		// 		'inline_style' => '.wp-block-quote.is-style-ingress { font-style: italic; }',
		// 	)
		// );

	}
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\dc_register_block_styles' );
