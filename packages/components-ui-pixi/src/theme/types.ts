export type CoreThemeColors = {
	surface: {
		glass: string;
		glassOpacity: number;
		panel800: string;
		bg900: string;
		bg950: string;
	};
	brand: {
		cyan: string;
		cyanSoft: string;
		turquoise: string;
	};
	neutral: {
		textPrimary: string;
		textSecondary: string;
		metalLight: string;
		metalMid: string;
		disabled: string;
	};
	reward: {
		gold: string;
		goldLight: string;
	};
	state: {
		warning: string;
		error: string;
	};
};

export type CoreThemeMaterials = {
	darkGlass: {
		fill: string;
		fillOpacity: number;
		stroke: string;
		strokeOpacity: number;
		strokeWidth: number;
		highlightColor: string;
		highlightOpacity: number;
	};
	brandEnergy: {
		stopStart: string;
		stopEnd: string;
		highlightOpacity: number;
	};
	premiumMetal: {
		stopStart: string;
		stopMid: string;
		stopEnd: string;
		stroke: string;
		strokeOpacity: number;
		highlightOpacity: number;
	};
};

export type CoreThemeGeometry = {
	radius: {
		card: number;
		hud: number;
		secondaryButton: number;
		spinDesktop: number;
	};
	strokeWidth: {
		base: number;
		active: number;
	};
};

export type CoreThemeTextStyle = {
	// Per-style, not shared at the CoreThemeTypography level -- Task 2's spike confirmed
	// the real Pixi webfont pipeline registers one CSS font-family per loaded font FILE
	// (derived from its filename) with no per-weight face selection, so a single shared
	// family + a varying fontWeight per style is a no-op under the real mechanism. Each
	// text style must name its own already-resolved family (e.g. "Sora Semibold" for
	// primaryValue, "Sora Bold" for winBig) rather than relying on fontWeight to pick a
	// heavier cut of one shared family. See task-2-report.md for the full investigation.
	fontFamily: string;
	fontSize: number;
	// Semantic/documentation value: what weight `fontFamily` visually represents. Not
	// guaranteed to be functionally consumed as CSS fontWeight for family/weight
	// selection under the real font pipeline (see `fontFamily` comment above) -- kept
	// here as valid semantic data, but do not assume setting it alone changes rendering.
	fontWeight: string;
	letterSpacing: number;
	fill: string;
};

export type CoreThemeTypography = {
	microLabel: CoreThemeTextStyle;
	primaryValue: CoreThemeTextStyle;
	betValue: CoreThemeTextStyle;
	winZero: CoreThemeTextStyle;
	winActive: CoreThemeTextStyle;
	winBig: CoreThemeTextStyle;
};

export type CoreThemeMotion = {
	hover: { durationMs: number; scale: number };
	pressed: { durationMs: number; scale: number };
	active: { durationMs: number };
	disabled: { opacity: number };
	reward: { durationMs: number };
};

export type CoreTheme = {
	meta: {
		name: string;
		/** true solo para defaultTheme. Es el ÚNICO valor por el que ramifica UIDefault.svelte. */
		isDefault: boolean;
	};
	colors: CoreThemeColors;
	materials: CoreThemeMaterials;
	geometry: CoreThemeGeometry;
	typography: CoreThemeTypography;
	motion: CoreThemeMotion;
};
