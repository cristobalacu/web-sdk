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
	fontSize: number;
	fontWeight: string;
	letterSpacing: number;
	fill: string;
};

export type CoreThemeTypography = {
	fontFamily: string;
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
