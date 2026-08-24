<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from '../constants';
	import { getContext } from '../context';
	import { getCoreTheme } from '../theme/context';
	import HUDContainer from './HUDContainer/HUDContainer.svelte';
	import type { LayoutUiProps } from '../types';

	const props: LayoutUiProps = $props();
	const context = getContext();

	const BOTTOM_BAR_WIDTH = DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0);
</script>

{#snippet bottomBarContent()}
	<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900 - 500} scale={0.8}>
		{@render props.amountBalance({ stacked: true })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900} scale={0.8}>
		{@render props.amountWin({ stacked: true })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900 + 500} scale={0.8}>
		{@render props.amountBet({ stacked: true })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={220} scale={0.8}>
		{@render props.buttonMenu({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={220 + 150} scale={0.8}>
		{@render props.buttonBuyBonus({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 4} scale={0.8}>
		{@render props.buttonAutoSpin({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 5} scale={0.8}>
		{@render props.buttonBet({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 6} scale={0.8}>
		{@render props.buttonTurbo({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={1440} scale={0.8}>
		{@render props.buttonDecrease({ anchor: 0.5 })}
	</Container>

	<Container y={DESKTOP_BASE_SIZE * 0.5} x={1440 + 150} scale={0.8}>
		{@render props.buttonIncrease({ anchor: 0.5 })}
	</Container>
{/snippet}

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

{#if !getCoreTheme().meta.isDefault}
	<!--
		Bug 1 fix (final whole-branch review): this scrim is intentionally mounted UNCONDITIONALLY
		(gated only on the theme, which is invariant post-mount, not on stateUi.menuOpen) and its
		visibility/interactivity toggled via reactive props instead. pixi-svelte's Container
		context (see packages/pixi-svelte/src/lib/context.svelte.ts: addToParent does
		`parent.addChild(node); parent.sortChildren()` inside `onMount`) appends every node to the
		END of its parent's children array at the moment it mounts, and sortChildren() is a no-op
		for equal (default 0) zIndex -- so document/source order only determines paint order for
		nodes that mount in the SAME initial synchronous pass. A node that mounts later (e.g. via
		{#if stateUi.menuOpen}) always ends up appended after -- and therefore rendered on top of
		-- everything already mounted, regardless of where it sits in the template. Since the
		MainContainer bottom bar below (which contains HUDMenuPanel) is already mounted before the
		user ever opens the menu, a scrim that only mounts when stateUi.menuOpen flips true would
		always paint above it, reintroducing this exact bug. Confirmed by inspecting the live
		Pixi stage tree (window.__PIXI_APP__) while testing: the {#if stateUi.menuOpen} version
		put the scrim's Graphics node after the bottom bar's in the children array. Mounting once,
		up front, in template order preserves paint order correctly.
	-->
	<Rectangle
		eventMode={stateUi.menuOpen ? 'static' : 'none'}
		cursor="pointer"
		alpha={stateUi.menuOpen ? 0.5 : 0}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>
{/if}

<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: DESKTOP_BASE_SIZE,
				width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>
		{#if getCoreTheme().meta.isDefault}
			{@render bottomBarContent()}
		{:else}
			<HUDContainer width={BOTTOM_BAR_WIDTH} height={DESKTOP_BASE_SIZE}>
				{#snippet children()}
					{@render bottomBarContent()}
				{/snippet}
			</HUDContainer>
		{/if}
	</Container>
</MainContainer>

{#if stateUi.menuOpen && getCoreTheme().meta.isDefault}
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
			x={298}
			y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		>
			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
