<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container } from 'pixi-svelte';
	import { getContextLayout } from 'utils-layout';
	import { EnableSpaceHold } from 'components-shared';
	import { stateBet, stateBetDerived, stateUi } from 'state-shared';
	import { numberToCurrencyString, bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import UiFadeContainer from './UiFadeContainer.svelte';
	import LayoutDesktop from './LayoutDesktop.svelte';
	import LayoutPortrait from './LayoutPortrait.svelte';
	import LayoutLandscape from './LayoutLandscape.svelte';
	import LayoutTablet from './LayoutTablet.svelte';
	import LabelBalance from './LabelBalance.svelte';
	import LabelWin from './LabelWin.svelte';
	import LabelBet from './LabelBet.svelte';
	import ButtonPayTable from './ButtonPayTable.svelte';
	import ButtonGameRules from './ButtonGameRules.svelte';
	import ButtonSettings from './ButtonSettings.svelte';
	import ButtonBuyBonus from './ButtonBuyBonus.svelte';
	import ButtonBet from './ButtonBet.svelte';
	import ButtonTurbo from './ButtonTurbo.svelte';
	import ButtonAutoSpin from './ButtonAutoSpin.svelte';
	import ButtonIncrease from './ButtonIncrease.svelte';
	import ButtonDecrease from './ButtonDecrease.svelte';
	import ButtonMenu from './ButtonMenu.svelte';
	import ButtonMenuClose from './ButtonMenuClose.svelte';
	import ButtonSoundSwitch from './ButtonSoundSwitch.svelte';

	import { getCoreTheme } from '../theme/context';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';
	import StatCard from './StatCard/StatCard.svelte';
	import FeatureEntryButton from './FeatureEntryButton/FeatureEntryButton.svelte';
	import SecondaryIconButton from './SecondaryIconButton/SecondaryIconButton.svelte';
	import HUDMenuPanel from './HUDMenuPanel/HUDMenuPanel.svelte';
	import { createCoreUiDerived } from './coreUiDerived.svelte';

	type Props = {
		gameName: Snippet;
		logo: Snippet;
	};

	const props: Props = $props();

	const { stateLayoutDerived } = getContextLayout();
	const context = getContext();
	const { eventEmitter } = context;

	const LAYOUT_COMPONENT_MAP = {
		desktop: LayoutDesktop,
		portrait: LayoutPortrait,
		landscape: LayoutLandscape,
		tablet: LayoutTablet,
	};

	const LayoutComponent = $derived(LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()]);

	const {
		winState,
		buyBonusActive,
		buyBonusDisabled,
		onpressBuyBonus,
		turboActive,
		turboDisabled,
		onpressTurbo,
		autoSpinActive,
		autoSpinDisabled,
		onpressAutoSpin,
		betMenuDisabled,
		onpressBet,
		menuItems,
		onToggleMenu,
	} = createCoreUiDerived(context);

	// Only under the Core UI theme -- the legacy branch still mounts ButtonTurbo.svelte, which
	// already owns this exact subscription; adding it unconditionally here would double-subscribe
	// (and double-fire) for the other 6 legacy games. `isDefault` never changes after the initial
	// setCoreTheme() call, so a plain `if` here (not a reactive $effect) is correct and runs once.
	if (!getCoreTheme().meta.isDefault) {
		eventEmitter.subscribeOnMount({
			stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
			stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
		});
	}

	// Core UI theme derivations are shared with LayoutPortrait.svelte so both layouts use the
	// same state and event handlers.

	// Core UI layout compensation constants -- LayoutDesktop.svelte's call sites pass
	// {anchor: 0.5} (buttons) / {stacked: true} (amounts) assuming legacy anchor/pivot semantics
	// (see Button.svelte's pivot={anchorToPivot(...)} and UiLabel.svelte's stacked anchor). The 6
	// new Core UI components draw from their own local (0,0) instead, so each call site below
	// wraps them in a compensating <Container> instead of touching the already-approved
	// components themselves.
	const SECONDARY_BUTTON_DIAMETER = $derived(getCoreTheme().geometry.radius.secondaryButton * 2);
	const FEATURE_ENTRY_WIDTH = 190; // must match FeatureEntryButton.svelte's internal WIDTH
	const FEATURE_ENTRY_HEIGHT = 56; // must match FeatureEntryButton.svelte's internal HEIGHT
	const STAT_CARD_WIDTH = { balance: 200, bet: 260, win: 200 } as const; // must match StatCard.svelte's internal WIDTH ternary
