<?php

/**
 * Wrap all blocks except ACF blocks in Foundation grid.
 *
 */
class Grid_Vendor_Blocks {

	/**
	 * The Content
	 *
	 * @var string
	 */
	public $content;
	public $content_filtered;
	public $excluded = [];
	public $core_block_container_classes = [ 'block-section-wrapper' ];

	public function __construct( string $content, array $excluded = [] ) {
		$this->content  = $content;
		$this->excluded = $excluded;
		$this->filter_content();
	}

	/**
	 * Returns one WordPress block.
	 *
	 * @return string|null
	 */
	public function get_block_by_name( string $name, bool $echo = false ) : ?string {
		$blocks = parse_blocks( $this->content );

		$selectedBlock = null;
		foreach ( $blocks as $key => $block )  {
			if ( $block['blockName'] == $name ) {
				$selectedBlock = $block;
			}
		}

		if ( $selectedBlock ) {
			$output = render_block( $selectedBlock );

			if ( $echo ) {
				echo $output;
			} else {
				return $output;
			}
		}
		return null;
	}


	public function filter_content() {
		$blocks = parse_blocks( $this->content );
		$excluded_blocks = $this->excluded;
		$approved_blocks = array_filter( $blocks, function( $block ) use( $excluded_blocks ) {
			$current_block = $block['blockName'];
			return( ! in_array( $current_block, $excluded_blocks ) );
		} );
		$this->content_filtered = array_values( $approved_blocks );
	}

	public function is_acf( ?string $blockname = '' ) : bool {
		return strpos( $blockname, 'acf/' ) !== false;
	}

	/**
	 * Renders each Wordpress block.
	 *
	 * @return string
	 */
	public function render_blocks( array $blocks ) : string {
		$total        = count( $blocks );
		$output       = '';
		$coreWrapOpen = false;

		if ( $blocks ) {
			foreach ( $blocks as $key => $block ) :
				$block['attrs']['block_index'] = strval( $key );
				$current_block = $block['blockName'];
				$next_block    = $this->get_next_block( $blocks, $key );
				$is_last_item  = $key + 1 === $total;

				if ( ! $current_block ) {
					continue;
				}

				if ( ! $this->is_acf( $current_block )  && ! $coreWrapOpen ) :
					$output .= $this->wrap_grid_start();
					$coreWrapOpen = true;
				endif;

				$output .= render_block( $block );

				if ( $coreWrapOpen && ( $this->is_acf( $next_block ) || $is_last_item ) ) :
					$output .= $this->wrap_grid_end();
					$coreWrapOpen = false;
				endif;

			endforeach;
		}

		return $output;
	}

	/**
	 * Returns the WordPress content.
	 *
	 * @return string
	 */
	public function get_the_content() : string {
		$blocks = $this->content_filtered;
		$output = $this->render_blocks( $blocks );

		return $output;
	}

	/**
	 * Echoes the WordPress Content.
	 *
	 * @return void
	 */
	public function the_content() : void {
		echo $this->get_the_content();
	}

	/**
	 * Get the name of the next block
	 *
	 * @param array $blocks
	 * @param integer $key
	 * @return string|null
	 */
	public function get_next_block( array $blocks, int $key ) : ?string {
		$total = count($blocks);
		$key = $key + 1;

		while ($key <= $total) :
			if (isset($blocks[$key]['blockName']) || !empty($blocks[$key]['blockName'])) :
				return $blocks[$key]['blockName'];
			endif;
			$key++;
		endwhile;

		return null;
	}

	private function wrap_grid_start() : string {
		$html  = '<section class="block-section core-block">';
		$html .= sprintf( '<div class="%s">', implode( ' ', $this->core_block_container_classes ) );
		return $html;
	}

	private function wrap_grid_end() : string {
		$html = '</div>';
		$html .= '</section>';
		return $html;
	}
}
