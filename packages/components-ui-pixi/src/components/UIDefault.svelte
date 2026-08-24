<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container } from 'pixi-svelte';
	import { getContextLayout } from 'utils-layout';
	import { EnableSpaceHold } from 'components-shared';
	import { stateBet, stateBetDerived, stateUi, stateModal, stateSound } from 'state-shared';
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

	type Props = {
		gameName: Snippet;
		logo: Snippet;
	};

	const props: Props = $props();

	const { stateLayoutDerived } = getContextLayout();
	const { stateXstateDerived, eventEmitter } = getContext();

	const LAYOUT_COMPONENT_MAP = {
		desktop: LayoutDesktop,
		portrait: LayoutPortrait,
		landscape: LayoutLandscape,
		tablet: LayoutTablet,
	};

	const LayoutComponent = $derived(LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()]);

	// --- Core UI theme derivations (Task 12 wiring). Logic below is copied from the
	// corresponding legacy Button*.svelte/Label*.svelte files (see task-12-report.md for the
	// exact source of each), not reinvented, so behavior matches the legacy branch 1:1.

	// StatCard "win" variant: no "big win" threshold exists anywhere in the real codebase today
	// (confirmed via repo-wide search before writing this), so only 'zero'/'active' are derived
	// here. 'big' is reachable in StatCard's own type but nothing in this wiring ever sets it --
	// documented as a known gap, not invented.
	const winState = $derived(stateBet.winBookEventAmount > 0 ? 'active' : 'zero');

	// Copied from ButtonBuyBonus.svelte
	const buyBonusActive = $derived(stateBetDerived.activeBetMode()?.type === 'activate');
	const buyBonusDisabled = $derived(!stateXstateDerived.isIdle());
	const onpressBuyBonus = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (buyBonusActive) {
			stateBet.activeBetModeKey = 'BASE';
		} else {
			stateModal.modal = { name: 'buyBonus' };
		}
	};

	// Copied from ButtonTurbo.svelte
	const turboActive = $derived(stateBet.isTurbo);
	const turboDisabled = $derived(stateBet.isSpaceHold);
	const onpressTurbo = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
	};

	// Copied from ButtonAutoSpin.svelte
	const autoSpinActive = $derived(stateBetDerived.hasAutoBetCounter());
	const autoSpinDisabled = $derived.by(() => {
		if (stateBet.isSpaceHold) return true;
		if (!stateXstateDerived.isIdle() && !stateBetDerived.hasAutoBetCounter()) return true;
		if (!stateBetDerived.isBetCostAvailable()) return true;
		return false;
	});
	const onpressAutoSpin = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (stateBetDerived.hasAutoBetCounter()) {
			stateBet.autoSpinsCounter = 0;
		} else {
			stateModal.modal = { name: 'autoSpin' };
		}
	};

	// Copied from LabelBet.svelte -- bet-amount menu entry point, missing from the Core UI branch
	// (found in the final whole-branch review).
	const betMenuDisabled = $derived(!stateXstateDerived.isIdle());
	const onpressBet = () => {
		if (betMenuDisabled) return;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};

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

	// buttonMenu (!isDefault) renders HUDMenuPanel, which absorbs the 5 other legacy menu
	// snippets (buttonPayTable/buttonGameRules/buttonSettings/buttonSoundSwitch/buttonMenuClose)
	// as its `items`. onpress logic per item copied from the matching legacy Button*.svelte.
	const menuItems = $derived([
		{
			icon: 'paytable' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' }); // copied from ButtonPayTable.svelte
				stateModal.modal = { name: 'payTable' };
			},
		},
		{
			icon: 'gameRules' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' }); // copied from ButtonGameRules.svelte
				stateModal.modal = { name: 'gameRules' };
			},
		},
		{
			icon: 'settings' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' }); // copied from ButtonSettings.svelte
				stateModal.modal = { name: 'settings' };
			},
		},
		{
			icon: (stateSound.volumeValueMaster === 0 ? 'soundOff' : 'soundOn') as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' }); // copied from ButtonSoundSwitch.svelte
				stateSound.volumeValueMaster = stateSound.volumeValueMaster === 0 ? 50 : 0;
			},
		},
		{
			icon: 'close' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' }); // copied from ButtonMenuClose.svelte
				stateUi.menuOpen = false;
			},
		},
	]);

	// Copied from ButtonMenu.svelte, adapted to toggle (legacy ButtonMenu only ever opens;
	// HUDMenuPanel's single icon must also close, so this toggles instead of always opening).
	const onToggleMenu = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = !stateUi.menuOpen;
	};
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
						winState={winState}
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
						state={buyBonusDisabled ? 'disabled' : buyBonusActive ? 'highlightedAvailable' : 'default'}
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
