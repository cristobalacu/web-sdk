<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';
	import { backgroundRatio } from '../game/stateLayout';

	const context = getContext();
	// `scale` is a literal render-size multiplier for a plain Sprite (unlike the old Spine
	// background, which had its own internal authoring scale) -- 1 makes it cover the
	// canvas edge-to-edge like a normal slot background. Was left at 0.5 (a Spine-era
	// leftover) when the background was swapped from Spine to a static sprite in eaa8197,
	// which rendered the background at half the canvas size.
	const backgroundProps = $derived(context.stateLayoutDerived.normalBackgroundLayout({ scale: 1 }));
	// normalBackgroundLayout gives either width or height (never both) to preserve
	// backgroundRatio.normal; the source art is cropped to that same ratio, so the
	// missing dimension is derived from it rather than the sprite's own natural size.
	const spriteLayout = $derived(
		'width' in backgroundProps
			? { ...backgroundProps, height: backgroundProps.width / backgroundRatio.normal }
			: { ...backgroundProps, width: backgroundProps.height * backgroundRatio.normal },
	);
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite key="foregroundAnimation" anchor={0.5} {...spriteLayout} />
</FadeContainer>

<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<Sprite key="foregroundFeatureAnimation" anchor={0.5} {...spriteLayout} />
</FadeContainer>
