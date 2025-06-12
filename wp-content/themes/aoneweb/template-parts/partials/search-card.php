<a href="<?php echo get_the_permalink($post); ?>" class="search-card cell small-12 medium-6">
	<article class="search-card__content">
		<h3 class="search-card__title"><?php echo get_the_title($post); ?></h3>
		<p class="search-card__excerpt"><?php echo excerpt($post, 16); ?></p>
	</article>
</a>