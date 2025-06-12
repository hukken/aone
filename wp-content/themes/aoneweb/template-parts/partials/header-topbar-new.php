<?php
$dark_header_contents = get_field( 'dark_header_contents' );
?>
<div id="masthead" class="topbar <?php echo ($dark_header_contents) ? 'dark':''; ?>">
	<div class="topbar-wrapper">

		<button id="toggle-menu" class="topbar-part main-menu-toggle" aria-label="Toggle menu" data-aos="fade-left" data-aos-delay="1000" data-aos-duration="1000">
			<span class="menu-icon-text"><?php _e( 'Menu', 'dc' ); ?></span>

			<div class="hamburger hamburger--stand menu-icon" type="button">
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</div>
		</button>

		<div id="menu-and-logo">
			<nav id="mainmenu-left" class="mainmenu mainmenu-left">
				<?php
				wp_nav_menu( array(
						'menu'             => 'Main menu left',
						'container'        => false,
						'menu_class'       => 'main-menu-horiz',
						'add_parent_class' => 'menu-item text-size-normal',
						'depth'            => 2,
				) );
				?>
			</nav>

			<div class="logo-container topbar-part">
				<a aria-label="go to frontpage" href="<?php echo home_url(); ?>">
					<?php
					get_template_part( 'template-parts/svg/logo' );
					get_template_part( 'template-parts/svg/logo-icon' );
					?>
				</a>
			</div>

			<nav id="mainmenu-right" class="mainmenu mainmenu-right">
				<?php
				wp_nav_menu( array(
						'menu'             => 'Main menu right',
						'container'        => false,
						'menu_class'       => 'main-menu-horiz',
						'add_parent_class' => 'menu-item text-size-normal',
						'depth'            => 2,
				) );
				?>
			</nav>
		</div>

		<div class="menu topbar-part" data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000">
			<nav id="quick-menu">
				<?php dc_main_menu('Topbar'); ?>
			</nav>
		</div>
	</div>

	<?php get_template_part( 'template-parts/partials/menu' );  ?>
</div>
