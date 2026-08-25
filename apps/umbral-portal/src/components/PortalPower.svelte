<script lang="ts">
	import { PortalPowerPill } from 'components-ui-pixi';

	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let multiplier = $state(1);

	context.eventEmitter.subscribeOnMount({
		globalMultiplierShow: () => (show = true),
		globalMultiplierHide: () => (show = false),
		globalMultiplierUpdate: (emitterEvent) => (multiplier = emitterEvent.multiplier),
	});
</script>

<PortalPowerPill {show} {multiplier} />
