<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolX } from '../game/utils';
	import type { TumbleSymbol } from '../game/stateGame.svelte';

	type Props = {
		reelIndex: number;
		tumbleSymbol: TumbleSymbol;
	};

	const props: Props = $props();
</script>

<!-- `animating` selects the unmasked board layer (see SymbolWrap): only states that
     actually play an animation and may overflow the board frame belong there. -->
<SymbolWrap
	x={getSymbolX(props.reelIndex)}
	y={props.tumbleSymbol.symbolY.current}
	animating={props.tumbleSymbol.symbolState === 'win' ||
		props.tumbleSymbol.symbolState === 'explosion'}
>
	<Symbol
		state={props.tumbleSymbol.symbolState}
		rawSymbol={props.tumbleSymbol.rawSymbol}
		oncomplete={props.tumbleSymbol.oncomplete}
	/>
</SymbolWrap>
