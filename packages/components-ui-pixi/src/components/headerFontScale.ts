// Shared between UiGameName.svelte (clock + game name) and each game's own header content
// (e.g. umbral-portal's Game.svelte logo snippet) so both scale down together at the same
// canvasSizeType tier -- otherwise one side stays full-size while the other shrinks, which
// looks broken rather than just tight. compact gets a smaller scale than smallMobile: it has
// less available header width for the same two texts, and a single 0.75 scale for the whole
// smallMobile-and-below range still let the game name overlap a game's logo even at the top
// of that range (see docs/superpowers/2026-08-21-stake-engine-submission-punchlist.md block 9).
// Sizes not listed here (mobile/tablet/largeTablet/desktop) keep the default full scale.
export const HEADER_FONT_SCALE_BY_SIZE_TYPE: Record<string, number> = {
	smallMobile: 0.65,
	compact: 0.5,
};
