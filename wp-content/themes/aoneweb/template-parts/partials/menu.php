<section id="nav-wrapper" class="main-site-menu">
	<div class="main-navigation">
	<?php
		$thumbnail_ids = [];
		echo '<div class="mobile-lang-switcher">';
		get_template_part( 'template-parts/partials/language-switcher', null, ['id' => 'lang-switch-mobile', 'label' => true ] );
		echo '</div>';
		echo '<div class="main-menu-navigation">';
			if ( have_rows( 'main_menu_navigation', 'options' ) ) :
				echo '<nav class="primary-menu">';
				while ( have_rows( 'main_menu_navigation', 'options' ) ) : the_row();
					$link    = get_sub_field( 'menu_item', 'options' );
					$parts   = explode( "/", rtrim($link['url'] ,"/") );
					$slug    = $parts[count($parts) - 1];
					$linkObj = get_page_by_path($slug);
					$img_ID  = get_post_thumbnail_id( $linkObj->ID );
					// $linkObj = DC\Translations\get_translated_post_obj_by_url( $link['url'] );
					// $linkObj = url_to_postid( $link['url'] );

					array_push( $thumbnail_ids, $img_ID );

					printf( '<li class="link-image-toggle heading-size-small" data-post-img-id="%s"><a href="%s">%s</a></li>', $img_ID, $link['url'], $link['title'] );
				endwhile;
				echo '</nav>';
			endif;
			echo '<span class="menu-spacer"></span>';
			if ( have_rows( 'secondary_menu_navigation', 'options' ) ) :
				echo '<nav class="secondary-menu">';
				while ( have_rows( 'secondary_menu_navigation', 'options' ) ) : the_row();
					$link    = get_sub_field( 'menu_item', 'options' );
					$parts   = explode( "/", rtrim($link['url'] ,"/") );
					$slug    = $parts[count($parts) - 1];
					$linkObj = get_page_by_path($slug);
					$img_ID  = get_post_thumbnail_id( $linkObj->ID );
					array_push( $thumbnail_ids, $img_ID );

					printf( '<li class="link-image-toggle heading-size-xsmall" data-post-img-id="%s"><a href="%s">%s</a></li>', $img_ID, $link['url'], $link['title'] );
				endwhile;
				echo '</nav>';
			endif;
		echo '</div>';
	?>
	</div>
	<div class="main-site-menu-image">
		<?php
			$menu_image_ID = get_field( 'menu_image', 'options' );
			$thumbnails    = wp_get_attachment_image( $menu_image_ID, 'big-square', false, [ 'class' => 'img-is--default', 'loading' => false ] );
			foreach ( array_unique( $thumbnail_ids ) as $key => $id ) {
				$thumbnails .=  wp_get_attachment_image( $id, 'big-square', false, [ 'class' => 'img_post_img_id-' . $id, 'loading' => false ]  );
			}
			printf('<figure class="main-menu-bg link-image-toggle-gallery">%s</figure>', $thumbnails  );
		?>
	</div>

</section>
