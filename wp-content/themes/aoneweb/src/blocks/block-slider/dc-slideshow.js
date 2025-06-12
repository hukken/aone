/*
	HORIZONTAL SLIDESHOW PLUGIN
	Uses css scroll-snap-type and some js.
	version: 1.0.0
	@Author: Cecce

	Settings:
	- slideType decides if slider should slide per slide or per item.
	- fallbackScrollEffect uses jQuery to fill in for browsers not animating scroll
*/


Element.prototype.HorizontalSlider = function( options ) {

	const __this = this;
	const DEFAULT_OPTIONS = {
		// Settings
		slideType: 'item',
		fallbackScrollEffect: true,

		// Classes
		containerClass: '.block-section',
		reelClass: '.dc-slideshow-reel',
		itemClass: '.dc-slideshow-reel-item',
		btnClass:  '.dc-slideshow-button',
		btnNextClass: '.dc-slideshow-button-next',
		btnPrevClass: '.dc-slideshow-button-prev',
		paginationClass: '.dc-slideshow-pagination',
		indicatorsClass: '.dc-slideshow-indicators',

		// Callbacks
		onSlideClick: ( el, state, direction ) => {},
		afterSlide: ( el, state ) => {},
	};

	this.state = {
		Parent: null,
		Reel: null,
		Items: null,
		CurrentItem: null,
		position: 0,
		positionBySlide: 0,
		isMax: false,
		isMin: false,
		totalItems: 0,
		totalSlides: 0,
		itemsPerSlide: 0,
	};

	options = { ...DEFAULT_OPTIONS, ...options };

	this.init = () => {
		this.bindEvents();
	}

	this.setState = ( args ) => {
		this.state = { ...this.state, ...args };
	},
	this.getState = () => {
		return this.state;
	},

	this.bindEvents = () => {
		const parent = this.closest( options.containerClass );
		const reel   = this.querySelector( options.reelClass );
		const items  = reel.querySelectorAll( options.itemClass );

		this.setSliderMeta( parent, reel, items );
		this.setClickEvent( parent );
		this.setScrollEvent( reel );

		this.setPagination();
		this.createIndicators();
	};

	this.setScrollEvent = ( reel ) => {
		createScrollStopListener( reel , this.afterSlide );
	}

	this.afterSlide = ( e ) => {
		this.setCurrentPosition();
		this.setPositionMeta();
		this.setButtonState();
		this.setPagination();
		this.setIndicator();

		options.afterSlide( __this, this.state );
	}

	this.setCurrentPosition = () => {
		const { Reel, Items, itemsPerSlide } = this.getState();

		let currentItem = null;
		Items.forEach( function( el ) {
			const elLeft    = el.offsetLeft;
			const scrollPos = el.parentNode.scrollLeft;

			if ( elLeft >= scrollPos && ! currentItem ) {
				currentItem = el;
			}
		});

		const currentChildIndex = [ ...Reel.children ].indexOf( currentItem );
		this.setState({ 'position': currentChildIndex });

		const goesTimes  = ( (currentChildIndex+1) / itemsPerSlide ) >> 0;
		const leftOver   = (currentChildIndex+1) - ( goesTimes * itemsPerSlide );
		const slideIndex = ( leftOver > 0 ) ? goesTimes + 1 : goesTimes;
		this.setState({ 'positionBySlide': slideIndex -1 });
	}

	this.setClickEvent = ( parent ) => {
		const slideButtons = parent.querySelectorAll( options.btnClass );
		slideButtons.forEach( function( btn ) {
			btn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				const direction = this.classList.contains( options.btnNextClass.substring(1) ) ? 'forward' : 'back';
				options.onSlideClick( __this, __this.state, direction );
				__this.slideByClick( direction );
			});
		});
	}

	this.slideByClick = ( dir ) => {
		this.setPosition( dir );

		const { Reel, Items, position, positionBySlide, itemsPerSlide } = this.getState();
		const scrollTo = ( options.slideType === 'full' ) ? ( positionBySlide * itemsPerSlide ) : position;
		// Reel.scrollLeft = Items[ scrollTo ].offsetLeft;

		/*
			Use jQuery as fallback for smooth animation.
			For ex. Safari not supporting smooth scroll atm.
		*/
		if ( options.fallbackScrollEffect && getComputedStyle( Reel ).scrollBehavior !== 'smooth' ) {
			jQuery( Reel ).animate({
				scrollLeft: Items[ scrollTo ].offsetLeft
			}, 800, function() {
				Reel.classList.remove( 'is-scrolling' );
			});
		} else {
			Reel.scroll({
				left: Items[ scrollTo ].offsetLeft,
				behavior: 'smooth'
			});
		}


	}

	this.setPosition = ( dir ) =>  {
		const { position, positionBySlide, Items, totalSlides } = this.getState();
		this.setState({ 'position': this.getNewPosition( position, dir, Items.length ) });
		this.setState({ 'positionBySlide': this.getNewPosition( positionBySlide, dir, totalSlides ) });
	}

	this.getNewPosition = ( pos, dir, max ) => {
		let newPos = ( dir === 'forward' ) ? pos + 1 :  pos - 1;
		if ( newPos < 0 ) { newPos = 0; }
		if ( newPos > max ) { newPos = max; }
		return newPos;
	}

	this.setPositionMeta = () => {
		const { Reel, Items, position } = this.getState();

		const scrollPosition = Items[ position ].offsetLeft;
		this.setState( {
			'isMax': Reel.scrollWidth - Reel.clientWidth <= scrollPosition,
			'isMin':  0 >= scrollPosition
		} );

		/*
			Fix slide position if last item.
		*/
		const { isMax, totalSlides } = this.getState();
		if ( isMax ) {
			this.setState({ 'positionBySlide': totalSlides -1 });
		}
	},

	this.setSliderMeta = ( parent, reel, items ) => {
		this.checkItems( items );
		const { itemsPerSlide } = this.getState();

		this.setState( {
			'Parent': parent,
			'Reel': reel,
			'Items': items,
			'totalItems': items.length,
			'totalSlides': Math.ceil( items.length / itemsPerSlide )
		} );
	}

	this.setButtonState = () => {
		const { Parent, isMax, isMin } = this.getState();
		const next = Parent.querySelector( options.btnNextClass );
		const prev = Parent.querySelector( options.btnPrevClass );

		if ( ! next || ! prev ) return;

		if ( isMax ) {
			next.setAttribute( 'disabled', 'disabled' );
			next.classList.add( 'disabled' );
		} else {
			next.removeAttribute( 'disabled' );
			next.classList.remove( 'disabled' );
		}

		if ( isMin ) {
			prev.setAttribute( 'disabled', 'disabled' );
			prev.classList.add( 'disabled' );
		} else {
			prev.removeAttribute( 'disabled' );
			prev.classList.remove( 'disabled' );
		}

	}

	/*
		Create indicators for slide navigation
	*/
	this.createIndicators = () => {
		const { Parent, Items, totalSlides, totalItems, itemsPerSlide } = this.getState();
		const indicator   = Parent.querySelector( options.indicatorsClass );
		if ( ! indicator ) return;

		const totalNmb = ( options.slideType === 'full' ) ? totalSlides : totalItems - itemsPerSlide + 1;

		for ( let i = 0; i < totalNmb; i++ ) {
			const tag = document.createElement( 'span' );
				  tag.classList.add( 'dc-slideshow-circle' );
			indicator.appendChild( tag );
		}

		this.setIndicator();
	},

	this.setIndicator = () => {
		const { Parent, position, positionBySlide } = this.getState();
		const indicator  = Parent.querySelector( options.indicatorsClass );
		if ( ! indicator ) return;

		const indicators = indicator.querySelectorAll( '.dc-slideshow-circle' );
		indicators.forEach( function( ind ) {
			ind.classList.remove( 'active' );
		});

		const pos = ( options.slideType === 'full' ) ? positionBySlide : position;
		indicators[ pos ].classList.add( 'active' );
	}

	this.setPagination = () => {
		const { Parent, position, positionBySlide, totalSlides, totalItems, itemsPerSlide } = this.getState();
		const pagination  = Parent.querySelector( options.paginationClass );
		if ( ! pagination ) return;

		const numbCurrent = pagination.querySelector( '.page-indicator.current' );
		const numbTotal   = pagination.querySelector( '.page-indicator.total' );


		numbCurrent.innerHTML = ( options.slideType === 'full' ) ? positionBySlide +1 : position + 1 ;
		numbTotal.innerHTML   = ( options.slideType === 'full' ) ? totalSlides : totalItems - itemsPerSlide + 1;
	}

	this.checkItems = ( elms ) => {
		let visitbleItems = 0;

		elms.forEach( function( el ) {
			const elLeft        = el.offsetLeft;
			const elRight       = el.offsetLeft + el.offsetWidth;
			const elParentLeft  = el.parentNode.offsetLeft + el.parentNode.offsetWidth;
			const elParentWidth = el.parentNode.offsetWidth;
			const reelScrollPos = el.parentNode.scrollLeft;

			// el.classList.remove( 'in--view' );
			if ( elLeft >= reelScrollPos && elRight <= Math.ceil( reelScrollPos +  elParentWidth ) + 10 ) {
				// el.classList.add( 'in--view' );
				visitbleItems++;
			}
		});

		this.setState({ 'itemsPerSlide':  visitbleItems });
	}

	this.init();
}


/* ------
	UTILS:
	Helper functions
------ */

/*
	Delay scroll event.
*/
function createScrollStopListener( element, callback, timeout ) {
	let handle = null;
	let onScroll = function() {
		if ( handle ) {
			clearTimeout( handle );
		}
		handle = setTimeout( callback, timeout || 200 ); // default 200 ms
	};

	element.addEventListener( 'scroll', onScroll );
	return function() {
		element.removeEventListener( 'scroll', onScroll );
	};
}
