import { useSyncExternalStore } from 'react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('lenis:ready', callback);
  return () => {
    window.removeEventListener('lenis:ready', callback);
  };
}

function getSnapshot(): Lenis | null {
  return typeof window !== 'undefined' ? (window.__lenis ?? null) : null;
}

function getServerSnapshot(): Lenis | null {
  return null;
}

/**
 * Idiomatic React subscription to the single active Lenis instance.
 * Ensures the single requestAnimationFrame loop drives all scroll consumers.
 */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
