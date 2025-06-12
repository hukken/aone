<?php
/**
 * Content Page template
 *
 * @package dc
 */
?>
<?php
if ( !get_field( 'hide_big_hero' ) )
	get_template_part( 'template-parts/partials/hero');
?>

<main id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php
		(new Grid_Vendor_Blocks(get_the_content()))->the_content(); ?>
	</div>
</main>
