<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { stateBet, stateBetDerived, stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle } from 'pixi-svelte';
	import { waitForResolve } from 'utils-shared/wait';

	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import ButtonDrawer from './ButtonDrawer.svelte';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';
	import { getCoreTheme } from '../theme/context';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { numberToCurrencyString, bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import SecondaryIconButton from './SecondaryIconButton/SecondaryIconButton.svelte';
	import HUDMenuPanel from './HUDMenuPanel/HUDMenuPanel.svelte';
	import StatCard from './StatCard/StatCard.svelte';
	import FeatureEntryButton from './FeatureEntryButton/FeatureEntryButton.svelte';
	import { createCoreUiDerived } from './coreUiDerived.svelte';
	import { resolveSpinRadius } from '../theme/resolveSpinRadius';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const coreUiDerived = createCoreUiDerived(context);

	// -- Core UI Mobile --
	// Derivación real del borde inferior del reel, en el espacio de mainLayoutStandard()
	// (la grilla compartida que usa este archivo, 1080x1920 para portrait):
	//   - boardLayout() centra el reel en mainLayout().height * 0.5 con BOARD_SIZES.height=500
	//     fijo (apps/umbral-portal/src/game/constants.ts) -- usa mainLayout() (grilla propia de
	//     la app, mainSizesMap.portrait={800,1422}), no mainLayoutStandard().
	//   - borde inferior en espacio mainLayout: 1422/2 + 500/2 = 961.
	//   - mainSizesMap.portrait (800x1422) y STANDARD_MAIN_SIZES_MAP.portrait (1080x1920) son
	//     proporcionales entre sí (factor 1.35 en ambas dimensiones) -- conversión exacta:
	//     961 * 1.35 ≈ 1297.
	// No se importa stateGameDerived acá (violaría el boundary shared-package/game) -- este
	// número es una constante de solo lectura, no una dependencia en runtime.
	const REEL_BOTTOM_Y = 1297;

	// Factor de compensación de escala: STANDARD_MAIN_SIZES_MAP.portrait (1080x1920) no
	// coincide en escala con el canonical real de Penpot 03 (400x860). 2.7 = 1080/400.
	// Con este wrapper, las coordenadas y tamaños de Penpot se usan literalmente sin conversión
	// adicional; ver spec §3 para la derivación completa.
	const PENPOT_SCALE = 2.7;
	const MOBILE_CONTROLS_Y = 152;
	const MOBILE_SPIN_DIAMETER = resolveSpinRadius(getCoreTheme(), 'portrait');

	const DRAWER_Y = {
		unfold: 0,
		fold: 550,
	};
	const drawerTween = new Tween(stateUi.drawerFold ? DRAWER_Y.fold : DRAWER_Y.unfold, {
		easing: cubicInOut,
	});

	const DRAWER_BUTTON_Y = {
		unfold: 0,
		fold: 50,
	};
	const drawerButtonTween = new Tween(
		stateUi.drawerFold ? DRAWER_BUTTON_Y.fold : DRAWER_BUTTON_Y.unfold,
		{
			easing: cubicInOut,
		},
	);

	let drawerButtonFadeComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		drawerButtonShow: async () => {
			if (!stateUi.drawerButtonShow) {
				stateUi.drawerButtonShow = true;
				await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
			}
		},
		drawerButtonHide: async () => {
			if (stateUi.drawerButtonShow) {
				stateUi.drawerButtonShow = false;
				await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
			}
		},
		drawerUnfold: async () => {
			if (stateUi.drawerFold) {
				drawerButtonTween.set(DRAWER_BUTTON_Y.unfold);
				await drawerTween.set(DRAWER_Y.unfold);
			}
		},
		drawerFold: async () => {
			if (!stateUi.drawerFold) {
				drawerButtonTween.set(DRAWER_BUTTON_Y.fold);
				await drawerTween.set(DRAWER_Y.fold);
			}
		},
	});
</script>

