import React from 'react';

export default function GlassFooter() {
  return (
    <footer className="luxury-glass-footer">
      <div className="footer-grain-layer" aria-hidden="true" />
      
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Col */}
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

          {/* Column: Fragrances */}
          <div className="footer-col">
            <h4 className="footer-heading">Collection Privée</h4>
            <ul className="footer-links">
              <li><a href="#stage-oud-imperial">Oud Impérial</a></li>
              <li><a href="#stage-rose-crepuscule">Rose Crépuscule</a></li>
              <li><a href="#stage-cedre-blanc">Cèdre Blanc</a></li>
              <li><a href="#stage-santal-nocturne">Santal Nocturne</a></li>
              <li><a href="#showcase">Discovery Coffret</a></li>
            </ul>
          </div>

          {/* Column: Maison */}
          <div className="footer-col">
            <h4 className="footer-heading">The Maison</h4>
            <ul className="footer-links">
              <li><a href="#atelier" onClick={(e) => e.preventDefault()}>Atelier Craft</a></li>
              <li><a href="#sustainability" onClick={(e) => e.preventDefault()}>Wild Sourcing</a></li>
              <li><a href="#bespoke" onClick={(e) => e.preventDefault()}>Bespoke Flacons</a></li>
              <li><a href="#boutiques" onClick={(e) => e.preventDefault()}>Private Salons</a></li>
            </ul>
          </div>

          {/* Column: Private Consultation Newsletter */}
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

        {/* Bottom Gold Hairline & Legal */}
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
  );
}
