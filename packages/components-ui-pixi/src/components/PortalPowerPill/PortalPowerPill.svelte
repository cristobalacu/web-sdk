<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';

	type Props = {
		show: boolean;
		multiplier: number;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const WIDTH = 169;
	const HEIGHT = 38;

	const draw = (g: import('pixi.js').Graphics) => {
		drawDarkGlass(theme, g, WIDTH, HEIGHT, HEIGHT / 2);
		g.stroke({ color: theme.colors.brand.cyan, alpha: 0.8, width: theme.geometry.strokeWidth.base });
	};
</script>

{#if props.show}
	<Container>
		<Graphics draw={draw} />
		<Text
			x={16}
			y={HEIGHT / 2}
			text="PORTAL POWER"
			anchor={{ x: 0, y: 0.5 }}
			style={{
				fontFamily: theme.typography.microLabel.fontFamily,
				fontSize: 11,
				fontWeight: theme.typography.microLabel.fontWeight,
				letterSpacing: 1,
				fill: theme.colors.brand.cyan,
			}}
		/>
		<Text
			x={WIDTH - 16}
			y={HEIGHT / 2}
			text={`×${props.multiplier}`}
			anchor={{ x: 1, y: 0.5 }}
			style={{
				fontFamily: theme.typography.primaryValue.fontFamily,
				fontSize: 16,
				fontWeight: '700',
				fill: theme.colors.brand.cyan,
			}}
		/>
	</Container>
{/if}
