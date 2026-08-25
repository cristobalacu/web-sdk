<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';

	type Props = {
		variant: 'balance' | 'bet' | 'win';
		label: string;
		value: string;
		winState?: 'zero' | 'active' | 'big';
		onpress?: () => void;
		size?: 'desktop' | 'mobile';
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const size = props.size ?? 'desktop';

	// Mobile: valores exactos de Penpot 03 (StatsRow-Mobile) -- no son un escalado de los de
	// Desktop, son una card visualmente distinta (padding y tipografía más chicos).
	const WIDTH = size === 'mobile' ? 118.67 : props.variant === 'bet' ? 260 : 200;
	const HEIGHT = size === 'mobile' ? 51 : 118;
	const PADDING = size === 'mobile' ? 12 : 20;
	const LABEL_FONT_SIZE = size === 'mobile' ? 10 : theme.typography.microLabel.fontSize;
	const VALUE_FONT_SIZE = size === 'mobile' ? 17 : undefined; // undefined = usar valueStyle() sin override
	const LABEL_Y = size === 'mobile' ? 8 : PADDING;
	const VALUE_Y = size === 'mobile' ? 22 : PADDING + LABEL_FONT_SIZE + 6;

	const valueStyle = $derived(() => {
		if (props.variant !== 'win') return theme.typography.primaryValue;
		if (props.winState === 'big') return theme.typography.winBig;
		if (props.winState === 'active') return theme.typography.winActive;
		return theme.typography.winZero;
	});

	const draw = (g: import('pixi.js').Graphics) => drawDarkGlass(theme, g, WIDTH, HEIGHT, theme.geometry.radius.card);
</script>

<Container
	eventMode={props.onpress ? 'static' : 'none'}
	cursor={props.onpress ? 'pointer' : 'default'}
	onpointerup={props.onpress}
>
	<Graphics draw={draw} />
	<Text
		x={PADDING}
		y={LABEL_Y}
		text={props.label}
		style={{
			fontFamily: theme.typography.microLabel.fontFamily,
			fontSize: LABEL_FONT_SIZE,
			fontWeight: theme.typography.microLabel.fontWeight,
			letterSpacing: size === 'mobile' ? 0 : theme.typography.microLabel.letterSpacing,
			fill: theme.typography.microLabel.fill,
		}}
	/>
	<Text
		x={PADDING}
		y={VALUE_Y}
		text={props.value}
		style={{
			fontFamily: valueStyle().fontFamily,
			fontSize: VALUE_FONT_SIZE ?? valueStyle().fontSize,
			fontWeight: valueStyle().fontWeight,
			fill: valueStyle().fill,
		}}
	/>
</Container>
