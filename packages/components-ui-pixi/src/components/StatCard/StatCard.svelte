<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';

	type Props = {
		variant: 'balance' | 'bet' | 'win';
		label: string;
		value: string;
		winState?: 'zero' | 'active' | 'big';
	};

	const props: Props = $props();
	const theme = getCoreTheme();

	const WIDTH = props.variant === 'bet' ? 260 : 200;
	const HEIGHT = 118;
	const PADDING = 20;

	const valueStyle = $derived(() => {
		if (props.variant !== 'win') return theme.typography.primaryValue;
		if (props.winState === 'big') return theme.typography.winBig;
		if (props.winState === 'active') return theme.typography.winActive;
		return theme.typography.winZero;
	});

	const draw = (g: import('pixi.js').Graphics) => drawDarkGlass(theme, g, WIDTH, HEIGHT, theme.geometry.radius.card);
</script>

<Container>
	<Graphics draw={draw} />
	<Text
		x={PADDING}
		y={PADDING}
		text={props.label}
		style={{
			fontFamily: theme.typography.microLabel.fontFamily,
			fontSize: theme.typography.microLabel.fontSize,
			fontWeight: theme.typography.microLabel.fontWeight,
			letterSpacing: theme.typography.microLabel.letterSpacing,
			fill: theme.typography.microLabel.fill,
		}}
	/>
	<Text
		x={PADDING}
		y={PADDING + theme.typography.microLabel.fontSize + 6}
		text={props.value}
		style={{
			fontFamily: valueStyle().fontFamily,
			fontSize: valueStyle().fontSize,
			fontWeight: valueStyle().fontWeight,
			fill: valueStyle().fill,
		}}
	/>
</Container>
