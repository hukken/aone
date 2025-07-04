<?php
/*
Plugin Name: Instagram Feed Pro Developer
Plugin URI: https://smashballoon.com/instagram-feed
Description: Display beautifully clean, customizable, and responsive Instagram feeds
Version: 6.5.1
Author: Smash Balloon
Author URI: https://smashballoon.com/
License: GPLv2 or later
Text Domain: instagram-feed
*/
/*
Copyright 2024  Smash Balloon  (email: hey@smashballoon.com)
This program is paid software; you may not redistribute it under any
circumstances without the expressed written consent of the plugin author.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

use InstagramFeed\Helpers\SB_Instagram_Tracking;
use InstagramFeed\Vendor\Smashballoon\Framework\Packages\Notification\Notices\SBNotices;
use InstagramFeed\Integrations\FeedAnalytics;

require_once trailingslashit(plugin_dir_path(__FILE__)) . 'activation.php';

if ( ! defined( 'SBI_STORE_URL' ) ) {
	define( 'SBI_STORE_URL', 'https://smashballoon.com/' );
}
if ( ! defined( 'SBI_PLUGIN_NAME' ) ) {
	define( 'SBI_PLUGIN_NAME', 'Instagram Feed Pro Developer' );
}
// The ID of the legacy product. Used for renewals
$sbi_download_id = 33751; // 33604, 33748, 33751

// The ID of product for new pricing tier. Used for renewals
// $sbi_download_id = 33751; // 1722826, 1722829, 1722833

if ( ! class_exists( '\InstagramFeed\EDD_SL_Plugin_Updater' ) ) {
	// load custom updater
	include dirname( __FILE__ ) . '/EDD_SL_Plugin_Updater.php';
}

if ( ! defined( 'SBIVER' ) ) {
	define( 'SBIVER', '6.5.1' );
}
// Db version.
if ( ! defined( 'SBI_DBVERSION' ) ) {
	define( 'SBI_DBVERSION', '2.4' );
}
define( 'SBI_WELCOME_VER', '5_12' ); // Update when the Welcome page has new items to show
if ( ! defined( 'SBI_TEXT_DOMAIN' ) ) {
	define( 'SBI_TEXT_DOMAIN', 'instagram-feed' );
}
// Upload folder name for local image files for posts
if ( ! defined( 'SBI_UPLOADS_NAME' ) ) {
	define( 'SBI_UPLOADS_NAME', 'sb-instagram-feed-images' );
}
// Name of the database table that contains instagram posts
if ( ! defined( 'SBI_INSTAGRAM_POSTS_TYPE' ) ) {
	define( 'SBI_INSTAGRAM_POSTS_TYPE', 'sbi_instagram_posts' );
}
// Name of the database table that contains feed ids and the ids of posts
if ( ! defined( 'SBI_INSTAGRAM_FEEDS_POSTS' ) ) {
	define( 'SBI_INSTAGRAM_FEEDS_POSTS', 'sbi_instagram_feeds_posts' );
}
if ( ! defined( 'SBI_INSTAGRAM_FEED_LOCATOR' ) ) {
	define( 'SBI_INSTAGRAM_FEED_LOCATOR', 'sbi_instagram_feed_locator' );
}
if ( ! defined( 'SBI_REFRESH_THRESHOLD_OFFSET' ) ) {
	define( 'SBI_REFRESH_THRESHOLD_OFFSET', 40 * 86400 );
}
if ( ! defined( 'SBI_MINIMUM_INTERVAL' ) ) {
	define( 'SBI_MINIMUM_INTERVAL', 600 );
}
if ( ! defined( 'SBI_MINIMUM_WALL_VERSION' ) ) {
	define( 'SBI_MINIMUM_WALL_VERSION', '1.0' );
}
if ( ! defined( 'SBI_CONNECT_URL' ) ) {
	define( 'SBI_CONNECT_URL', 'https://connect-ig.smashballoon.com/' );
}
if (!defined('SBI_OEMBED_CONNECT_URL')) {
	define('SBI_OEMBED_CONNECT_URL', 'https://connect-tools.smashballoon.com/');
}
if ( ! defined( 'SBI_MAX_SOURCES_LIMIT' ) ) {
	define( 'SBI_MAX_SOURCES_LIMIT', 400 );
}


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( function_exists( 'sb_instagram_feed_init' ) || function_exists( 'display_instagram' ) ) {
	if ( isset( $_POST['oth'] ) ) {
		return;
	}
} else {
	/**
	 * Define constants and load plugin files
	 *
	 * @since  5.0
	 */
	function sb_instagram_feed_init() {
		// Plugin Folder Path.
		if ( ! defined( 'SBI_PLUGIN_DIR' ) ) {
			define( 'SBI_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
		}
		// Plugin Folder URL.
		if ( ! defined( 'SBI_PLUGIN_URL' ) ) {
			define( 'SBI_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
		}
		// Plugin Base Name
		if ( ! defined( 'SBI_PLUGIN_BASENAME' ) ) {
			define( 'SBI_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
		}
		// Plugin Base Name
		if ( ! defined( 'SBI_BACKUP_PREFIX' ) ) {
			define( 'SBI_BACKUP_PREFIX', '!' );
		}
		// Tags prefix
		if ( ! defined( 'SBI_TAGGED_PREFIX' ) ) {
			define( 'SBI_TAGGED_PREFIX', '^' );
		}
		// Plugin Base Name
		if ( ! defined( 'SBI_FPL_PREFIX' ) ) {
			define( 'SBI_FPL_PREFIX', '$' );
		}
		// Plugin Base Name
		if ( ! defined( 'SBI_USE_BACKUP_PREFIX' ) ) {
			define( 'SBI_USE_BACKUP_PREFIX', '&' );
		}
		// Cron Updating Cache Time 60 days
		if ( ! defined( 'SBI_CRON_UPDATE_CACHE_TIME' ) ) {
			define( 'SBI_CRON_UPDATE_CACHE_TIME', 60 * 60 * 24 * 60 );
		}
		// Max Records in Database for Image Resizing
		if ( ! defined( 'SBI_MAX_RECORDS' ) ) {
			define( 'SBI_MAX_RECORDS', 1500 );
		}

		if ( ! defined( 'SBI_BUILDER_DIR' ) ) {
			define( 'SBI_BUILDER_DIR', SBI_PLUGIN_DIR . 'admin/builder/' );
		}

		if ( ! defined( 'SBI_BUILDER_URL' ) ) {
			define( 'SBI_BUILDER_URL', SBI_PLUGIN_URL . 'admin/builder/' );
		}

		require SBI_PLUGIN_DIR . 'vendor/autoload.php';

		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-feed-cache-manager.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/if-functions.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-api-connect.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-cache.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-connected-account.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-cron-updater.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-data-encryption.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-data-manager.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-encryption-keys-manager.php';

		$manager = new SB_Instagram_Data_Manager();
		$manager->init();
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-display-elements.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-feed.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-feed-locator.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-gdpr-integrations.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-oembed.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-parse.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-post.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-post-set.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-posts-manager.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-settings.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-single.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-token-refresher.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/blocks/class-sbi-blocks.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-license-notification.php';

		global $sbi_notices;
		$sbi_notices = SBNotices::instance( 'instagram-feed-pro' );

		$sbi_blocks = new SB_Instagram_Blocks();
		new SB_Instagram_Tracking();
		if ( $sbi_blocks->allow_load() ) {
			$sbi_blocks->load();
		}

		$sbi_license_notification = new LicenseNotification();

		if ( is_admin() ) {
			require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/actions.php';
			require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/class-sbi-account-connector.php';

			if ( version_compare( PHP_VERSION, '5.3.0' ) >= 0
				 && version_compare( get_bloginfo( 'version' ), '4.6', '>=' ) ) {
				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/class-sbi-notifications.php';
				$sbi_notifications = new SBI_Notifications();
				$sbi_notifications->init();

				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/class-sbi-new-user.php';
				$sbi_newuser = new SBI_New_User();
				$sbi_newuser->init();

				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/addon-functions.php';
				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/PluginSilentUpgrader.php';
				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/PluginSilentUpgraderSkin.php';
				require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/class-install-skin.php';
			}

			require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/admin/class-sbi-sitehealth.php';

			$sbi_sitehealth = new SB_Instagram_SiteHealth();

			if ( $sbi_sitehealth->allow_load() ) {
				$sbi_sitehealth->load();
			}
		}
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-widget.php';
		$widget = new \InstagramFeed\SBI_Widget();

		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'widget.php';
		global $sb_instagram_posts_manager;
		$sb_instagram_posts_manager = new SB_Instagram_Posts_Manager();

		include SBI_PLUGIN_DIR . '/inc/Builder/SBI_Feed_Builder.php';
		include SBI_PLUGIN_DIR . '/inc/Builder/SBI_Tooltip_Wizard.php';
		sbi_builder_pro();
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_View.php';

		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_About_Us.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_Admin_Notices.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_Global_Settings.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_HTTP_Request.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_oEmbeds.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_Response.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_Support.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_View.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/SBI_Upgrader_Pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'admin/SBI_Support_Tool.php';
		$sbi_oembed = new InstagramFeed\Admin\SBI_oEmbeds();
		// $sbi_feed_builder     = new SBI_Feed_Builder();
		$sbi_global_settings = new InstagramFeed\Admin\SBI_Global_Settings();
		$sbi_support         = new InstagramFeed\Admin\SBI_Support();
		$sbi_about_us        = new InstagramFeed\Admin\SBI_About_Us();
		// $sbi_tooltip_wizard       = new SBI_Tooltip_Wizard();
		// $sbi_widget               = new SBI_Widget();
		$sbi_admin_notices  = new InstagramFeed\Admin\SBI_Admin_Notices();
		$sbi_tooltip_wizard = new InstagramFeed\Builder\SBI_Tooltip_Wizard();
		InstagramFeed\Integrations\Elementor\SBI_Elementor_Base::instance();

		$sbi_divi_handler = new InstagramFeed\Integrations\Divi\SBI_Divi_Handler();

        $sbi_upgrader_pro			= new InstagramFeed\Admin\SBI_Upgrader_Pro();
		$sbi_upgrader_pro->hooks();

		$db_ver = get_option( 'sbi_db_version', 0 );
		if ( version_compare( $db_ver, '2.0', '>=' ) ) {
			sbiOembedInit();
		}
		$sbi_support_tool = new InstagramFeed\Admin\SBI_Support_Tool();

		$sbi_analytics = new FeedAnalytics();
		$sbi_analytics->loadFilters();
	}

	add_action( 'plugins_loaded', 'sb_instagram_feed_init' );

	function sb_instagram_feed_pro_init() {
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-api-connect-pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-comments.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-cron-update-pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-display-elements-pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-feed-pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-parse-pro.php';
		require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/pro/class-sbi-settings-pro.php';

		SB_Instagram_Comments::init_listeners();
	}

	add_action( 'plugins_loaded', 'sb_instagram_feed_pro_init', 11 );

	/**
	 * Add the custom interval of 30 minutes for cron caching
	 *
	 * @param  array $schedules current list of cron intervals
	 *
	 * @return array
	 *
	 * @since  2.0
	 */
	function sbi_cron_custom_interval( $schedules ) {
		$schedules['sbi30mins'] = array(
			'interval' => 30 * 60,
			'display'  => __( 'Every 30 minutes' )
		);
		$schedules['sbiweekly'] = array(
			'interval' => 3600 * 24 * 7,
			'display'  => __( 'Weekly' )
		);

		return $schedules;
	}

	add_filter( 'cron_schedules', 'sbi_cron_custom_interval' );

	/**
	 * Create database tables, schedule cron events, initiate capabilities
	 *
	 * @param  bool $network_wide is a multisite network activation
	 *
	 * @since  2.0 database tables and capabilities created
	 * @since  1.0
	 */
	function sb_instagram_activate( $network_wide ) {
		// Clear page caching plugins and autoptomize
		require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'inc/if-functions.php';

		if ( is_callable( 'sb_instagram_clear_page_caches' ) ) {
			sb_instagram_clear_page_caches();
		}

		// Run cron twice daily when plugin is first activated for new users
		if ( ! wp_next_scheduled( 'sb_instagram_cron_job' ) ) {
			wp_schedule_event( time(), 'twicedaily', 'sb_instagram_cron_job' );
		}

		if ( ! wp_next_scheduled( 'sb_instagram_twicedaily' ) ) {
			wp_schedule_event( time(), 'twicedaily', 'sb_instagram_twicedaily' );
		}

		if ( ! wp_next_scheduled( 'sb_instagram_feed_issue_email' ) ) {
			sbi_schedule_report_email();
		}

		$sbi_settings = get_option( 'sb_instagram_settings', array() );
		if ( isset( $sbi_settings['sbi_caching_type'] ) && $sbi_settings['sbi_caching_type'] === 'background' ) {
			require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'inc/class-sb-instagram-cron-updater.php';
			SB_Instagram_Cron_Updater::start_cron_job( $sbi_settings['sbi_cache_cron_interval'], $sbi_settings['sbi_cache_cron_time'], $sbi_settings['sbi_cache_cron_am_pm'] );
		}

		require_once trailingslashit( dirname( __FILE__ ) ) . 'inc/class-sb-instagram-posts-manager.php';
		$sb_instagram_posts_manager = new SB_Instagram_Posts_Manager();

		if ( is_multisite() && $network_wide && function_exists( 'get_sites' ) && class_exists( 'WP_Site_Query' ) ) {

			// Get all blogs in the network and activate plugin on each one
			$sites = get_sites();
			foreach ( $sites as $site ) {
				switch_to_blog( $site->blog_id );

				$upload     = wp_upload_dir();
				$upload_dir = $upload['basedir'];
				$upload_dir = trailingslashit( $upload_dir ) . SBI_UPLOADS_NAME;
				if ( ! file_exists( $upload_dir ) ) {
					$created = wp_mkdir_p( $upload_dir );
					if ( $created ) {
						$sb_instagram_posts_manager->remove_error( 'storage' );
					} else {
						global $sb_instagram_posts_manager;
						$details = array( 'error_message' => __( 'There was an error creating the folder for storing resized images.', 'instagram-feed' ) . ' ' . $upload_dir );
						$sb_instagram_posts_manager->add_error( 'image_editor', $details );
					}
				} else {
					$sb_instagram_posts_manager->remove_error( 'storage' );
				}

				sbi_create_database_table();
				restore_current_blog();
			}
		} else {
			$upload     = wp_upload_dir();
			$upload_dir = $upload['basedir'];
			$upload_dir = trailingslashit( $upload_dir ) . SBI_UPLOADS_NAME;
			if ( ! file_exists( $upload_dir ) ) {
				$created = wp_mkdir_p( $upload_dir );
				if ( $created ) {
					$sb_instagram_posts_manager->remove_error( 'upload_dir' );
				} else {
					$sb_instagram_posts_manager->add_error( 'storage', __( 'There was an error creating the folder for storing resized images.', 'instagram-feed' ) . ' ' . $upload_dir );
				}
			} else {
				$sb_instagram_posts_manager->remove_error( 'upload_dir' );
			}

			sbi_create_database_table();
		}

		global $wp_roles;
		$wp_roles->add_cap( 'administrator', 'manage_instagram_feed_options' );
		if ( ! wp_next_scheduled( 'sbi_notification_update' ) ) {
			$timestamp    = strtotime( 'next monday' );
			$timestamp    = $timestamp + ( 3600 * 24 * 7 );
			$six_am_local = $timestamp + sbi_get_utc_offset() + ( 6 * 60 * 60 );

			wp_schedule_event( $six_am_local, 'sbiweekly', 'sbi_notification_update' );
		}
	}

	register_activation_hook( __FILE__, 'sb_instagram_activate' );

	/**
	 * Stop cron events when deactivated
	 *
	 * @since  1.0
	 */
	function sb_instagram_deactivate() {
		wp_clear_scheduled_hook( 'sb_instagram_twicedaily' );
		wp_clear_scheduled_hook( 'sb_instagram_cron_job' );
		wp_clear_scheduled_hook( 'sb_instagram_feed_issue_email' );
		wp_clear_scheduled_hook( 'sbi_notification_update' );
        InstagramFeed\Admin\SBI_Support_Tool::delete_temp_user();
	}

	register_deactivation_hook( __FILE__, 'sb_instagram_deactivate' );

	/**
	 * Creates custom database tables and directory for storing custom
	 * images
	 *
	 * @since  2.0
	 */
	function sbi_create_database_table( $include_charset_collate = true ) {
		if ( ! function_exists( 'dbDelta' ) ) {
			require_once ABSPATH . '/wp-admin/includes/upgrade.php';
		}

		global $wpdb;
		$max_index_length = 191;
		$charset_collate  = '';
		if ( $include_charset_collate && method_exists( $wpdb, 'get_charset_collate' ) ) { // get_charset_collate introduced in WP 3.5
			$charset_collate = $wpdb->get_charset_collate();
		}

		global $wpdb;
		global $sb_instagram_posts_manager;

		$had_error = false;

		if ( ! isset( $sb_instagram_posts_manager ) ) {
			require_once trailingslashit( dirname( __FILE__ ) ) . 'inc/class-sb-instagram-posts-manager.php';
			$sb_instagram_posts_manager = new SB_Instagram_Posts_Manager();
		}

		$table_name = esc_sql( $wpdb->prefix . SBI_INSTAGRAM_POSTS_TYPE );

		if ( $wpdb->get_var( "show tables like '$table_name'" ) !== $table_name ) {
			$sql = 'CREATE TABLE ' . $table_name . " (
            id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            created_on DATETIME,
            instagram_id VARCHAR(1000) DEFAULT '' NOT NULL,
            time_stamp DATETIME,
            top_time_stamp DATETIME,
            json_data LONGTEXT DEFAULT '' NOT NULL,
            media_id VARCHAR(1000) DEFAULT '' NOT NULL,
            sizes VARCHAR(1000) DEFAULT '' NOT NULL,
            aspect_ratio DECIMAL (4,2) DEFAULT 0 NOT NULL,
            images_done TINYINT(1) DEFAULT 0 NOT NULL,
            last_requested DATE,
			mime_type VARCHAR(100) DEFAULT '' NOT NULL
        ) $charset_collate;";
			$wpdb->query( $sql );
		}
		$error = $wpdb->last_error;
		$query = $wpdb->last_query;

		if ( $wpdb->get_var( "show tables like '$table_name'" ) !== $table_name ) {
			$had_error = true;
			$sb_instagram_posts_manager->add_error( 'database_create', '<strong>' . __( 'There was an error when trying to create the database tables used for resizing images.', 'instagram-feed' ) . '</strong><br>' . $error . '<br><code>' . $query . '</code>' );
		}

		// Check if the 'mime_type' column exists.
		$column_exists = $wpdb->get_results( "SHOW COLUMNS FROM $table_name LIKE 'mime_type'" );
		if ( empty( $column_exists ) ) {
			$wpdb->query( "ALTER TABLE $table_name ADD COLUMN mime_type VARCHAR(100) DEFAULT '' NOT NULL" );
		}

		$feeds_posts_table_name = esc_sql( $wpdb->prefix . SBI_INSTAGRAM_FEEDS_POSTS );

		if ( $wpdb->get_var( "show tables like '$feeds_posts_table_name'" ) != $feeds_posts_table_name ) {
			$sql = 'CREATE TABLE ' . $feeds_posts_table_name . " (
			record_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            id INT(11) UNSIGNED NOT NULL,
            instagram_id VARCHAR(1000) DEFAULT '' NOT NULL,
            feed_id VARCHAR(1000) DEFAULT '' NOT NULL,
            hashtag VARCHAR(1000) DEFAULT '' NOT NULL,
            INDEX hashtag (hashtag($max_index_length)),
            INDEX feed_id (feed_id($max_index_length))
        ) $charset_collate;";
			$wpdb->query( $sql );
			$sbi_statuses_option = get_option( 'sbi_statuses', array() );

			$sbi_statuses_option['database']['hashtag_column'] = true;

			update_option( 'sbi_statuses', $sbi_statuses_option );
		}
		$error = $wpdb->last_error;
		$query = $wpdb->last_query;

		if ( $wpdb->get_var( "show tables like '$feeds_posts_table_name'" ) != $feeds_posts_table_name ) {
			$had_error = true;
			$sb_instagram_posts_manager->add_error( 'database_create', '<strong>' . __( 'There was an error when trying to create the database tables used for resizing images.', 'instagram-feed' ) . '</strong><br>' . $error . '<br><code>' . $query . '</code>' );
		}

		if ( ! $had_error ) {
			$sb_instagram_posts_manager->remove_error( 'database_create' );
		}
	}

	/**
	 * Compares previous plugin version and updates database related
	 * items as needed
	 *
	 * @since  2.0
	 */
	function sbi_check_for_db_updates() {

		$db_ver = get_option( 'sbi_db_version', 0 );

		if ( $db_ver === 0 ) {
			$keys_manager = new SBI_Ecnryption_Keys_Manager( 'SBI_ENCRYPTION_KEY', 'SBI_ENCRYPTION_SALT' );

			$sbi_statuses_option                          = get_option( 'sbi_statuses', array() );
			$sbi_statuses_option['added_encryption_keys'] = false !== $keys_manager->set_constants();

			update_option( 'sbi_statuses', $sbi_statuses_option );
		}

		if ( (float) $db_ver < 1.2 ) {

			global $wp_roles;
			$wp_roles->add_cap( 'administrator', 'manage_instagram_feed_options' );

			$upload     = wp_upload_dir();
			$upload_dir = $upload['basedir'];
			$upload_dir = trailingslashit( $upload_dir ) . SBI_UPLOADS_NAME;
			if ( ! file_exists( $upload_dir ) ) {
				$created = wp_mkdir_p( $upload_dir );
			}

			sbi_create_database_table();

			// Delete all transients
			global $wpdb;
			$table_name = $wpdb->prefix . 'options';
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
        "
			);
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_sbi\_%')
        "
			);
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_&sbi\_%')
        "
			);
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_&sbi\_%')
        "
			);
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_\$sbi\_%')
        "
			);
			$wpdb->query(
				"
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_\$sbi\_%')
        "
			);

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.4 ) {
			if ( ! wp_next_scheduled( 'sb_instagram_twicedaily' ) ) {
				wp_schedule_event( time(), 'twicedaily', 'sb_instagram_twicedaily' );
			}

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.5 ) {
			if ( ! wp_next_scheduled( 'sb_instagram_feed_issue_email' ) ) {
				$timestamp    = strtotime( 'next monday' );
				$timestamp    = $timestamp + ( 3600 * 24 * 7 );
				$six_am_local = $timestamp + sbi_get_utc_offset() + ( 6 * 60 * 60 );

				wp_schedule_event( $six_am_local, 'sbiweekly', 'sb_instagram_feed_issue_email' );
			}

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.6 ) {
			if ( ! wp_next_scheduled( 'sbi_notification_update' ) ) {
				$timestamp    = strtotime( 'next monday' );
				$timestamp    = $timestamp + ( 3600 * 24 * 7 );
				$six_am_local = $timestamp + sbi_get_utc_offset() + ( 6 * 60 * 60 );

				wp_schedule_event( $six_am_local, 'sbiweekly', 'sbi_notification_update' );
			}

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.7 ) {
			include_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-gdpr-integrations.php';
			$sbi_options      = get_option( 'sb_instagram_settings', array() );
			$disable_resizing = isset( $sbi_options['sb_instagram_disable_resize'] ) ? $sbi_options['sb_instagram_disable_resize'] === 'on' || $sbi_options['sb_instagram_disable_resize'] === true : false;

			$sbi_statuses_option = get_option( 'sbi_statuses', array() );

			if ( $disable_resizing || ! SB_Instagram_GDPR_Integrations::gdpr_tests_successful( true ) ) {
				$sbi_statuses_option['gdpr']['from_update_success'] = false;
			} else {
				$sbi_statuses_option['gdpr']['from_update_success'] = true;
			}

			update_option( 'sbi_statuses', $sbi_statuses_option );

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.8 ) {
			$sbi_statuses_option = get_option( 'sbi_statuses', array() );

			if ( empty( $sbi_statuses_option['database']['hashtag_column'] ) ) {
				global $wpdb;

				$table_name = $wpdb->prefix . SBI_INSTAGRAM_FEEDS_POSTS;
				$wpdb->query( "ALTER TABLE $table_name ADD hashtag VARCHAR(1000) NOT NULL;" );

				$wpdb->query( "ALTER TABLE $table_name ADD INDEX hashtag (hashtag(100))" );

				$sbi_statuses_option['database']['hashtag_column'] = true;
				update_option( 'sbi_statuses', $sbi_statuses_option );

			}

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.9 ) {
			include_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-posts-manager.php';
			include_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-feed-locator.php';

			SB_Instagram_Feed_Locator::create_table();

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( (float) $db_ver < 1.91 ) {
			$manager = new SB_Instagram_Data_Manager();
			$manager->update_db_for_dpa();

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		/**
		 * for 4.0 update
		 */
		if ( (float) $db_ver < 2.0 ) {
			$sbi_statuses_option = get_option( 'sbi_statuses', array() );
			$options             = get_option( 'sb_instagram_settings', array() );
			$db                  = sbi_get_database_settings();

			$connected_accounts = isset( $options['connected_accounts'] ) ? $options['connected_accounts'] : array();

			\InstagramFeed\Builder\SBI_Db::create_tables();
			update_option( 'sbi_db_version', SBI_DBVERSION );

			$options_support_legacy = false;
			if ( ! empty( $connected_accounts ) ) {
				\InstagramFeed\Builder\SBI_Source::set_legacy_source_queue();

				$sbi_statuses_option['legacy_source_queue'] = \InstagramFeed\Builder\SBI_Source::batch_process_legacy_source_queue();
				$options_support_legacy                     = true;

				/** Caching Type */
				if ( ! empty( $db['sbi_caching_type'] ) && $db['sbi_caching_type'] === 'page' ) {
					if ( ! empty( $db['sb_instagram_cache_time_unit'] ) && $db['sb_instagram_cache_time_unit'] === 'minutes' ) {
						if ( (int) $db['sb_instagram_cache_time'] < 30 ) {
							$db['legacy_page_cache'] = max( (int) $db['sb_instagram_cache_time'], 1 );
						}

						$db['sbi_cache_cron_interval'] = '30mins';

						update_option( 'sb_instagram_settings', $db );
					}
					include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'inc/class-sb-instagram-cron-updater.php';
					SB_Instagram_Cron_Updater::start_cron_job( $db['sbi_cache_cron_interval'], $db['sbi_cache_cron_time'], $db['sbi_cache_cron_am_pm'] );
				}
				/** End Caching Type */

				if ( sbi_is_pro_version() ) {
					$base_settings = \SB_Instagram_Settings_Pro::legacy_shortcode_atts( array(), $db );
				} else {
					$base_settings = \SB_Instagram_Settings::legacy_shortcode_atts( array(), $db );
				}

				if ( $base_settings['type'] === 'user' ) {
					if ( ! empty( $base_settings['id'] ) ) {
						$base_settings['user'] = array();
						foreach ( $base_settings['id'] as $id ) {
							if ( ! empty( $connected_accounts[ $id ] ) ) {
								$base_settings['user'][] = $connected_accounts[ $id ]['username'];
							}
						}
					}
				} elseif ( $base_settings['type'] === 'tagged' ) {
					if ( ! empty( $base_settings['tagged'] ) ) {
						$base_settings['user'] = array();
						foreach ( $base_settings['tagged'] as $id ) {
							if ( ! empty( $connected_accounts[ $id ] ) ) {
								$base_settings['user'][] = $connected_accounts[ $id ]['username'];
							}
						}
					}
				}

				update_option( 'sbi_legacy_feed_settings', sbi_json_encode( $base_settings ), false );
			}

			// how many legacy feeds?
			$args       = array(
				'html_location' => array( 'header', 'footer', 'sidebar', 'content', 'unknown' ),
				'group_by'      => 'shortcode_atts',
				'page'          => 1
			);
			$feeds_data = \SB_Instagram_Feed_Locator::legacy_instagram_feed_locator_query( $args );
			$num_legacy = count( $feeds_data );

			$sbi_statuses_option['support_legacy_shortcode'] = $options_support_legacy;

			if ( $num_legacy > 0 ) {

				if ( $num_legacy > 1 ) {
					$sbi_statuses_option['legacy_onboarding']        = array(
						'active' => true,
						'type'   => 'multiple'
					);
					$sbi_statuses_option['support_legacy_shortcode'] = true;
				} else {
					$sbi_statuses_option['legacy_onboarding'] = array(
						'active' => true,
						'type'   => 'single'
					);

					$shortcode_atts = ! empty( $feeds_data[0] ) && $feeds_data[0]['shortcode_atts'] != '[""]' ? json_decode( $feeds_data[0]['shortcode_atts'], true ) : array();
					$shortcode_atts = is_array( $shortcode_atts ) ? $shortcode_atts : array();

					$sbi_statuses_option['support_legacy_shortcode'] = $shortcode_atts;

					$shortcode_atts['from_update'] = true;

					$db = sbi_get_database_settings();
					if ( sbi_is_pro_version() ) {
						$base_settings = \SB_Instagram_Settings_Pro::legacy_shortcode_atts( $shortcode_atts, $db );
					} else {
						$base_settings = \SB_Instagram_Settings::legacy_shortcode_atts( $shortcode_atts, $db );
					}

					$feed_saver = new \InstagramFeed\Builder\SBI_Feed_Saver( false );
					$feed_saver->set_data( $base_settings );

					if ( $base_settings['type'] === 'hashtag' ) {
						$feed_name = str_replace( ',', ' ', $base_settings['hashtag'] );
					} else {

						if ( $base_settings['type'] === 'user' ) {
							if ( ! empty( $base_settings['id'] ) ) {
								$base_settings['user'] = array();
								foreach ( $base_settings['id'] as $id ) {
									if ( ! empty( $connected_accounts[ $id ] ) ) {
										$base_settings['user'][] = $connected_accounts[ $id ]['username'];
									}
								}
							}
						} elseif ( $base_settings['type'] === 'tagged' ) {
							if ( ! empty( $base_settings['tagged'] ) ) {
								$base_settings['user'] = array();
								foreach ( $base_settings['tagged'] as $id ) {
									if ( ! empty( $connected_accounts[ $id ] ) ) {
										$base_settings['user'][] = $connected_accounts[ $id ]['username'];
									}
								}
							}
						}

						$feed_name = 'My Feed';
						if ( ! empty( $base_settings['user'] ) ) {
							$feed_name = implode( ', ', $base_settings['user'] );
							$feed_name = trim( $feed_name );
						}
					}

					$feed_saver->set_feed_name( $feed_name );

					$new_feed_id = $feed_saver->update_or_insert();

					$args = array(
						'new_feed_id'    => $new_feed_id,
						'legacy_feed_id' => $feeds_data[0]['feed_id'],
					);

					SB_Instagram_Feed_Locator::update_legacy_to_builder( $args );
				}
			} elseif ( $num_legacy === 0 && $options_support_legacy ) {
				$sbi_statuses_option['support_legacy_shortcode'] = true;
			}

			if ( ! wp_next_scheduled( 'sbi_feed_update' ) ) {
				wp_schedule_event( time() + 60, 'twicedaily', 'sbi_feed_update' );
			}

			$sbi_rating_notice = get_option( 'sbi_rating_notice', '' );

			if ( $sbi_rating_notice !== 'dismissed' ) {
				$sbi_statuses_option['first_install'] = empty( $sbi_statuses_option['first_install'] ) ? time() : $sbi_statuses_option['first_install'];
				$sbi_rating_notice_option             = get_option( 'sbi_rating_notice', false );
				$sbi_rating_notice_waiting            = get_transient( 'instagram_feed_rating_notice_waiting' );
				if ( $sbi_rating_notice_waiting === false
					 && $sbi_rating_notice_option === false ) {
					$time = 2 * WEEK_IN_SECONDS;
					set_transient( 'instagram_feed_rating_notice_waiting', 'waiting', $time );
					update_option( 'sbi_rating_notice', 'pending', false );
				}
			}

			update_option( 'sbi_statuses', $sbi_statuses_option, true );
		}

		if ( version_compare( $db_ver, '2.3', '<' ) ) {
			$sbi_statuses = get_option( 'sbi_statuses', array() );

			if ( empty( $sbi_statuses['database']['mime_type_column'] ) ) {
				global $wpdb;

				$table_name = esc_sql( $wpdb->prefix . SBI_INSTAGRAM_POSTS_TYPE );
				$column_exists = $wpdb->get_results( "SHOW COLUMNS FROM $table_name LIKE 'mime_type'" );
				if ( empty( $column_exists ) ) {
					$wpdb->query( "ALTER TABLE $table_name ADD COLUMN mime_type VARCHAR(100) DEFAULT '' NOT NULL" );
				}

				$sbi_statuses['database']['mime_type_column'] = true;
				update_option( 'sbi_statuses', $sbi_statuses );
			}

			update_option( 'sbi_db_version', SBI_DBVERSION );
		}

		if ( version_compare( $db_ver, '2.4', '<' ) ) {
			global $wpdb;
			$sbi_statuses = get_option('sbi_statuses', array());
			$sbi_statuses = is_array($sbi_statuses) ? $sbi_statuses : array();

			if (empty($sbi_statuses['database']['connect_type_column'])) {
				$table_name = esc_sql($wpdb->prefix . 'sbi_sources');
				$column_exists = $wpdb->get_results("SHOW COLUMNS FROM $table_name LIKE 'connect_type'");
				if (empty($column_exists)) {
					$wpdb->query("ALTER TABLE $table_name ADD COLUMN connect_type VARCHAR(100) DEFAULT '' NOT NULL");
					$wpdb->query("
						UPDATE $table_name 
						SET connect_type = CASE 
							WHEN account_type = 'business' THEN 'business_advanced' 
							ELSE 'personal' 
						END
					");
				}

				$sbi_statuses['database'] = is_array($sbi_statuses['database']) ? $sbi_statuses['database'] : array();
				$sbi_statuses['database']['connect_type_column'] = true;
			}

			if (empty($sbi_statuses['source_details_update'])) {
				$feeds_table_name = esc_sql($wpdb->prefix . 'sbi_feeds');
				$feeds = $wpdb->get_results("SELECT * FROM $feeds_table_name");

				if (!empty($feeds) && is_array($feeds)) {
					foreach ($feeds as $feed) {
						if (!isset($feed->id, $feed->feed_name, $feed->settings)) {
							continue;
						}

						$feed_id = $feed->id;
						$feed_name = $feed->feed_name;
						$settings = json_decode($feed->settings, true);
						$settings = is_array($settings) ? $settings : array();

						if (empty($settings['id'])) {
							continue;
						}

						$source_ids = $settings['id'];
						$args = array('id' => $source_ids);
						$source_query = \InstagramFeed\Builder\SBI_Db::source_query($args);

						$source_details = array();
						if (!empty($source_query) && is_array($source_query)) {
							foreach ($source_query as $source) {
								if (isset($source['account_id'], $source['username'])) {
									$source_details[] = array(
										'id' => $source['account_id'],
										'username' => $source['username']
									);
								}
							}
						}
						$settings['feed_name'] = $feed_name;
						$settings['source_details'] = $source_details;

						$feed_saver = new \InstagramFeed\Builder\SBI_Feed_Saver($feed_id);
						$feed_saver->set_feed_name($feed_name);
						$feed_saver->set_data($settings);
						$feed_saver->update_or_insert();
					}
				}
				$sbi_statuses['source_details_update'] = true;
			}

			update_option('sbi_statuses', $sbi_statuses);
			update_option('sbi_db_version', SBI_DBVERSION);
		}

	}
	add_action( 'wp_loaded', 'sbi_check_for_db_updates' );

	/**
	 * Deletes saved data for the plugin unless setting to preserve
	 * settings is enabled
	 *
	 * @since  2.0 custom tables, custom images, and image directory deleted
	 * @since  1.0
	 */
	function sb_instagram_uninstall() {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		$is_pro = !defined('SBI_PLUGIN_NAME') || SBI_PLUGIN_NAME !== 'Instagram Feed Free';

		$installed_plugins = get_plugins();

		$free_plugin_is_installed = isset($installed_plugins['instagram-feed/instagram-feed.php']);
		$pro_plugin_is_installed = isset($installed_plugins['instagram-feed-pro/instagram-feed.php']);

		if (($is_pro && $free_plugin_is_installed) || (!$is_pro && $pro_plugin_is_installed)) {
			// Do nothing.
			return;
		}

		// If the user is preserving the settings then don't delete them
		$options                        = get_option( 'sb_instagram_settings', array() );
		$sb_instagram_preserve_settings = isset( $options['sb_instagram_preserve_settings'] ) ? $options['sb_instagram_preserve_settings'] : false;

		/*
		 ALL platform Data */
		/* Backup Caches */
		global $wpdb;
		$table_name = $wpdb->prefix . 'options';

		$wpdb->query(
			"
	    DELETE
	    FROM $table_name
	    WHERE `option_name` LIKE ('%!sbi\_%')
	    "
		);
		$wpdb->query(
			"
	    DELETE
	    FROM $table_name
	    WHERE `option_name` LIKE ('%\_transient\_&sbi\_%')
	    "
		);
		$wpdb->query(
			"
	    DELETE
	    FROM $table_name
	    WHERE `option_name` LIKE ('%\_transient\_timeout\_&sbi\_%')
    "
		);

		/*
		 Regular Caches */
		// Delete all transients
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
		        "
		);
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_timeout\_sbi\_%')
		        "
		);
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_&sbi\_%')
		        "
		);
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_timeout\_&sbi\_%')
		        "
		);
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_\$sbi\_%')
		        "
		);
		$wpdb->query(
			"
		        DELETE
		        FROM $table_name
		        WHERE `option_name` LIKE ('%\_transient\_timeout\_\$sbi\_%')
            "
		);

		delete_option( 'sbi_single_cache' );
		delete_transient( 'sbinst_comment_cache' );
		delete_option( 'sbi_oembed_token' );
		// image resizing
		$upload                 = wp_upload_dir();
		$posts_table_name       = $wpdb->prefix . 'sbi_instagram_posts';
		$feeds_posts_table_name = esc_sql( $wpdb->prefix . 'sbi_instagram_feeds_posts' );

		$image_files = glob( trailingslashit( $upload['basedir'] ) . trailingslashit( 'sb-instagram-feed-images' ) . '*' ); // get all file names
		foreach ( $image_files as $file ) { // iterate files
			if ( is_file( $file ) ) {
				unlink( $file );
			} // delete file
		}

		global $wp_filesystem;

		$wp_filesystem->delete( trailingslashit( $upload['basedir'] ) . trailingslashit( 'sb-instagram-feed-images' ), true );
		// Delete tables
		$wpdb->query( "DROP TABLE IF EXISTS $posts_table_name" );
		$wpdb->query( "DROP TABLE IF EXISTS $feeds_posts_table_name" );
		$locator_table_name = $wpdb->prefix . SBI_INSTAGRAM_FEED_LOCATOR;
		$wpdb->query( "DROP TABLE IF EXISTS $locator_table_name" );

		$table_name = $wpdb->prefix . 'options';
		$wpdb->query(
			"
			        DELETE
			        FROM $table_name
			        WHERE `option_name` LIKE ('%\_transient\_\$sbi\_%')
			        "
		);
		$wpdb->query(
			"
			        DELETE
			        FROM $table_name
			        WHERE `option_name` LIKE ('%\_transient\_timeout\_\$sbi\_%')
			        "
		);
		delete_option( 'sbi_db_version' );

		$feed_caches_table_name = $wpdb->prefix . 'sbi_feed_caches';
		$wpdb->query( "DROP TABLE IF EXISTS $feed_caches_table_name" );

		$sources_table_name = $wpdb->prefix . 'sbi_sources';
		$wpdb->query( "DROP TABLE IF EXISTS $sources_table_name" );

		$table_name = $wpdb->prefix . 'options';
		$wpdb->query(
			"
	        DELETE
	        FROM $table_name
	        WHERE `option_name` LIKE ('%\_transient\_\$sbi\_%')
	        "
		);
		$wpdb->query(
			"
	        DELETE
	        FROM $table_name
	        WHERE `option_name` LIKE ('%\_transient\_timeout\_\$sbi\_%')
	        "
		);
		$wpdb->query(
			"
	        DELETE
	        FROM $table_name
	        WHERE `option_name` LIKE ('%!sbi\_%')
        "
		);
		$wpdb->query(
			"
	        DELETE
	        FROM $table_name
	        WHERE `option_name` LIKE ('%\_transient\_&sbi\_%')
        "
		);
		$wpdb->query(
			"
	        DELETE
	        FROM $table_name
	        WHERE `option_name` LIKE ('%\_transient\_timeout\_&sbi\_%')
        "
		);

		delete_option( 'sbi_hashtag_ids' );
		delete_option( 'sbi_hashtag_ids_with_connected_accounts' );
		delete_option( 'sbi_local_avatars' );
		delete_option( 'sbi_local_avatars_info' );

		/* End Platform Data */
		if ( $sb_instagram_preserve_settings ) {
			return;
		}

		require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'inc/class-sb-instagram-encryption-keys-manager.php';
		$keys_manager = new SBI_Ecnryption_Keys_Manager( 'SBI_ENCRYPTION_KEY', 'SBI_ENCRYPTION_SALT' );
		$keys_manager->remove_keys();

		// Delete tables
		$wpdb->query( "DROP TABLE IF EXISTS $posts_table_name" );
		$wpdb->query( "DROP TABLE IF EXISTS $feeds_posts_table_name" );
		$locator_table_name = $wpdb->prefix . SBI_INSTAGRAM_FEED_LOCATOR;
		$wpdb->query( "DROP TABLE IF EXISTS $locator_table_name" );

		$feeds_table_name = $wpdb->prefix . 'sbi_feeds';
		$wpdb->query( "DROP TABLE IF EXISTS $feeds_table_name" );

		$table_name = esc_sql( $wpdb->prefix . 'postmeta' );
		$result     = $wpdb->query(
			"
		    DELETE
		    FROM $table_name
		    WHERE meta_key = '_sbi_oembed_done_checking';"
		);

		$usermeta_table_name = $wpdb->prefix . 'usermeta';
		$result              = $wpdb->query(
			"
	        DELETE
	        FROM $usermeta_table_name
	        WHERE meta_key LIKE ('sbi\_%')
	        "
		);

		delete_option( 'sb_instagram_errors' );
		delete_option( 'sbi_usage_tracking_config' );
		delete_option( 'sbi_usage_tracking' );
		delete_option( 'sbi_oembed_token' );
		delete_option( 'sbi_top_api_calls' );
		delete_option( 'sbi_rating_notice' );
		delete_option( 'sbi_refresh_report' );
		delete_option( 'sbi_welcome_seen' );
		delete_option( 'sbi_notifications' );
		delete_option( 'sbi_newuser_notifications' );
		delete_option( 'sbi_statuses' );
		delete_option( 'sb_instagram_settings' );
		delete_option( 'sbi_ver' );
		delete_option( 'sb_expired_tokens' );
		delete_option( 'sbi_cron_report' );
		delete_option( 'sb_instagram_ajax_status' );
		delete_option( 'sbi_legacy_feed_settings' );
		delete_option( 'sbi_check_license_api_when_expires' );
		delete_option( 'sbi_check_license_api_post_grace_period' );
		delete_option( 'sbi_license_last_check_timestamp' );
		delete_option( 'sbi_license_data' );
		delete_option( 'sbi_license_key' );
		delete_option( 'sbi_license_status' );

		global $wp_roles;
		$wp_roles->remove_cap( 'administrator', 'manage_instagram_feed_options' );
		wp_clear_scheduled_hook( 'sbi_feed_update' );
		wp_clear_scheduled_hook( 'sbi_usage_tracking_cron' );

		delete_option('sb_instagram_feed_notices');
		delete_option('sb_instagram_feed_group_notices');
	}

	register_uninstall_hook( __FILE__, 'sb_instagram_uninstall' );

	/**
	 * Create database tables for sub-site if multisite
	 *
	 * @param  int    $blog_id
	 * @param  int    $user_id
	 * @param  string $domain
	 * @param  string $path
	 * @param  string $site_id
	 * @param  array  $meta
	 *
	 * @since  2.0
	 */
	function sbi_on_create_blog( $blog_id, $user_id, $domain, $path, $site_id, $meta ) {
		if ( is_plugin_active_for_network( 'instagram-feed-pro/instagram-feed.php' ) ) {
			switch_to_blog( $blog_id );
			sbi_create_database_table();
			restore_current_blog();
		}
	}

	add_action( 'wpmu_new_blog', 'sbi_on_create_blog', 10, 6 );

	/**
	 * Delete custom tables if not preserving settings
	 *
	 * @param  array $tables tables to drop
	 *
	 * @return array
	 *
	 * @since  2.0
	 */
	function sbi_on_delete_blog( $tables ) {
		$options                        = get_option( 'sb_instagram_settings' );
		$sb_instagram_preserve_settings = $options['sb_instagram_preserve_settings'];
		if ( $sb_instagram_preserve_settings ) {
			return;
		}

		global $wpdb;
		$tables[] = $wpdb->prefix . SBI_INSTAGRAM_POSTS_TYPE;
		$tables[] = $wpdb->prefix . SBI_INSTAGRAM_FEEDS_POSTS;

		return $tables;
	}

	add_filter( 'wpmu_drop_tables', 'sbi_on_delete_blog' );

	function sb_instagram_plugin_updater() {
		// retrieve license key from the DB
		$sbi_license_key = trim( get_option( 'sbi_license_key' ) );

		// setup the updater
		$edd_updater = new InstagramFeed\EDD_SL_Plugin_Updater(
			SBI_STORE_URL,
			__FILE__,
			array(
				'version'   => SBIVER,                   // current version number
				'license'   => $sbi_license_key,        // license key
				'item_name' => SBI_PLUGIN_NAME,         // name of this plugin
				'author'    => 'Smash Balloon'          // author of this plugin
			)
		);
	}
	add_action( 'admin_init', 'sb_instagram_plugin_updater', 0 );

	function sbi_text_domain() {
		load_plugin_textdomain( 'instagram-feed', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	add_action( 'init', 'sbi_text_domain' );

	function sbi_do_token_refreshes() {
		$basic_sources = \InstagramFeed\Builder\SBI_Source::get_expiring();

		$connected_accounts = \InstagramFeed\Builder\SBI_Source::convert_sources_to_connected_accounts( $basic_sources );
		if ( is_array( $connected_accounts ) && ! empty( $connected_accounts ) ) {
			require_once trailingslashit( SBI_PLUGIN_DIR ) . 'inc/class-sb-instagram-token-refresher.php';

			$report = array(
				'notes' => array(
					'time_ran' => date( 'Y-m-d H:i:s' )
				),
			);
			foreach ( $connected_accounts as $connected_account ) {
				$refresher = new SB_Instagram_Token_Refresher( $connected_account );
				$refresher->attempt_token_refresh();
				if ( $refresher->get_last_error_code() === 10 ) {
					sbi_update_connected_account( $connected_account['user_id'], array( 'private' => true ) );
				}

				$report[ $connected_account['user_id'] ] = $refresher->get_report();
			}

			update_option( 'sbi_refresh_report', $report, false );
		}
	}
	add_action( 'sb_instagram_twicedaily', 'sbi_do_token_refreshes' );
}


// BUILDER CODE
function sbi_builder_pro() {
	return InstagramFeed\Builder\SBI_Feed_Builder::instance();
}
