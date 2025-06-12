<?php
/**
 * ACF CUSTOMIZATIONS
 * @package DesignContainer
 */

declare( strict_types=1 );
namespace DesignContainer\ACF;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

/**
 * Add custom toolbars to wysiwyg in ACF fields
 *
 * @param array $toolbars
 * @return array
 */
add_filter( 'acf/fields/wysiwyg/toolbars', __NAMESPACE__ . '\\add_custom_toolbars' );
function add_custom_toolbars( array $toolbars ) : array {

	$toolbars['Only bold' ] = array();
	$toolbars['Only bold' ][1] = array('bold');

	$toolbars['Simple formats'] = array();
	$toolbars['Simple formats'][1] = array('bold' , 'italic' , 'underline' );

	$toolbars['Lists'] = array();
	$toolbars['Lists'][1] = array('bold' , 'italic' , 'underline', 'bullist', 'numlist'  );

	return $toolbars;
}
