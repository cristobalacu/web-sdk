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
		size?: 'desktop' | 'mobile';
		/** Colapsa a un botón circular solo-ícono (48px) -- única excepción responsive
		 *  aprobada del HUD Mobile, usada en el stress-test 360px. Ignorado si size !== 'mobile'. */
		iconOnly?: boolean;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const size = props.size ?? 'desktop';
	const iconOnly = size === 'mobile' && (props.iconOnly ?? false);

	// Mobile normal: 100x44 (Penpot "Mobile -- Core Application"). Mobile icon-only: 48x48
	// (Penpot "Mobile -- 360 Stress Test") -- no es un escalado de 100x44, es un botón circular
	// aparte con el mismo radio que SecondaryIconButton.
	const WIDTH = iconOnly ? 48 : size === 'mobile' ? 100 : 190;
	const HEIGHT = iconOnly ? 48 : size === 'mobile' ? 44 : 56;

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
	<Container x={iconOnly ? WIDTH / 2 - 9 : 20} y={HEIGHT / 2 - 9}>
		<Icon name="feature" size={18} strokeWidth={2} color={strokeColorByState[props.state]} />
	</Container>
	{#if !iconOnly}
		<Text
			x={48}
			y={HEIGHT / 2}
			text={props.label}
			anchor={{ x: 0, y: 0.5 }}
			style={{
				fontFamily: theme.typography.winBig.fontFamily,
				fontSize: size === 'mobile' ? 12 : 14,
				fontWeight: '700',
				fill: theme.colors.neutral.textPrimary,
			}}
		/>
	{/if}
</Container>
