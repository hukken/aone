<?php

$newsletter_form_header = get_field('newsletter_form_header', 'options');
$newsletter_form_text = get_field('newsletter_form_text', 'options');
$newsletter_secondary_header = get_field('newsletter_secondary_header', 'options');
$newsletter_form_id = get_field('newsletter_form_id', 'options');
?>

<div id="newsletter-hero-popup" class="newsletter-hero-popup">
    <div class="newsletter-overlay-inner">
        <div class="newsletter-header-container">
            <?php
            if (!empty($newsletter_form_header)) {
                printf('<h2 class="newsletter-h2">%s</h2>', $newsletter_form_header);
            } ?>
            <button class="close-dialog-popup" aria-label="Close newsletter form">
                <span class="close-x-container">
                    <span class="close-x-lines"></span>
                </span>
            </button>
        </div>
        <div class="newsletter-form-container">
            <?php echo do_shortcode('[wpforms id="' . $newsletter_form_id . '" title="false" description="false"]'); ?>
        </div>
    </div>
</div>