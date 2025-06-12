<?php

if (!defined('ABSPATH')) exit;

add_filter( 'dc_block_library_modify_local_build_folder', function( string $path, string $asset_type ): string {
	return '/dist/' . $asset_type . '/blocks/frontend/';
}, 10, 2 );

/*
	Add group name before property title in front end
*/
add_filter('the_title', 'new_title', 10, 2);
function new_title( $title, $id ) {
	if( is_admin() ) return $title;

	if ( 'property' == get_post_type( $id ) ) {
		$group = get_the_terms( $id, 'group' );
		if ( $group ) {
			$title = '<span>' . $group[0]->name . ':</span> ' . $title;
		}
	}
	return $title;
}
