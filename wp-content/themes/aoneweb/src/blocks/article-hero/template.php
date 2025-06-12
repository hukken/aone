<?php

/**
 * Article Hero block
 *
 * @param array        $block      The block settings and attributes.
 * @param string       $content    The block inner HTML (empty).
 * @param bool         $is_preview True during AJAX preview.
 * @param (int|string) $post_id    The post ID this block is saved to.
 */

$pre_header = get_field( 'pre_header' );
$header     = get_field( 'header' );
$image      = get_field( 'image' );

?>

<section id="<?php printf( 'article-hero-%s', esc_attr( $block['id'] ) ); ?>" <?php create_block_classes( $block ); ?>>
    <div class="block-section-wrapper">

		<?php if ($pre_header): ?>
        <div class="pre-header margin-under">
            <?php echo $pre_header; ?>
        </div>
		<?php endif; ?>

		<?php if ($header): ?>
        <div class="header margin-under">
            <h1 class="heading-size-hero"><?php echo $header; ?></h1>
        </div>
		<?php endif; ?>

		<?php if ($image): ?>
        <div class="image">
            <?php echo wp_get_attachment_image( $image, 'article-hero' ); ?>
        </div>
		<?php endif; ?>

    </div>
</section>
