import React, { useState, useEffect } from 'react';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';
import { Header } from './components/hero/Header';
import { VideoHero } from './components/hero/VideoHero';
import { BrandStoryTeaser } from './components/sections/BrandStoryTeaser';
import { IngredientsCraft } from './components/sections/IngredientsCraft';
import { SignatureCollection } from './components/sections/SignatureCollection';
import { ClosingFooter } from './components/sections/ClosingFooter';
import PerfumeShowcase from './components/PerfumeShowcase';

import './styles/variables.css';
import './styles/hero.css';

type PageView = 'home' | 'collection';

export default function App(): React.JSX.Element {
  const getInitialView = (): PageView => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path.includes('collection') ||
        path.includes('products') ||
        hash.includes('collection') ||
        hash.includes('products') ||
        search.includes('collection') ||
        search.includes('products')
      ) {
        return 'collection';
      }
    }
    return 'home';
  };

  const [currentView, setCurrentView] = useState<PageView>(getInitialView);

  // Sync view on browser back / forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path.includes('collection') ||
        path.includes('products') ||
        hash.includes('collection') ||
        hash.includes('products') ||
        search.includes('collection') ||
        search.includes('products')
      ) {
        setCurrentView('collection');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (view: PageView, urlOverride?: string) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const targetUrl = urlOverride || (view === 'collection' ? '/products' : '/');
      window.history.pushState({ view }, '', targetUrl);
      window.scrollTo(0, 0);
    }
  };

  if (currentView === 'collection') {
    return (
      <div className="collection-page-root">
        <PerfumeShowcase onNavigateHome={() => navigateTo('home', '/')} />
      </div>
    );
  }

  return (
    <SmoothScrollProvider>
      <div className="chuimui-editorial-root">
        {/* Minimal Transparent Header positioned over Hero */}
        <Header
          onNavigateCollection={() => {
            const el = document.getElementById('collection');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigateTo('collection', '/products');
            }
          }}
          onNavigateHome={() => navigateTo('home', '/')}
        />

        <main>
          {/* Section 1: Scroll-Driven Video Hero (320svh sticky stage) */}
          <VideoHero onNavigateCollection={() => navigateTo('collection', '/products')} />

          {/* Section 2: Brand Story (Restrained editorial transition) */}
          <BrandStoryTeaser />

          {/* Section 3: Ingredients and Craft (Horizontal strip of 4 raw botanicals) */}
          <IngredientsCraft />

          {/* Section 4: Signature Collection (Driven by src/data/fragrances.js) */}
          <SignatureCollection
            onNavigateProducts={() => navigateTo('collection', '/products')}
            onSelectFragrance={() => navigateTo('collection', '/products')}
          />

          {/* Section 5: Closing Section & Restrained Footer (Zero glassmorphism, gold hairline only) */}
          <ClosingFooter
            onNavigateCollection={() => {
              const el = document.getElementById('collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigateTo('collection', '/products');
            }}
            onNavigateHome={() => navigateTo('home', '/')}
          />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
