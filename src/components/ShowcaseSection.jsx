import React from 'react';
import Bottle from './bottles/Bottle';

export default function ShowcaseSection({ fragrances = [] }) {
  // Arc parameters for 4 bottles: rotation, horizontal & vertical offsets
  const ARC_TRANSFORMS = [
    { rotate: -8, yOffset: 16, scale: 0.92 },
    { rotate: -2.5, yOffset: -8, scale: 1.0 },
    { rotate: 2.5, yOffset: -8, scale: 1.0 },
    { rotate: 8, yOffset: 16, scale: 0.92 },
  ];

  return (
    <section className="section-showcase" id="showcase">
      {/* Volumetric Studio Aura */}
      <div className="showcase-spotlight" />

      <div className="showcase-header">
        <span className="showcase-subtitle-tag">The Complete Quad Collection</span>
        <h2 className="showcase-title">Choose Your Signature</h2>
        <p className="showcase-intro-text">
          Four masterworks of haute parfumerie. Each formula captures a solitary emotion—from smoldering midnight oud to frosted alpine air.
        </p>
      </div>

      {/* Bottles Arranged in an Elegant Arc */}
      <div className="showcase-arc-container">
        <div className="showcase-pedestal-glow" />
        <div className="showcase-arc-row">
          {fragrances.map((fragrance, idx) => {
            const transform = ARC_TRANSFORMS[idx] || { rotate: 0, yOffset: 0, scale: 1 };
            return (
              <div
                key={fragrance.slug}
                className="showcase-bottle-arc-item"
                style={{
                  transform: `translateY(${transform.yOffset}px) rotate(${transform.rotate}deg) scale(${transform.scale})`,
                  '--item-accent': fragrance.accentColor,
                }}
              >
                <div
                  className="bottle-burst-glow"
                  style={{
                    background: `radial-gradient(circle, ${fragrance.accentColor}2c 0%, transparent 70%)`,
                  }}
                />

                <div className="showcase-bottle-frame">
                  <Bottle fragrance={fragrance} index={idx} />
                </div>

                <div className="showcase-bottle-reflection" aria-hidden="true">
                  <Bottle fragrance={fragrance} index={idx} />
                </div>

                <div className="showcase-bottle-caption">
                  <span className="caption-name">{fragrance.name}</span>
                  <span className="caption-price">{fragrance.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discovery Coffret CTA Box */}
      <div className="showcase-discovery-box glassmorphic-panel">
        <div className="discovery-text">
          <h3 className="discovery-title">Indecisive? Experience The Discovery Coffret</h3>
          <p className="discovery-desc">
            Receive all four fragrances in deluxe 5ml miniature flacons, complete with a voucher redeemable against your first full-size bottle.
          </p>
        </div>
        <button className="discovery-btn">
          <span>Acquire Coffret • $85</span>
        </button>
      </div>
    </section>
  );
}
