"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

/**
 * Returns a ref and a boolean indicating if the element is in the viewport.
 * @param options - IntersectionObserver options + `once` to stop observing after first trigger.
 */
export function useInView<T extends Element>(options: UseInViewOptions = {}) {
  const { once = true, ...observerOptions } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, observerOptions);

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, observerOptions]);

  return { ref, inView };
}
