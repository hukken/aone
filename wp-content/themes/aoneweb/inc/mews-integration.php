<?php

/**
 * Data to be localized and used by the MewsIntegration class
 * @see (src/js/components/MewsIntegration.js)
 */

function add_mews_dependencies() {
	$configuration_ids = get_field('configuration_ids', 'options') ?? [];

	$mews_integration_data = [
		'configurationIds' => [],
		'activeConfigurationID' => [],
		'propertyID' => '',
	];

	foreach ( $configuration_ids as $id ) {
		$mews_integration_data['configurationIds'][$id['location']] = $id['id'];
	}

	// Add the property ID if it exists
	if ( $prop_id = get_field('property_id') ) {
		$mews_integration_data['propertyID'] = $prop_id;
	}

	wp_localize_script('main-script', 'mewsIntegrationData', $mews_integration_data);
}
add_action('wp_enqueue_scripts', 'add_mews_dependencies', 10 );
