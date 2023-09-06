import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import Highlight from 'reveal.js/plugin/highlight/highlight';

const branding = document.getElementById('branding-logo');
const deck = new Reveal({
	plugins: [RevealNotes, Highlight],
	hash: true,
	totalTime: 2100
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
