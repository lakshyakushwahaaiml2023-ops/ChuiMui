import React, { useState } from 'react';
import { motion } from 'motion/react';
import '../../styles/closing-footer.css';

interface ClosingFooterProps {
  onNavigateCollection?: () => void;
  onNavigateHome?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const ClosingFooter: React.FC<ClosingFooterProps> = ({
  onNavigateCollection,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    // Stub handler for dispatch subscription
    setIsSubmitted(true);
  };

  const handleCollectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('collection');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigateCollection) {
      e.preventDefault();
      onNavigateCollection();
    }
  };

  const handleStoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('story');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="contact" className="closing-section-wrapper">
      <div className="closing-container">
        {/* ==================================================================
            CLOSING SECTION
            Large centered headline & text-style email signup
            ================================================================== */}
        <section className="closing-editorial-block" aria-label="Newsletter & Private Dispatch">
          <span className="closing-eyebrow">PRIVATE DISPATCH · LES ÉDITIONS LIMITÉES</span>

          <motion.h2
            className="closing-headline"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Enter the Quiet Sanctum <br />
            <span className="headline-italic">of Scent</span>
          </motion.h2>

          <p className="closing-description">
            Receive private correspondence detailing unreleased harvest extraits, subterranean
            aging releases, and confidential invitations to private salon tastings.
          </p>

          <form className="closing-email-form" onSubmit={handleSubmit} noValidate>
            {isSubmitted ? (
              <p className="closing-form-success" role="status">
                ✦ Your invitation has been registered. Welcome to the atelier.
              </p>
            ) : (
              <div className="closing-form-row">
                <label htmlFor="closing-email-field" className="sr-only">
                  Email Address
                </label>
                <input
                  id="closing-email-field"
                  type="email"
                  className="closing-email-input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="closing-submit-btn"
                  aria-label="Subscribe to Private Dispatch"
                >
                  <span>Subscribe</span>
                  <span className="closing-submit-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            )}
            <p className="closing-form-disclaimer">
              Dispatched with uncompromising discretion · Zero unsolicited correspondence
            </p>
          </form>
        </section>

        {/* ==================================================================
            GOLD HAIRLINE DIVIDER ONLY (Zero glassmorphism)
            ================================================================== */}
        <hr className="gold-hairline-divider" aria-hidden="true" />

        {/* ==================================================================
            RESTRAINED FOOTER
            Wordmark, Collection, Story, Contact, social links, and copyright
            ================================================================== */}
        <footer className="restrained-footer" role="contentinfo">
          <div className="footer-nav-grid">
            {/* Wordmark */}
            <div className="footer-brand">
              <a
                href="/"
                className="footer-wordmark"
                onClick={handleHomeClick}
                aria-label="Return to CHUI MUI Paris Home"
              >
                <span className="footer-brand-title">CHUI MUI</span>
                <span className="footer-brand-sub">PARIS</span>
              </a>
              <p className="footer-brand-motto">
                Maison de Haute Parfumerie. Centenary extraction arts and solitary formulations
                distilled in Grasse, France.
              </p>
            </div>

            {/* Navigation Groups: Collection, Story, Contact + Social Links */}
            <div className="footer-nav-groups">
              {/* Maison Navigation */}
              <div className="footer-nav-col">
                <span className="footer-nav-heading">Explore</span>
                <ul className="footer-nav-links">
                  <li>
                    <a
                      href="#collection"
                      className="footer-nav-link"
                      onClick={handleCollectionClick}
                    >
                      Collection
                    </a>
                  </li>
                  <li>
                    <a
                      href="#story"
                      className="footer-nav-link"
                      onClick={handleStoryClick}
                    >
                      Story
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:concierge@chuimui.com"
                      className="footer-nav-link"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="footer-nav-col">
                <span className="footer-nav-heading">Connect</span>
                <ul className="footer-nav-links">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-nav-link"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#story"
                      className="footer-nav-link"
                      onClick={handleStoryClick}
                    >
                      Journal
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:salon@chuimui.com"
                      className="footer-nav-link"
                    >
                      Private Salons
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Location */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright">
              © {CURRENT_YEAR} CHUI MUI PARIS. ALL RIGHTS RESERVED.
            </p>
            <p className="footer-location-tag">
              18 Place Vendôme, Paris · Grasse Atelier
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClosingFooter;
