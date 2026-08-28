<script lang="ts">
	import config from '../game/config';
	import { i18nDerived } from '../i18n/i18nDerived';

	const rtpLabel = `${(config.rtp * 100).toFixed(1)}%`;
	const buyBonusCostLabel = `${config.betModes.bonus.cost}x`;

	const sections = [
		{ title: i18nDerived.rulesHowToWinTitle(), body: i18nDerived.rulesHowToWinBody() },
		{ title: i18nDerived.rulesTumbleTitle(), body: i18nDerived.rulesTumbleBody() },
		{ title: i18nDerived.rulesWildTitle(), body: i18nDerived.rulesWildBody() },
		{ title: i18nDerived.rulesFreeSpinsTitle(), body: i18nDerived.rulesFreeSpinsBody() },
		{ title: i18nDerived.rulesPortalPowerTitle(), body: i18nDerived.rulesPortalPowerBody() },
		{ title: i18nDerived.rulesBuyBonusTitle(), body: i18nDerived.rulesBuyBonusBody(buyBonusCostLabel) },
		{ title: i18nDerived.rulesRtpTitle(), body: i18nDerived.rulesRtpBody(rtpLabel) },
	];
</script>

<div class="game-rules">
	{#each sections as section (section.title)}
		<section>
			<h3>{section.title}</h3>
			<p>{section.body}</p>
		</section>
	{/each}
</div>

<style lang="scss">
	.game-rules {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: left;
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
	}

	h3 {
		margin: 0 0 0.25rem;
		font-size: 0.95rem;
	}

	p {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.85;
	}
</style>
