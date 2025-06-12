<form class="mews-booking-form">
	<label for="start"><?php _e('Start date:', 'dc'); ?></label>
	<input type="date" id="start" name="start" required />

	<label for="end"><?php _e('End date:', 'dc'); ?></label>
	<input type="date" id="end" name="end" required />

	<input type="submit" value="<?php _e('Loading...', 'dc'); ?>" disabled />
</form>

<script>
	// Mews.Distributor(
	// 	{
	// 		configurationIds: ['68887d04-cb49-4dba-877e-ae2f007f7226'],
	// 	},
	// 	(api) => {
	// 		const listenOnSubmit = () => {
	// 			const form = document.getElementById('date-form');
	// 			form.addEventListener('submit', event => {
	// 				event.preventDefault();
	//
	// 				// Check if we can have tracking enabled?
	// 				if (window.CookieConsent) {
	// 					if (window.CookieConsent.consent.marketing && window.CookieConsent.consent.statistics) {
	// 						api.enableTracking();
	// 					} else {
	// 						api.disableTracking();
	// 					}
	// 				} else {
	// 					api.disableTracking();
	// 				}
	//
	// 				const { start, end } = event.target.elements;
	// 				const [startYears, startMonths, startDays] = start.value.split('-');
	// 				const [endYears, endMonths, endDays] = end.value.split('-');
	//
	// 				const startDate = new Date(startYears, startMonths - 1, startDays);
	// 				const endDate = new Date(endYears, endMonths - 1, endDays);
	//
	// 				api.setStartDate(startDate);
	// 				api.setEndDate(endDate);
	// 				api.open();
	// 			});
	// 		};
	// 		listenOnSubmit();
	//
	// 		const enableSubmit = () => {
	// 			const submitButton = document.getElementById('dates-submit');
	// 			submitButton.value = 'Submit';
	// 			submitButton.disabled = false;
	// 		};
	// 		enableSubmit();
	// 	}
	// );
</script>
