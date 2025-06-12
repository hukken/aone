<?php
/**
 * Plugin Name: Imagify | Fix WP List table fatal error
 * Description: Simply load WP List Table class when needed.
 * Plugin URI:  http://imagify.io/
 * Author:      Imagify Support Team
 * Author URI:  http://imagify.io/
 * License:     GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Copyright SAS WP MEDIA 2023
 */

defined( 'ABSPATH' ) or die();

add_action( 'plugins_loaded', function () {
    if ( ! is_admin() || class_exists( 'WP_List_Table' ) ) {
        return;
    }
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}, 9 );