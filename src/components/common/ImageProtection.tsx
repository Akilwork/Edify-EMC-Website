"use client";

import { useEffect } from "react";

/**
 * Checks whether an event target or any element in its event path represents
 * an image, video, media container, or element with a background image.
 */
function isProtectedMediaTarget(target: EventTarget | null, event: Event): boolean {
  if (!target) return false;

  const el = target as HTMLElement;

  // 1. Direct tag/role check
  if (
    el instanceof HTMLImageElement ||
    el instanceof HTMLVideoElement ||
    el instanceof HTMLCanvasElement ||
    el.tagName === "IMG" ||
    el.tagName === "PICTURE" ||
    el.tagName === "VIDEO" ||
    el.tagName === "CANVAS" ||
    el.getAttribute?.("role") === "img"
  ) {
    return true;
  }

  // 2. Check composed path (handles nested overlays, badges, text on images)
  if (typeof event.composedPath === "function") {
    const path = event.composedPath();
    for (const item of path) {
      if (item instanceof HTMLElement) {
        if (
          item instanceof HTMLImageElement ||
          item instanceof HTMLVideoElement ||
          item instanceof HTMLCanvasElement ||
          item.tagName === "IMG" ||
          item.tagName === "PICTURE" ||
          item.tagName === "VIDEO" ||
          item.tagName === "CANVAS" ||
          item.getAttribute?.("role") === "img"
        ) {
          return true;
        }

        // Check if element has a CSS background image
        try {
          const bg = window.getComputedStyle(item).backgroundImage;
          if (bg && bg !== "none" && bg.includes("url(")) {
            return true;
          }
        } catch {
          // Ignore style computation errors
        }
      }
    }
  }

  // 3. Check if target itself or its immediate container has an image child
  if (typeof el.querySelector === "function") {
    if (el.querySelector("img, picture, video")) {
      return true;
    }
  }
  if (el.parentElement && typeof el.parentElement.querySelector === "function") {
    if (el.parentElement.querySelector(":scope > img, :scope > picture, :scope > video")) {
      return true;
    }
  }

  return false;
}

/**
 * Enforces draggable=false and context menu prevention on all images in the document.
 */
function protectAllImages(root: ParentNode = document) {
  const images = root.querySelectorAll<HTMLImageElement>("img");
  images.forEach((img) => {
    img.draggable = false;
    img.setAttribute("draggable", "false");
    img.setAttribute("oncontextmenu", "return false;");
    img.style.userSelect = "none";
    (img.style as CSSStyleDeclaration & { webkitUserDrag?: string }).webkitUserDrag = "none";
  });
}

export default function ImageProtection() {
  useEffect(() => {
    // 1. Prevent context menu on any image / media
    const handleContextMenu = (e: MouseEvent) => {
      if (isProtectedMediaTarget(e.target, e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 2. Prevent dragging images / media
    const handleDragStart = (e: DragEvent) => {
      if (isProtectedMediaTarget(e.target, e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 3. Prevent keyboard shortcuts for saving the page or media (Ctrl+S / Cmd+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    };

    // Apply listeners in capture phase so they run before any element handles or swallows them
    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    // Initial pass on existing DOM
    protectAllImages(document);

    // Observer to automatically protect dynamically loaded / rendered images
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.tagName === "IMG") {
                const img = node as HTMLImageElement;
                img.draggable = false;
                img.setAttribute("draggable", "false");
                img.setAttribute("oncontextmenu", "return false;");
              } else {
                protectAllImages(node);
              }
            }
          });
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      observer.disconnect();
    };
  }, []);

  return null;
}
