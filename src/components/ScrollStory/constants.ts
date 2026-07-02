/**
 * Shared constants for the scroll-story feature.
 *
 * `ScrollStory` (canvas frame scrubbing) and `StoryHandoff` (interactive
 * card overlay on the final frame) are a single coupled piece. Both must agree
 * on the scroll travel length and the final frame dimensions.
 */

// ─── Scroll travel ───────────────────────────────────────────────────────────
/** Multiplier applied to viewport height: end = `+=innerHeight * SCROLL_MULTIPLIER`. */
export const SCROLL_MULTIPLIER = 4;

// ─── Final frame geometry (the frame StoryHandoff overlays) ──────────────────
/** Source dimensions of the final frame (`frame_21`), drawn object-fit: cover. */
export const FRAME_W = 3840;
export const FRAME_H = 2160;

// ─── Frame sequence ──────────────────────────────────────────────────────────
export const TOTAL_FRAMES = 22;

/**
 * Resolves a zero-based frame index to its `/frames/frame_XX.jpg` URL.
 * Maps:
 *   i = 0      => /frames/frame_02.jpg
 *   i = 1..19  => /frames/frame_03.jpg .. /frames/frame_21.jpg
 *   i = 20..21 => /frames/frame_21.jpg (retains the final static dwell window)
 */
export function getFrameSrc(i: number): string {
  const fileIndex = Math.max(2, Math.min(21, i + 2));
  return `/frames/frame_${String(fileIndex).padStart(2, '0')}.jpg`;
}

// ─── Handoff window (in ScrollTrigger progress units, 0→1) ───────────────────
// frame_21 is visible & static from progress ≈ 0.88 (drawn) through 1.0.
// Crossfade the interactive card overlay over the tail.
/** Overlay opacity starts rising. */
export const FADE_START = 0.9;
/** Fully opaque above this. */
export const FADE_END = 0.985;
/** pointer-events + hover/click enabled at/above this. */
export const INTERACTIVE_AT = 0.985;

/** `aria-label` used by ScrollStory's section — StoryHandoff targets it. */
export const TRIGGER_SELECTOR =
  '[aria-label="Edify services storytelling animation"]';
