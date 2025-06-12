/**
 * OLD POP UP VERSION 1 FALLBACK SUPPORT
 * This is to support cookiebot version 1.3.2 and below
 * Using template with dc-class instead of stem-class
 */

import { slideToggle } from './util';

export default class CookiebotPopupV1 {
	constructor () {
		this.accordions();
	}

	accordions = () => {
		const _this = this;

		document.addEventListener( 'click', ( e ) => {
			console.log( 'V1 KLIKK' );
			if ( !e.target ) return;
			const el = e.target;

			// Toggle parent accordion
			if ( el.id == 'DcCookiebotListToggle' && el.classList.contains( 'dc-cookiebot-popup__main__list-toggle' ) ) {
				console.log( 'V1 KLIKK --- yes' );
				_this.toggleAccordion( el );
				const acp = _this.setActiveClass( el ); // acp: Active Class Parent
				_this.setDetailsText( el, acp );
				_this.setAriaState( el, acp );
			}

			// Toggle child accordion
			if ( el.classList.contains( 'dc-cookiebot-popup__main__cookie-list__cat__toggle' ) ) {
				_this.toggleAccordion( el );
				const acc = _this.setActiveClass( el ); // acc: Active Class Child
				_this.setAriaState( el, acc );
			}
		} );
	};

	toggleAccordion = ( el ) => {
		const content = el.parentElement.nextSibling;
		return slideToggle( content );
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
