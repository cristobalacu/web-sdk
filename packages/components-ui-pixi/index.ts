import UI from './src/components/UI.svelte';
import UiGameName from './src/components/UiGameName.svelte';
import PortalPowerPill from './src/components/PortalPowerPill/PortalPowerPill.svelte';

import messagesMap from './src/i18n/messagesMap';
import { i18nDerived } from './src/i18n/i18nDerived';
import { getCoreTheme, setCoreTheme } from './src/theme/context';
import { HEADER_FONT_SCALE_BY_SIZE_TYPE } from './src/components/headerFontScale';

export * from './src/types';
export type { CoreTheme } from './src/theme/types';

export {
	messagesMap,
	i18nDerived,
	UI,
	UiGameName,
	PortalPowerPill,
	getCoreTheme,
	setCoreTheme,
	HEADER_FONT_SCALE_BY_SIZE_TYPE,
};
