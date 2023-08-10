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
		branding.src = 'assets/euricom-logo-light.png';
	} else {
		branding.src = 'assets/euricom-logo.png';
	}
});

deck.initialize();
