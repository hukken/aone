<?php
/**
 * Block Styles
 * Add additional style class for blocks
 *
 * Example:
register_block_style(
	'core/quote',
		array(
			'name'         => 'blue-quote',
			'label'        => __( 'Blue Quote', 'textdomain' ),
			'is_default'   => true,
			'inline_style' => '.wp-block-quote.is-style-blue-quote { color: blue; }',
		)
	);
 * Example ends
 */

function dc_register_block_styles() {

	if ( function_exists( 'register_block_style' ) ) {
		register_block_style(
			'core/paragraph',
			array(
				'name'  => 'ingress',
				'label' => __( 'Ingress', 'dc' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'dc_register_block_styles' );
