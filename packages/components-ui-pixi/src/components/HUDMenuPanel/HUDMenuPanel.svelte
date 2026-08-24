<script lang="ts">
	import { Container, Graphics } from 'pixi-svelte';

	import { getCoreTheme } from '../../theme/context';
	import { drawDarkGlass } from '../../materials/darkGlass';
	import SecondaryIconButton from '../SecondaryIconButton/SecondaryIconButton.svelte';
	import type { IconName } from '../../icons/types';

	type MenuItem = {
		icon: IconName;
		onpress: () => void;
	};

	type Props = {
		open: boolean;
		items: MenuItem[];
		onToggle: () => void;
	};

	const props: Props = $props();
	const theme = getCoreTheme();
	const ITEM_GAP = 14;
	const ITEM_SIZE = theme.geometry.radius.secondaryButton * 2;

	const panelHeight = $derived(props.items.length * (ITEM_SIZE + ITEM_GAP) + ITEM_GAP);
	const panelWidth = ITEM_SIZE + ITEM_GAP * 2;

	const drawPanel = (g: import('pixi.js').Graphics) => drawDarkGlass(theme, g, panelWidth, panelHeight, theme.geometry.radius.card);
</script>

<Container>
	<SecondaryIconButton icon="menu" state="default" onpress={props.onToggle} />

	{#if props.open}
		<Container y={ITEM_SIZE + 20}>
			<Graphics draw={drawPanel} />
			{#each props.items as item, i (item.icon)}
				<Container x={ITEM_GAP} y={ITEM_GAP + i * (ITEM_SIZE + ITEM_GAP)}>
					<SecondaryIconButton icon={item.icon} state="default" onpress={item.onpress} />
				</Container>
			{/each}
		</Container>
	{/if}
</Container>
