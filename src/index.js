import Reveal from 'reveal.js';

const branding = document.getElementById('branding-logo');
const deck = new Reveal({
	plugins: [],
	hash: true
});

// ensure the Euricom logo properly transforms to remain readable.
deck.on('slidechanged', event => {
	const hasLightBackground = event.currentSlide.dataset.backgroundColor === 'white';

	if (hasLightBackground) {
		console.debug('Switching to light background');
		branding.src = 'assets/euricom-logo-light.png';
	} else {
		console.debug('Switching to dark background');
		branding.src = 'assets/euricom-logo.png';
	}
});

deck.initialize();
