<?php

// Register menus
register_nav_menus(
	array(
		'main-nav'  => __('Topbar Menu', 'dc-theme-settings'),
		'quick-nav' => __('Extra menu', 'dc-theme-settings')
	)
);


// Main Menu
function dc_main_menu($name = 'main-nav') {
	ob_start();
	get_template_part( 'template-parts/partials/language-switcher' );
	$content = ob_get_clean();

	wp_nav_menu( array(
		'menu'             => $name,
		'container'        => false,
		'menu_class'       => 'main-menu',
		'add_parent_class' => 'menu-item text-size-normal',
		'depth'            => 2,
		'items_wrap'       => '<ul id="%1$s" class="%2$s">' . $content . '%3$s</ul>',
	) );
}

// Add additional classes to parent li
function add_additional_class_on_parent_li($classes, $item, $args) {
	$is_button = get_field( 'is_button', $item );
	if ( $is_button ) {
		$classes[] = 'dc-button';
	}

	if(isset($args->add_parent_class) && $item->menu_item_parent == 0) {
		$classes[] = $args->add_parent_class;
	}
	return $classes;
}
add_filter('nav_menu_css_class', 'add_additional_class_on_parent_li', 1, 3);
