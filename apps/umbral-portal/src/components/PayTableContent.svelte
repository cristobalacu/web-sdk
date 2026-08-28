<script lang="ts">
	import config from '../game/config';

	const symbolImages: Record<string, string> = {
		H1: new URL('../../assets/sprites/h1/h1.png', import.meta.url).href,
		H2: new URL('../../assets/sprites/h2/h2.png', import.meta.url).href,
		H3: new URL('../../assets/sprites/h3/h3.png', import.meta.url).href,
		H4: new URL('../../assets/sprites/h4/h4.png', import.meta.url).href,
		L1: new URL('../../assets/sprites/l1/l1.png', import.meta.url).href,
		L2: new URL('../../assets/sprites/l2/l2.png', import.meta.url).href,
		L3: new URL('../../assets/sprites/l3/l3.png', import.meta.url).href,
		L4: new URL('../../assets/sprites/l4/l4.png', import.meta.url).href,
		W: new URL('../../assets/sprites/wild/wild.png', import.meta.url).href,
		S: new URL('../../assets/sprites/scatter/scatter.png', import.meta.url).href,
		M: new URL('../../assets/sprites/multiplier/multiplier.png', import.meta.url).href,
	};

	type PayRange = { from: number; to: number; value: number };

	// The synced paytable lists one entry per exact cluster size (8..36); collapse
	// consecutive sizes that share the same payout into a single displayed range
	// so this stays correct automatically if math-sdk's tier boundaries change.
	function collapseRanges(paytable: Array<Record<string, number>>): PayRange[] {
		const entries = paytable.map((entry) => {
			const [count, value] = Object.entries(entry)[0];
			return { count: Number(count), value };
		});
		const ranges: PayRange[] = [];
		for (const { count, value } of entries) {
			const last = ranges[ranges.length - 1];
			if (last && last.value === value) {
				last.to = count;
			} else {
				ranges.push({ from: count, to: count, value });
			}
		}
		return ranges;
	}

	function formatRange(range: PayRange): string {
		return range.from === range.to ? `${range.from}` : `${range.from}-${range.to}`;
	}

	const paySymbolIds = ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4'] as const;

	const paySymbols = paySymbolIds
		.filter((id) => config.symbols[id]?.paytable)
		.map((id) => ({
			id,
			image: symbolImages[id],
			ranges: collapseRanges(config.symbols[id].paytable as Array<Record<string, number>>),
		}));

	const specialSymbols = [
		{
			id: 'W',
			image: symbolImages.W,
			label: 'Wild',
			description: 'Substitutes for any paying symbol to help complete a win.',
		},
		{
			id: 'S',
			image: symbolImages.S,
			label: 'Scatter',
			description: 'Landing enough Scatters triggers Free Spins. See Game Rules for details.',
		},
		{
			id: 'M',
			image: symbolImages.M,
			label: 'Multiplier',
			description:
				'Carries a multiplier value. During Free Spins its value adds to your Portal Power meter.',
		},
	];
</script>

<div class="pay-table">
	<p class="hint">Wins pay on 8 or more matching symbols anywhere on the board (Scatter Pays).</p>

	<section>
		<h3>Paying Symbols</h3>
		<div class="symbol-grid">
			{#each paySymbols as symbol (symbol.id)}
				<div class="symbol-row">
					<img src={symbol.image} alt={symbol.id} />
					<div class="payouts">
						{#each symbol.ranges as range (range.from)}
							<span class="payout">{formatRange(range)}: {range.value}x</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h3>Special Symbols</h3>
		<div class="symbol-grid">
			{#each specialSymbols as symbol (symbol.id)}
				<div class="symbol-row">
					<img src={symbol.image} alt={symbol.label} />
					<div class="payouts">
						<span class="special-label">{symbol.label}</span>
						<span class="special-description">{symbol.description}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">
	.pay-table {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		text-align: left;
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
	}

	.hint {
		text-align: center;
		opacity: 0.8;
		font-size: 0.85rem;
	}

	h3 {
		text-align: center;
		margin: 0 0 0.5rem;
	}

	.symbol-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.symbol-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.symbol-row img {
		width: 2.5rem;
		height: 2.5rem;
		object-fit: contain;
		flex-shrink: 0;
	}

	.payouts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.75rem;
	}

	.payout {
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.special-label {
		font-weight: bold;
		width: 100%;
	}

	.special-description {
		font-size: 0.8rem;
		opacity: 0.8;
	}
</style>
