<script lang="ts">
	import SymbolSpine from './SymbolSpine.svelte';
	import SymbolSprite from './SymbolSprite.svelte';
	import SymbolSpriteAnimated from './SymbolSpriteAnimated.svelte';
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
