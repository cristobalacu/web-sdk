<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Container, Graphics } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';

	type Props = {
		width: number;
		height: number;
		children: Snippet;
	};

	const props: Props = $props();
	const theme = getCoreTheme();

	const draw = (g: import('pixi.js').Graphics) =>
		drawDarkGlass(theme, g, props.width, props.height, theme.geometry.radius.hud);
</script>

<Container>
	<Graphics draw={draw} />
	{@render props.children()}
</Container>
