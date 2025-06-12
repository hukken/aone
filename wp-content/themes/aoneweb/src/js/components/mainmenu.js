const menuToggler = document.querySelector('.main-menu-toggle');
const navWrapper  = document.querySelector('#nav-wrapper');
const topBar      = document.querySelector('#masthead');
const body        = document.querySelector('body');

const MainMenu = {
	init: () => {
		MainMenu.registerEvents();
		MainMenu.horizontalMenu();
	},

	/**
	 * Adds event listeners
	 *
	 * @return {void}
	 */
	registerEvents: () => {
		menuToggler.addEventListener('click', MainMenu.toggleMainMenu);
		addEventListener('keyup', e => {
			if (e.key === 'Escape') {
				MainMenu.closeMainMenu();
			}
		});
	},

	/**
	 * Toggles classes on all element variables declared at top of file
	 *
	 * @return {void}
	 */
	toggleMainMenu: () => {
		if (menuToggler.classList.contains('is-active')) {
			MainMenu.closeMainMenu();
		} else {
			MainMenu.openMainMenu();
		}

		MainMenu.ariaUpdate();
		MainMenu.tabIndexUpdate();
	},

	/**
	 * Adds open classes to all element variables declared at top of file
	 *
	 * @return {void}
	 */
	openMainMenu: () => {
		navWrapper.classList.add('--is-open');
		body.classList.add('menuactive');
		topBar.classList.add('--menu-is-open');
		menuToggler.classList.add('is-active');

		let menuButtonChild = menuToggler.querySelector('.menu-icon');
		if (  menuButtonChild ) {
			menuButtonChild.classList.add('is-active');
		}
	},

	/**
	 * Removes open classes to all element variables declared at top of file
	 *
	 * @return {void}
	 */
	closeMainMenu: () => {
		navWrapper.classList.remove('--is-open');
		body.classList.remove('menuactive');
		topBar.classList.remove('--menu-is-open');
		menuToggler.classList.remove('is-active');

		let menuButtonChild = menuToggler.querySelector('.menu-icon');
		if (  menuButtonChild ) {
			menuButtonChild.classList.remove('is-active');
		}
	},

	/**
	 * Toggle aria labels
	 *
	 * @return {void}
	 */
	ariaUpdate: () => {
		let menuTogglerAria = menuToggler.getAttribute('aria-expanded');
		let menuAria = navWrapper.getAttribute('aria-hidden');

		menuTogglerAria = menuTogglerAria === 'true' ? 'false' : 'true';
		menuAria = menuAria === 'true' ? 'false' : 'true';

		menuToggler.setAttribute('aria-expanded', menuTogglerAria);
		navWrapper.setAttribute('aria-hidden', menuAria);
	},

	/**
	 * Toggles the tabIndex attribute on all links in the main menu
	 *
	 * @return {void}
	 */
	tabIndexUpdate: () => {
		const links = document.querySelectorAll('#nav-wrapper a');
		links.forEach(link => {
			if (link.getAttribute('tabIndex') == '0') {
				link.setAttribute('tabIndex', '-1');
			} else {
				link.setAttribute('tabIndex', '0');
			}
		});
	},

	/**
	 * New horizontal menu
	 */
	horizontalMenu: () => {

		const mainMenus = document.querySelectorAll("nav.mainmenu");

		mainMenus.forEach((menu) => {
			let mainMenuItems = menu.querySelectorAll(".main-menu-horiz");
			mainMenuItems.forEach((item) => {
				let menuItems = item.querySelectorAll(".menu-item-has-children");

				// the li those have sub-menu
				menuItems.forEach((item) => {
					let subMenu = item.querySelector(".sub-menu");

					item.addEventListener("click", function (event) {
						if (event.target.closest(".menu-item-has-children") === item && !event.target.closest(".sub-menu")) {
							event.preventDefault();

							// Toggle active class
							if (item.classList.contains("active")) {
								item.classList.remove("active");
							} else {
								// Remove 'active' from all other items
								mainMenus.forEach((menu) => {
									let mainMenuItems = menu.querySelectorAll(".main-menu-horiz");
									mainMenuItems.forEach((item) => {
										let activeItems = item.querySelectorAll(".menu-item-has-children.active");
										activeItems.forEach((activeItem) => {
											activeItem.classList.remove("active");
										});
									});
								});

								// Add 'active' class to the clicked item
								item.classList.add("active");
							}
						}
					});
				});
			});
		});

	}
};

export default MainMenu;
