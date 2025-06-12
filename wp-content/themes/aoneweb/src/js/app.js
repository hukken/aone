import Mainmenu from './components/mainmenu';
import MewsIntegration from './components/MewsIntegration';
import LanguageSwitcher from './components/languageSwitcher';
import LinkImageToggler from './components/linkImageToggler';
import toggleVolumeBtn from './components/volumeButton';
import toggleNewsLetterOverlay from "./components/toggleNewsletter";
import newsLetterPopup from "./components/newsletterHeroPopup";

toggleNewsLetterOverlay();


Mainmenu.init();
new MewsIntegration();
LanguageSwitcher.init();
LinkImageToggler.init();

/*
	AOS SCROLL EFFECTS
*/
import AOS from 'aos';
AOS.init({
	duration: 800,
	easing: 'ease-in-out-sine',
});

// window.addEventListener('load', () => {
// 	// AOS.refresh();
// 	// console.log('LOAD');
//
// });

document.addEventListener('aos:in:lottie', ({ detail }) => {
	const lottieplayer = detail.querySelector( 'lottie-player' );
	lottieplayer.seek(0);
	lottieplayer.play();
});

//domready
document.addEventListener('DOMContentLoaded', () => {
	let multiColTextBlocks = document.querySelectorAll('.block-section.multi-col-text');
	if (multiColTextBlocks.length > 1) {
		multiColTextBlocks[0].classList.add('no-margin-bottom');
	}
});

