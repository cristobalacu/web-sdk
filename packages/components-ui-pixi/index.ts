import UI from './src/components/UI.svelte';
import UiGameName from './src/components/UiGameName.svelte';

import messagesMap from './src/i18n/messagesMap';
import { i18nDerived } from './src/i18n/i18nDerived';
import { getCoreTheme, setCoreTheme } from './src/theme/context';

export * from './src/types';
export type { CoreTheme } from './src/theme/types';

export { messagesMap, i18nDerived, UI, UiGameName, getCoreTheme, setCoreTheme };
