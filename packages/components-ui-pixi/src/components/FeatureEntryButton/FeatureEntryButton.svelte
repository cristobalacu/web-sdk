<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';
	import Icon from '../../icons/Icon.svelte';

	type FeatureState = 'default' | 'hover' | 'pressed' | 'disabled' | 'highlightedAvailable';

	type Props = {
		label: string;
		state: FeatureState;
		onpress?: () => void;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const WIDTH = 190;
	const HEIGHT = 56;

	// highlightedAvailable y hover comparten semántica cian ("disponible/interacción") — ver
	// Decision Gate 2026-08-22: cian = interacción/disponible, dorado = reward/win. No usar
	// theme.colors.reward acá bajo ninguna circunstancia.
	const strokeColorByState: Record<FeatureState, string> = {
		default: theme.colors.brand.cyanSoft,
		hover: theme.colors.brand.cyan,
		pressed: theme.colors.brand.cyan,
		disabled: theme.colors.neutral.disabled,
		highlightedAvailable: theme.colors.brand.cyan,
	};

	const draw = (g: import('pixi.js').Graphics) => {
		drawDarkGlass(theme, g, WIDTH, HEIGHT, HEIGHT / 2);
		g.stroke({ color: strokeColorByState[props.state], alpha: 0.55, width: theme.geometry.strokeWidth.base + 0.5 });
	};
</script>

<Container eventMode={props.state === 'disabled' ? 'none' : 'static'} cursor="pointer" onpointerup={props.onpress}>
	<Graphics draw={draw} />
	<Container x={20} y={HEIGHT / 2 - 9}>
		<Icon name="feature" size={18} strokeWidth={2} color={strokeColorByState[props.state]} />
	</Container>
	<Text
		x={48}
		y={HEIGHT / 2}
		text={props.label}
		anchor={{ x: 0, y: 0.5 }}
		style={{
			fontFamily: theme.typography.winBig.fontFamily,
			fontSize: 14,
			fontWeight: '700',
			fill: theme.colors.neutral.textPrimary,
		}}
	/>
</Container>
