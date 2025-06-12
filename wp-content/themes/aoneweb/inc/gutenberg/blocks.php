<?php
/**
 * Block registrations
 * @package StemAgency
 */

declare( strict_types=1 );
namespace STEM\Gutenberg\Blocks;

const DEFAULT_BLOCKS_PATH = '/src/blocks';

/**
 * Register custom block categories
 *
 * @param array $categories
 * @param WP_Block_Editor_Context $post
 *
 * @return array
 */
add_filter( 'block_categories_all', __NAMESPACE__ . '\\register_block_categories', 10, 2 );
function register_block_categories( array $categories, \WP_Block_Editor_Context $post ) : array {
	return array_merge(
		array(
			array(
				'slug' 	=> 'dc',
				'title' => __('Stem Agency', 'stm' ),
				'icon'  => dc_icon(),
			),
		),
		$categories
	);
}


/**
 * Add default block settings values
 * See all settings here: https://www.advancedcustomfields.com/resources/whats-new-with-acf-blocks-in-acf-6/
 *
 * @param array $args - Block settings from block.json
 *
 * @return array
 */
add_filter( 'block_type_metadata', __NAMESPACE__ . '\\dc_default_block_settings' );

function dc_default_block_settings( array $args ) : array {
	if ( str_contains( $args['name'], 'acf' ) ) {

		$id      = explode( '/', $args['name'] );
		$default = [
			'apiVersion'  => 2,
			'icon'        => 'check_box_outline_blank',
			'description' => 'Custom DC gutenberg block',
			'category'    => 'dc',
			'script'      => 'dc-js-block-' . $id[1],
			'style'       => 'dc-css-block-' . $id[1],
			'acf'         => array(
				'mode'           => 'edit',
				'renderTemplate' => 'template.php',
				'renderCallback' => false // PDF plugin uses this, see custom_pdf_acf_block_render_callback in plugin
			),
			'supports' => array(
				'mode'  => false,
				'align' => false
			)
		];

		$default = apply_filters( 'stem_acf_block_render_default_args', $default );

		$args = merge_multi_level_array( $args, $default );
	}
	return $args;
}


/**
 * Register all custom blocks
 * Default directory: /src/blocks
 *
 * @return void
 */
add_action( 'init',  __NAMESPACE__ . '\\dc_register_custom_blocks' );

function dc_register_custom_blocks() : void {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$folders = glob( get_template_directory() . DEFAULT_BLOCKS_PATH . '/*' , GLOB_ONLYDIR );

	foreach ( $folders as $folder ) :
		$json_path = $folder . '/block.json';
		$pathArray = explode( '/', $folder );
		$blockName = end( $pathArray );

		if ( file_exists( $json_path ) ) {
			register_block_type( $json_path );

			if ( $script_path = get_asset_path( $blockName, 'js' ) ) {
				wp_register_script( 'dc-js-block-' . $blockName , $script_path , '', '', true );
			}

			if ( $style_path = get_asset_path( $blockName, 'css' ) ) {
				wp_register_style( 'dc-css-block-' . $blockName , $style_path );
			}
		}
	endforeach;
}


/**
 * Filter allow blocks list for every post type.
 * Settings can be changed in src/blocks.json
 *
 * @param array|bool $allowed_block_types - array of allowed blocks names
 * @param WP_Block_Editor_Context $editor_context
 *
 * @return array|bool
 */
add_filter( 'allowed_block_types_all', __NAMESPACE__ . '\\dc_filter_allowed_blocks', 9999, 2 );

function dc_filter_allowed_blocks( array|bool $allowed_block_types, \WP_Block_Editor_Context $editor_context ) : array|bool {
	$blocks_json_path = get_template_directory() . DEFAULT_BLOCKS_PATH. '/blocks.json';

	if ( file_exists( $blocks_json_path ) ) :
		$current_post_type           = $editor_context->post->post_type;
		$blocks_json                 = json_decode( file_get_contents( $blocks_json_path ), true );
		$post_default_block_settings = $blocks_json['allowedBlocks']['all'] ?? false;
		$post_type_block_settings    = $blocks_json['allowedBlocks'][$current_post_type] ?? $post_default_block_settings;

		if ( $post_type_block_settings ) :
			$allowed_blocks_by_type = get_all_blocks_by_type();
			$new_allowed_blocks = [];
			foreach ( $post_type_block_settings as $category => $allowed_blocks ) {
				foreach ( $allowed_blocks as $i => $block_name ) {
					if ( $block_name === 'all' ) {
						$new_allowed_blocks = array_merge( $new_allowed_blocks, $allowed_blocks_by_type[ $category ] );
					} else {
						array_push( $new_allowed_blocks, $category . '/' . $block_name );
					}
				}
			}
			return $new_allowed_blocks;
		endif;
	endif;

	return $allowed_block_types;
}


/**
 * Material icons in block
 * Add support for material icons in custom blocks
 *
 * @param array $args - block settings
 *
 * @return array
 */
add_filter( 'block_type_metadata', __NAMESPACE__ . '\\dc_material_icons_on_blocks', 9999, 2 );

function dc_material_icons_on_blocks ( array $args ) : array {
	if ( str_contains( $args['name'], 'acf' ) ) {
		if ( isset( $args['icon'] ) && function_exists( 'material_icon' ) ) :
			$args['icon'] = material_icon( $args['icon'] );
		endif;
	}
	return $args;
}

/** ----------------------------------
 * HELPERS & UTILS FOR BLOCKS.PHP
 * ---------------------------------- */

