<script lang="ts">
	import { FillGradient } from 'pixi.js';
	import { Container, Graphics } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { resolveSpinRadius } from '../../theme/resolveSpinRadius';
	import { getContext } from '../../context';
	import Icon from '../../icons/Icon.svelte';

	type SpinState = 'idle' | 'hover' | 'pressed' | 'spinning' | 'disabled' | 'autoplayActive';

	type Props = {
		state: SpinState;
		onpress?: () => void;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const context = getContext();
	// spinMobile (104) en portrait, spinDesktop (128) en el resto -- ver ButtonBet.svelte, que
	// debe resolver este mismo valor para su wrapper/offset (no pueden desincronizarse). Ambos
	// call sites comparten resolveSpinRadius() para que no puedan divergir.
	const DIAMETER = $derived(resolveSpinRadius(theme, context.stateLayoutDerived.layoutType()));

	const strokeOpacityByState: Record<SpinState, number> = {
		idle: 0.85,
		hover: 1,
		pressed: 0.7,
		spinning: 0.85,
		disabled: 0.25,
		autoplayActive: 0.85,
	};

	const draw = (g: import('pixi.js').Graphics) => {
		g.clear();
		// Core / SpinButton / Idle en Penpot: gradiente radial #1A2036 (centro) → #0D1020 (borde).
		// theme.colors.surface.bg900 = #0D1020 ya cubre el stop exterior; el stop interior (#1A2036)
		// no tiene su propio token en CoreTheme (es un tono intermedio solo del Spin) — usarlo literal
		// acá está bien, no hace falta un token nuevo para un solo componente.
		const gradient = new FillGradient({
			type: 'radial',
			center: { x: 0.5, y: 0.5 },
			outerCenter: { x: 1, y: 1 },
			innerRadius: 0,
			outerRadius: 0.5,
			colorStops: [
				{ offset: 0, color: '#1A2036' },
				{ offset: 1, color: theme.colors.surface.bg900 },
			],
			textureSpace: 'local',
		});
		g.circle(DIAMETER / 2, DIAMETER / 2, DIAMETER / 2);
		g.fill(gradient);
		g.stroke({
			color: theme.colors.brand.cyan,
			alpha: strokeOpacityByState[props.state],
			width: theme.geometry.strokeWidth.active,
			alignment: 1,
		});
	};

	const iconName = $derived(props.state === 'spinning' ? 'stopGlyph' : 'spinGlyph');
</script>

<Container eventMode="static" cursor="pointer" onpointerup={props.onpress}>
	<Graphics draw={draw} />
	<Container x={DIAMETER / 2 - 20} y={DIAMETER / 2 - 20}>
		<Icon name={iconName} size={40} strokeWidth={2.5} color={theme.colors.brand.cyan} />
	</Container>
</Container>
