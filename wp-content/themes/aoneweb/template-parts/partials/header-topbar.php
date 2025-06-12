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

		<div class="logo-container topbar-part" data-aos="fade-in" data-aos-delay="400" data-aos-duration="2500">
			<a aria-label="go to frontpage" href="<?php echo home_url(); ?>">
				<?php
				get_template_part( 'template-parts/svg/logo' );
				get_template_part( 'template-parts/svg/logo-icon' );  
				?>
			</a>
		</div>

		<div class="menu topbar-part" data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000">
			<nav id="quick-menu">
				<?php dc_main_menu('Topbar'); ?>
			</nav>
		</div>
	</div>

	<?php get_template_part( 'template-parts/partials/menu' );  ?>
</div>
