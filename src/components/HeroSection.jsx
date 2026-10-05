import React from 'react';
import Bottle from './bottles/Bottle';

export default function HeroSection({ firstFragrance }) {
  if (!firstFragrance) return null;

  return (
    <section className="section-hero" id="hero">
      <div className="hero-split-container">
        {/* Left Column (40% desktop): Bottle Showcase & Floor Reflection */}
        <div className="hero-bottle-col">
          <div className="hero-bottle-wrapper">
            <div
              className="bottle-aura"
              style={{
                background: `radial-gradient(circle, ${firstFragrance.accentColor}33 0%, transparent 70%)`,
              }}
            />
            <div className="hero-bottle-main">
              <Bottle fragrance={firstFragrance} index={0} />
            </div>
            {/* Mirror Reflection beneath bottle */}
            <div className="hero-bottle-reflection" aria-hidden="true">
              <Bottle fragrance={firstFragrance} index={0} />
            </div>
          </div>
        </div>

        {/* Right Column (60% desktop): Typography, Capsules & Scroll Cue */}
        <div className="hero-content-col">
          <div className="hero-meta-badge">
            <span className="badge-dot" style={{ backgroundColor: firstFragrance.accentColor }} />
            <span className="badge-text">Haute Parfumerie • Collection Privée</span>
          </div>

          <h1 className="hero-title">
            The Art of<br />
            <span className="title-serif-italic">Haute Parfumerie</span>
          </h1>

          <p className="hero-intro-text">
            Immerse yourself in our private sanctuary of sensory alchemy. Distilled in Grasse from centenary agarwood, midnight damask roses, and high-altitude alpine cedar, each creation is a bespoke monument to timeless elegance.
          </p>

          {/* Three Glassmorphic Feature Capsules */}
          <div className="feature-capsules-group">
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

          {/* Luxury Scroll-Down Indicator */}
          <div className="scroll-cue">
            <div className="scroll-cue-mouse">
              <span className="mouse-wheel" />
            </div>
            <span className="scroll-cue-text">Scroll to Unveil Fragrances</span>
            <span className="scroll-cue-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
