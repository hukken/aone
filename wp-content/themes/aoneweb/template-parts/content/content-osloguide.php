<?php
/**
 * Content Osloguide template
 *
 * @package dc
 */
?>
<?php //get_template_part( 'template-parts/partials/hero'); ?>

<main id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php
		(new Grid_Vendor_Blocks(get_the_content()))->the_content(); ?>
	</div>
</main>
