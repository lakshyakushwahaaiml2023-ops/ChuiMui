import React, { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    // Finite easing curve directly from the reference specification (PDF Page 8)
    const finiteEaseOut = (progress: number) => {
      const easeOutQuad = 1 - (1 - progress) ** 2;
      return easeOutQuad * 0.45 + progress * 0.55;
    };

    // Lenis is configured with autoRaf: true.
    // This runs exactly ONE requestAnimationFrame loop for the smooth scroll experience.
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      duration: 0.68,
      easing: finiteEaseOut,
      wheelMultiplier: 0.72,
      autoRaf: true,
      anchors: true,
      respectReducedMotion: false,
      virtualScroll: (input) => {
        input.deltaY = Math.max(-180, Math.min(180, input.deltaY));
        return true;
      },
    });

    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
      window.dispatchEvent(new CustomEvent('lenis:ready'));
    }

    return () => {
      if (typeof window !== 'undefined' && window.__lenis === lenis) {
        window.__lenis = null;
        window.dispatchEvent(new CustomEvent('lenis:ready'));
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
