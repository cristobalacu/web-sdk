<script lang="ts" module>
	export type EmitterEventAnticipation =
		| { type: 'anticipationStart'; reelIndex: number }
		| { type: 'anticipationEnd'; reelIndex: number };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { SpineProvider, SpineTrack } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import type { Reel } from '../game/stateGame.svelte';
	import { REEL_PADDING, SYMBOL_SIZE } from '../game/constants';

	type Props = {
		reel: Reel;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	type AnimationName = 'anticipation_intro' | 'anticipation_loop' | 'anticipation_out';

	let animationName = $state<AnimationName>('anticipation_intro');

	onMount(() => {
		context.eventEmitter.broadcast({ type: 'anticipationStart', reelIndex: props.reel.reelIndex });
		context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_anticipation_start' });
		context.eventEmitter.broadcast({ type: 'soundLoop', name: 'sfx_anticipation' });
	});

	$effect(() => {
		if (props.reel.reelState.motion === 'stopped') {
			animationName = 'anticipation_out';
		}
	});
</script>

<SpineProvider
	key="anticipation"
	width={SYMBOL_SIZE * 0.56}
	x={context.stateGameDerived.boardLayout().x -
		context.stateGameDerived.boardLayout().width * 0.5 +
		(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE}
	y={context.stateGameDerived.boardLayout().y - SYMBOL_SIZE * 0.06}
>
	<SpineTrack
		trackIndex={0}
		{animationName}
		loop={animationName === 'anticipation_loop'}
		timeScale={stateBetDerived.timeScale()}
		listener={{
			complete: () => {
				if (animationName === 'anticipation_intro') {
					animationName = 'anticipation_loop';
				}

				if (animationName === 'anticipation_out') {
					context.eventEmitter.broadcast({
						type: 'anticipationEnd',
						reelIndex: props.reel.reelIndex,
					});
					props.oncomplete();
				}
			},
		}}
	/>
</SpineProvider>
