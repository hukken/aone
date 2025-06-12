export const slideToggle = (el, duration = 200) => {
	setTransition(el, { target: 'height', duration, type: 'linear' });
	el.style.overflow = 'hidden';

	if (el.style.display !== 'block') {
		el.style.display = 'block';
		el.style.height = 'auto';

		const height = el.clientHeight + 'px';
		el.style.height = '0px';

		setTimeout(() => {
			el.style.height = height;
		}, 0);

		setTimeout(() => {
			el.style.height = 'auto';
		}, duration);
	} else {
		el.style.height = '0px';

		setTimeout(() => {
			el.style.display = 'none';
		}, duration);
	}
};

export const setTransition = (el, options) => {
	const { target, duration, type } = options;

	el.style.transition = `${target} ${duration}ms ${type}`;
	el.style.MozTransition = `${target} ${duration} ${type}`;
	el.style.WebkitTransition = `${target} ${duration} ${type}`;
	el.style.willChange = target;
};
