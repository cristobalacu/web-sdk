import { createLayout } from 'utils-layout';

export const backgroundRatio = {
	// Matches design/symbols/background.png's native size (1672x941) -- Background.svelte
	// derives the sprite's missing width/height dimension from this, so it must track the
	// actual art or the background renders stretched.
	normal: 1672 / 941,
	portrait: 1242 / 2208,
};

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio,
	mainSizesMap: {
		desktop: { width: 1422, height: 800 },
		tablet: { width: 1000, height: 1000 },
		landscape: { width: 1600, height: 900 },
		portrait: { width: 800, height: 1422 },
	},
});
