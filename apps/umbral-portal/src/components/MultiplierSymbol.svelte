<script lang="ts">
	import { getSymbolInfo } from '../game/utils';
	import type { MultiplierSymbol } from '../game/stateGame.svelte';
	import SymbolSpriteAnimated from './SymbolSpriteAnimated.svelte';

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

	No separate background is rendered any more — the placeholder sprite already contains the
	multiplier frame and its number in a single image.
-->
<SymbolSpriteAnimated
	{symbolInfo}
	state={props.multiplierSymbol.symbolState as 'win' | 'explosion'}
	x={props.multiplierSymbol.symbolX.current}
	y={props.multiplierSymbol.symbolY.current}
	oncomplete={props.multiplierSymbol.oncomplete}
/>
