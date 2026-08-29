import { stateBet, stateBetDerived, stateUi, stateModal, stateSound } from 'state-shared';

import type { getContext } from '../context';

export function createCoreUiDerived(context: ReturnType<typeof getContext>) {
	const { stateXstateDerived, eventEmitter } = context;

	const winState = $derived(stateBet.winBookEventAmount > 0 ? 'active' : 'zero');

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

	// turboDisabled/autoSpinDisabled are enforced here (not just via SecondaryIconButton's
	// eventMode) because at compact these two also render inside HUDMenuPanel, which renders
	// every item with a fixed state="default" and has no per-item disabled concept -- without
	// this guard the collapsed menu items would be pressable in states the standalone icons
	// never allow.
	const turboActive = $derived(stateBet.isTurbo);
	const turboDisabled = $derived(stateBet.isSpaceHold);
	const onpressTurbo = () => {
		if (turboDisabled) return;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
	};

	const autoSpinActive = $derived(stateBetDerived.hasAutoBetCounter());
	const autoSpinDisabled = $derived.by(() => {
		if (stateBet.isSpaceHold) return true;
		if (!stateXstateDerived.isIdle() && !stateBetDerived.hasAutoBetCounter()) return true;
		if (!stateBetDerived.isBetCostAvailable()) return true;
		return false;
	});
	const onpressAutoSpin = () => {
		if (autoSpinDisabled) return;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (stateBetDerived.hasAutoBetCounter()) {
			stateBet.autoSpinsCounter = 0;
		} else {
			stateModal.modal = { name: 'autoSpin' };
		}
	};

	const betMenuDisabled = $derived(!stateXstateDerived.isIdle());
	const onpressBet = () => {
		if (betMenuDisabled) return;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};

	const isCompact = $derived(context.stateLayoutDerived.canvasSizeType() === 'compact');

	const menuItems = $derived([
		{
			icon: 'paytable' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' });
				stateModal.modal = { name: 'payTable' };
			},
		},
		{
			icon: 'gameRules' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' });
				stateModal.modal = { name: 'gameRules' };
			},
		},
		{
			icon: 'settings' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' });
				stateModal.modal = { name: 'settings' };
			},
		},
		{
			icon: stateSound.volumeValueMaster === 0 ? ('soundOff' as const) : ('soundOn' as const),
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' });
				stateSound.volumeValueMaster = stateSound.volumeValueMaster === 0 ? 50 : 0;
			},
		},
		...(isCompact
			? [
					{ icon: 'turbo' as const, onpress: onpressTurbo },
					{ icon: 'autoplay' as const, onpress: onpressAutoSpin },
				]
			: []),
		{
			icon: 'close' as const,
			onpress: () => {
				eventEmitter.broadcast({ type: 'soundPressGeneral' });
				stateUi.menuOpen = false;
			},
		},
	]);

	const onToggleMenu = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = !stateUi.menuOpen;
	};

	return {
		get winState() {
			return winState;
		},
		get buyBonusActive() {
			return buyBonusActive;
		},
		get buyBonusDisabled() {
			return buyBonusDisabled;
		},
		onpressBuyBonus,
		get turboActive() {
			return turboActive;
		},
		get turboDisabled() {
			return turboDisabled;
		},
		onpressTurbo,
		get autoSpinActive() {
			return autoSpinActive;
		},
		get autoSpinDisabled() {
			return autoSpinDisabled;
		},
		onpressAutoSpin,
		get betMenuDisabled() {
			return betMenuDisabled;
		},
		onpressBet,
		get menuItems() {
			return menuItems;
		},
		onToggleMenu,
		get isCompact() {
			return isCompact;
		},
	};
}
