<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiSprite from './UiSprite.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { getCoreTheme } from '../theme/context';
	import SpinButton from './SpinButton/SpinButton.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
</script>

<!--
	Task 12 exception: the Core UI branch lives here (in ButtonBet.svelte) instead of in
	UIDefault.svelte's buttonBet snippet. UIDefault.svelte's buttonBet snippet renders
	<ButtonBet {...buttonProps} /> directly (confirmed by reading the file before writing this),
	and ButtonBet already wraps ButtonBetProvider (bet/stop state machine) + OnHotkey (Space
	hotkey) -- that logic must not be duplicated in UIDefault.svelte, so the branch is placed
	here instead. See task-12-report.md.
-->
<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		{#if getCoreTheme().meta.isDefault}
			<Button {...props} {sizes} {onpress} {disabled}>
				{#snippet children({ center, hovered })}
					<Container {...center}>
						<UiSprite
							key="bet"
							width={sizes.width}
							height={sizes.height}
							anchor={0.5}
							{...disabled || ['spin_disabled', 'stop_disabled'].includes(key)
								? {
										backgroundColor: 0xaaaaaa,
									}
								: {}}
						/>
						<Text
							anchor={0.5}
							text={['spin_default', 'spin_disabled'].includes(key)
								? i18nDerived.bet()
								: i18nDerived.stop()}
							style={{
								align: 'center',
								wordWrap: true,
								wordWrapWidth: 200,
								fontFamily: 'proxima-nova',
								fontWeight: '600',
								fontSize: UI_BASE_FONT_SIZE * 0.9,
								fill: 0xffffff,
							}}
						/>
					</Container>
				{/snippet}
			</Button>
		{:else}
			{@const spinButtonState = disabled
				? 'disabled'
				: ['stop_default', 'stop_disabled'].includes(key)
					? 'spinning'
					: stateBetDerived.hasAutoBetCounter()
						? 'autoplayActive'
						: 'idle'}
			<!--
				SpinButton (unlike SecondaryIconButton) does not gate its own eventMode on
				`state` -- its Container is always eventMode="static" regardless of `disabled`
				(confirmed by reading SpinButton.svelte). Guarding onpress here at the call site
				preserves the legacy "disabled means unclickable" behavior without modifying the
				already-reviewed Task 7 component.
			-->
			{@const spinDiameter = getCoreTheme().geometry.radius.spinDesktop * 2}
			<Container x={-spinDiameter / 2} y={-spinDiameter / 2}>
				<SpinButton state={spinButtonState} onpress={disabled ? undefined : onpress} />
			</Container>
		{/if}
	{/snippet}
</ButtonBetProvider>
