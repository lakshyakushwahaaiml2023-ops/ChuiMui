import React from 'react';

interface HeaderProps {
  onNavigateCollection?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateCollection, onNavigateHome }) => {
  return (
    <header className="minimal-editorial-header" role="banner">
      <div className="header-container">
        {/* Left: Brand Wordmark */}
        <a
          href="/"
          className="brand-wordmark"
          aria-label="CHUI MUI Paris Home"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
        >
          <span className="brand-title">CHUI MUI</span>
          <span className="brand-subtext">PARIS</span>
        </a>

        {/* Right: Three Small Links */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <a
                href="/collection"
                className="nav-link"
                onClick={(e) => {
                  if (onNavigateCollection) {
                    e.preventDefault();
                    onNavigateCollection();
                  }
                }}
              >
                Collection
              </a>
            </li>
            <li>
              <a href="#story" className="nav-link">
                Story
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => {
                  const el = document.getElementById('contact');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