/**
 * Returns SVG of the Design Container Logo
 *
 * @return string
 */
function dc_icon() : string {
	return '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 305.36 305.75">
	<defs><style>.cls-1 {stroke: #000; stroke-miterlimit: 10; stroke-width: 6px; }</style></defs>
	<g>
	<path class="cls-1" d="M135,3.89A151.66,151.66,0,0,0,83.85,20c-40.3,20.8-68.2,57.9-78,103.9-3.3,15.1-3.3,42.9,0,58,9.8,46,37.6,83,78.1,103.9A149.82,149.82,0,0,0,124,300c15.1,3.3,42.9,3.3,58,0a149.82,149.82,0,0,0,40-14.2c40.5-20.9,68.3-57.9,78.1-103.9,3.3-15.1,3.3-42.9,0-58-9.8-46-37.6-83-78.1-103.9-21.5-11.1-40.3-15.9-65-16.6C148.45,3.19,138.55,3.39,135,3.89Zm46.2,12c26.7,5.6,48.6,17.2,68,35.9,21.7,20.8,34.6,43.9,41,73.4,3.1,14.6,3.1,40.8,0,55.4-5.9,27.4-17.3,49-36.1,68.5-20.8,21.7-43.9,34.6-73.4,41-14.6,3.1-40.8,3.1-55.4,0-29.5-6.4-52.6-19.3-73.4-41-18.8-19.5-30.2-41.1-36.1-68.5-3.1-14.6-3.1-40.8,0-55.4,5.9-27.3,17.3-49,35.9-68.4,22.8-23.7,48.4-37.1,80.8-42.4C144.85,12.39,168.25,13.09,181.15,15.89Z"/>
	<path class="cls-1" d="M90.35,87.29c-1.8,1.3-1.9,3-2.2,21.8-.3,19.5-.2,20.5,1.8,23.1s2.4,2.7,12.3,2.7a82.54,82.54,0,0,0,13.9-1c9.5-2.7,17.8-13.5,17.8-23.1,0-10-5.2-18.1-14.5-22.5-4.3-2.1-6.5-2.4-16.1-2.4C95.45,85.89,91.75,86.29,90.35,87.29Zm23.1,11c6.2,2.6,9.1,10.8,6.2,17.8-2,4.9-5.4,6.9-12.7,7.5l-6,.6V96.89h4.5A24.79,24.79,0,0,1,113.45,98.29Z"/>
	<path class="cls-1" d="M149.65,148.59c-34.5,34.6-63,63.8-63.4,65.1-.7,2.8,2.1,6.2,5.1,6.2,2.6,0,127.4-124.4,128.3-127.8.7-2.8-2.1-6.2-5.1-6.2C213.15,85.89,192.45,106,149.65,148.59Z"/>
	<path class="cls-1" d="M189,160.79c-11.1,3.4-17.9,12.8-18,24.7a25.09,25.09,0,0,0,34.1,23.6c8.6-3.2,12.2-7.6,9.5-11.6-2.2-3.4-4.9-3.7-10-1-10.5,5.6-20.6.1-20.6-11.1s9.6-16.6,20.5-11.3c4.2,2.1,4.8,2.1,7.3.7,3.6-2,4.1-6.3,1.1-9.5C208.75,161,196.15,158.59,189,160.79Z"/>
	</g>
	</svg>';
}


/**
 * Merge arrays with deeper levels
 * Makes sure all values are merged, normal array_merge will overwrite subarrays.
 *
 * @param array $new - New array will overwrite old settings.
 * @param array $old - Old array with default settings
 *
 * @return array
 */
function merge_multi_level_array( array $new, array $old ) : array {
	$args = $old;
	foreach ( $new as $key => $value ) {
		if ( gettype( $value ) === 'array' && isset( $old[$key] ) ) {
			$args[$key] = merge_multi_level_array( $value, $old[$key] );
		}else {
			$args[$key] = $value;
		}
	}
	return $args;
}


/**
 * Get all registered blocks
 * Sorts them by type.
 *
 * @return array
 */
function get_all_blocks_by_type() : array {
	$all_blocks    = array_keys( \WP_Block_Type_Registry::get_instance()->get_all_registered() );
	$sorted_blocks = [];
	foreach ( $all_blocks as $i => $block ) {
		$id = explode( '/', $block );

		if ( ! isset( $sorted_blocks[ $id[0] ] ) ) {
			$sorted_blocks[ $id[0] ] = [];
		}

		array_push( $sorted_blocks[ $id[0] ], $block );
	}
	return $sorted_blocks;
}

/**
 * Get path to block assets if exists
 *
 * @param string $filename - Assetname
 * @param string $block_name - Name of block
 *
 * @return string
 */
function get_asset_path( string $block_name, string $file_type, string $location = 'dist'  ) : bool|string {
	if ( $location === 'assets' ) {
		$file_path = '/assets/' . $block_name . '.' . $file_type;
		$full_path = get_template_directory() . DEFAULT_BLOCKS_PATH  .  '/'. $block_name . $file_path;
		$file_src  = get_template_directory_uri() . DEFAULT_BLOCKS_PATH . '/' . $block_name . $file_path;
	}else {
		$full_path = get_template_directory() . '/dist/' . $file_type . '/blocks/'. $block_name . '.' . $file_type;
		$file_src  = get_template_directory_uri() . '/dist/' . $file_type . '/blocks/'. $block_name . '.' . $file_type;
	}
	return ( file_exists( $full_path ) ) ? $file_src : false;
}
