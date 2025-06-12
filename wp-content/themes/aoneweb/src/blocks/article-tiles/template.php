<?php
/**
 * Article Tiles Block Template
 */

require_once 'class-article-tiles.php';
$article_tiles = new Article_Tiles($block);
?>

<section id="<?php echo esc_attr($article_tiles->get_block_id()); ?>" <?php $article_tiles->render_block_classes(); ?>>
	<div class="block-container">
		<header>
			<div class="header-left">
				<?php $article_tiles->render_title_and_text(); ?>
			</div>
			<div class="header-right">
				<?php $article_tiles->render_link_button(); ?>
			</div>
		</header>
		<div class="clearfix"></div>

		<?php $article_tiles->render_filters(); ?>
		<?php $article_tiles->render_posts(); ?>

	</div>
</section>
