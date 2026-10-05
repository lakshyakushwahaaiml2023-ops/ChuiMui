import React from 'react';
import Bottle from './bottles/Bottle';

export default function FragranceStages({ fragrances = [] }) {
  return (
    <div className="fragrance-stages-container" id="stages">
      {fragrances.map((fragrance, idx) => (
        <section
          key={fragrance.slug}
          id={`stage-${fragrance.slug}`}
          className="fragrance-stage-item"
          style={{
            '--stage-accent': fragrance.accentColor,
            '--stage-bg': fragrance.bgColor,
          }}
        >
          {/* Subtle Ambient Radial Glow for this fragrance stage */}
          <div
            className="stage-radial-backdrop"
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${fragrance.accentColor}18 0%, ${fragrance.bgColor}88 60%, ${fragrance.bgColor} 100%)`,
            }}
          />

          <div className="stage-content-grid">
            {/* Centered Bottle Display Column */}
            <div className="stage-bottle-col">
              <div className="stage-bottle-frame">
                <div
                  className="bottle-pedestal-light"
                  style={{
                    background: `radial-gradient(circle, ${fragrance.accentColor}35 0%, transparent 70%)`,
                  }}
                />
                
                <div className="stage-bottle-hero">
                  <Bottle fragrance={fragrance} index={idx} />
                </div>

                {/* Mirror Glass Floor Reflection */}
                <div className="stage-bottle-reflection" aria-hidden="true">
                  <Bottle fragrance={fragrance} index={idx} />
                </div>
              </div>
            </div>

            {/* Fragrance Details Panel Column */}
            <div className="stage-details-col">
              <div className="stage-details-panel glassmorphic-panel">
                <div className="stage-meta-header">
                  <span className="stage-sequence-badge">Stage 0{idx + 1} / 04</span>
                  <span className="stage-volume-pill">{fragrance.size} • 1.7 FL. OZ.</span>
                </div>

                <h2 className="stage-perfume-title">{fragrance.name}</h2>
                <p className="stage-tagline" style={{ color: fragrance.accentColor }}>
                  {fragrance.tagline}
                </p>

                <p className="stage-description">{fragrance.description}</p>

                {/* Olfactory Pyramid Notes */}
                <div className="olfactory-pyramid">
                  <h4 className="pyramid-label">Olfactory Architecture</h4>
                  
                  <div className="pyramid-tier">
                    <span className="tier-name">Top Notes</span>
                    <div className="tier-chips">
                      {fragrance.notes?.top?.map((note, i) => (
                        <span key={i} className="note-chip">{note}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pyramid-tier">
                    <span className="tier-name">Heart Notes</span>
                    <div className="tier-chips">
                      {fragrance.notes?.heart?.map((note, i) => (
                        <span key={i} className="note-chip note-chip--heart">{note}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pyramid-tier">
                    <span className="tier-name">Base Notes</span>
                    <div className="tier-chips">
                      {fragrance.notes?.base?.map((note, i) => (
                        <span key={i} className="note-chip">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart Action */}
                <div className="stage-action-bar">
                  <div className="stage-pricing">
                    <span className="price-label">Exquisite Offering</span>
                    <span className="price-amount">{fragrance.price}</span>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    style={{
                      '--btn-accent': fragrance.accentColor,
                    }}
                  >
                    <span className="btn-cart-icon">✦</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
