<script lang="ts">
	import { PortalPowerPill } from 'components-ui-pixi';
	import { MainContainer } from 'components-layout';
	import { Container } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let multiplier = $state(1);

	// Portal Power shares the Core Mobile HUD coordinate contract. The app-level adapter owns
	// placement because the shared pill must remain unaware of the game board and layout state.
	const REEL_BOTTOM_Y = 1297;
	const PENPOT_SCALE = 2.7;
	const PORTAL_POWER_X = (400 - 169) / 2;
	const PORTAL_POWER_Y = REEL_BOTTOM_Y + 16;

	context.eventEmitter.subscribeOnMount({
		globalMultiplierShow: () => (show = true),
		globalMultiplierHide: () => (show = false),
		globalMultiplierUpdate: (emitterEvent) => {
			if (emitterEvent.multiplier > multiplier) {
				context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_portal_power_increment' });
			}
			multiplier = emitterEvent.multiplier;
		},
	});
</script>

<MainContainer standard alignVertical="top">
	<Container x={PORTAL_POWER_X} y={PORTAL_POWER_Y} scale={PENPOT_SCALE}>
		<PortalPowerPill {show} {multiplier} />
	</Container>
</MainContainer>
