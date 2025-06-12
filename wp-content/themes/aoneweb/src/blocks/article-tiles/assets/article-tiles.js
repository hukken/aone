document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.block-section.article-tiles').forEach(function (section) {
        const buttons = section.querySelectorAll('.filter-button');
        const posts = section.querySelectorAll('.og-article');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                const isActive = button.classList.contains('active');

                // Remove 'active' class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));

                if (isActive || filter === 'all') {
                    // If already active or "all" is clicked, show all posts
                    posts.forEach(post => {
                        post.style.display = 'flex';
                        post.classList.add('visible');
                    });
                } else {
                    // Apply the filter
                    button.classList.add('active');
                    posts.forEach(post => {
                        if (post.getAttribute('data-terms').split(' ').includes(filter)) {
                            post.style.display = 'flex';
                            post.classList.add('visible');
                        } else {
                            post.style.display = 'none';
                            post.classList.remove('visible');
                        }
                    });
                }

                const visibleTiles = document.querySelectorAll('.tile.visible');
                visibleTiles.forEach((tile, index) => {
                    if ((index + 1) % 5 === 3) {
                        tile.style.gridColumn = 'span 2';
                        tile.style.height = '740px';
                    } else {
                        tile.style.gridColumn = 'span 1';
                        tile.style.height = '410px';
                    }
                });

            });
        });
    });
});