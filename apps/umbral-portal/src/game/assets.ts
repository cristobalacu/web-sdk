export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},
	H1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h1.json', import.meta.url).href,
			scale: 2,
		},
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h2.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h3.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h4.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l1.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l2.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l3.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l4.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	h1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/h1/h1.png', import.meta.url).href,
	},
	h2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/h2/h2.png', import.meta.url).href,
	},
	h3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/h3/h3.png', import.meta.url).href,
	},
	h4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/h4/h4.png', import.meta.url).href,
	},
	l1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/l1/l1.png', import.meta.url).href,
	},
	l2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/l2/l2.png', import.meta.url).href,
	},
	l3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/l3/l3.png', import.meta.url).href,
	},
	l4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/l4/l4.png', import.meta.url).href,
	},
	wild: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wild/wild.png', import.meta.url).href,
	},
	scatter: {
		type: 'sprite',
		src: new URL('../../assets/sprites/scatter/scatter.png', import.meta.url).href,
	},
	multiplierSigil: {
		type: 'sprite',
		src: new URL('../../assets/sprites/multiplier/multiplier.png', import.meta.url).href,
	},
	cinzel: {
		// Loaded as a real webfont (not a bitmap font like goldFont/silverFont) so the
		// multiplier's dynamic value text can be rendered with a plain PIXI.Text -- see
		// MultiplierSymbol.svelte. Pixi derives the CSS font-family name from the
		// filename ("Cinzel.ttf" -> "Cinzel").
		type: 'font',
		src: new URL('../../assets/fonts/cinzel/Cinzel.ttf', import.meta.url).href,
	},
	sora: {
		// Core UI theme layer (primaryValue typography). Same webfont-loading mechanism
		// as `cinzel` above. Pixi's loadWebFont parser derives the CSS font-family name
		// from the filename by replacing "-"/"_" with spaces and title-casing each word
		// (see pixi.js's getFontFamilyName in assets/loader/parsers/loadWebFont) --
		// for "Sora-SemiBold.ttf" that yields the family "Sora Semibold" (note: a space,
		// and only the leading "S" of "Semibold" capitalized -- NOT "Sora-SemiBold" and
		// NOT "SoraSemiBold"). No `data.weights` is passed here (same as cinzel), so the
		// registered FontFace is tagged weight "normal" regardless of the file being the
		// SemiBold cut -- consumers should reference this as its own family rather than
		// relying on CSS fontWeight to select a heavier face.
		type: 'font',
		src: new URL('../../assets/fonts/sora/Sora-SemiBold.ttf', import.meta.url).href,
	},
	soraBold: {
		// Core UI theme layer (winBig typography, per Foundations spec: weight 700).
		// Same webfont-loading mechanism as `cinzel`/`sora` above. Verified against the
		// REAL installed pixi.js 8.8.1 loadWebFont parser (ran its actual
		// `getFontFamilyName` function, not hand-derived) -- for "Sora-Bold.ttf" that
		// yields the family "Sora Bold" (space-separated, same pattern as "Sora
		// Semibold"). As with `sora`, no `data.weights` is passed, so the registered
		// FontFace is tagged weight "normal" -- consumers should reference this as its
		// own family, not rely on CSS fontWeight to select it from a shared "Sora" family.
		type: 'font',
		src: new URL('../../assets/fonts/sora/Sora-Bold.ttf', import.meta.url).href,
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'sprite',
		src: new URL('../../assets/sprites/foregroundAnimation/foregroundAnimation.png', import.meta.url).href,
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'sprite',
		src: new URL('../../assets/sprites/foregroundFeatureAnimation/foregroundFeatureAnimation.png', import.meta.url).href,
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
} as const;
