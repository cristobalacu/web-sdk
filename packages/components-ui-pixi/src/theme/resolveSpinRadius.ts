import type { CoreTheme } from './types';

/** Returns the Spin button's diameter (already *2) for the given layout type. */
export function resolveSpinRadius(
	theme: CoreTheme,
	layoutType: 'desktop' | 'portrait' | 'landscape' | 'tablet',
): number {
	return (
		(layoutType === 'portrait'
			? theme.geometry.radius.spinMobile
			: theme.geometry.radius.spinDesktop) * 2
	);
}
