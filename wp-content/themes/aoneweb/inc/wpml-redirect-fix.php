<?php
/**
 * Fix WPML redirection issues for all post types
 */

// Prevent WPML from redirecting posts in query parser
add_filter('wpml_is_redirected', function($redirect, $post_id, $q) {
    // Get the current URL
    $current_url = $_SERVER['REQUEST_URI'];
    
    // If we're accessing a post with /en/ in the URL, prevent redirection
    if (strpos($current_url, '/en/') !== false) {
        return false;
    }
    
    return $redirect;
}, 10, 3);

// Prevent WPML from redirecting posts in frontend redirection
add_filter('wpml_frontend_redirect_target', function($target, $request_uri) {
    // If we're accessing a post with /en/ in the URL, prevent redirection
    if (strpos($request_uri, '/en/') !== false) {
        return false;
    }
    return $target;
}, 10, 2);

// Add a filter to handle URL conversion
add_filter('wpml_url_converter_get_language_from_url', function($language, $url) {
    // If we're accessing a post with /en/ in the URL, force English
    if (strpos($url, '/en/') !== false) {
        return 'en';
    }
    return $language;
}, 10, 2); 