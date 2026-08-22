import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = 100;

export const REEL_PADDING = 0.53;

// initial board (padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{ name: 'M', multiplier: 10 },
		{ name: 'H1' },
		{ name: 'M', multiplier: 2 },
		{ name: 'L1' },
		{ name: 'H1' },
		{ name: 'H4' },
		{ name: 'H1' },
	],
	[
		{ name: 'L3' },
		{ name: 'H2' },
		{ name: 'M', multiplier: 4 },
		{ name: 'L2' },
		{ name: 'S', scatter: true },
		{ name: 'S', scatter: true },
		{ name: 'L2' },
	],
	[
		{ name: 'L2' },
		{ name: 'H3' },
		{ name: 'M', multiplier: 5 },
		{ name: 'L3' },
		{ name: 'W' },
		{ name: 'L2' },
		{ name: 'L2' },
	],
	[
		{ name: 'L3' },
		{ name: 'H4' },
		{ name: 'M', multiplier: 7 },
		{ name: 'L4' },
		{ name: 'W' },
		{ name: 'H1' },
		{ name: 'H1' },
	],
	[
		{ name: 'H3' },
		{ name: 'H4' },
		{ name: 'M', multiplier: 10 },
		{ name: 'H2' },
		{ name: 'S', scatter: true },
		{ name: 'L2' },
		{ name: 'M', multiplier: 7 },
	],
	[
		{ name: 'H2' },
		{ name: 'H2' },
		{ name: 'S', scatter: true },
		{ name: 'L3' },
		{ name: 'H1' },
		{ name: 'S', scatter: true },
		{ name: 'L2' },
	],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 1672 / 941;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3', 'H4'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const SPIN_OPTIONS_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 3.5,
	symbolFallInInterval: 30,
	symbolFallInBounceSpeed: 0.15,
	symbolFallInBounceSizeMulti: 0.5,
	symbolFallOutSpeed: 3.5,
	symbolFallOutInterval: 20,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

// H1-H4/L1-L4/Wild/Scatter use the final Fase 2 Plan B art (design/symbols/), wired
// directly as their own sprite assets (no shared atlas). The `explosion` state and
// Wild's `postWinStatic` still fall back to Fase 1 placeholders (`h1.webp`,
// `explodedW.png` from the `symbolsStatic` atlas) — no dedicated art was produced for
// those states in Plan B.
const explosion = {
	type: 'sprite',
	assetKey: 'h1.webp',
	sizeRatios: { width: 1, height: 1 },
};

// H1 and H4's v2 art (see design/symbols/) has noticeably more transparent padding
// around the actual artwork than H2/H3 within the same 512x512 canvas -- scaled up so
// all four read as the same visual size on the board instead of H1/H4 looking shrunk.
const h1Static = { type: 'sprite', assetKey: 'h1', sizeRatios: { width: 1.18, height: 1.18 } };
const h2Static = { type: 'sprite', assetKey: 'h2', sizeRatios: { width: 1, height: 1 } };
const h3Static = { type: 'sprite', assetKey: 'h3', sizeRatios: { width: 1, height: 1 } };
const h4Static = { type: 'sprite', assetKey: 'h4', sizeRatios: { width: 1.08, height: 1.08 } };

const l1Static = { type: 'sprite', assetKey: 'l1', sizeRatios: { width: 1, height: 1 } };
const l2Static = { type: 'sprite', assetKey: 'l2', sizeRatios: { width: 1, height: 1 } };
const l3Static = { type: 'sprite', assetKey: 'l3', sizeRatios: { width: 1, height: 1 } };
const l4Static = { type: 'sprite', assetKey: 'l4', sizeRatios: { width: 1, height: 1 } };

const sStatic = { type: 'sprite', assetKey: 'scatter', sizeRatios: { width: 1, height: 1 } };
const wStatic = { type: 'sprite', assetKey: 'wild', sizeRatios: { width: 1, height: 1 } };

// Fase 2 Plan B replaced the five baked frame+number placeholders (m1_2x.png, ...,
// m3_10x.png) with one sigil piece (assetKey `multiplierSigil`); the value is now
// rendered as dynamic Cinzel text on top (see MultiplierSymbol.svelte). The low/high
// tier size distinction the placeholders encoded is kept by scaling that one sigil.
const multiplierSigilSmall = {
	type: 'sprite',
	assetKey: 'multiplierSigil',
	sizeRatios: { width: 0.88, height: 0.88 },
};
const multiplierSigilLarge = {
	type: 'sprite',
	assetKey: 'multiplierSigil',
	sizeRatios: { width: 1, height: 1 },
};

