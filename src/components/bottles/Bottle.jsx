import React from 'react';
import RectangularBottle from './RectangularBottle';
import RoundBottle from './RoundBottle';
import SlimBottle from './SlimBottle';
import FacetedBottle from './FacetedBottle';

/**
 * Maps fragrance silhouette or slug to corresponding bottle component
 */
const SILHOUETTE_MAP = {
  rectangular: RectangularBottle,
  round: RoundBottle,
  slim: SlimBottle,
  faceted: FacetedBottle,
};

const SLUG_TO_SILHOUETTE = {
  'oud-imperial': 'rectangular',
  'rose-crepuscule': 'round',
  'cedre-blanc': 'slim',
  'santal-nocturne': 'faceted',
};

/**
 * Bottle Component
 * 
 * Renders the real image if fragrance.image is set,
 * otherwise renders the corresponding transparent luxury SVG flacon.
 */
export default function Bottle({
  fragrance,
  index = 0,
  className = '',
  style = {},
  imgProps = {},
}) {
  if (!fragrance) return null;

  // 1. If real image asset is provided, render image tag
  if (fragrance.image) {
    return (
      <div className={`bottle-container ${className}`} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
        <img
          src={fragrance.image}
          alt={fragrance.name || 'Luxury Fragrance Flacon'}
          className={`bottle-image ${imgProps.className || ''}`}
          draggable={false}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            ...imgProps.style,
          }}
          {...imgProps}
        />
      </div>
    );
  }

  // 2. Resolve silhouette type from fragrance data or slug or index
  const silhouetteKey =
    fragrance.silhouette ||
    SLUG_TO_SILHOUETTE[fragrance.slug] ||
    ['rectangular', 'round', 'slim', 'faceted'][index % 4] ||
    'rectangular';

  const BottleSvgComponent = SILHOUETTE_MAP[silhouetteKey] || RectangularBottle;

  return (
    <div
      className={`bottle-container bottle-container--${silhouetteKey} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <BottleSvgComponent
        accentColor={fragrance.accentColor}
        className={className}
      />
    </div>
  );
}

export { RectangularBottle, RoundBottle, SlimBottle, FacetedBottle };
