import Plyr from 'plyr';

document.querySelectorAll('.plyr-player').forEach((el) => {
	const source = window[`plyr_source_${el.id}`];
	const options = {
		youtube: {
			noCookie: true,
			rel: 0,
			showinfo: 0,
			ecver: 2,
			iv_load_policy: 3,
			modestbranding: 1,
			controls: 0,
		},
		vimeo: { byline: false, portrait: false, title: false, speed: false, transparent: false },
		settings: [],
	};
	const player = new Plyr(el, options);
	player.source = source;
});
