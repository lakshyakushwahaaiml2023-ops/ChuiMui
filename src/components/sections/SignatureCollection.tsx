import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import FRAGRANCES from '../../data/fragrances.js';
import Bottle from '../bottles/Bottle';
import '../../styles/signature-collection.css';

interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

interface FragranceItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  notes: FragranceNotes;
  bgColor: string;
  accentColor: string;
  silhouette: string;
  price: string;
  size: string;
  image: string | null;
}

interface SignatureCollectionProps {
  onNavigateProducts?: () => void;
  onSelectFragrance?: (slug: string) => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  onNavigateProducts,
  onSelectFragrance,
}) => {
  const [activeFragrance, setActiveFragrance] = useState<FragranceItem | null>(null);
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

  const handleRowClick = (slug: string) => {
    if (onSelectFragrance) {
      onSelectFragrance(slug);
    } else if (onNavigateProducts) {
      onNavigateProducts();
    }
  };

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateProducts) {
      e.preventDefault();
      onNavigateProducts();
    }
  };

  const getFadeProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.6, delay },
      };
    }

    return {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    };
  };

  return (
    <section
      id="collection"
      className="signature-collection-section"
      aria-label="Signature Collection"
      onMouseLeave={() => setActiveFragrance(null)}
    >
      {/* Dynamic Background Tint Layer triggered on row hover */}
      <div
        className={`signature-collection-bg-tint ${activeFragrance ? 'is-active' : ''}`}
        style={{
          backgroundColor: activeFragrance ? activeFragrance.bgColor : 'transparent',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Accent Aura Layer */}
      <div
        className={`signature-collection-ambient-aura ${activeFragrance ? 'is-active' : ''}`}
        style={{
          background: activeFragrance
            ? `radial-gradient(circle 800px at 65% 50%, ${activeFragrance.accentColor}, transparent 70%)`
            : 'none',
        }}
        aria-hidden="true"
      />

      <div className="signature-collection-container">
        {/* Section Header with Eyebrow, Large Heading, and "View all" Text Link */}
        <motion.div className="signature-collection-header" {...getFadeProps(0.05)}>
          <div className="signature-header-copy">
            <span className="signature-eyebrow">THE ATELIER EDITIONS</span>
            <h2 className="signature-title">
              Signature <span className="title-italic">Collection</span>
            </h2>
          </div>

          <a
            href="/products"
            className="signature-view-all-link"
            onClick={handleViewAllClick}
            aria-label="View all products in the collection"
          >
            <span className="view-all-text">View all</span>
            <span className="view-all-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>

        {/* Editorial Rows List (Not a Card Grid) */}
        <ul className="signature-rows-list" role="list">
          {FRAGRANCES.map((fragrance: FragranceItem, index: number) => {
            const rowNumber = String(index + 1).padStart(2, '0');
            const isHovered = activeFragrance?.slug === fragrance.slug;

            return (
              <motion.li
                key={fragrance.slug}
                className={`signature-row-item ${isHovered ? 'is-row-active' : ''}`}
                style={
                  {
                    '--row-accent': fragrance.accentColor,
                    '--row-bg': fragrance.bgColor,
                  } as React.CSSProperties
                }
                onMouseEnter={() => setActiveFragrance(fragrance)}
                onFocus={() => setActiveFragrance(fragrance)}
                onBlur={() => setActiveFragrance(null)}
                {...getFadeProps(0.1 + index * 0.08)}
              >
                <div
                  className="signature-row"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleRowClick(fragrance.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowClick(fragrance.slug);
                    }
                  }}
                  aria-label={`${fragrance.name} — ${fragrance.tagline}`}
                >
                  {/* Column 1: Identity (Large Serif Name & One-line Tagline) */}
                  <div className="signature-col-identity">
                    <div className="signature-row-meta">
                      <span className="signature-row-index">{rowNumber}</span>
                      <span className="signature-row-volume">
                        {fragrance.size} · Extrait de Parfum
                      </span>
                    </div>

                    <h3 className="signature-row-name">{fragrance.name}</h3>

                    <p className="signature-row-tagline">{fragrance.tagline}</p>

                    <div className="signature-row-price-badge">
                      <span>{fragrance.price}</span>
                    </div>
                  </div>

                  {/* Column 2: Olfactory Notes as Small Typographic Labels */}
                  <div
                    className="signature-col-notes"
                    aria-label={`Olfactory notes for ${fragrance.name}`}
                  >
                    <div className="signature-notes-heading">Olfactory Notes</div>

                    {/* Top Notes */}
                    <div className="signature-note-tier">
                      <span className="signature-note-badge">TOP</span>
                      <div className="signature-note-tags">
                        {fragrance.notes.top.map((note, i) => (
                          <React.Fragment key={note}>
                            <span className="signature-note-tag">{note}</span>
                            {i < fragrance.notes.top.length - 1 && (
                              <span className="signature-note-dot" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Heart Notes */}
                    <div className="signature-note-tier">
                      <span className="signature-note-badge">HEART</span>
                      <div className="signature-note-tags">
                        {fragrance.notes.heart.map((note, i) => (
                          <React.Fragment key={note}>
                            <span className="signature-note-tag">{note}</span>
                            {i < fragrance.notes.heart.length - 1 && (
                              <span className="signature-note-dot" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Base Notes */}
                    <div className="signature-note-tier">
                      <span className="signature-note-badge">BASE</span>
                      <div className="signature-note-tags">
                        {fragrance.notes.base.map((note, i) => (
                          <React.Fragment key={note}>
                            <span className="signature-note-tag">{note}</span>
                            {i < fragrance.notes.base.length - 1 && (
                              <span className="signature-note-dot" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Bottle SVG Flacon Component (Swappable for a real PNG via fragrance.image) */}
                  <div className="signature-col-bottle" aria-hidden="true">
                    <div className="signature-bottle-wrapper">
                      <Bottle
                        fragrance={fragrance}
                        index={index}
                        className="signature-bottle-flacon"
                      />
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Bottom invitation linking to /products */}
        <div className="signature-collection-footer">
          <span className="signature-footer-note">
            Centenary maceration · Hand-numbered crystal flacons
          </span>

          <a
            href="/products"
            className="signature-view-all-link"
            onClick={handleViewAllClick}
            aria-label="View all creations in the boutique"
          >
            <span className="view-all-text">View all creations</span>
            <span className="view-all-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
