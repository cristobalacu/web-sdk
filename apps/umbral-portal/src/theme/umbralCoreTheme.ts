import type { CoreTheme } from 'components-ui-pixi';

export const umbralCoreTheme: CoreTheme = {
	meta: { name: 'umbral-core', isDefault: false },
	colors: {
		surface: {
			glass: '#111629',
			glassOpacity: 0.85,
			panel800: '#15192A',
			bg900: '#0D1020',
			bg950: '#070A12',
		},
		brand: {
			cyan: '#22D7F2',
			cyanSoft: '#76ECF8',
			turquoise: '#2AE7C9',
		},
		neutral: {
			textPrimary: '#F4F7FF',
			textSecondary: '#9CA6BD',
			metalLight: '#D9DDE5',
			metalMid: '#8E95A8',
			disabled: '#596074',
		},
		reward: {
			gold: '#E4B33C',
			goldLight: '#FFD76A',
		},
		state: {
			warning: '#F2A93B',
			error: '#E35B67',
		},
	},
	materials: {
		darkGlass: {
			fill: '#111629',
			fillOpacity: 0.85,
			stroke: '#8E95A8',
			strokeOpacity: 0.22,
			strokeWidth: 1,
			highlightColor: '#F4F7FF',
			highlightOpacity: 0.1,
		},
		brandEnergy: {
			stopStart: '#22D7F2',
			stopEnd: '#2AE7C9',
			highlightOpacity: 0.25,
		},
		premiumMetal: {
			stopStart: '#D9DDE5',
			stopMid: '#8E95A8',
			stopEnd: '#5B6178',
			stroke: '#D9DDE5',
			strokeOpacity: 0.35,
			highlightOpacity: 0.35,
		},
	},
	geometry: {
		radius: {
			card: 16,
			hud: 24,
			secondaryButton: 23,
			spinDesktop: 64,
		},
		strokeWidth: {
			base: 1,
			active: 3,
		},
	},
	typography: {
		microLabel: { fontFamily: 'Sora Semibold', fontSize: 13, fontWeight: '600', letterSpacing: 1.5, fill: '#9CA6BD' },
		primaryValue: { fontFamily: 'Sora Semibold', fontSize: 26, fontWeight: '600', letterSpacing: 0, fill: '#F4F7FF' },
		betValue: { fontFamily: 'Sora Semibold', fontSize: 22, fontWeight: '600', letterSpacing: 0, fill: '#F4F7FF' },
		winZero: { fontFamily: 'Sora Semibold', fontSize: 24, fontWeight: '600', letterSpacing: 0, fill: '#9CA6BD' },
		winActive: { fontFamily: 'Sora Semibold', fontSize: 28, fontWeight: '600', letterSpacing: 0, fill: '#E4B33C' },
		winBig: { fontFamily: 'Sora Bold', fontSize: 32, fontWeight: '700', letterSpacing: 0, fill: '#FFD76A' },
	},
	motion: {
		hover: { durationMs: 150, scale: 1.03 },
		pressed: { durationMs: 100, scale: 0.97 },
		active: { durationMs: 200 },
		disabled: { opacity: 0.45 },
		reward: { durationMs: 300 },
	},
};
