<script lang="ts">
	import { Graphics } from 'pixi-svelte';

	import { ICON_DEFINITIONS } from './paths';
	import type { IconProps } from './types';

	const props: IconProps = $props();

	const draw = (g: import('pixi.js').Graphics) => {
		g.clear();
		const def = ICON_DEFINITIONS[props.name];
		const scale = props.size / def.viewBoxSize;

		for (const shape of def.shapes) {
			if (shape.kind === 'path') {
				for (const cmd of shape.cmds) {
					if (cmd.t === 'M') g.moveTo(cmd.x * scale, cmd.y * scale);
					else if (cmd.t === 'L') g.lineTo(cmd.x * scale, cmd.y * scale);
					else if (cmd.t === 'C') {
						g.bezierCurveTo(
							cmd.x1 * scale,
							cmd.y1 * scale,
							cmd.x2 * scale,
							cmd.y2 * scale,
							cmd.x * scale,
							cmd.y * scale,
						);
					} else if (cmd.t === 'Z') {
						g.closePath();
					}
				}
			} else if (shape.kind === 'circle') {
				g.circle(shape.cx * scale, shape.cy * scale, shape.r * scale);
			} else if (shape.kind === 'rect') {
				g.roundRect(
					shape.x * scale,
					shape.y * scale,
					shape.w * scale,
					shape.h * scale,
					shape.borderRadius * scale,
				);
			}
		}

		g.stroke({ color: props.color, width: props.strokeWidth, cap: 'round', join: 'round' });
	};
</script>

<Graphics draw={draw} />
