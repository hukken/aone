<?php
/**
 * Cookiebot Popup
 * Plugin Name:       Cookiebot Popup
 * Plugin URI:        https://github.com/designcontainer/cookiebot-popup
 * Description:       A GDPR friendly Cookiebot popup.
 * Version:           2.0.1
 * Author:            Design Container
 * Author URI:        https://designcontainer.no
 * Text Domain:       cookiebot-popup
 */

class Cookiebot_Popup {

	private $version;
	private $plugin_name;

	public function __construct() {
		$this->version = '2.0.1';
		$this->plugin_name = 'cookiebot-popup';

		$this->loader();
	}

	/**
	 * Load plugin functions.
	 *
	 * @return void
	 */
	private function loader() {
		// Don't load plugin files if Cookiebot plugin is not active.
		if ( false === $this->is_cookiebot_active() ) {
			return $this->display_error_notice();
		}

		add_filter( 'wp_enqueue_scripts', array( $this, 'styles' ) );
		add_filter( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function styles() {
		wp_enqueue_style(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'build/style.css',
			array(),
			$this->version
		);
	}

	/**
	 * Enqueue scripts.
	 *
	 * @return void
	 */
	public function scripts() {
		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'build/main.js',
			array(),
			$this->version,
			true
		);
	}

	/**
	 * Check if the Cookiebot plugin is active or not.
	 *
	 * @return boolean
	 */
	private function is_cookiebot_active() {
		$cb_plugin = 'cookiebot/cookiebot.php';

		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
		}

		return is_plugin_active( $cb_plugin );
	}

	/**
	 * Displays an error message that says Cookiebot is not active in the admin panel.
	 *
	 * @return void
	 */
	public function display_error_notice() {
		if ( false === is_admin() ) return;
		$class = 'notice notice-error';
		$message = __( 'Cookiebot Popup cannot be loaded. The Cookiebot plugin is not enabled!', $this->plugin_name );
		printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
	}
}

$cookiebot_popup = new Cookiebot_Popup();
