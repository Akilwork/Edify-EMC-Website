/**
 * Shared constants for the scroll-story feature.
 *
 * `ScrollStory` (canvas frame scrubbing) and `StoryHandoff` (interactive
 * card overlay on the final frame) are a single coupled piece. Both must agree
 * on the scroll travel length and the final frame dimensions.
 */

// ─── Scroll travel ───────────────────────────────────────────────────────────
/** Multiplier applied to viewport height: end = `+=innerHeight * SCROLL_MULTIPLIER`. */
export const SCROLL_MULTIPLIER = 1.5;

// ─── Final frame geometry (the frame StoryHandoff overlays) ──────────────────
/** Source dimensions of the final frame, drawn object-fit: cover. */
export const FRAME_W = 1920;
export const FRAME_H = 1080;

// ─── Frame sequence configuration ────────────────────────────────────────────
/**
 * The folder path where the frames are stored (must end with a slash).
 * Update this if you change the directory where your images are located.
 */
export const FRAME_DIR = '/Introsection/';

/**
 * The prefix of each frame image file.
 */
export const FRAME_PREFIX = 'frame_';

/**
 * The file extension of the frame images (e.g., 'jpg', 'png', 'webp').
 */
export const FRAME_EXTENSION = 'webp';

/**
 * The character padding for the filename numbers.
 * e.g., 2 for '01', 3 for '001'.
 */
export const FRAME_PADDING = 2;

/**
 * The starting index of the actual image files.
 * (e.g., frame_01.jpg starts at 1)
 */
export const FRAME_START_FILE_INDEX = 1;

/**
 * The ending index of the actual image files.
 * (e.g., frame_45.jpg ends at 45)
 */
export const FRAME_END_FILE_INDEX = 45;

/**
 * Total number of animation frames used in the scroll sequence.
 * This represents the total subdivisions of the scroll trigger timeline.
 */
export const TOTAL_FRAMES = 45;

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
