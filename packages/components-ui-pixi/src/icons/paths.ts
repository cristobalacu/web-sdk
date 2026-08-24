import type { IconName } from './types';

export type PathCommand =
	| { t: 'M'; x: number; y: number }
	| { t: 'L'; x: number; y: number }
	| { t: 'C'; x1: number; y1: number; x2: number; y2: number; x: number; y: number }
	| { t: 'Z' };

export type IconShape =
	| { kind: 'path'; cmds: PathCommand[] }
	| { kind: 'circle'; cx: number; cy: number; r: number }
	| { kind: 'rect'; x: number; y: number; w: number; h: number; borderRadius: number };

export type IconDefinition = {
	viewBoxSize: number;
	shapes: IconShape[];
};

// Geometría real extraída directamente de Penpot (Components / 07 — Icon Set,
// página 01 — Umbral Core Components) vía Penpot MCP. viewBox real: 22x22, no 24x24.
// Coordenadas ya normalizadas al origen local de cada ícono, en el sistema
// moveTo/lineTo/bezierCurveTo de Pixi. No re-derivar ni aproximar -- ver task-4-brief.md.
export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
	menu: {
		viewBoxSize: 22,
		shapes: [
			{ kind: 'path', cmds: [{ t: 'M', x: 0, y: 0 }, { t: 'L', x: 22, y: 0 }] },
			{ kind: 'path', cmds: [{ t: 'M', x: 0, y: 10.99 }, { t: 'L', x: 22, y: 10.99 }] },
			{ kind: 'path', cmds: [{ t: 'M', x: 0, y: 21.98 }, { t: 'L', x: 22, y: 21.98 }] },
		],
	},
	autoplay: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 22, y: 11.01 },
					{ t: 'C', x1: 22, y1: 16.26, x2: 18.29, y2: 20.77, x: 13.14, y: 21.79 },
					{ t: 'C', x1: 7.99, y1: 22.81, x2: 2.84, y2: 20.05, x: 0.84, y: 15.2 },
					{ t: 'C', x1: -1.17, y1: 10.35, x2: 0.53, y2: 4.76, x: 4.9, y: 1.85 },
					{ t: 'C', x1: 9.26, y1: -1.06, x2: 15.07, y2: -0.49, x: 18.78, y: 3.23 },
				],
			},
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 22, y: 0.01 },
					{ t: 'L', x: 22, y: 6.88 },
					{ t: 'L', x: 15.13, y: 6.88 },
				],
			},
		],
	},
	turbo: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 12.38, y: 0 },
					{ t: 'L', x: 0, y: 13.2 },
					{ t: 'L', x: 9.63, y: 13.2 },
					{ t: 'L', x: 8.25, y: 22 },
					{ t: 'L', x: 22, y: 8.8 },
					{ t: 'L', x: 12.38, y: 8.8 },
					{ t: 'L', x: 12.38, y: 0 },
					{ t: 'Z' },
				],
			},
		],
	},
	soundOn: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 0, y: 6.88 },
					{ t: 'L', x: 0, y: 15.13 },
					{ t: 'L', x: 6.05, y: 15.13 },
					{ t: 'L', x: 12.09, y: 22 },
					{ t: 'L', x: 12.09, y: 0 },
					{ t: 'L', x: 6.05, y: 6.88 },
					{ t: 'L', x: 0, y: 6.88 },
					{ t: 'Z' },
				],
			},
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 16.33, y: 6.88 },
					{ t: 'C', x1: 17.37, y1: 7.92, x2: 17.97, y2: 9.42, x: 17.97, y: 11 },
					{ t: 'C', x1: 17.97, y1: 12.58, x2: 17.37, y2: 14.08, x: 16.33, y: 15.13 },
				],
			},
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 19.35, y: 3.44 },
					{ t: 'C', x1: 22.88, y1: 7.68, x2: 22.88, y2: 14.32, x: 19.35, y: 18.56 },
				],
			},
		],
	},
	soundOff: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 0, y: 6.88 },
					{ t: 'L', x: 0, y: 15.13 },
					{ t: 'L', x: 6.11, y: 15.13 },
					{ t: 'L', x: 12.22, y: 22 },
					{ t: 'L', x: 12.22, y: 0 },
					{ t: 'L', x: 6.11, y: 6.88 },
					{ t: 'L', x: 0, y: 6.88 },
					{ t: 'Z' },
				],
			},
			{ kind: 'path', cmds: [{ t: 'M', x: 15.89, y: 6.88 }, { t: 'L', x: 22, y: 13.75 }] },
			{ kind: 'path', cmds: [{ t: 'M', x: 22, y: 6.88 }, { t: 'L', x: 15.89, y: 13.75 }] },
		],
	},
	settings: {
		viewBoxSize: 22,
		shapes: [
			{ kind: 'circle', cx: 11, cy: 11, r: 4.4 },
			{ kind: 'circle', cx: 11, cy: 11, r: 11 },
		],
	},
	paytable: {
		viewBoxSize: 22,
		shapes: [
			{ kind: 'rect', x: 0, y: 0, w: 9.17, h: 9.17, borderRadius: 1.5 },
			{ kind: 'rect', x: 12.83, y: 0, w: 9.17, h: 9.17, borderRadius: 1.5 },
			{ kind: 'rect', x: 0, y: 12.83, w: 9.17, h: 9.17, borderRadius: 1.5 },
			{ kind: 'rect', x: 12.83, y: 12.83, w: 9.17, h: 9.17, borderRadius: 1.5 },
		],
	},
	gameRules: {
		viewBoxSize: 22,
		shapes: [
			{ kind: 'circle', cx: 11, cy: 11, r: 11 },
			{ kind: 'path', cmds: [{ t: 'M', x: 11, y: 9.78 }, { t: 'L', x: 11, y: 16.5 }] },
			{ kind: 'circle', cx: 11, cy: 5.26, r: 1.41 },
		],
	},
	close: {
		viewBoxSize: 22,
		shapes: [
			{ kind: 'path', cmds: [{ t: 'M', x: 0, y: 0 }, { t: 'L', x: 22, y: 22 }] },
			{ kind: 'path', cmds: [{ t: 'M', x: 22, y: 0 }, { t: 'L', x: 0, y: 22 }] },
		],
	},
	feature: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 11, y: 0 },
					{ t: 'L', x: 22, y: 7.7 },
					{ t: 'L', x: 11, y: 22 },
					{ t: 'L', x: 0, y: 7.7 },
					{ t: 'L', x: 11, y: 0 },
					{ t: 'Z' },
				],
			},
		],
	},
	spinGlyph: {
		viewBoxSize: 22,
		shapes: [
			{
				kind: 'path',
				cmds: [
					{ t: 'M', x: 11, y: 0 },
					{ t: 'L', x: 22, y: 11 },
					{ t: 'L', x: 11, y: 22 },
					{ t: 'L', x: 0, y: 11 },
					{ t: 'L', x: 11, y: 0 },
				],
			},
		],
	},
	stopGlyph: {
		viewBoxSize: 22,
		shapes: [{ kind: 'rect', x: 0, y: 0, w: 22, h: 22, borderRadius: 2.5 }],
	},
};
