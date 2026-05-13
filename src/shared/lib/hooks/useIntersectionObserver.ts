import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Hook for observing intersection of an element with its parent or viewport.
 * Useful for infinite scroll, lazy loading, etc.
 */
export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = '200px',
  threshold = 0.1,
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    const el = targetRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [enabled, root, rootMargin, threshold, onIntersect]);

  return { targetRef };
}
