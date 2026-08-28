<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import BaseTitle from './BaseTitle.svelte';

	type Props = {
		children: Snippet;
		title?: string;
		content?: Snippet;
	};

	const props: Props = $props();
</script>

{#if stateModal.modal?.name === 'payTable'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			{#if props.title}
				<BaseTitle>{props.title}</BaseTitle>
			{/if}
			<BaseScrollable type="column">
				{#if !props.title}
					<span>ADD YOUR PAY TABLE</span>
				{/if}
				{#if props.content}
					{@render props.content()}
				{/if}
				{@render props.children()}
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
