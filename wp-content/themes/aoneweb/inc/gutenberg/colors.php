<?php
/**
 * Gutenberg color palette
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Colors;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

add_theme_support( 'editor-color-palette', array(
	array(
		'name'  => esc_attr__( 'Light Pink', 'dc' ),
		'slug'  => 'pink-light',
		'color' => '#ede1da',
	),
	array(
		'name'  => esc_attr__( 'Medium Pink', 'dc' ),
		'slug'  => 'pink-medium',
		'color' => '#e4d0c3',
	),
	array(
		'name'  => esc_attr__( 'Dark Pink', 'dc' ),
		'slug'  => 'pink-dark',
		'color' => '#d5b39d',
	),

	array(
		'name'  => esc_attr__( 'Light Green', 'dc' ),
		'slug'  => 'green-light',
		'color' => '#dfe4d9',
	),
	array(
		'name'  => esc_attr__( 'Medium Green', 'dc' ),
		'slug'  => 'green-medium',
		'color' => '#cad4c2',
	),

	array(
		'name'  => esc_attr__( 'Light Blue', 'dc' ),
		'slug'  => 'blue-light',
		'color' => '#c7d1d6',
	),
	// array(
	// 	'name'  => esc_attr__( 'Medium Blue', 'dc' ),
	// 	'slug'  => 'blue-medium',
	// 	'color' => '#a2b5bd',
	// ),
	array(
		'name'  => esc_attr__( 'Dark Blue', 'dc' ),
		'slug'  => 'blue-dark',
		'color' => '#2a2e57',
	),


) );
