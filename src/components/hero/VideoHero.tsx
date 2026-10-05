import React, { useRef, useEffect, useCallback } from 'react';
import { useLenis } from '../providers/LenisContext';

// Exact video properties validated via ffprobe inspection
const TOTAL_FRAMES = 121;
const SOURCE_FPS = 24;
const FINAL_FRAME_INDEX = TOTAL_FRAMES - 1; // 120
const FINAL_SEEK_TIME = FINAL_FRAME_INDEX / SOURCE_FPS; // 5.000s

interface VideoHeroProps {
  onNavigateCollection?: () => void;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ onNavigateCollection }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const primaryCopyRef = useRef<HTMLDivElement | null>(null);
  const secondaryCopyRef = useRef<HTMLDivElement | null>(null);

  // Frame coalescing and readiness tracking (zero React state for scroll progress)
  const lastTargetFrameRef = useRef<number>(-1);
  const lastProgressRef = useRef<number>(0);
  const isVideoReadyRef = useRef<boolean>(false);

  // Obtain the single Lenis instance from SmoothScrollProvider
  const lenis = useLenis();

  // ---------------------------------------------------------------------------
  // SYNCHRONOUS SCROLL-TO-FRAME & OPACITY/TRANSFORM UPDATE (No second rAF loop)
  // ---------------------------------------------------------------------------
  const syncFrameAndOpacity = useCallback((progress: number) => {
    lastProgressRef.current = progress;
    const video = videoRef.current;
    if (!video || !isVideoReadyRef.current) return;

    // Skip updates if document is hidden to conserve GPU/CPU cycles
    if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, progress));

    // 1. Target frame calculation
    const targetFrame = Math.round(clampedProgress * FINAL_FRAME_INDEX);

    // Skip duplicate target-frame seeks to avoid unnecessary decoder work
    if (targetFrame !== lastTargetFrameRef.current) {
      lastTargetFrameRef.current = targetFrame;

      let seekTime = targetFrame / SOURCE_FPS;
      if (targetFrame === 0) {
        seekTime = 0;
      } else if (targetFrame === FINAL_FRAME_INDEX) {
        seekTime = FINAL_SEEK_TIME;
      }

      // Direct currentTime assignment (instantaneous seek on All-Intra video)
      video.currentTime = seekTime;
    }

    // 2. Pure Transform & Opacity Transformations Only (Compositor accelerated)
    // Secondary fades out between 0.15 and 0.23
    // Primary fades out between 0.20 and 0.28
    let primaryOp = 1;
    if (clampedProgress >= 0.28) {
      primaryOp = 0;
    } else if (clampedProgress > 0.20) {
      primaryOp = 1 - (clampedProgress - 0.20) / 0.08;
    }

    let secondaryOp = 1;
    if (clampedProgress >= 0.23) {
      secondaryOp = 0;
    } else if (clampedProgress > 0.15) {
      secondaryOp = 1 - (clampedProgress - 0.15) / 0.08;
    }

    if (primaryCopyRef.current) {
      primaryCopyRef.current.style.opacity = primaryOp.toFixed(3);
      const primaryY = (1 - primaryOp) * -16;
      primaryCopyRef.current.style.transform = `translate3d(0, ${primaryY.toFixed(1)}px, 0)`;
      primaryCopyRef.current.style.pointerEvents = primaryOp <= 0.02 ? 'none' : 'auto';
    }

    if (secondaryCopyRef.current) {
      secondaryCopyRef.current.style.opacity = secondaryOp.toFixed(3);
      const secondaryY = (1 - secondaryOp) * -10;
      secondaryCopyRef.current.style.transform = `translate3d(0, ${secondaryY.toFixed(1)}px, 0)`;
      secondaryCopyRef.current.style.pointerEvents = secondaryOp <= 0.02 ? 'none' : 'auto';
    }
  }, []);

  // ---------------------------------------------------------------------------
  // SCROLL ATTACHMENT DIRECTLY TO LENIS (Single RAF Loop)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrollY = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollY / totalScrollable));
      syncFrameAndOpacity(progress);
    };

    if (lenis) {
      // Lenis executes its scroll callback directly inside its single RAF tick.
      // This eliminates any second requestAnimationFrame loop and avoids frame lag.
      lenis.on('scroll', handleScroll);
      handleScroll();

      return () => {
        lenis.off('scroll', handleScroll);
      };
    } else {
      // Passive listener fallback for environments where Lenis is not active
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lenis, syncFrameAndOpacity]);

  // ---------------------------------------------------------------------------
  // VIDEO LIFECYCLE, METADATA & RE-SYNCHRONIZATION
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict guarantee video stays paused
    video.pause();

    const handleMediaReady = () => {
      if (video.duration && Number.isFinite(video.duration) && video.duration > 0) {
        isVideoReadyRef.current = true;
        lastTargetFrameRef.current = -1;
        syncFrameAndOpacity(lastProgressRef.current);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastTargetFrameRef.current = -1;
        syncFrameAndOpacity(lastProgressRef.current);
      }
    };

    const handlePageShow = () => {
      lastTargetFrameRef.current = -1;
      syncFrameAndOpacity(lastProgressRef.current);
    };

    video.addEventListener('loadedmetadata', handleMediaReady);
    video.addEventListener('loadeddata', handleMediaReady);
    video.addEventListener('canplay', handleMediaReady);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    if (video.readyState >= 1) {
      handleMediaReady();
    } else {
      syncFrameAndOpacity(0);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleMediaReady);
      video.removeEventListener('loadeddata', handleMediaReady);
      video.removeEventListener('canplay', handleMediaReady);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [syncFrameAndOpacity]);

  return (
    <section ref={containerRef} id="hero" className="hero-scroll-section" aria-label="Hero Experience">
      {/* Sticky Full-Screen Stage (100svh / 100dvh) */}
      <div className="hero-sticky-stage">
        {/* Scrub-Optimized Video Element with WebP Poster */}
        <video
          ref={videoRef}
          className="hero-scrub-video"
          src="/hero-scrub.mp4"
          poster="/hero-poster.webp"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Editorial Typography Overlay (Positioned in Right-Hand Negative Space) */}
        <div className="hero-editorial-overlay">
          {/* Primary Copy Block */}
          <div ref={primaryCopyRef} className="hero-primary-copy-block" style={{ opacity: 1 }}>
            <div className="editorial-eyebrow">HAUTE PARFUMERIE · ÉDITION LIMITÉE</div>
            <h1 className="editorial-headline">
              Silence, Captured <br />
              <span className="headline-italic">in Glass</span>
            </h1>
            <p className="editorial-paragraph">
              Distilled in Grasse from centenary agarwood, midnight damask roses, and high-altitude alpine cedar. Each
              flacon is a quiet testament to timeless extraction.
            </p>
          </div>

          {/* Secondary Copy Block */}
          <div ref={secondaryCopyRef} className="hero-secondary-copy-block" style={{ opacity: 1 }}>
            <span className="secondary-meta">Hand-numbered flacons crafted in Grasse</span>
            <a
              href="/collection"
              className="editorial-text-link"
              onClick={(e) => {
                if (onNavigateCollection) {
                  e.preventDefault();
                  onNavigateCollection();
                }
              }}
            >
              Discover the collection <span className="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
