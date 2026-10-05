import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HeaderNav from './HeaderNav';
import Bottle from './bottles/Bottle';
import Toast from './Toast';
import FRAGRANCES from '../data/fragrances';
import '../showcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function PerfumeShowcase({ onNavigateHome }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  // Lenis & Timeline References for programmatic navigation
  const lenisRef = useRef(null);
  const masterTlRef = useRef(null);

  // Cart & Toast Notification State
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ visible: false, fragrance: null });

  // Background Panels
  const bgPanelsStackRef = useRef(null);
  const bgHeroRef = useRef(null);
  const bgStagesRef = useRef([]);
  const bgShowcaseRef = useRef(null);

  // Ambient Atmosphere & Glow Layers
  const ambientAtmosphereRef = useRef(null);
  const ambientMistRef = useRef(null);
  const ambientBokehRef = useRef(null);
  const activeAuraStackRef = useRef(null);
  const activeGlowRefs = useRef([]);
  const showcaseAuraRef = useRef(null);

  // Hero Content
  const heroContentRef = useRef(null);
  const heroMetaRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCapsulesRef = useRef(null);
  const heroScrollCueRef = useRef(null);

  // Selector Container & Cards
  const selectorRef = useRef(null);
  const selectorCardsRef = useRef([]);

  // Bottle Wrappers for the 4 Fragrances (Floating Actor Layer)
  const bottlesLayerRef = useRef(null);
  const bottleWrappersRef = useRef([]);

  // Details Panels for the 4 Fragrance Stages
  const detailsPanelsRef = useRef([]);

  // Showcase Section
  const showcaseRef = useRef(null);
  const showcaseSpotlightRef = useRef(null);
  const showcaseHeaderRef = useRef(null);
  const showcaseCaptionRef = useRef(null);
  const showcasePedestalRef = useRef(null);

  // Glass Footer
  const footerRef = useRef(null);

  // Side Progress Indicator References
  const progressItemRefs = useRef([]);
  const currentNameRef = useRef(null);


  // --------------------------------------------------------------------------
  // PROGRAMMATIC LENIS SCROLL TO FRAGRANCE STAGE
  // --------------------------------------------------------------------------
  const scrollToFragrance = useCallback((fragranceIndex) => {
    if (!lenisRef.current || !masterTlRef.current) return;
    const st = masterTlRef.current.scrollTrigger;
    if (!st) return;

    // Timeline positions for each fragrance:
    // 0: Oud Impérial (~1.5/6.0), 1: Rose Crépuscule (~2.5/6.0),
    // 2: Cèdre Blanc (~3.5/6.0), 3: Santal Nocturne (~4.5/6.0)
    const stageTimes = [1.5, 2.5, 3.5, 4.5];
    const targetTime = stageTimes[fragranceIndex] ?? 1.5;
    const targetProgress = targetTime / 6.0;

    const targetScroll = st.start + targetProgress * (st.end - st.start);
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, []);

  const scrollToStage = useCallback((stageIndex) => {
    if (!lenisRef.current || !masterTlRef.current) return;
    const st = masterTlRef.current.scrollTrigger;
    if (!st) return;

    // Stage 0: Hero, Stage 1-4: Fragrances, Stage 5: Final Showcase
    const stageProgresses = [0.03, 1.5 / 6.0, 2.5 / 6.0, 3.5 / 6.0, 4.5 / 6.0, 5.7 / 6.0];
    const targetProgress = stageProgresses[stageIndex] ?? 0;

    const targetScroll = st.start + targetProgress * (st.end - st.start);
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, []);

  // --------------------------------------------------------------------------
  // ADD TO CART ACTION STUB
  // --------------------------------------------------------------------------
  const handleAddToCart = (fragrance) => {
    setCartCount((prev) => prev + 1);
    setToast({ visible: true, fragrance });
  };

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    gsap.config({ force3D: true });
    gsap.defaults({ force3D: true });

    let handleMouseMove = null;
    let tickerCallback = null;
    let lenis = null;

    const ctx = gsap.context(() => {
      // --------------------------------------------------------------------------
      // 1. PREFERS-REDUCED-MOTION & SCREEN CHECK
      // --------------------------------------------------------------------------
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const prefersReducedMotion = mediaQuery.matches;
      const isMobileScreen = window.innerWidth < 768;
      const isMobile = () => window.innerWidth < 960;

      // Helper responsive coordinates
      const getHeroBottleX = () => (isMobile() ? 0 : -window.innerWidth * 0.23);
      const getHeroBottleY = () => (isMobile() ? -window.innerHeight * 0.13 : 65);
      const getStageBottleX = () => 0; // Centered in stage as required by specification!
      const getStageBottleY = () => (isMobile() ? -window.innerHeight * 0.13 : 65);

      // --------------------------------------------------------------------------
      // 2. SOFT BOKEH LIGHT DOTS GENERATION
      // --------------------------------------------------------------------------
      const bokehContainer = ambientBokehRef.current;
      if (bokehContainer) {
        bokehContainer.innerHTML = '';
        const bokehCount = isMobileScreen ? 5 : 12;

        for (let i = 0; i < bokehCount; i++) {
          const dot = document.createElement('div');
          dot.className = 'bokeh-dot';

          const size = gsap.utils.random(14, 40);
          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
          dot.style.left = `${gsap.utils.random(5, 92)}%`;
          dot.style.top = `${gsap.utils.random(8, 88)}%`;
          dot.style.opacity = `${gsap.utils.random(0.18, 0.42)}`;

          bokehContainer.appendChild(dot);

          if (!prefersReducedMotion) {
            gsap.to(dot, {
              x: `+=${gsap.utils.random(-35, 35)}`,
              y: `+=${gsap.utils.random(-45, 45)}`,
              opacity: gsap.utils.random(0.15, 0.48),
              duration: gsap.utils.random(10, 18),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: gsap.utils.random(-8, 0),
            });
          }
        }
      }

      // --------------------------------------------------------------------------
      // 3. SLOW DRIFTING MIST LAYERS
      // --------------------------------------------------------------------------
      if (!prefersReducedMotion && ambientMistRef.current) {
        const mistClouds = ambientMistRef.current.querySelectorAll('.mist-cloud');
        mistClouds.forEach((cloud, idx) => {
          gsap.to(cloud, {
            x: `+=${gsap.utils.random(-60, 60)}`,
            y: `+=${gsap.utils.random(-30, 30)}`,
            scale: gsap.utils.random(0.95, 1.08),
            duration: gsap.utils.random(18, 28) + idx * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * -4,
          });
        });
      }

      // --------------------------------------------------------------------------
      // 4. LENIS SMOOTH SCROLL & SCROLLTRIGGER TICKER
      // --------------------------------------------------------------------------
      lenis = new Lenis({
        autoRaf: false,
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.92,
        smoothTouch: false,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

    // --------------------------------------------------------------------------
    // 5. TIMELINE INITIAL STATES SETUP
    // --------------------------------------------------------------------------
    // Initial Background States
    gsap.set(bgHeroRef.current, { opacity: 1 });
    bgStagesRef.current.forEach((panel) => {
      if (panel) gsap.set(panel, { opacity: 0 });
    });
    gsap.set(bgShowcaseRef.current, { opacity: 0 });

    // Initial Active Bottle Glow States
    if (activeAuraStackRef.current) {
      gsap.set(activeAuraStackRef.current, {
        x: getHeroBottleX,
        y: getHeroBottleY,
        scale: 1,
        opacity: 1,
      });
    }

    if (activeGlowRefs.current[0]) {
      gsap.set(activeGlowRefs.current[0], { opacity: 0.85 });
    }
    for (let i = 1; i < 4; i++) {
      if (activeGlowRefs.current[i]) {
        gsap.set(activeGlowRefs.current[i], { opacity: 0 });
      }
    }
    if (showcaseAuraRef.current) {
      gsap.set(showcaseAuraRef.current, { opacity: 0, scale: 0.85 });
    }

    // Initial Hero Content States
    gsap.set(
      [
        heroMetaRef.current,
        heroTitleRef.current,
        heroDescRef.current,
        heroCapsulesRef.current,
        heroScrollCueRef.current,
      ],
      { opacity: 1, y: 0 }
    );

    // Initial Selector Docking
    gsap.set(selectorRef.current, { opacity: 0, y: 40, pointerEvents: 'none' });
    selectorCardsRef.current.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, y: 60 });
    });

    // Initial Details Panels
    detailsPanelsRef.current.forEach((panel) => {
      if (panel) {
        gsap.set(panel, {
          opacity: 0,
          x: () => (isMobile() ? 0 : 70),
          y: () => (isMobile() ? 80 : 0),
          pointerEvents: 'none',
        });
      }
    });

    // Initial Bottles Layer Setup:
    if (bottleWrappersRef.current[0]) {
      gsap.set(bottleWrappersRef.current[0], {
        opacity: 1,
        scale: () => (isMobile() ? 0.52 : 0.95),
        x: getHeroBottleX,
        y: getHeroBottleY,
        rotateZ: 0,
        zIndex: 20,
      });
    }

    for (let i = 1; i < 4; i++) {
      if (bottleWrappersRef.current[i]) {
        gsap.set(bottleWrappersRef.current[i], {
          opacity: 0,
          scale: 0.25,
          x: 0,
          y: 120,
          rotateZ: 0,
          zIndex: 10,
        });
      }
    }

    // Initial Showcase & Footer States
    gsap.set(showcaseRef.current, { opacity: 0, pointerEvents: 'none' });
    gsap.set([showcaseHeaderRef.current, showcaseCaptionRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(showcaseSpotlightRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(showcasePedestalRef.current, { opacity: 0, scale: 0.85 });
    gsap.set(footerRef.current, { opacity: 0, yPercent: 100, pointerEvents: 'none' });

    // --------------------------------------------------------------------------
    // 6. MASTER PINNED GSAP TIMELINE (6 Virtual Screen Heights, scrub: 1.2)
    // --------------------------------------------------------------------------
    let lastActiveIdx = -1;
    let lastShowcase = false;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * 6,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Resolve active fragrance (0 to 3) for side indicator
          let activeFragranceIdx = 0;
          if (progress < 0.16) activeFragranceIdx = 0;
          else if (progress < 0.32) activeFragranceIdx = 0;
          else if (progress < 0.48) activeFragranceIdx = 1;
          else if (progress < 0.64) activeFragranceIdx = 2;
          else if (progress < 0.80) activeFragranceIdx = 3;
          else activeFragranceIdx = 3;

          const isShowcase = progress >= 0.82;

          if (activeFragranceIdx !== lastActiveIdx) {
            lastActiveIdx = activeFragranceIdx;
            progressItemRefs.current.forEach((item, idx) => {
              if (item) item.classList.toggle('active', idx === activeFragranceIdx);
            });
            if (!isShowcase && currentNameRef.current) {
              currentNameRef.current.innerText = FRAGRANCES[activeFragranceIdx].name;
            }
          }

          if (isShowcase !== lastShowcase) {
            lastShowcase = isShowcase;
            if (currentNameRef.current) {
              currentNameRef.current.innerText = isShowcase
                ? 'Quad Showcase'
                : FRAGRANCES[lastActiveIdx].name;
            }
          }
        },
      },
    });

    masterTlRef.current = masterTl;

    const getCardSlotX = (i) => {
      if (isMobile()) {
        const offsets = [-82, 82, -82, 82];
        return offsets[i] || 0;
      }
      const offsets = [-375, -125, 125, 375];
      return offsets[i] || 0;
    };

    const getCardSlotY = (i) => {
      if (isMobile()) {
        return i < 2 ? -140 : 90;
      }
      return 50;
    };

    // ==========================================================================
    // STAGE 0 -> 1.0: Hero Dissolve & Selector Docking
    // ==========================================================================
    masterTl
      .to(
        [
          heroMetaRef.current,
          heroTitleRef.current,
          heroDescRef.current,
          heroCapsulesRef.current,
          heroScrollCueRef.current,
        ],
        {
          opacity: 0,
          y: -25,
          stagger: 0.02,
          duration: 0.22,
          ease: 'power2.in',
        },
        0.0
      )
      .to(
        activeAuraStackRef.current,
        {
          x: () => getCardSlotX(0),
          y: () => getCardSlotY(0),
          scale: 0.45,
          opacity: 0.35,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0.1
      )
      .to(
        bottleWrappersRef.current[0],
        {
          x: () => getCardSlotX(0),
          y: () => getCardSlotY(0),
          scale: () => (isMobile() ? 0.20 : 0.35),
          rotateZ: 0,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0.1
      )
      .to(
        selectorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          pointerEvents: 'auto', // Enable card interactions
        },
        0.22
      )
      .to(
        selectorCardsRef.current,
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.26
      )
      .fromTo(
        bottleWrappersRef.current[1],
        { opacity: 0, scale: 0.15, x: () => getCardSlotX(1), y: 120 },
        {
          opacity: 1,
          scale: () => (isMobile() ? 0.20 : 0.35),
          x: () => getCardSlotX(1),
          y: () => getCardSlotY(1),
          duration: 0.45,
          ease: 'power2.out',
        },
        0.32
      )
      .fromTo(
        bottleWrappersRef.current[2],
        { opacity: 0, scale: 0.15, x: () => getCardSlotX(2), y: 120 },
        {
          opacity: 1,
          scale: () => (isMobile() ? 0.20 : 0.35),
          x: () => getCardSlotX(2),
          y: () => getCardSlotY(2),
          duration: 0.45,
          ease: 'power2.out',
        },
        0.38
      )
      .fromTo(
        bottleWrappersRef.current[3],
        { opacity: 0, scale: 0.15, x: () => getCardSlotX(3), y: 120 },
        {
          opacity: 1,
          scale: () => (isMobile() ? 0.20 : 0.35),
          x: () => getCardSlotX(3),
          y: () => getCardSlotY(3),
          duration: 0.45,
          ease: 'power2.out',
        },
        0.44
      );

    // ==========================================================================
    // STAGE 1: Fragrance 1 Spotlight (Oud Impérial) [Scroll: 1.0 -> 2.0]
    // ==========================================================================
    masterTl
      .to(
        selectorRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: -20,
          duration: 0.35,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        1.0
      )
      .to(
        [
          bottleWrappersRef.current[1],
          bottleWrappersRef.current[2],
          bottleWrappersRef.current[3],
        ],
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        },
        1.0
      )
      .to(bgHeroRef.current, { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 1.0)
      .to(bgStagesRef.current[0], { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 1.0)
      .to(
        activeAuraStackRef.current,
        {
          x: getStageBottleX,
          y: getStageBottleY,
          scale: 1.15,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        1.1
      )
      .to(activeGlowRefs.current[0], { opacity: 0.9, duration: 0.6 }, 1.1)
      .to(
        bottleWrappersRef.current[0],
        {
          x: getStageBottleX,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.52 : 0.95),
          rotateZ: -2.5,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        1.1
      )
      .to(
        detailsPanelsRef.current[0],
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        1.2
      );

    // ==========================================================================
    // STAGE 2: Fragrance 2 Spotlight (Rose Crépuscule) [Scroll: 2.0 -> 3.0]
    // ==========================================================================
    masterTl
      .to(
        bottleWrappersRef.current[0],
        {
          x: () => -window.innerWidth * 0.55,
          rotateZ: -8,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        },
        2.0
      )
      .to(
        detailsPanelsRef.current[0],
        {
          opacity: 0,
          x: -50,
          duration: 0.35,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        2.0
      )
      .to(bgStagesRef.current[0], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 2.0)
      .to(bgStagesRef.current[1], { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 2.0)
      .to(activeGlowRefs.current[0], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 2.0)
      .to(activeGlowRefs.current[1], { opacity: 0.95, duration: 0.6, ease: 'sine.inOut' }, 2.0)
      .fromTo(
        bottleWrappersRef.current[1],
        {
          x: () => window.innerWidth * 0.45,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.38 : 0.75),
          rotateZ: 6,
          opacity: 0,
        },
        {
          x: getStageBottleX,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.52 : 0.95),
          rotateZ: 2,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        2.1
      )
      .to(
        detailsPanelsRef.current[1],
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        2.2
      );

    // ==========================================================================
    // STAGE 3: Fragrance 3 Spotlight (Cèdre Blanc) [Scroll: 3.0 -> 4.0]
    // ==========================================================================
    masterTl
      .to(
        bottleWrappersRef.current[1],
        {
          x: () => -window.innerWidth * 0.55,
          rotateZ: -7,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        },
        3.0
      )
      .to(
        detailsPanelsRef.current[1],
        {
          opacity: 0,
          x: -50,
          duration: 0.35,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        3.0
      )
      .to(bgStagesRef.current[1], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 3.0)
      .to(bgStagesRef.current[2], { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 3.0)
      .to(activeGlowRefs.current[1], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 3.0)
      .to(activeGlowRefs.current[2], { opacity: 0.95, duration: 0.6, ease: 'sine.inOut' }, 3.0)
      .fromTo(
        bottleWrappersRef.current[2],
        {
          x: () => window.innerWidth * 0.45,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.38 : 0.75),
          rotateZ: 5,
          opacity: 0,
        },
        {
          x: getStageBottleX,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.52 : 0.95),
          rotateZ: -1.8,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        3.1
      )
      .to(
        detailsPanelsRef.current[2],
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        3.2
      );

    // ==========================================================================
    // STAGE 4: Fragrance 4 Spotlight (Santal Nocturne) [Scroll: 4.0 -> 5.0]
    // ==========================================================================
    masterTl
      .to(
        bottleWrappersRef.current[2],
        {
          x: () => -window.innerWidth * 0.55,
          rotateZ: -7,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        },
        4.0
      )
      .to(
        detailsPanelsRef.current[2],
        {
          opacity: 0,
          x: -50,
          duration: 0.35,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        4.0
      )
      .to(bgStagesRef.current[2], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 4.0)
      .to(bgStagesRef.current[3], { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 4.0)
      .to(activeGlowRefs.current[2], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 4.0)
      .to(activeGlowRefs.current[3], { opacity: 0.95, duration: 0.6, ease: 'sine.inOut' }, 4.0)
      .fromTo(
        bottleWrappersRef.current[3],
        {
          x: () => window.innerWidth * 0.45,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.38 : 0.75),
          rotateZ: 6,
          opacity: 0,
        },
        {
          x: getStageBottleX,
          y: getStageBottleY,
          scale: () => (isMobile() ? 0.52 : 0.95),
          rotateZ: 2.2,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        4.1
      )
      .to(
        detailsPanelsRef.current[3],
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        4.2
      );

    // ==========================================================================
    // STAGE 5: Grand Showcase Arc Burst & Glass Footer [Scroll: 5.0 -> 6.0]
    // ==========================================================================
    masterTl
      .to(
        detailsPanelsRef.current[3],
        {
          opacity: 0,
          duration: 0.35,
          pointerEvents: 'none',
        },
        5.0
      )
      .to(
        bottleWrappersRef.current[3],
        {
          scale: 0.4,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        },
        5.0
      )
      .to(bgStagesRef.current[3], { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 5.0)
      .to(bgShowcaseRef.current, { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 5.0)
      .to(activeGlowRefs.current[3], { opacity: 0, duration: 0.5 }, 5.0)
      .to(
        activeAuraStackRef.current,
        {
          x: 0,
          y: isMobile() ? -20 : -10,
          scale: 1.6,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        5.3
      )
      .to(showcaseAuraRef.current, { opacity: 1, scale: 1.1, duration: 0.7 }, 5.3)
      .set(
        bottleWrappersRef.current,
        {
          x: 0,
          y: 180,
          scale: 0.2,
          rotateZ: 0,
          opacity: 0,
        },
        5.4
      )
      .to(showcaseRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }, 5.3)
      .to(showcaseSpotlightRef.current, { opacity: 1, scale: 1.0, duration: 0.6 }, 5.35)
      .to(showcasePedestalRef.current, { opacity: 1, scale: 1.0, duration: 0.6 }, 5.35)
      .to(
        bottleWrappersRef.current[0],
        {
          x: () => (isMobile() ? -115 : -360),
          y: () => (isMobile() ? -130 : -45),
          rotateZ: -10,
          scale: () => (isMobile() ? 0.42 : 0.72),
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.15)',
        },
        5.4
      )
      .to(
        bottleWrappersRef.current[1],
        {
          x: () => (isMobile() ? -38 : -120),
          y: () => (isMobile() ? -155 : -75),
          rotateZ: -3,
          scale: () => (isMobile() ? 0.45 : 0.76),
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.15)',
        },
        5.45
      )
      .to(
        bottleWrappersRef.current[2],
        {
          x: () => (isMobile() ? 38 : 120),
          y: () => (isMobile() ? -155 : -75),
          rotateZ: 3,
          scale: () => (isMobile() ? 0.45 : 0.76),
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.15)',
        },
        5.45
      )
      .to(
        bottleWrappersRef.current[3],
        {
          x: () => (isMobile() ? 115 : 360),
          y: () => (isMobile() ? -130 : -45),
          rotateZ: 10,
          scale: () => (isMobile() ? 0.42 : 0.72),
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.15)',
        },
        5.5
      )
      .to(
        [showcaseHeaderRef.current, showcaseCaptionRef.current],
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
        },
        5.55
      )
      .to(
        footerRef.current,
        {
          opacity: 1,
          yPercent: 0,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: 'power3.out',
        },
        5.7
      );

    // --------------------------------------------------------------------------
    // 7. GENTLE MOUSE PARALLAX (Zero-allocation via gsap.quickTo)
    // --------------------------------------------------------------------------
    if (!prefersReducedMotion) {
      const setAtmoX = ambientAtmosphereRef.current
        ? gsap.quickTo(ambientAtmosphereRef.current, 'x', { duration: 1.5, ease: 'power2.out' })
        : null;
      const setAtmoY = ambientAtmosphereRef.current
        ? gsap.quickTo(ambientAtmosphereRef.current, 'y', { duration: 1.5, ease: 'power2.out' })
        : null;
      const setBottlesX = bottlesLayerRef.current
        ? gsap.quickTo(bottlesLayerRef.current, 'x', { duration: 1.6, ease: 'power2.out' })
        : null;
      const setBottlesY = bottlesLayerRef.current
        ? gsap.quickTo(bottlesLayerRef.current, 'y', { duration: 1.6, ease: 'power2.out' })
        : null;

      handleMouseMove = (e) => {
        const xRel = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const yRel = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        if (setAtmoX && setAtmoY) {
          setAtmoX(xRel * 18);
          setAtmoY(yRel * 14);
        }
        if (setBottlesX && setBottlesY) {
          setBottlesX(xRel * -14);
          setBottlesY(yRel * -10);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
    }
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
      ctx.revert();
    };
  }, []);

  return (
    <div className="perfume-experience-root" ref={containerRef}>
      {/* Subtle Film Grain Texture Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Fixed Luxury Navigation Header */}
      <HeaderNav cartCount={cartCount} onNavigate={scrollToStage} onNavigateHome={onNavigateHome} />

      {/* Luxury Cart Toast Notification */}
      <Toast toast={toast} onClose={handleCloseToast} />

      {/* Pinned 100vh Viewport Stage */}
      <div className="pinned-stage" ref={stageRef}>
        {/* ==================================================================
            BACKGROUND PANELS (STACKED FOR SMOOTH CROSSFADES)
            ================================================================== */}
        <div className="bg-panels-stack" ref={bgPanelsStackRef} aria-hidden="true">
          <div className="bg-panel bg-panel--hero" ref={bgHeroRef} />
          {FRAGRANCES.map((fragrance, idx) => (
            <div
              key={fragrance.slug}
              ref={(el) => (bgStagesRef.current[idx] = el)}
              className={`bg-panel bg-panel--fragrance bg-panel--${fragrance.slug}`}
              style={{
                background: `radial-gradient(ellipse at 50% 45%, ${fragrance.accentColor}22 0%, ${fragrance.bgColor} 70%, #030202 100%)`,
              }}
            />
          ))}
          <div className="bg-panel bg-panel--showcase" ref={bgShowcaseRef} />
        </div>

        {/* ==================================================================
            AMBIENT EFFECTS: MIST, BOKEH LIGHT DOTS & ACTIVE BOTTLE GLOW
            ================================================================== */}
        <div className="ambient-atmosphere-layer" ref={ambientAtmosphereRef} aria-hidden="true">
          <div className="ambient-mist-container" ref={ambientMistRef}>
            <div className="mist-cloud mist-cloud--1" />
            <div className="mist-cloud mist-cloud--2" />
            <div className="mist-cloud mist-cloud--3" />
          </div>

          <div className="ambient-bokeh-container" ref={ambientBokehRef} />

          <div className="active-bottle-aura-stack" ref={activeAuraStackRef}>
            {FRAGRANCES.map((fragrance, idx) => (
              <div
                key={fragrance.slug}
                ref={(el) => (activeGlowRefs.current[idx] = el)}
                className={`active-aura-tint active-aura--${fragrance.slug}`}
                style={{
                  background: `radial-gradient(circle at center, ${fragrance.accentColor}55 0%, ${fragrance.accentColor}20 45%, transparent 75%)`,
                }}
              />
            ))}
            <div
              ref={showcaseAuraRef}
              className="active-aura-tint active-aura--showcase"
              style={{
                background: `radial-gradient(ellipse at center, rgba(201, 151, 66, 0.45) 0%, rgba(201, 151, 66, 0.18) 45%, transparent 75%)`,
              }}
            />
          </div>
        </div>

        {/* Dynamic Studio Caustics Spotlight */}
        <div className="stage-volumetric-spotlight" ref={showcaseSpotlightRef} />

        {/* ==================================================================
            FLOATING BOTTLES LAYER (ACTOR FLACONS)
            ================================================================== */}
        <div className="stage-floating-bottles-layer" ref={bottlesLayerRef}>
          {FRAGRANCES.map((fragrance, idx) => (
            <div
              key={fragrance.slug}
              ref={(el) => (bottleWrappersRef.current[idx] = el)}
              className={`floating-bottle-wrapper bottle-idx-${idx}`}
              style={{ '--fragrance-accent': fragrance.accentColor }}
            >
              <div className="floating-bottle-asset">
                <Bottle fragrance={fragrance} index={idx} />
              </div>
              <div className="floating-bottle-reflection" aria-hidden="true">
                <Bottle fragrance={fragrance} index={idx} />
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================================
            STAGE 0: HERO CONTENT (RIGHT 60% TYPOGRAPHY & CAPSULES)
            ================================================================== */}
        <div className="hero-content-stage" ref={heroContentRef}>
          <div className="hero-meta-badge" ref={heroMetaRef}>
            <span
              className="badge-dot"
              style={{ backgroundColor: FRAGRANCES[0].accentColor }}
            />
            <span className="badge-text">Haute Parfumerie • Collection Privée</span>
          </div>

          <h1 className="hero-title" ref={heroTitleRef}>
            The Art of<br />
            <span className="title-serif-italic">Haute Parfumerie</span>
          </h1>

          <p className="hero-intro-text" ref={heroDescRef}>
            Immerse yourself in our private sanctuary of sensory alchemy. Distilled in Grasse from centenary agarwood, midnight damask roses, and high-altitude alpine cedar, each creation is a bespoke monument to timeless elegance.
          </p>

          <div className="feature-capsules-group" ref={heroCapsulesRef}>
            <div className="glass-capsule">
              <span className="capsule-icon">◈</span>
              <div className="capsule-info">
                <strong className="capsule-title">Pure Extrait</strong>
                <span className="capsule-subtitle">32% Concentration</span>
              </div>
            </div>

            <div className="glass-capsule">
              <span className="capsule-icon">✦</span>
              <div className="capsule-info">
                <strong className="capsule-title">Centenary Glass</strong>
                <span className="capsule-subtitle">Hand-Finished Flacons</span>
              </div>
            </div>

            <div className="glass-capsule">
              <span className="capsule-icon">❖</span>
              <div className="capsule-info">
                <strong className="capsule-title">Rare Harvest</strong>
                <span className="capsule-subtitle">Wild Botanical Essences</span>
              </div>
            </div>
          </div>

          <div
            className="scroll-cue"
            ref={heroScrollCueRef}
            onClick={() => scrollToStage(1)}
            style={{ cursor: 'pointer' }}
          >
            <div className="scroll-cue-mouse">
              <span className="mouse-wheel" />
            </div>
            <span className="scroll-cue-text">Scroll to Unveil Fragrances</span>
            <span className="scroll-cue-arrow">↓</span>
          </div>
        </div>

        {/* ==================================================================
            STAGE 0.5: SELECTOR CARDS DOCK (ROW OF 4 CARDS)
            ================================================================== */}
        <div className="selector-dock-stage" ref={selectorRef}>
          <div className="selector-dock-header">
            <span className="section-subtitle-tag">The Curated Quad</span>
            <h2 className="section-heading-serif">Fragrance Vault</h2>
            <p className="section-caption">Select any flacon to explore its private olfactory composition.</p>
          </div>

          <div className="selector-dock-grid">
            {FRAGRANCES.map((fragrance, idx) => (
              <div
                key={fragrance.slug}
                ref={(el) => (selectorCardsRef.current[idx] = el)}
                className="selector-dock-card"
                style={{ '--card-accent': fragrance.accentColor }}
                onClick={() => scrollToFragrance(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToFragrance(idx)}
                aria-label={`Explore ${fragrance.name}`}
              >
                <div className="card-hover-aura" />
                <div className="card-top-meta">
                  <span className="card-index">0{idx + 1}</span>
                  <span className="card-size">{fragrance.size}</span>
                </div>

                <div className="card-empty-slot" />

                <div className="card-dock-info">
                  <h3 className="card-title">{fragrance.name}</h3>
                  <p className="card-tagline">{fragrance.tagline}</p>
                  
                  <div className="card-action-row">
                    <span className="card-price">{fragrance.price}</span>
                    <span className="card-explore-chip">
                      <span>Experience</span>
                      <span className="chip-arrow">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================
            STAGES 1 - 4: INDIVIDUAL FRAGRANCE DETAILS PANELS
            ================================================================== */}
        <div className="details-panels-stack">
          {FRAGRANCES.map((fragrance, idx) => (
            <div
              key={fragrance.slug}
              ref={(el) => (detailsPanelsRef.current[idx] = el)}
              className="stage-details-floating-panel glassmorphic-panel"
              style={{
                '--stage-accent': fragrance.accentColor,
                '--stage-bg': fragrance.bgColor,
              }}
            >
              <div className="stage-meta-header">
                <span className="stage-sequence-badge">Stage 0{idx + 1} / 04</span>
                <span className="stage-volume-pill">{fragrance.size} • 1.7 FL. OZ.</span>
              </div>

              <h2 className="stage-perfume-title">{fragrance.name}</h2>
              <p className="stage-tagline" style={{ color: fragrance.accentColor }}>
                {fragrance.tagline}
              </p>

              <p className="stage-description">{fragrance.description}</p>

              {/* Three-Tier Olfactory Architecture */}
              <div className="olfactory-pyramid">
                <h4 className="pyramid-label">Olfactory Architecture</h4>

                <div className="pyramid-tier">
                  <span className="tier-name">Top Notes</span>
                  <div className="tier-chips">
                    {fragrance.notes?.top?.map((note, i) => (
                      <span key={i} className="note-chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pyramid-tier">
                  <span className="tier-name">Heart Notes</span>
                  <div className="tier-chips">
                    {fragrance.notes?.heart?.map((note, i) => (
                      <span key={i} className="note-chip note-chip--heart">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pyramid-tier">
                  <span className="tier-name">Base Notes</span>
                  <div className="tier-chips">
                    {fragrance.notes?.base?.map((note, i) => (
                      <span key={i} className="note-chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Add to Cart */}
              <div className="stage-action-bar">
                <div className="stage-pricing">
                  <span className="price-label">Exquisite Offering</span>
                  <span className="price-amount">{fragrance.price}</span>
                </div>

                <button
                  className="add-to-cart-btn"
                  style={{ '--btn-accent': fragrance.accentColor }}
                  onClick={() => handleAddToCart(fragrance)}
                  aria-label={`Add ${fragrance.name} to Cart`}
                >
                  <span className="btn-cart-icon">✦</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================================
            STAGE 5: FINAL SHOWCASE HEADINGS & PEDESTAL
            ================================================================== */}
        <div className="stage-showcase-overlay" ref={showcaseRef}>
          <div
            className="showcase-pedestal-glow"
            ref={showcasePedestalRef}
            aria-hidden="true"
          />

          <div className="showcase-header-pinned">
            <span className="showcase-subtitle-tag" ref={showcaseHeaderRef}>
              The Complete Quad Collection
            </span>
            <h2 className="showcase-title" ref={showcaseCaptionRef}>
              Choose Your Signature
            </h2>
          </div>
        </div>

        {/* ==================================================================
            STAGE 5.5: LUXURY GLASS FOOTER
            ================================================================== */}
        <footer className="pinned-glass-footer" ref={footerRef}>
          <div className="footer-container">
            <div className="footer-grid">
              <div className="footer-col footer-col--brand">
                <div className="footer-brand-title">
                  <span className="brand-crest">✦</span>
                  <span>CHUI MUI</span>
                </div>
                <p className="footer-tagline">
                  Maison de Haute Parfumerie. Handcrafted in Grasse, France with uncompromising dedication to centenary extraction arts and rare botanicals.
                </p>
                <div className="footer-atelier-badge">
                  <span>Atelier Paris • 18 Place Vendôme</span>
                </div>
              </div>

              <div className="footer-col">
                <h4 className="footer-heading">Collection Privée</h4>
                <ul className="footer-links">
                  {FRAGRANCES.map((f, i) => (
                    <li key={f.slug}>
                      <a
                        href={`#${f.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToFragrance(i);
                        }}
                      >
                        {f.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-heading">The Maison</h4>
                <ul className="footer-links">
                  <li><a href="#atelier" onClick={(e) => e.preventDefault()}>Atelier Craft</a></li>
                  <li><a href="#sustainability" onClick={(e) => e.preventDefault()}>Wild Sourcing</a></li>
                  <li><a href="#bespoke" onClick={(e) => e.preventDefault()}>Bespoke Flacons</a></li>
                  <li><a href="#boutiques" onClick={(e) => e.preventDefault()}>Private Salons</a></li>
                </ul>
              </div>

              <div className="footer-col footer-col--newsletter">
                <h4 className="footer-heading">Private Dispatch</h4>
                <p className="newsletter-desc">
                  Receive private invitations to limited harvest batches and private salon tastings.
                </p>
                <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    aria-label="Email Address for newsletter"
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    <span>Join</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-bottom-row">
              <span className="footer-copyright">
                © 2026 CHUI MUI Haute Parfumerie. All rights reserved.
              </span>
              <div className="footer-legal-links">
                <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                <span className="divider">•</span>
                <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                <span className="divider">•</span>
                <a href="#sitemap" onClick={(e) => e.preventDefault()}>Olfactory Index</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ==================================================================
            SIDE PROGRESS INDICATOR (SHOWING CURRENT FRAGRANCE & CLICKABLE)
            ================================================================== */}
        <aside className="luxury-side-progress" aria-label="Fragrance Navigation">
          <div className="progress-track-line" />

          <div className="progress-items-col">
            {FRAGRANCES.map((fragrance, idx) => (
              <button
                key={fragrance.slug}
                ref={(el) => (progressItemRefs.current[idx] = el)}
                className={`progress-item ${idx === 0 ? 'active' : ''}`}
                style={{ '--item-accent': fragrance.accentColor }}
                onClick={() => scrollToFragrance(idx)}
                aria-label={`Scroll to ${fragrance.name}`}
              >
                <span className="progress-item-index">0{idx + 1}</span>
                <span className="progress-item-pip" />
                <span className="progress-item-tooltip">
                  <strong className="tooltip-name">{fragrance.name}</strong>
                  <span className="tooltip-tagline">{fragrance.tagline}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="progress-current-label">
            <span className="current-eyebrow">Active Formulation</span>
            <span className="current-name" ref={currentNameRef}>
              {FRAGRANCES[0].name}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
