import { defaultTheme } from './defaultTheme';
import type { CoreTheme } from './types';

let currentTheme: CoreTheme = defaultTheme;

export function setCoreTheme(theme: CoreTheme): void {
	currentTheme = theme;
}

export function getCoreTheme(): CoreTheme {
	return currentTheme;
}
