import React from 'react';

export default function HeaderNav({ cartCount = 0, onNavigate, onNavigateHome }) {
  const handleNavClick = (e, stageIdx) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(stageIdx);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else if (onNavigate) {
      onNavigate(0);
    }
  };

  return (
    <header className="luxury-header">
      <div className="header-inner">
        <a href="/" className="brand-logo" onClick={handleBrandClick} title="Return to Atelier Homepage">
          <span className="brand-crest">✦</span>
          <span className="brand-name">CHUI MUI</span>
          <span className="brand-sub">PARIS</span>
        </a>

        <nav className="nav-links" aria-label="Main Navigation">
          <a href="/" className="nav-link" onClick={handleBrandClick}>
            Home
          </a>
          <a href="#collection" className="nav-link active" onClick={(e) => handleNavClick(e, 0)}>
            Collection
          </a>
          <a href="#selector" className="nav-link" onClick={(e) => handleNavClick(e, 1)}>
            Vault
          </a>
          <a href="#stages" className="nav-link" onClick={(e) => handleNavClick(e, 1)}>
            Olfactory Notes
          </a>
          <a href="#showcase" className="nav-link" onClick={(e) => handleNavClick(e, 5)}>
            Showcase
          </a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search Fragrances">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
          <button className="cart-btn" aria-label="View Shopping Bag">
            <span className="cart-text">Bespoke Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
