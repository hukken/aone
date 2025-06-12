<?php
	$current_lang = DC\Translations\get_current_lang();
	$languages    = DC\Translations\get_all_site_languages();
?>
<li class="language-switcher select-wrapper">
	<?php if( ($args['label'] ?? false) === true ) : ?>
	<label for="<?php echo $args['id'] ?? '' ?>"><?php echo __( 'Language', 'dc' ); ?></label>
	<?php endif; ?>
	<select id="<?php echo $args['id'] ?? '' ?>">
		<?php
			foreach ( $languages as $i => $lang ) {
				printf( '<option value="%s" %s>%s</option>', $lang['url'], $lang['active'] ? 'selected' : '' ,$lang['code']  );
			}
		?>
	</select>
	<div class="select-icon">
		<?php get_template_part( 'template-parts/svg/icon-arrow-down' );  ?>
	</div>
</li>
