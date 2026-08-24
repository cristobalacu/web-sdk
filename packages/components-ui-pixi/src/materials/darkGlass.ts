import type { Graphics } from 'pixi.js';
import type { CoreTheme } from '../theme/types';

export function drawDarkGlass(theme: CoreTheme, g: Graphics, w: number, h: number, radius: number): void {
	const m = theme.materials.darkGlass;
	g.clear();
	g.roundRect(0, 0, w, h, radius);
	g.fill({ color: m.fill, alpha: m.fillOpacity });
	if (m.strokeOpacity > 0 && m.strokeWidth > 0) {
		// alignment: 1 = inner stroke (Pixi 8.8.1's GraphicsContext computes
		// outerPadding = width * (1 - alignment); at alignment 1 that's 0, i.e.
		// the stroke draws entirely inward from the path with no outward bounds
		// growth), matching Penpot's strokeAlignment: 'inner' for this material.
		// Verified against the real installed pixi.js source
		// (scene/graphics/shared/GraphicsContext.mjs), not assumed.
		g.stroke({ color: m.stroke, alpha: m.strokeOpacity, width: m.strokeWidth, alignment: 1 });
	}
}