const m2Static = multiplierSigilSmall;
const m4Static = multiplierSigilSmall;
const m5Static = multiplierSigilLarge;
const m7Static = multiplierSigilLarge;
const m10Static = multiplierSigilLarge;

const backgroundLowStatic = multiplierSigilSmall;
const backgroundMidStatic = multiplierSigilLarge;
const backgroundHighStatic = multiplierSigilLarge;

const backgroundLow = {
	explosion,
	win: backgroundLowStatic,
	postWinStatic: backgroundLowStatic,
	static: backgroundLowStatic,
	spin: backgroundLowStatic,
	land: backgroundLowStatic,
};

const backgroundMid = {
	explosion,
	win: backgroundMidStatic,
	postWinStatic: backgroundMidStatic,
	static: backgroundMidStatic,
	spin: backgroundMidStatic,
	land: backgroundMidStatic,
};

const backgroundHigh = {
	explosion,
	win: backgroundHighStatic,
	postWinStatic: backgroundHighStatic,
	static: backgroundHighStatic,
	spin: backgroundHighStatic,
	land: backgroundHighStatic,
};

export const SYMBOL_INFO_MAP = {
	H1: {
		explosion,
		win: h1Static,
		postWinStatic: h1Static,
		static: h1Static,
		spin: h1Static,
		land: h1Static,
	},
	H2: {
		explosion,
		win: h2Static,
		postWinStatic: h2Static,
		static: h2Static,
		spin: h2Static,
		land: h2Static,
	},
	H3: {
		explosion,
		win: h3Static,
		postWinStatic: h3Static,
		static: h3Static,
		spin: h3Static,
		land: h3Static,
	},
	H4: {
		explosion,
		win: h4Static,
		postWinStatic: h4Static,
		static: h4Static,
		spin: h4Static,
		land: h4Static,
	},
	L1: {
		explosion,
		win: l1Static,
		postWinStatic: l1Static,
		static: l1Static,
		spin: l1Static,
		land: l1Static,
	},
	L2: {
		explosion,
		win: l2Static,
		postWinStatic: l2Static,
		static: l2Static,
		spin: l2Static,
		land: l2Static,
	},
	L3: {
		explosion,
		win: l3Static,
		postWinStatic: l3Static,
		static: l3Static,
		spin: l3Static,
		land: l3Static,
	},
	L4: {
		explosion,
		win: l4Static,
		postWinStatic: l4Static,
		static: l4Static,
		spin: l4Static,
		land: l4Static,
	},
	W: {
		explosion,
		postWinStatic: {
			type: 'sprite',
			assetKey: 'explodedW.png',
			sizeRatios: { width: 0.85, height: 0.85 },
		},
		static: wStatic,
		spin: wStatic,
		win: wStatic,
		land: wStatic,
	},
	S: {
		explosion,
		postWinStatic: sStatic,
		static: sStatic,
		spin: sStatic,
		win: sStatic,
		land: sStatic,
	},
	M_2: {
		explosion,
		postWinStatic: m2Static,
		static: m2Static,
		spin: m2Static,
		win: m2Static,
		land: m2Static,
	},
	M_4: {
		explosion,
		postWinStatic: m4Static,
		static: m4Static,
		spin: m4Static,
		win: m4Static,
		land: m4Static,
	},
	M_5: {
		explosion,
		postWinStatic: m5Static,
		static: m5Static,
		spin: m5Static,
		win: m5Static,
		land: m5Static,
	},
	M_7: {
		explosion,
		postWinStatic: m7Static,
		static: m7Static,
		spin: m7Static,
		win: m7Static,
		land: m7Static,
	},
	M_10: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_TAKEN_2: backgroundLow,
	M_TAKEN_4: backgroundLow,
	M_TAKEN_5: backgroundMid,
	M_TAKEN_7: backgroundMid,
	M_TAKEN_10: backgroundHigh,
} as const;

export const MULTIPLIER_BACKGROUND_INFO_MAP = {
	M_2: backgroundLow,
	M_4: backgroundLow,
	M_5: backgroundMid,
	M_7: backgroundMid,
	M_10: backgroundHigh,
};

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;
