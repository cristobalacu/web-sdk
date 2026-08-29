<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	import { Text, REM } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import { getContext } from '../context';

	type Props = {
		name: string;
	};

	const props: Props = $props();
	const context = getContext();
	const reactiveDate = new SvelteDate();
	const clock = $derived(
		reactiveDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		}),
	);
	// At the smallMobile breakpoint (<=375px canvas width, see utils-layout's
	// CANVAS_SIZE_TYPE_BREAK_POINTS) the header (clock + game name here, plus the
	// right-anchored logo rendered separately by each game) doesn't fit at fixed pixel
	// sizes -- drop the non-essential clock and shrink the remaining text there. Games
	// rendering their own logo/title next to this component should apply the same 0.75
	// scale at this breakpoint to stay visually consistent (see umbral-portal's Game.svelte).
	// compact is a strict subset of what used to be smallMobile (see utils-layout's
	// CANVAS_SIZE_TYPE_BREAK_POINTS) -- both breakpoints get at least the same treatment
	// here so a compact device never silently falls back to full-size rendering.
	const isSmallMobile = $derived(
		['smallMobile', 'compact'].includes(context.stateLayoutDerived.canvasSizeType()),
	);
	const showClock = $derived(!isSmallMobile);
	const headerFontScale = $derived(isSmallMobile ? 0.75 : 1);
	const textProps = $derived({
		style: {
			fontFamily: 'proxima-nova',
			fontSize: REM * 1.5 * headerFontScale,
			fontWeight: '600',
			lineHeight: REM * 2 * headerFontScale,
			fill: WHITE,
		},
	} as const);

	let clockSizes = $state({ width: 0, height: 0 });

	$effect(() => {
		const interval = setInterval(() => {
			reactiveDate.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if showClock}
	<Text text={clock} onresize={(value) => (clockSizes = value)} {...textProps} />
{/if}
<Text text={props.name} x={showClock ? clockSizes.width + 5 : 0} {...textProps} />
