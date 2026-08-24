import { FillGradient } from 'pixi.js';
import type { Graphics } from 'pixi.js';
import type { CoreTheme } from '../theme/types';

export function drawPremiumMetal(theme: CoreTheme, g: Graphics, w: number, h: number, radius: number): void {
	const m = theme.materials.premiumMetal;
	g.clear();
	// Gradiente lineal vertical (0,0)→(0,1), mismo ángulo que Foundations "material-premium-metal"
	// (Penpot: startX:0,startY:0,endX:0,endY:1). Fractional (0-1) local-space coordinates, same
	// FillGradient constructor shape validated for brandEnergy / Task 2's spike.
	const gradient = new FillGradient({
		type: 'linear',
		start: { x: 0, y: 0 },
		end: { x: 0, y: 1 },
		colorStops: [
			{ offset: 0, color: m.stopStart },
			{ offset: 0.5, color: m.stopMid },
			{ offset: 1, color: m.stopEnd },
		],
		textureSpace: 'local',
	});
	g.roundRect(0, 0, w, h, radius);
	g.fill(gradient);
	if (m.strokeOpacity > 0) {
		g.stroke({ color: m.stroke, alpha: m.strokeOpacity, width: 1, alignment: 1 });
	}
}
