<?php

if (!defined('ABSPATH')) exit;

class Button {
	public $field;
	public function __construct($field) {
		$this->field = $field;

		// Defaults
		$this->attributes = [];
		$this->id = null;
		$this->title = null;
		$this->wcag_title = null;
		$this->default_class = 'dc-button';
		$this->target = '_self';
		$this->icon = null;
		$this->tag = 'a';

		$this->set_title();
		$this->set_class_names($this->default_class);
		$this->set_color('orange');
		$this->set_type('default');
		// $this->set_icon('arrow-right');
	}

	/**
	 * Add an icon for the button
	 *
	 * @param string $icon
	 * @return Button
	 */
	public function set_icon($icon = false) {
		if ($icon === false) {
			// Handle removal of icon
			$this->icon = null;
			$this->classes['icon'] = null;
			return $this;
		}

		$this->icon = $icon;
		$this->classes['icon'] = $this->default_class . '--has-icon';
		return $this;
	}

	/**
	 * Get icon HTML
	 *
	 * @return string HTML span
	 */
	private function get_icon() {
		if (!$this->icon) return;
		return sprintf('<span class="icon icon-%s"></span>', $this->icon);
	}


	/**
	 * Changes element tag.
	 *
	 * @param string $tag
	 * @return Button
	 */
	public function set_tag( $tag = 'a' ) {
		$this->tag = $tag;
		return $this;
	}

	/**
	 * Get HTML tag
	 *
	 * @return string html-tag
	 */
	private function get_tag() {
		return $this->tag;
	}

	/**
	 * Show button text.
	 * If $field is an array and a title is not passed as an arg, the title will get set from the link array.
	 * Use the title arg to set a custom title.
	 *
	 * @param string $title
	 * @return Button
	 */
	public function set_title($title = '') {
		if ($title === false) {
			// Handle removal of title
			$this->title = null;
			$this->classes['title'] = null;
			return $this;
		}

		$this->title = $title;
		$this->classes['title'] = sprintf('%s--has-title', $this->default_class);

		if (empty($title) && isset($this->field['title'])) {
			$this->title = $this->field['title'];
		}
		return $this;
	}

	/**
	 * Get button title/label.
	 *
	 * @return string
	 */
	private function get_title() {
		return $this->title;
	}

	/**
	 * Get title for "title" attribute, only when the title is not displayed.
	 *
	 * @param string $title
	 * @return void
	 */
	private function get_wcag_title($title = '') {
		if (empty($title) && isset($this->field['title'])) {
			$this->wcag_title = $this->field['title'];
		}
	}

	/**
	 * Get the attributes
	 *
	 * @return string
	 */
	public function get_attributes() {
		$attrs = $this->attributes;
		return rtrim(implode(' ', $attrs), ' ');
	}

	/**
	 * Add attribute to button
	 *
	 * @param string $attribute
	 * @param string $value
	 * @return Button
	 */
	public function set_attribute($attribute = '', $value = '') {
		if ($attribute && $value) {
			$this->attributes[] = sprintf('%1$s="%2$s"', $attribute, $value);
		}
		return $this;
	}

	/**
	 * Set class names prefixed with button class.
	 *
	 * @param string ...$modifiers
	 * @return Button
	 */
	public function set_modifiers(...$modifiers) {
		if (!$modifiers) return;
		foreach ($modifiers as $modifier) {
			$class = sprintf('%s--%s', $this->default_class, $modifier);
			$this->classes[] = $class;
		}
		return $this;
	}

	/**
	 * Set id.
	 *
	 * @param string $id
	 * @return Button
	 */
	public function set_id($id) {
		$this->id = esc_attr($id);
		return $this;
	}

	/**
	 * Get id.
	 *
	 * @return string
	 */
	private function get_id() {
		return $this->id;
	}

	/**
	 * Set class names.
	 *
	 * @param string ...$classes
	 * @return Button
	 */
	public function set_class_names(...$classes) {
		if (!$classes) return;
		foreach ($classes as $class) {
			$this->classes[] = $class;
		}
		return $this;
	}

	/**
	 * Get the class names as string.
	 *
	 * @return string
	 */
	private function get_class_names() {
		$classes = $this->classes;
		return rtrim(implode(' ', $classes), ' ');
	}

	/**
	 * Set a color for the button.
	 * This just appends a class to the classes array.
	 *
	 * @param string $color orange, white, grey, blueish
	 * @return Button
	 */
	public function set_color($color = false) {
		if (!$color) return;
		$this->classes['color'] = sprintf('%s--color-%s', $this->default_class, $color);
		return $this;
	}

	/**
	 * Set a type for the button.
	 * This just appends a class to the classes array.
	 *
	 * @param string $color 'default', 'small'
	 * @return Button
	 */
	public function set_type($type = false) {
		if (!$type) return;
		$this->classes['type'] = sprintf('%s--type-%s', $this->default_class, $type);
		return $this;
	}

	/**
	 * Assembles the button HTML
	 *
	 * @return string HTML, anchor tag
	 */
	public function get_output() {
		if ( ! $this->field  || ( ! $this->title && !$this->get_icon() ) ) return; // return if there is not data

		$this->get_wcag_title($this->title);

		if (is_array($this->field)) {
			$this->url = $this->field['url'];
			$this->target = $this->field['target'] ? $this->field['target'] : '_self';
		} else {
			$this->url = $this->field;
		}

		$output = sprintf(
			'<%1$s %2$s id="%3$s" class="%4$s" %5$s target="%6$s" title="%7$s"> <span class="text">%8$s</span> %9$s </%1$s>',
			$this->get_tag(),
			$this->get_tag() === 'a' ? 'href="' . esc_url($this->url) . '"' : '',
			$this->get_id(),
			$this->get_class_names(),
			$this->get_attributes(),
			esc_attr($this->target),
			esc_attr($this->wcag_title),
			esc_html($this->get_title() ?? ''),
			$this->get_icon()
		);

		return $output;
	}

	/**
	 * Renderes the button HTML
	 *
	 * @return void
	 */
	public function render() {
		echo $this->get_output();
	}
}
