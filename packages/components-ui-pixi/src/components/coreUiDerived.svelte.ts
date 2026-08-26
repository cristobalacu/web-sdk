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

	const turboActive = $derived(stateBet.isTurbo);
	const turboDisabled = $derived(stateBet.isSpaceHold);
	const onpressTurbo = () => {
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
	};
}
