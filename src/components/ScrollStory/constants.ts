/**
 * Shared constants for the scroll-story feature.
 *
 * `ScrollStory` (canvas frame scrubbing) and `StoryHandoff` (interactive
 * card overlay on the final frame) are a single coupled piece. Both must agree
 * on the scroll travel length and the final frame dimensions.
 */

// ─── Scroll travel ───────────────────────────────────────────────────────────
/** Multiplier applied to viewport height: end = `+=innerHeight * SCROLL_MULTIPLIER`. */
export const SCROLL_MULTIPLIER = 2.5;

// ─── Final frame geometry (the frame StoryHandoff overlays) ──────────────────
/** Source dimensions of the final frame, drawn object-fit: cover. */
export const FRAME_W = 3840;
export const FRAME_H = 2160;

// ─── Frame sequence configuration ────────────────────────────────────────────
/**
 * The folder path where the frames are stored (must end with a slash).
 * Update this if you change the directory where your images are located.
 */
export const FRAME_DIR = '/frames/';

/**
 * The prefix of each frame image file.
 */
export const FRAME_PREFIX = 'frame_';

/**
 * The file extension of the frame images (e.g., 'jpg', 'png', 'webp').
 */
export const FRAME_EXTENSION = 'jpg';

/**
 * The character padding for the filename numbers.
 * e.g., 2 for '01', 3 for '001'.
 */
export const FRAME_PADDING = 2;

/**
 * The starting index of the actual image files.
 * (e.g., if files are frame_02.jpg to frame_22.jpg, this is 2.
 *        if files are frame_01.jpg to frame_22.jpg, this is 1.)
 */
export const FRAME_START_FILE_INDEX = 2;

/**
 * The ending index of the actual image files.
 * (e.g., if files are frame_02.jpg to frame_22.jpg, this is 22.
 *        if files are frame_01.jpg to frame_50.jpg, this is 50.)
 */
export const FRAME_END_FILE_INDEX = 22;

/**
 * Total number of animation frames used in the scroll sequence.
 * This represents the total subdivisions of the scroll trigger timeline.
 */
export const TOTAL_FRAMES = 22;

/**
 * Resolves a zero-based frame index to its frame URL.
 * Maps the zero-based index to the actual file index starting at FRAME_START_FILE_INDEX,
 * capped at FRAME_END_FILE_INDEX.
 */
export function getFrameSrc(i: number): string {
  const fileIndex = Math.max(
    FRAME_START_FILE_INDEX,
    Math.min(
      FRAME_END_FILE_INDEX,
      i + FRAME_START_FILE_INDEX
    )
  );
  return `${FRAME_DIR}${FRAME_PREFIX}${String(fileIndex).padStart(FRAME_PADDING, '0')}.${FRAME_EXTENSION}`;
}

// ─── Handoff window (in ScrollTrigger progress units, 0→1) ───────────────────
// The final frame is visible & static from progress ≈ 0.88 (drawn) through 1.0.
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
