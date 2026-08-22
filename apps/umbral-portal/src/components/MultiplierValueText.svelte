<script lang="ts">
	import { Text } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';

	type Props = { x: number; y: number; multiplier: number };

	const props: Props = $props();
</script>

<Text
	x={props.x}
	y={props.y}
	anchor={0.5}
	text={`${props.multiplier}×`}
	style={{
		fontFamily: 'Cinzel',
		fontSize: SYMBOL_SIZE * 0.36,
		fill: '#F5EFE0',
		stroke: { color: '#14092B', width: SYMBOL_SIZE * 0.03 },
	}}
/>
