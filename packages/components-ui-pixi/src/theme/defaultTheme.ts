import { WHITE, BLACK, GREY } from 'constants-shared/colors';
import type { CoreTheme } from './types';

export const defaultTheme: CoreTheme = {
	meta: { name: 'default', isDefault: true },
	colors: {
		surface: { glass: '#000000', glassOpacity: 1, panel800: '#000000', bg900: '#000000', bg950: '#000000' },
		brand: { cyan: '#FFFFFF', cyanSoft: '#FFFFFF', turquoise: '#FFFFFF' },
		neutral: {
			textPrimary: '#FFFFFF',
			textSecondary: '#CCCCCC',
			metalLight: '#CCCCCC',
			metalMid: '#CCCCCC',
			disabled: '#AAAAAA',
		},
		reward: { gold: '#FFFFFF', goldLight: '#FFFFFF' },
		state: { warning: '#FFFFFF', error: '#FFFFFF' },
	},
	materials: {
		darkGlass: {
			fill: '#000000',
			fillOpacity: 1,
			stroke: '#000000',
			strokeOpacity: 0,
			strokeWidth: 0,
			highlightColor: '#FFFFFF',
			highlightOpacity: 0,
		},
		brandEnergy: { stopStart: '#FFFFFF', stopEnd: '#FFFFFF', highlightOpacity: 0 },
		premiumMetal: {
			stopStart: '#CCCCCC',
			stopMid: '#CCCCCC',
			stopEnd: '#CCCCCC',
			stroke: '#000000',
			strokeOpacity: 0,
			highlightOpacity: 0,
		},
	},
	geometry: {
		radius: { card: 0, hud: 0, secondaryButton: 999, spinDesktop: 999 },
		strokeWidth: { base: 0, active: 0 },
	},
	typography: {
		fontFamily: 'proxima-nova',
		microLabel: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
		primaryValue: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
		betValue: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
		winZero: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
		winActive: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
		winBig: { fontSize: 22.5, fontWeight: '400', letterSpacing: 0, fill: '#FFFFFF' },
	},
	motion: {
		hover: { durationMs: 0, scale: 1 },
		pressed: { durationMs: 0, scale: 1 },
		active: { durationMs: 0 },
		disabled: { opacity: 1 },
		reward: { durationMs: 0 },
	},
};
