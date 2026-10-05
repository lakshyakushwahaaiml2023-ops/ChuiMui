import React, { useId } from 'react';

/**
 * Faceted Emerald-Cut Crystal Flacon
 * Geometric jewel facets, beveled prism corners, multi-faceted luxury cap.
 */
export default function FacetedBottle({
  accentColor = '#e08e45',
  className = '',
  style = {},
}) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bottle-svg bottle-faceted ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        {/* Soft Ambient Ground Shadow */}
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Faceted Jewel Cap Metallic / Onyx Bronze Gradient */}
        <linearGradient id={`facetedCapGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#472b15" />
          <stop offset="25%" stopColor="#9e6638" />
          <stop offset="50%" stopColor="#f7bc86" />
          <stop offset="75%" stopColor="#bf7c43" />
          <stop offset="100%" stopColor="#301c0c" />
        </linearGradient>

        <linearGradient id={`capFacetLeft-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0b680" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#875127" stopOpacity="0.4" />
        </linearGradient>

        {/* Neck Band Gradient */}
        <linearGradient id={`neckGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b210d" />
          <stop offset="35%" stopColor="#db995a" />
          <stop offset="50%" stopColor="#fff3e3" />
          <stop offset="75%" stopColor="#ab6d32" />
          <stop offset="100%" stopColor="#2e1909" />
        </linearGradient>

        {/* Center Glass Body Gradient */}
        <linearGradient id={`centerGlass-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>

        {/* Left Chamfered Facet Highlight */}
        <linearGradient id={`leftFacet-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>

        {/* Right Chamfered Facet Dark Edge */}
        <linearGradient id={`rightFacet-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>

        {/* Liquid Gradient */}
        <linearGradient id={`liquidGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="35%" stopColor={accentColor} stopOpacity="0.72" />
          <stop offset="85%" stopColor={accentColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.82" />
        </linearGradient>

        {/* Faceted Base Prism Refraction */}
        <linearGradient id={`facetedBase-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>

        {/* Liquid Chamber Shape Clip (Chamfered Octagon) */}
        <clipPath id={`facetedLiquidClip-${id}`}>
          <polygon points="86,165 214,165 234,185 234,395 214,415 86,415 66,395 66,185" />
        </clipPath>
      </defs>

      {/* Ground Projection Shadow */}
      <ellipse cx="150" cy="478" rx="100" ry="14" fill={`url(#shadow-${id})`} />

      {/* Outer Faceted Glass Flacon Body (Beveled Emerald Cut Octagonal Profile) */}
      <polygon
        points="75,145 225,145 248,168 248,442 225,465 75,465 52,442 52,168"
        fill="rgba(20, 15, 12, 0.45)"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="3"
      />

      {/* Left Angled Facet Panel */}
      <polygon
        points="52,168 75,145 75,465 52,442"
        fill={`url(#leftFacet-${id})`}
      />

      {/* Right Angled Facet Panel */}
      <polygon
        points="225,145 248,168 248,442 225,465"
        fill={`url(#rightFacet-${id})`}
      />

      {/* Main Front Central Plane */}
      <rect
        x="75"
        y="145"
        width="150"
        height="320"
        fill={`url(#centerGlass-${id})`}
      />

      {/* Inner Liquid Chamber with Glow */}
      <g clipPath={`url(#facetedLiquidClip-${id})`}>
        <rect x="64" y="175" width="172" height="242" fill={`url(#liquidGrad-${id})`} />
        {/* Chamfered Meniscus Line */}
        <polygon
          points="86,178 214,178 226,184 214,190 86,190 74,184"
          fill={accentColor}
          fillOpacity="0.85"
        />
        <polygon
          points="88,177 212,177 222,181 212,185 88,185 78,181"
          fill="#ffffff"
          fillOpacity="0.3"
        />
      </g>

      {/* Central Glass Dip Tube */}
      <line x1="149" y1="130" x2="149" y2="415" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
      <line x1="151" y1="130" x2="151" y2="415" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />

      {/* Heavy Faceted Crystal Base */}
      <polygon
        points="75,415 225,415 245,435 225,463 75,463 55,435"
        fill={`url(#facetedBase-${id})`}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      {/* Facet Refraction Cut Lines */}
      <line x1="75" y1="415" x2="75" y2="463" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="225" y1="415" x2="225" y2="463" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="85" y1="452" x2="215" y2="452" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="95" y1="456" x2="205" y2="456" stroke={accentColor} strokeOpacity="0.6" strokeWidth="1" />

      {/* Geometric Hexagonal/Octagonal Center Crest */}
      <polygon
        points="105,240 195,240 210,255 210,315 195,330 105,330 90,315 90,255"
        fill="rgba(14, 10, 8, 0.4)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      <polygon
        points="110,245 190,245 203,258 203,312 190,325 110,325 97,312 97,258"
        fill="none"
        stroke={accentColor}
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <circle cx="150" cy="275" r="9" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.85" />
      <line x1="135" y1="298" x2="165" y2="298" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      <line x1="140" y1="305" x2="160" y2="305" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* Internal Facet Edge Highlights */}
      <line x1="75" y1="145" x2="75" y2="465" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="225" y1="145" x2="225" y2="465" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="80" y="150" width="4" height="305" fill="#ffffff" opacity="0.3" />

      {/* Flacon Neck Collar */}
      <rect x="132" y="120" width="36" height="26" rx="2" fill={`url(#neckGrad-${id})`} />
      <rect x="128" y="142" width="44" height="5" rx="1.5" fill="#f7bc86" opacity="0.8" />

      {/* Faceted Gem / Octagonal Luxury Cap */}
      <polygon
        points="112,46 188,46 204,62 204,110 188,122 112,122 96,110 96,62"
        fill={`url(#facetedCapGrad-${id})`}
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Cap Facet Triangular Chamfers */}
      <polygon points="96,62 112,46 128,62 96,62" fill={`url(#capFacetLeft-${id})`} />
      <polygon points="188,46 204,62 172,62 188,46" fill={`url(#capFacetLeft-${id})`} opacity="0.5" />
      <polygon points="112,46 188,46 172,62 128,62" fill="#ffffff" fillOpacity="0.3" />
      {/* Cap Facet Reflection Lines */}
      <line x1="96" y1="62" x2="96" y2="110" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="204" y1="62" x2="204" y2="110" stroke="#000000" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="128" y1="62" x2="128" y2="122" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="172" y1="62" x2="172" y2="122" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
    </svg>
  );
}
