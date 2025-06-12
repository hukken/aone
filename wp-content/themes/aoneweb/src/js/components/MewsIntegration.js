/**
 * Class for Mews integration
 *
 * @link Mews Distributor documentation: https://mews-systems.gitbook.io/booking-engine-guide/booking-engine-widget/getting-started
 */
export default class MewsIntegration {

	// Get the first configuration ID
	#activeConfigurationID = Object.values(window.mewsIntegrationData.configurationIds)[0];

	/**
	 * Starts the integration and takes care of everyting needed
	 *
	 * @returns {void}
	 */
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			// Start the distributor, and retry 5s later if mews wasn't loaded
			if (window.Mews) {
				this.#distribute();
			} else {
				setTimeout(() => {
					if (window.Mews) this.#distribute();
				}, 5000);
			}

			document.querySelectorAll('#select-city').forEach(field => {
				field.addEventListener('change', () => {
					this.#activeConfigurationID = field.value;
				})
			});

			// Add popup eventlistener
			document.querySelectorAll('.mews-booking-form .mews-popup-toggler')
				.forEach(item => {
					item.addEventListener('click', this.#togglePopUp);
				});

			this.#dateRangeLimiter();
		});
	}

	/**
	 * Initiates a Mews Distributor for each of our configuration IDs
	 *
	 * @returns {void}
	 */
	#distribute() {
		Object.values(window.mewsIntegrationData.configurationIds).forEach(id => {
			window.Mews.Distributor(
				{ configurationIds: [id] },
				(api) => {
					this.#submitHandler(api, id);
					this.#enableSubmit();
				}
			);
		})
	}

	/**
	 * Adds event listener to the booking form and handles the submit event
	 *
	 * When booking form is submitted, the Distributor with the active
	 * configuration ID will be opened
	 *
	 * @param {Mews Distributor API} api The object received by Mews.Distributor
	 * @param {string} id The configuration ID this distributor should be used by
	 * @returns {void}
	 */
	#submitHandler(api, id) {
		const init = (e, basic=false) => {
			// Return if this isn't the correct Distributor
			if (id !== this.#activeConfigurationID) return;

			e.preventDefault();
			history.pushState({}, "", "");

			// Check if we can have tracking enabled?
			if (window.CookieConsent) {
				if (window.CookieConsent.consent.marketing &&
					window.CookieConsent.consent.statistics) {
					api.enableTracking();
				} else {
					api.disableTracking();
				}
			} else {
				api.disableTracking();
			}

			// Dates are only used on the booking bar, not the book button on
			// property single pages.
			if (!basic) {
				const { start, end, guests } = e.target.elements;
				const [startY, startM, startD] = start.value.split('-');
				const [endY, endM, endD] = end.value.split('-');

				const startDate = new Date(startY, startM - 1, startD);
				const endDate = new Date(endY, endM - 1, endD);

				api.setStartDate(startDate);
				api.setEndDate(endDate);
				api.setAdultCount(parseInt(guests.value));
			}

			// If the current post has a value in the `property_id` field,
			// we localize it, and use it to show the rates for that
			// property.
			//
			// @TODO: TEMP Disabled
			// @TODO: We need to set the date before we can use the `showRates`
			// method. So the booking button on singles need a date selector
			//
			// if (window.mewsIntegrationData.propertyID && basic) {
			// 	api.showRates(window.mewsIntegrationData.propertyID);
			// } else {
			// 	api.showRooms();
			// }

			// Set current language;
			const LANG     = document.documentElement.getAttribute('lang');
			const CURRENCY = ( LANG === 'nb-NO' ) ? 'NOK' : 'EUR';
			api.setLanguageCode( LANG );
			api.setCurrencyCode( CURRENCY );

			console.log('mews testtt', LANG, CURRENCY );

			if (!basic) {
				api.showRooms();
			}

			api.open();
			api.setLanguageCode( LANG );
			api.setCurrencyCode( CURRENCY );
			console.log('mews testtt2', LANG, CURRENCY );

		}

		document.querySelectorAll('.mews-booking-form').forEach(form => {
			form.addEventListener('submit', (e) => init(e, false));
		});

		document.querySelectorAll('a[href*="#mews"]').forEach(btn => {
			btn.addEventListener('click', (e) => init(e, true));
		});
	}

	/**
	 * Sets the submit button to enabled and changes the text
	 *
	 * @returns {void}
	 */
	#enableSubmit() {
		document.querySelectorAll('.mews-booking-form input[type="submit"]')
			.forEach(submitter => {
				submitter.disabled = false;
			});
	}

	/**
	 * Toggles the booking form popup used on smaller screens
	 *
	 * @param {Event} e The click event from the popup toggler button
	 * @returns {void}
	 */
	#togglePopUp(e) {
		let form = e.target.previousElementSibling;
		e.preventDefault();

		const close = () => { form.style.display = 'none'; }

		const open = () => { form.style.display = 'block'; }

		console.log(form.style.display);
		if ( form.style.display == 'none' || form.style.display === '' ) {
			open();
		} else {
			close();
		}
	}

	/**
	 * Makes sure that you can't set an invalid date range where for example
	 * the end date is before the start date
	 *
	 * @returns {void}
	 */
	#dateRangeLimiter() {
		document.querySelectorAll('.mews-booking-form').forEach(form => {
			let start = form.querySelector('#start');
			let end = form.querySelector('#end');
			if (!start || !end) return;

			start.addEventListener('change', () => {
				// In case start is set to after end
				if (start.value > end.value) {
					end.value = start.value;
				}

				// Ensure the end data can't be set before the start date
				end.min = start.value;
			});
		});
	}
}
