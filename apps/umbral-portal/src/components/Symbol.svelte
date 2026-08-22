<script lang="ts">
	import SymbolSpine from './SymbolSpine.svelte';
	import SymbolSprite from './SymbolSprite.svelte';
	import SymbolSpriteAnimated from './SymbolSpriteAnimated.svelte';
	import MultiplierValueText from './MultiplierValueText.svelte';
	import { getSymbolBackgroundInfo, getSymbolInfo } from '../game/utils';
	import type { SymbolState, RawSymbol } from '../game/types';
	import { getContext } from '../game/context';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
		loop?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const symbolInfo = $derived(getSymbolInfo({ rawSymbol: props.rawSymbol, state: props.state }));
	const isSprite = $derived(symbolInfo.type === 'sprite');
	const isAnimatedState = $derived(props.state === 'win' || props.state === 'explosion');
	// The board's initial/idle symbols (INITIAL_BOARD) and any landed-but-not-yet-tumbled
	// multiplier tile render through this generic path, not through MultiplierSymbol.svelte
	// (that one only handles the fly-to-global-meter animation) -- so the dynamic value text
	// has to be layered on here too, or a multiplier symbol on the reel shows a bare sigil.
	const isMultiplier = $derived(
		(props.rawSymbol.name === 'M' || props.rawSymbol.name === 'M_TAKEN') &&
			props.rawSymbol.multiplier !== undefined,
	);
</script>

{#if isSprite && isAnimatedState}
	<SymbolSpriteAnimated
		{symbolInfo}
		state={props.state as 'win' | 'explosion'}
		x={props.x}
		y={props.y}
		oncomplete={props.oncomplete}
	/>
{:else if isSprite}
	<SymbolSprite {symbolInfo} x={props.x} y={props.y} oncomplete={props.oncomplete} />
{:else}
	{@const symbolBackgroundInfo = getSymbolBackgroundInfo({
		rawSymbol: props.rawSymbol,
		state: props.state,
	})}
	<SymbolSpine
		loop={props.loop}
		{symbolInfo}
		{symbolBackgroundInfo}
		x={props.x}
		y={props.y}
		showWinFrame={props.state === 'win' && !['S', 'M'].includes(props.rawSymbol.name)}
		listener={{
			complete: props.oncomplete,
			event: (_, event) => {
				if (event.data?.name === 'wildExplode') {
					context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_wild_explode' });
				}
			},
		}}
	/>
{/if}
{#if isMultiplier}
	<MultiplierValueText x={props.x ?? 0} y={props.y ?? 0} multiplier={props.rawSymbol.multiplier ?? 0} />
{/if}
