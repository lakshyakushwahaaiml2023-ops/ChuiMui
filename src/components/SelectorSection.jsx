import React from 'react';
import Bottle from './bottles/Bottle';

export default function SelectorSection({ fragrances = [] }) {
  return (
    <section className="section-selector" id="selector">
      <div className="section-header-compact">
        <span className="section-subtitle-tag">The Curated Quad</span>
        <h2 className="section-heading-serif">Fragrance Vault</h2>
        <p className="section-caption">Explore four distinct olfactory signatures crafted for the connoisseur.</p>
      </div>

      <div className="selector-grid">
        {fragrances.map((fragrance, idx) => (
          <div
            key={fragrance.slug}
            className="selector-card"
            style={{
              '--card-accent': fragrance.accentColor,
            }}
          >
            <div className="card-top-meta">
              <span className="card-index">0{idx + 1}</span>
              <span className="card-size">{fragrance.size}</span>
            </div>

            <div className="card-bottle-slot">
              <div
                className="slot-ambient-glow"
                style={{
                  background: `radial-gradient(circle, ${fragrance.accentColor}26 0%, transparent 70%)`,
                }}
              />
              <div className="card-bottle-wrapper">
                <Bottle fragrance={fragrance} index={idx} />
              </div>
            </div>

            <div className="card-body">
              <h3 className="card-title">{fragrance.name}</h3>
              <p className="card-tagline">{fragrance.tagline}</p>
              
              <div className="card-notes-preview">
                {fragrance.notes?.heart?.[0] && (
                  <span className="note-badge">Heart: {fragrance.notes.heart[0]}</span>
                )}
              </div>

              <div className="card-footer">
                <span className="card-price">{fragrance.price}</span>
                <a href={`#stage-${fragrance.slug}`} className="card-explore-btn">
                  <span>Explore</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