{#if getCoreTheme().meta.isDefault}
	<Container x={20}>
		{@render props.gameName()}
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
		{@render props.logo()}
	</Container>

	<MainContainer standard alignVertical="bottom">
		<!-- drawer container -->
		<Container y={drawerTween.current}>
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				{@render props.buttonMenu({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				{@render props.buttonBuyBonus({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				{@render props.buttonBet({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 180}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				{@render props.buttonAutoSpin({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 180}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				{@render props.buttonTurbo({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 270}
			>
				{@render props.amountBalance({ stacked: true })}
			</Container>
		</Container>

		<Container y={Math.min(drawerTween.current, 350)}>
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 670}
			>
				{@render props.amountWin({ stacked: true })}
			</Container>
		</Container>
	</MainContainer>

	<MainContainer standard alignVertical="bottom">
		{#if stateUi.freeSpinCounterShow}
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
			>
				<LabelFreeSpinCounter stacked />
			</Container>
		{:else}
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
			>
				{@render props.amountBet({ stacked: true })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 390}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 85}
			>
				{@render props.buttonDecrease({ anchor: 0.5 })}
			</Container>

			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 390}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 85}
			>
				{@render props.buttonIncrease({ anchor: 0.5 })}
			</Container>
		{/if}

		<!-- drawer button -->
		<FadeContainer
			persistent
			show={stateUi.drawerButtonShow}
			oncomplete={drawerButtonFadeComplete}
			y={drawerButtonTween.current}
		>
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 105}
			>
				<ButtonDrawer disabled={!stateUi.drawerButtonShow} anchor={0.5} />
			</Container>
		</FadeContainer>
	</MainContainer>

	{#if stateUi.menuOpen}
		<Rectangle
			eventMode="static"
			cursor="pointer"
			alpha={0.5}
			anchor={0.5}
			backgroundColor={BLACK}
			width={context.stateLayoutDerived.canvasSizes().width}
			height={context.stateLayoutDerived.canvasSizes().height}
			x={context.stateLayoutDerived.canvasSizes().width * 0.5}
			y={context.stateLayoutDerived.canvasSizes().height * 0.5}
			onpointerup={() => (stateUi.menuOpen = false)}
		/>

		<MainContainer standard alignVertical="bottom">
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 400}
			>
				<Container y={-190 - 210 * 3}>
					{@render props.buttonPayTable({ anchor: 0.5 })}
				</Container>

				<Container y={-190 - 210 * 2}>
					{@render props.buttonGameRules({ anchor: 0.5 })}
				</Container>

				<Container y={-190 - 210 * 1}>
					{@render props.buttonSettings({ anchor: 0.5 })}
				</Container>

				<Container y={-190}>
					{@render props.buttonSoundSwitch({ anchor: 0.5 })}
				</Container>

				<Container>
					{@render props.buttonMenuClose({ anchor: 0.5 })}
				</Container>
			</Container>
		</MainContainer>
	{/if}
{:else}
	<Container x={20}>
		{@render props.gameName()}
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
		{@render props.logo()}
	</Container>

	<MainContainer standard alignVertical="top">
		<Container x={0} y={REEL_BOTTOM_Y} scale={PENPOT_SCALE}>
			<!-- Stats row: coordenadas literales de Penpot Mobile -- Core Application. -->
			<Container x={12} y={72}>
				<StatCard
					variant="balance"
					size="mobile"
					label={i18nDerived.balance()}
					value={numberToCurrencyString(stateBet.balanceAmount)}
				/>
			</Container>
			<Container x={12 + 118.67 + 10} y={72}>
				<StatCard
					variant="win"
					size="mobile"
					label={i18nDerived.win()}
					value={bookEventAmountToCurrencyString(stateBet.winBookEventAmount)}
					winState={coreUiDerived.winState}
				/>
			</Container>
			<Container x={12 + (118.67 + 10) * 2} y={72}>
				<StatCard
					variant="bet"
					size="mobile"
					label={stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet()}
					value={numberToCurrencyString(stateBetDerived.betCost())}
					onpress={coreUiDerived.betMenuDisabled ? undefined : coreUiDerived.onpressBet}
				/>
			</Container>

			<!-- Controls row: StatsRow bottom (373) + 20px gap = y 393 in Penpot. -->
			<Container x={12} y={152}>
				<HUDMenuPanel
					open={stateUi.menuOpen}
					items={coreUiDerived.menuItems}
					onToggle={coreUiDerived.onToggleMenu}
				/>
			</Container>
			<Container x={12 + 46 + 10} y={152}>
				<SecondaryIconButton
					icon="autoplay"
					state={coreUiDerived.autoSpinDisabled
						? 'disabled'
						: coreUiDerived.autoSpinActive
							? 'active'
							: 'default'}
					onpress={coreUiDerived.onpressAutoSpin}
				/>
			</Container>
			<Container x={12 + (46 + 10) * 2} y={152}>
				<SecondaryIconButton
					icon="turbo"
					state={coreUiDerived.turboDisabled
						? 'disabled'
						: coreUiDerived.turboActive
							? 'active'
							: 'default'}
					onpress={coreUiDerived.onpressTurbo}
				/>
			</Container>
			<Container x={12 + (46 + 10) * 3} y={152}>
				<FeatureEntryButton
					label={coreUiDerived.buyBonusActive ? i18nDerived.disable() : i18nDerived.buyBonus()}
					state={coreUiDerived.buyBonusDisabled
						? 'disabled'
						: coreUiDerived.buyBonusActive
							? 'highlightedAvailable'
							: 'default'}
					size="mobile"
					iconOnly={context.stateLayoutDerived.canvasSizes().width <= 360}
					onpress={coreUiDerived.onpressBuyBonus}
				/>
			</Container>
			<!-- ButtonBet centres its Core spin with a -diameter/2 wrapper. Pass the
			     centre coordinate here so the visible button starts at the controls row. -->
			<Container
				x={388 - MOBILE_SPIN_DIAMETER / 2}
				y={MOBILE_CONTROLS_Y + MOBILE_SPIN_DIAMETER / 2}
			>
				{@render props.buttonBet({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
