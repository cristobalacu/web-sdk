<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey, EnableSpaceHold } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import {
		UI,
		UiGameName,
		setCoreTheme,
		getCoreTheme,
		HEADER_FONT_SCALE_BY_SIZE_TYPE,
	} from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import { umbralCoreTheme } from '../theme/umbralCoreTheme';
	import { i18nDerived } from '../i18n/i18nDerived';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import PayTableContent from './PayTableContent.svelte';
	import GameRulesContent from './GameRulesContent.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import ClusterWinAmounts from './ClusterWinAmounts.svelte';
	import TumbleBoard from './TumbleBoard.svelte';
	import TumbleWinAmount from './TumbleWinAmount.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import PortalPower from './PortalPower.svelte';
	import MultiplierBoard from './MultiplierBoard.svelte';
	import MultiplierTotal from './MultiplierTotal.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';

	setCoreTheme(umbralCoreTheme);

	const context = getContext();
	// Shared with UiGameName.svelte (components-ui-pixi) so the clock/game name and this
	// game's own logo text scale down together at the same breakpoint.
	const headerFontScale = $derived(
		HEADER_FONT_SCALE_BY_SIZE_TYPE[context.stateLayoutDerived.canvasSizeType()] ?? 1,
	);

	onMount(() => (context.stateLayout.showLoadingScreen = true));

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});
</script>

<App>
	<EnableSound />
	<EnableHotkey />
	<EnableSpaceHold />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!--
			The reason why <Sound /> is rendered after clicking the loading screen:
			"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
			Ref: https://developer.chrome.com/blog/autoplay
		-->
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
			<TumbleWinAmount />
			{#if context.stateLayoutDerived.layoutType() === 'portrait' && !getCoreTheme().meta.isDefault}
				<PortalPower />
			{:else}
				<GlobalMultiplier />
			{/if}
		</MainContainer>

		<MainContainer>
			<TumbleBoard />
			<!-- <TumbleAnticipations /> -->
			<ClusterWinAmounts />
		</MainContainer>

		<MainContainer>
			<MultiplierBoard />
			<MultiplierTotal />
		</MainContainer>

		<UI>
			{#snippet gameName()}
				<UiGameName name="UMBRAL PORTAL" />
			{/snippet}
			{#snippet logo()}
				<Text
					anchor={{ x: 1, y: 0 }}
					text="ADD YOUR LOGO"
					style={{
						fontFamily: 'proxima-nova',
						fontSize: REM * 1.5 * headerFontScale,
						fontWeight: '600',
						lineHeight: REM * 2 * headerFontScale,
						fill: 0xffffff,
					}}
				/>
			{/snippet}
		</UI>
		<Win />
		<FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()) || (context.stateLayoutDerived.layoutType() === 'portrait' && !getCoreTheme().meta.isDefault)}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<Transition />

	{/if}
</App>

<Modals
	payTableTitle={i18nDerived.payTableTitle()}
	gameRulesTitle={i18nDerived.gameRulesTitle()}
>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
	{#snippet payTableContent()}
		<PayTableContent />
	{/snippet}
	{#snippet gameRulesContent()}
		<GameRulesContent />
	{/snippet}
</Modals>
