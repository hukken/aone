export default class LanguageSwitcher {

	/**
	 * Init language switching function.
	 *
	 * @returns {void}
	 */
	static init() {
		document.querySelectorAll( '.language-switcher' ).forEach( lang  => {
			lang.addEventListener( 'change', this.#switchLanguage );
		});
	}

	/**
	 * Switch language on change event, get url from select value.
	 *
	 * @returns {void}
	 */
	static #switchLanguage( event ) {
		const url = event.target.value;
		if ( url ) {
			window.location.href = url;
		}
	}
}
