<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Sprite } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		state: 'win' | 'explosion';
		oncomplete?: () => void;
	};

	const props: Props = $props();

	const scale = new Tween(1);
	const alpha = new Tween(1);

	$effect(() => {
		if (props.state === 'win') {
			// celebration pulse: grow then settle back to the resting size
			(async () => {
				await scale.set(1.15, { duration: 200 });
				await scale.set(1, { duration: 200 });
				props.oncomplete?.();
			})();
		} else {
			// tumble removal: shrink and fade out, then report completion
			(async () => {
				await Promise.all([scale.set(0, { duration: 300 }), alpha.set(0, { duration: 300 })]);
				await waitForTimeout(0);
				props.oncomplete?.();
			})();
		}
	});
</script>

<Sprite
	x={props.x}
	y={props.y}
	anchor={0.5}
	key={props.symbolInfo.assetKey}
	width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width * scale.current}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height * scale.current}
	alpha={alpha.current}
/>
