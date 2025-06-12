
<div class="dc-slideshow-pagination">
	<?php
		printf( '<span class="page-indicator current"> %s</span>', 1 );
		echo    '<span class="page-indicator">/</span>';
		printf( '<span class="page-indicator total"> %s</span>', $args['count'] );
	?>
</div>
