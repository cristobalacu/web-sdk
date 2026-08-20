<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'dev/RgsRound',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';
	import { stateBet } from 'state-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { playBet } from '../game/utils';
	import { playRound } from '../game/rgsClient';
	import type { Bet } from '../game/typesBookEvent';

	setContext();
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			await args.action?.(args.data);
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<!--
	End-to-end slice: unlike MODE_BASE/book (which replays a committed fixture from
	./data/base_books.ts), this story drives the real PixiJS game renderer from a live
	HTTP round served by the local mock RGS (tools/mock-rgs, http://localhost:8787).

	Chain: math-sdk generated books -> mock RGS /wallet/{authenticate,play,end-round}
	-> rgsClient.playRound() -> playBet() -> bookEventHandlerMap -> Pixi renderer.

	Requires `pnpm run dev` inside tools/mock-rgs first. Without it the fetch fails; the
	catch below logs why and returns, so the Action button resets instead of leaving
	StoryGameTemplate stuck on "Running...".
-->
<Story
	name="live round from mock RGS"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			let round: Awaited<ReturnType<typeof playRound>>;
			try {
				round = await playRound('dev-session', 1_000_000);
			} catch (err) {
				console.error(
					'mock RGS request failed — is it running? Start it with `pnpm run dev` in tools/mock-rgs (http://localhost:8787).',
					err,
				);
				return;
			}

			console.log(
				'mock RGS round: payoutMultiplier',
				round.payoutMultiplier,
				'| book events',
				round.state.length,
				'| balance after end-round',
				round.finalBalance.amount,
			);
			// `round.state` is already the wire-format book-event array, so it can be handed
			// to playBet() as-is — no `events` -> `state` translation needed (contrast with
			// ModeBaseBook.stories.svelte, which reads a raw math-sdk book file).
			// playBet() only reads `bet.state`; the rest of the Bet envelope (roundID, amount,
			// active, ...) is not needed to replay a round, same as ModeBaseBook.stories.svelte.
			await playBet({ state: round.state } as unknown as Bet);

			// Mirror what Authenticate.svelte does in the real app, so the BALANCE readout
			// reflects the mock RGS wallet instead of staying at $0.00.
			stateBet.balanceAmount = round.finalBalance.amount / API_AMOUNT_MULTIPLIER;
		},
	})}
	{template}
/>
