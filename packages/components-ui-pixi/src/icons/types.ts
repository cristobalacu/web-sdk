export type IconName =
	| 'menu'
	| 'autoplay'
	| 'turbo'
	| 'soundOn'
	| 'soundOff'
	| 'settings'
	| 'paytable'
	| 'gameRules'
	| 'close'
	| 'feature'
	| 'spinGlyph'
	| 'stopGlyph';

export type IconProps = {
	name: IconName;
	size: number;
	strokeWidth: number;
	color: string;
};
