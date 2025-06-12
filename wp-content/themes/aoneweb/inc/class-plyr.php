<?php

if (!defined('ABSPATH')) exit;

/**
 * Embed a video with the Plyr player.
 */
class Plyr {
	
	/**
	 * Video source URL
	 *
	 * @var string
	 */
	public $src;

	/**
	 * Poster image URL
	 *
	 * @var string
	 */
	public $poster;

	public function __construct($src, $poster = null) {
		$this->src = $src;
		$this->poster = $poster;

		$this->id = uniqid();
		$this->valid_extensions = ['mp4', 'webm'];
		$this->type = 'video';
		$this->provider = $this->get_provider();
		$this->source_object = $this->get_source_object();
	}

	/**
	 * Render the Plyr player
	 *
	 * @return void
	 */
	public function render() {
		printf('<video class="plyr-player" id="%s"></video>', $this->id);
		add_action('wp_footer', array($this, 'enqueue_scripts'));
	}

	/**
	 * Get the source provider.
	 * ie: vimeo, youtube.
	 *
	 * @return string|false
	 */
	public function get_provider() {
		if ( $this->is_direct_file() ) return false;
		$url = parse_url($this->src);
		$arr = explode('.', $url['host']);
		$provider = $arr[count($arr) - 2];
		
		// Special cases
		if ( $provider === 'youtu' ) return 'youtube';

		return $provider;
	}

	/**
	 * Manually set the source provider.
	 * ie: vimeo, youtube.
	 *
	 * @param string $provider
	 * @return void
	 */
	public function set_provider($provider) {
		$this->provider = $provider;
	}

	/**
	 * Manually set the player ID.
	 *
	 * @param string $id
	 * @return void
	 */
	public function set_id($id) {
		$this->id = $id;
	}

	/**
	 * Set valid video extensions
	 *
	 * @param array $extensions
	 * @return void
	 */
	public function set_valid_extensions($extensions) {
		$this->valid_extensions = $extensions;
	}

	/**
	 * Check if the source url contains a .mp4 extension.
	 *
	 * @return boolean
	 */
	private function get_extension() {
		$path = parse_url($this->src, PHP_URL_PATH);
		return pathinfo($path, PATHINFO_EXTENSION);
	}

	/**
	 * Check if the source url contains a .mp4 extension.
	 *
	 * @return boolean
	 */
	private function is_direct_file() {
		$extension = $this->get_extension();
		if (in_array($extension, $this->valid_extensions)) return true;
		return false;
	}

	/**
	 * Get the source object
	 *
	 * @return array
	 */
	public function get_source_object() {
		$data = array(
			'type'    => $this->type,
			'sources' => array(
				array(
					'src'      => $this->src,
				),
			),
		);
		// Add a poster if there is one
		if ( $this->poster ) {
			$data['poster'] = $this->poster;
		}
		// Set a provider if there is one.
		if ( $this->provider ) {
			$data['sources'][0]['provider'] = $this->provider;
		}
		// Set YouTube to not track if the provider === youtube.
		if ( $this->provider === 'youtube' ) {
			$data['debug'] = 'true';
			$data['noCookie'] = 'true';
		}
		return $data;
	}

	/**
	 * Manually set the source object.
	 *
	 * @param array $object
	 * @return void
	 */
	public function set_soruce_object($object) {
		$this->source_object = $object;
	}

	/**
	 * Enqueue Plyr scripts
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_script('plyr-script', get_template_directory_uri() . '/dist/js/parts/plyr.js', array(), '3.6.8', true);
		wp_localize_script('plyr-script', 'plyr_source_' . $this->id, $this->source_object);
	}
}