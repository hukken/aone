import CookiebotPopupV1 from './class-cookiebot-popup-v1';
import CookiebotPopup from './class-cookiebot-popup';

window.addEventListener( 'CookiebotOnDialogInit', () => {
	new CookiebotPopupV1();
	new CookiebotPopup();
} );
