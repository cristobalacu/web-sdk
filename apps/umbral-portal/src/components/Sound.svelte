<script lang="ts" module>
	import { sound, type MusicName, type SoundEffectName, type SoundName } from '../game/sound';

	export type EmitterEventSound =
		| { type: 'soundMusic'; name: MusicName }
		| { type: 'soundOnce'; name: SoundEffectName; forcePlay?: boolean }
		| { type: 'soundLoop'; name: SoundEffectName }
		| { type: 'soundStop'; name: SoundName }
		| { type: 'soundFade'; name: SoundName; from: number; to: number; duration: number }
		| { type: 'soundScatterCounterIncrease' }
		| { type: 'soundScatterCounterClear' };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { getContext } from '../game/context';

	const context = getContext();

	const TENSION_FADE_DURATION_MS = 800;

	let portalPowerMultiplier = $state(1);
	let tensionActive = $state(false);
	const isAnyReelAnticipating = $derived(
		context.stateGame.board.some((reel) => reel.reelState.anticipating),
	);

	context.eventEmitter.subscribeOnMount({
		// ui
		soundBetMode: async () => {
			sound.players.music.play({ name: 'bgm_main' });
		},
		soundPressGeneral: () => sound.players.once.play({ name: 'sfx_btn_general' }),
		soundPressBet: () => sound.players.once.play({ name: 'sfx_btn_spin' }),
		// scatterCounter
		soundScatterCounterIncrease: () => (context.stateGame.scatterCounter = context.stateGame.scatterCounter + 1), // prettier-ignore
		soundScatterCounterClear: () => (context.stateGame.scatterCounter = 0),
		// game
		soundMusic: ({ name }) => sound.players.music.play({ name }),
		soundLoop: ({ name }) => sound.players.loop.play({ name }),
		soundOnce: ({ name, forcePlay }) => sound.players.once.play({ name, forcePlay }),
		soundStop: ({ name }) => sound.stop({ name }),
		soundFade: async ({ name, duration, from, to }) => await sound.fade({ name, duration, from, to }), // prettier-ignore
		// P4 tension layer
		globalMultiplierUpdate: (emitterEvent) => (portalPowerMultiplier = emitterEvent.multiplier),
	});

	$effect(() => {
		const shouldBeActive = isAnyReelAnticipating || portalPowerMultiplier > 1;
		if (shouldBeActive === tensionActive) return;
		tensionActive = shouldBeActive;
		sound.fade({
			name: 'bgm_tension_layer',
			from: shouldBeActive ? 0 : 1,
			to: shouldBeActive ? 1 : 0,
			duration: TENSION_FADE_DURATION_MS,
		});
	});

	onMount(() => {
		sound.players.music.play({ name: 'bgm_main' });
		sound.players.loop.play({ name: 'sfx_portal_ambient_base' });
		sound.players.music.play({ name: 'bgm_tension_layer' });
		sound.fade({ name: 'bgm_tension_layer', from: 1, to: 0, duration: 0 });

		//How to control volume per soundfile(use fade)
		// sound.players.music.fade({ name: 'bgm_main', from: 0, to: 1, duration: 3000 });

		//How to control rate per soundfile
		// sound.players.music.rate({ rate: 2, name: 'bgm_main'}); // change play back rate(1: default, 0: slow, 1+ fasterm and higher pitch )
	});
</script>
