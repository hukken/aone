import { slideToggle } from './util';

export default class CookiebotPopup {
	constructor () {
		this.accordions();
	}

	// privacy_page_link = ( el ) => {
	// const privacyLinkEl = document.querySelector( '.stem-cookiebot-popup__policy-link' );
	// if ( privacyLinkEl ) {
	// const privacyLink = privacyLinkEl.href;
	// window.open( privacyLink, '_blank' ).focus();
	// return true;
	// }
	// return false;
	// }

	accordions = () => {
		const _this = this;

		document.addEventListener( 'click', ( e ) => {
			if ( !e.target ) return;
			const el = e.target;
			const ToggleClass = 'stem-cookiebot-popup__toggle';

			// Toggle parent accordion
			if ( el.classList.contains( ToggleClass ) ) {

				// if ( el.id === 'DcCookiebotListToggle' ) {
				// const redirect = _this.privacy_page_link( el );
				// if ( redirect ) {
				// 	return;
				// }
				// }

				const toggleTarget = el.dataset.toggle;

				_this.toggleAccordion( el, document.querySelector( toggleTarget ) );
				const acp = _this.setActiveClass( el ); // acp: Active Class Parent
				_this.setDetailsText( el, acp );
				_this.setAriaState( el, acp );
			}

			// Toggle child accordion
			if ( el.classList.contains( 'stem-cookiebot-popup__main__cookie-list__cat__toggle' ) ) {
				const content = el.parentElement.nextSibling;
				_this.toggleAccordion( el, content );
				const acc = _this.setActiveClass( el ); // acc: Active Class Child
				_this.setAriaState( el, acc );
			}
		} );
	};

	toggleAccordion = ( el, target ) => {
		return slideToggle( target );
	};

	setActiveClass = ( el ) => {
		const [ mainClass ] = el.className.split( ' ' );
		const activeClass = mainClass + '--active';
		if ( el.classList.contains( activeClass ) ) {
			el.classList.remove( activeClass );
		} else {
			el.classList.add( activeClass );
		}
		return activeClass;
	};

	setDetailsText = ( el, activeClass ) => {
		if ( el.classList.contains( activeClass ) ) {
			el.innerHTML = CookiebotDialog.hideDetailsText;
		} else {
			el.innerHTML = CookiebotDialog.showDetailsText;
		}
	};

	setAriaState = ( el, activeClass ) => {
		if ( el.classList.contains( activeClass ) ) {
			el.setAttribute( 'aria-hidden', false );
			el.setAttribute( 'aria-expanded', true );
		} else {
			el.setAttribute( 'aria-hidden', true );
			el.setAttribute( 'aria-expanded', false );
		}
	};
}
