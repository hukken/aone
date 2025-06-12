<?php

if (!defined('ABSPATH')) exit;

class Post_Types {

	public function init() {
		add_action('init', array($this, 'dc_create_custom_post_types'), 10);
	}
	public function dc_create_custom_post_types() {
		/**
		 * Post type: osloguide
		 *
		 * @return void
		 */
		register_post_type(
				'osloguide',
				array(
						'labels'              => array(
								'name'          => __('Oslo-guide', 'dc'),
								'singular_name' => __('Oslo-guide', 'dc'),
								'plural_name'   => __('Oslo-guide', 'dc')
						),
						'public'              => true,
						'publicly_queryable'  => true,
						'has_archive'         => false,
						'show_in_rest'        => true,
						'menu_icon'           => 'dashicons-buddicons-activity',
						'supports'            => array('title', 'thumbnail', 'editor', 'excerpt', 'permalink', 'location'),
						'template' => array(
								array( 'acf/article-hero', array(
										'lock' => array(
												'move'   => true,
												'remove' => true,
										),
								) ),
								array( 'acf/ingress'),
								array( 'acf/text-media'),
								array( 'acf/multi-col-text',
										array(
												'data' => array(
														'title' => 'Tjenester'
												)
										)
								),
								array( 'core/image' ),
						),
				)
		);

		//add taxonomy for osloguide named area
		register_taxonomy(
				'area',
				array('osloguide'),
				array(
						'labels'            => array(
								'name'          => __('Area', 'dc'),
								'singular_name' => __('Area', 'dc'),
								'plural_name'   => __('Areas', 'dc'),
								'add_new_item'  => __('Add new area', 'dc'),
						),
						'hierarchical'      => true,
						'show_ui'           => true,
						'show_admin_column' => true,
						'show_in_rest'      => true,
						'query_var'         => true,
				)
		);


		/**
		 * Post type: Property with locations
		 *
		 * @return void
		 */
		register_post_type(
				'property',
				array(
						'labels'              => array(
								'name'          => __('Properties', 'dc'),
								'singular_name' => __('Property', 'dc'),
								'plural_name'   => __('Properties', 'dc')
						),
						'public'              => true,
						'publicly_queryable'  => true,
						'has_archive'         => false,
						'show_in_rest'        => true,
						'rewrite' 			  => array( 'slug' => '%location%/%group%' ),
						'menu_icon'           => 'dashicons-admin-network',
						'supports'            => array('title', 'thumbnail', 'editor', 'excerpt', 'permalink', 'location'),
						'template' => array(
								array( 'acf/property-intro', array(
										'lock' => array(
												'move'   => true,
												'remove' => true,
										),
								) ),
								array( 'acf/two-col-text',
										array(
												'data' => array(
														'column_2_title' => 'Detaljer'
												)
										)
								),
								array( 'acf/multi-col-text',
										array(
												'data' => array(
														'title' => 'Fasiliteter'
												)
										)
								),
								array( 'acf/highlight',
										array(
												'data' => array(
														'type'    => 'custom',
														'tagline' => 'Sted',
														'title'    => 'Adresse',
														'button'  => array( 'title' => 'Se i kart', 'url' => 'http://google.no', 'target' => '' )
												)
										)
								),
								array( 'acf/multi-col-text',
										array(
												'data' => array(
														'title' => 'Tjenester'
												)
										)
								),
								array( 'acf/heading-divider' ),
								array( 'acf/book-now' ),
						),
				)
		);
		register_taxonomy(
				'location',
				array('property'),
				array(
						'labels'            => array(
								'name'          => __('Locations', 'dc'),
								'singular_name' => __('Location', 'dc'),
								'plural_name'   => __('Locations', 'dc'),
								'add_new_item'  => __('Add new location', 'dc'),
						),
						'hierarchical'      => true,
						'show_ui'           => true,
						'show_admin_column' => true,
						'show_in_rest'      => true,
						'query_var'         => true,
				)
		);

		register_taxonomy(
				'group',
				array('property'),
				array(
						'labels'            => array(
								'name'          => __('Group', 'dc'),
								'singular_name' => __('Group', 'dc'),
								'plural_name'   => __('Groups', 'dc'),
								'add_new_item'  => __('Add new group', 'dc'),
						),
						'hierarchical'      => true,
						'show_ui'           => true,
						'show_admin_column' => true,
						'show_in_rest'      => true,
						'query_var'         => true,
				)
		);
	}

}

$dcPostTypes = (new Post_Types())->init();

/*
	Change permalink for property post type
*/
function property_custom_link( $post_link, $id = 0 ){
	$post = get_post( $id );
	if ( is_object( $post ) ){
		$locations = wp_get_object_terms( $post->ID, 'location' );
		$groups    = wp_get_object_terms( $post->ID, 'group' );
		if( $locations ) {
			$post_link = str_replace( '%location%' , $locations[0]->slug, $post_link );
		}else {
			$post_link = str_replace( '%location%' , '', $post_link );
		}

		if( $groups ) {
			$post_link = str_replace( '%group%' , $groups[0]->slug, $post_link );
		}else {
			$post_link = str_replace( '/%group%' , '', $post_link );
		}
	}
	return $post_link;
}
add_filter( 'post_type_link', 'property_custom_link', 1, 3 );

function vk_query_vars($qvars){
	if( is_admin() ) return $qvars;

	$post_slug = false;
	foreach ( $qvars as $term => $slug ) {
		$exist = query_term_exist( $term, $qvars );

		if ( ! $exist ) {
			$post_slug = $slug;
		}
	}

	if ( $post_slug ) {
		$post = get_page_by_path( $post_slug, OBJECT, 'property' );

		if ( !$post ) {
			$post = get_page_by_path( $post_slug, OBJECT, 'page' );
		}

		if( $post && ! is_wp_error( $post ) ) {
			$qvars['p'] = $post->ID;
			$qvars['post_type'] = $post->post_type;
		}
	}

	return $qvars;
}
add_filter('request', 'vk_query_vars');


function query_term_exist( $taxonomy_slug, $qvars ) {
	if ( array_key_exists( $taxonomy_slug, $qvars ) ) {
		$query_slug = $qvars[$taxonomy_slug];
		return term_exists( $query_slug, $taxonomy_slug );
	}
}