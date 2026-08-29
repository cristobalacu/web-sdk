<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	import { Text, REM } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import { getContext } from '../context';
	import { HEADER_FONT_SCALE_BY_SIZE_TYPE } from './headerFontScale';

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
	// Below smallMobile (<=375px canvas width, see utils-layout's
	// CANVAS_SIZE_TYPE_BREAK_POINTS) the header (clock + game name here, plus the
	// right-anchored logo rendered separately by each game) doesn't fit at fixed pixel
	// sizes -- drop the non-essential clock and shrink the remaining text there. Games
	// rendering their own logo/title next to this component should apply the same
	// HEADER_FONT_SCALE_BY_SIZE_TYPE at each tier to stay visually consistent (see
	// umbral-portal's Game.svelte). compact gets a smaller scale than smallMobile: it has
	// less available width for the same two header texts, and 0.75 alone still overlapped
	// the game name against a game's logo even at the top of the smallMobile range (see
	// docs/superpowers/2026-08-21-stake-engine-submission-punchlist.md block 9) -- both
	// tiers were re-verified live against that overlap at their narrowest real width.
	const isSmallMobile = $derived(
		['smallMobile', 'compact'].includes(context.stateLayoutDerived.canvasSizeType()),
	);
	const showClock = $derived(!isSmallMobile);
	const headerFontScale = $derived(
		HEADER_FONT_SCALE_BY_SIZE_TYPE[context.stateLayoutDerived.canvasSizeType()] ?? 1,
	);
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
