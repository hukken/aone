const LinkImageToggler = {

	/**
	 * Count - Keeps track of z-index.
	 */
	count: 1,

	/**
	 * Init LinkImageToggler
	 *
	 * @returns {void}
	 */
	init: () => {
		const triggers = document.querySelectorAll( '.link-image-toggle' );

		triggers.forEach( trigger  => {
			trigger.addEventListener( 'mouseenter', LinkImageToggler.showImage );
		});

		triggers.forEach( trigger  => {
			trigger.addEventListener( 'mouseleave', LinkImageToggler.hideImage );
		});

	},

	timeoutFadeIN: () => {},
	timeoutFadeOUT: () => {},

	/**
	 * Show target links image
	 *
	 * @returns {void}
	 */
	showImage: ( event ) => {
		console.log('SHOW');
		const targetImgID  = event.target.dataset.postImgId;
		const imageGallery = document.querySelector( '.link-image-toggle-gallery' );
		const target = imageGallery.querySelector( '.img_post_img_id-' + targetImgID );

		console.log(target);

		target.classList.remove( 'fade-in--image' );

		target.classList.add( 'is-hovering' );
		LinkImageToggler.timeoutFadeIN = window.setTimeout( () => {
			target.classList.add( 'fade-in--image' );
			target.style.zIndex = LinkImageToggler.count;
			LinkImageToggler.count++;
		}, 1000 );

		window.clearTimeout( LinkImageToggler.timeoutFadeOUT );
	},

	/**
	 * Switch back to default image on mouseleave.
	 *
	 * @returns {void}
	 */
	hideImage: ( event ) => {
		console.log('HIDE');
		const imageGallery = document.querySelector( '.link-image-toggle-gallery' );
		const target = imageGallery.querySelector( '.img-is--default' );
		target.classList.remove( 'fade-in--image' );

		LinkImageToggler.timeoutFadeOUT = window.setTimeout( () => {
			target.classList.add( 'fade-in--image' );
			target.style.zIndex = LinkImageToggler.count;
			LinkImageToggler.count++;
		}, 1000 );

		window.clearTimeout( LinkImageToggler.timeoutFadeIN );
	},
}

export default LinkImageToggler;
