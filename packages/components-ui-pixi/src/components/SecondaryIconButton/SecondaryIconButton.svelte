<script lang="ts">
	import { Container, Graphics } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';
	import Icon from '../../icons/Icon.svelte';
	import type { IconName } from '../../icons/types';

	type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'active';

	type Props = {
		icon: IconName;
		state: ButtonState;
		onpress?: () => void;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const DIAMETER = theme.geometry.radius.secondaryButton * 2; // 46 con umbralCoreTheme

	const iconColorByState: Record<ButtonState, string> = {
		default: theme.colors.neutral.textSecondary,
		hover: theme.colors.neutral.textPrimary,
		pressed: theme.colors.brand.cyan,
		disabled: theme.colors.neutral.disabled,
		active: theme.colors.brand.cyan,
	};

	const draw = (g: import('pixi.js').Graphics) =>
		drawDarkGlass(theme, g, DIAMETER, DIAMETER, theme.geometry.radius.secondaryButton);
</script>

<Container
	eventMode={props.state === 'disabled' ? 'none' : 'static'}
	cursor={props.state === 'disabled' ? 'default' : 'pointer'}
	onpointerup={props.onpress}
>
	<Graphics draw={draw} />
	<Container x={DIAMETER / 2 - 11} y={DIAMETER / 2 - 11}>
		<Icon name={props.icon} size={22} strokeWidth={2} color={iconColorByState[props.state]} />
	</Container>
</Container>
