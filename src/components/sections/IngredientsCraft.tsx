import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import '../../styles/ingredients-craft.css';

interface Ingredient {
  id: string;
  name: string;
  origin: string;
  description: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'bergamot',
    name: 'Bergamot',
    origin: 'Calabria, Italy',
    description: 'Cold-pressed at first dawn for a sharp, crystalline citrus brilliance.',
  },
  {
    id: 'rose',
    name: 'Rose',
    origin: 'Grasse, France',
    description: 'Centifolia petals gathered at twilight for velvety, honeyed floral depth.',
  },
  {
    id: 'oud',
    name: 'Oud',
    origin: 'Assam, India',
    description: 'Smoldering centenary agarwood resin aged in deep subterranean darkness.',
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    origin: 'Madagascar',
    description: 'Slow-cured black bourbon pods with warm, balsam-laced nocturnal sweetness.',
  },
];

export const IngredientsCraft: React.FC = () => {
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

  const getFadeProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay },
      };
    }

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    };
  };

  return (
    <section
      id="ingredients"
      className="ingredients-craft-section"
      aria-label="Ingredients and Craft"
    >
      <div className="ingredients-craft-container">
        {/* Minimal Header */}
        <motion.div className="ingredients-craft-header" {...getFadeProps(0.05)}>
          <span className="ingredients-craft-eyebrow">RAW BOTANICALS &amp; ATELIER SOURCING</span>
          <h2 className="ingredients-craft-title">
            Ingredients <span className="title-italic">&amp; Craft</span>
          </h2>
          <p className="ingredients-craft-subtitle">
            Four noble essences harvested from protected micro-terroirs, cold-macerated in darkness to preserve their primordial soul.
          </p>
        </motion.div>

        {/* Horizontal Strip of 4 Ingredients with Small Decorative Line Between Them */}
        <div className="ingredients-strip" role="list">
          {INGREDIENTS.map((ingredient, index) => {
            const num = String(index + 1).padStart(2, '0');
            const isLast = index === INGREDIENTS.length - 1;

            return (
              <React.Fragment key={ingredient.id}>
                <motion.article
                  className="ingredient-item"
                  role="listitem"
                  {...getFadeProps(0.12 + index * 0.08)}
                >
                  <span className="ingredient-number">№ {num}</span>
                  <h3 className="ingredient-name">{ingredient.name}</h3>
                  <span className="ingredient-origin">{ingredient.origin}</span>
                  <p className="ingredient-desc">{ingredient.description}</p>
                </motion.article>

                {!isLast && (
                  <div
                    className="ingredient-decorative-line"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IngredientsCraft;
