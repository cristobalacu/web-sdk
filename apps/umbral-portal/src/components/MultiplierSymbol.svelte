<script lang="ts">
	import { getSymbolInfo } from '../game/utils';
	import type { MultiplierSymbol } from '../game/stateGame.svelte';
	import SymbolSpriteAnimated from './SymbolSpriteAnimated.svelte';
	import MultiplierValueText from './MultiplierValueText.svelte';

	type Props = {
		reelIndex: number;
		multiplierSymbol: MultiplierSymbol;
	};

	const props: Props = $props();

	const symbolInfo = $derived(
		getSymbolInfo({
			rawSymbol: props.multiplierSymbol.rawSymbol,
			state: props.multiplierSymbol.symbolState,
		}),
	);
</script>

<!--
	The multiplier symbols are always created in the `win` state (see MultiplierBoard.svelte)
	and `multiplierBoardAnimate` awaits their `oncomplete`, so this must be the animated sprite
	component: a plain SymbolSprite would fire `oncomplete` on mount and skip the pulse, and the
	old Spine path no longer works now that every M state is a sprite.

	The sigil art (assetKey `multiplierSigil`) only has the frame -- the value is rendered as a
	separate Text layer on top, in Cinzel per design/style-guide.md. It doesn't share the
	sprite's win/explosion pulse tween (SymbolSpriteAnimated owns that internally and doesn't
	expose it), so today it just tracks the tile's position; syncing the pulse is future work if
	it turns out to look wrong on a real win.
-->
<SymbolSpriteAnimated
	{symbolInfo}
	state={props.multiplierSymbol.symbolState as 'win' | 'explosion'}
	x={props.multiplierSymbol.symbolX.current}
	y={props.multiplierSymbol.symbolY.current}
	oncomplete={props.multiplierSymbol.oncomplete}
/>
<MultiplierValueText
	x={props.multiplierSymbol.symbolX.current}
	y={props.multiplierSymbol.symbolY.current}
	multiplier={props.multiplierSymbol.rawSymbol.multiplier ?? 0}
/>
