import { FillGradient } from 'pixi.js';
import type { Graphics } from 'pixi.js';
import type { CoreTheme } from '../theme/types';

export function drawBrandEnergy(theme: CoreTheme, g: Graphics, w: number, h: number, radius: number): void {
	const m = theme.materials.brandEnergy;
	g.clear();
	// Gradiente lineal diagonal (0,0)→(1,1), mismo ángulo que Foundations "material-brand-energy"
	// (Penpot: startX:0,startY:0,endX:1,endY:1). Coordinates are fractional (0-1) local-space,
	// so they scale with the shape regardless of the actual w/h passed in -- confirmed against
	// pixi.js 8.8.1's real FillGradient.d.ts in Task 2's spike.
	const gradient = new FillGradient({
		type: 'linear',
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
		colorStops: [
			{ offset: 0, color: m.stopStart },
			{ offset: 1, color: m.stopEnd },
		],
		textureSpace: 'local',
	});
	g.roundRect(0, 0, w, h, radius);
	g.fill(gradient);
}