</script>

<EnableSpaceHold />

<UiFadeContainer>
	<LayoutComponent>
		{#snippet gameName()}
			{@render props.gameName()}
		{/snippet}

		{#snippet logo()}
			{@render props.logo()}
		{/snippet}

		{#snippet amountBalance(labelProps)}
			{#if getCoreTheme().meta.isDefault}
				<LabelBalance {...labelProps} />
			{:else}
				<Container x={-STAT_CARD_WIDTH.balance / 2}>
					<StatCard
						variant="balance"
						label={i18nDerived.balance()}
						value={numberToCurrencyString(stateBet.balanceAmount)}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet amountWin(labelProps)}
			{#if getCoreTheme().meta.isDefault}
				<LabelWin {...labelProps} />
			{:else}
				<Container x={-STAT_CARD_WIDTH.win / 2}>
					<StatCard
						variant="win"
						label={i18nDerived.win()}
						value={bookEventAmountToCurrencyString(stateBet.winBookEventAmount)}
						{winState}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet amountBet(labelProps)}
			{#if getCoreTheme().meta.isDefault}
				<LabelBet {...labelProps} />
			{:else}
				<Container x={-STAT_CARD_WIDTH.bet / 2}>
					<StatCard
						variant="bet"
						label={stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet()}
						value={numberToCurrencyString(stateBetDerived.betCost())}
						onpress={onpressBet}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet buttonBuyBonus(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonBuyBonus {...buttonProps} />
			{:else}
				<Container x={-FEATURE_ENTRY_WIDTH / 2} y={-FEATURE_ENTRY_HEIGHT / 2}>
					<FeatureEntryButton
						label={buyBonusActive ? i18nDerived.disable() : i18nDerived.buyBonus()}
						state={buyBonusDisabled
							? 'disabled'
							: buyBonusActive
								? 'highlightedAvailable'
								: 'default'}
						onpress={onpressBuyBonus}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet buttonBet(buttonProps)}
			<ButtonBet {...buttonProps} />
		{/snippet}

		{#snippet buttonTurbo(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonTurbo {...buttonProps} />
			{:else}
				<Container x={-SECONDARY_BUTTON_DIAMETER / 2} y={-SECONDARY_BUTTON_DIAMETER / 2}>
					<SecondaryIconButton
						icon="turbo"
						state={turboDisabled ? 'disabled' : turboActive ? 'active' : 'default'}
						onpress={onpressTurbo}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet buttonAutoSpin(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonAutoSpin {...buttonProps} />
			{:else}
				<Container x={-SECONDARY_BUTTON_DIAMETER / 2} y={-SECONDARY_BUTTON_DIAMETER / 2}>
					<SecondaryIconButton
						icon="autoplay"
						state={autoSpinDisabled ? 'disabled' : autoSpinActive ? 'active' : 'default'}
						onpress={onpressAutoSpin}
					/>
				</Container>
			{/if}
		{/snippet}

		{#snippet buttonIncrease(buttonProps)}
			<ButtonIncrease {...buttonProps} />
		{/snippet}

		{#snippet buttonDecrease(buttonProps)}
			<ButtonDecrease {...buttonProps} />
		{/snippet}

		{#snippet buttonMenu(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonMenu {...buttonProps} />
			{:else}
				<Container x={-SECONDARY_BUTTON_DIAMETER / 2} y={-SECONDARY_BUTTON_DIAMETER / 2}>
					<HUDMenuPanel open={stateUi.menuOpen} items={menuItems} onToggle={onToggleMenu} />
				</Container>
			{/if}
		{/snippet}

		{#snippet buttonMenuClose(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonMenuClose {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonPayTable(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonPayTable {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonGameRules(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonGameRules {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonSettings(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonSettings {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonSoundSwitch(buttonProps)}
			{#if getCoreTheme().meta.isDefault}
				<ButtonSoundSwitch {...buttonProps} />
			{/if}
		{/snippet}
	</LayoutComponent>
</UiFadeContainer>
