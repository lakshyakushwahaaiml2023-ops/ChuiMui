import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const BrandStoryTeaser: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getFadeUpProps = (delay: number) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.8, delay },
      };
    }

    return {
      initial: { opacity: 0, y: 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    };
  };

  return (
    <section id="story" className="editorial-story-section" aria-label="Brand Story">
      <div className="editorial-story-container">
        <div className="editorial-story-layout">
          {/* Side 1: Oversized Serif Headline & Eyebrow */}
          <div className="editorial-story-primary">
            <motion.div
              className="editorial-story-eyebrow"
              {...getFadeUpProps(0.1)}
            >
              CHAPTER I · THE EXTRACTION
            </motion.div>

            <motion.h2
              className="editorial-story-headline"
              {...getFadeUpProps(0.22)}
            >
              Distilled from the Silence <br />
              <span className="headline-italic">of Midnight</span>
            </motion.h2>
          </div>

          {/* Side 2: Short Paragraph + Art-Directed Image (No cards, no buttons) */}
          <div className="editorial-story-secondary">
            <motion.p
              className="editorial-story-paragraph"
              {...getFadeUpProps(0.35)}
            >
              Every formulation begins in the secluded twilight of Grasse, where night-blooming
              jasmine and centenary petals are gathered by hand before the first touch of dawn.
              Cold-macerated in darkness for one hundred and twenty days, our extraits preserve the raw,
              sacred architecture of the earth—pure, untamed, and eternal.
            </motion.p>

            <motion.figure
              className="editorial-story-figure"
              {...getFadeUpProps(0.48)}
            >
              <div className="editorial-story-image-wrapper">
                <img
                  src="/assets/perfume-ingredients.webp"
                  alt="Art-directed still of rare perfume ingredients: raw golden amber resin, velvety dark damask rose petals, and charred agarwood oud chips on dark basalt stone"
                  width={1200}
                  height={896}
                  loading="lazy"
                  decoding="async"
                  className="editorial-story-image"
                />
              </div>
              <figcaption className="editorial-image-caption">
                Fig. 01 — Cold Maceration of Centifolia Rose, Amber Resin & Agarwood
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
};
