import { stateI18nDerived } from 'state-shared';

import { i18nDerived as i18nDerivedUiPixi } from 'components-ui-pixi';
import { i18nDerived as i18nDerivedUiHtml } from 'components-ui-html';

export const i18nDerived = {
	...i18nDerivedUiPixi,
	...i18nDerivedUiHtml,
	home: () => stateI18nDerived.translate('HOME'),
	notTranslated: () => stateI18nDerived.translate('NOT TRANSLATED'),
	payTableTitle: () => stateI18nDerived.translate('PAY TABLE'),
	gameRulesTitle: () => stateI18nDerived.translate('GAME RULES'),
	rulesHowToWinTitle: () => stateI18nDerived.translate('How to Win'),
	rulesHowToWinBody: () =>
		stateI18nDerived.translate(
			'Wins pay when 8 or more matching symbols land anywhere on the board. There are no fixed paylines (Scatter Pays).',
		),
	rulesTumbleTitle: () => stateI18nDerived.translate('Tumble'),
	rulesTumbleBody: () =>
		stateI18nDerived.translate(
			'Winning symbols disappear and new symbols fall in to take their place. Tumbles repeat as long as new wins keep landing.',
		),
	rulesWildTitle: () => stateI18nDerived.translate('Wild'),
	rulesWildBody: () =>
		stateI18nDerived.translate('The Wild symbol substitutes for any paying symbol to help complete a win.'),
	rulesPortalPowerTitle: () => stateI18nDerived.translate('Multiplier & Portal Power'),
	rulesPortalPowerBody: () =>
		stateI18nDerived.translate(
			'Multiplier symbols carry a value. During Free Spins, every Multiplier symbol that lands adds its value to the Portal Power meter, which multiplies your total win for that spin.',
		),
	rulesFreeSpinsTitle: () => stateI18nDerived.translate('Scatter & Free Spins'),
	rulesFreeSpinsBody: () =>
		stateI18nDerived.translate(
			'Landing 4 or more Scatter symbols triggers Free Spins. Landing more Scatters awards more Free Spins and a higher starting Portal Power multiplier.',
		),
	rulesBuyBonusTitle: () => stateI18nDerived.translate('Buy Bonus'),
	rulesBuyBonusBody: (cost: string) =>
		stateI18nDerived.translate(`Buy Bonus instantly triggers Free Spins for a fixed cost of ${cost} your bet.`),
	rulesRtpTitle: () => stateI18nDerived.translate('Return to Player'),
	rulesRtpBody: (rtp: string) =>
		stateI18nDerived.translate(`The theoretical Return to Player (RTP) for this game is ${rtp}.`),
};
