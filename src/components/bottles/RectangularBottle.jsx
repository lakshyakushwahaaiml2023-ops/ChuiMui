import React, { useId } from 'react';

/**
 * Rectangular Architectural Flacon
 * Heavy crystal base, beveled geometric shoulders, brushed metallic cap.
 */
export default function RectangularBottle({
  accentColor = '#c99742',
  className = '',
  style = {},
}) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bottle-svg bottle-rectangular ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        {/* Soft Ambient Shadow Under Flacon */}
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Heavy Cap Metallic Gradient */}
        <linearGradient id={`capGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2b2318" />
          <stop offset="25%" stopColor="#69563c" />
          <stop offset="50%" stopColor="#cca769" />
          <stop offset="70%" stopColor="#ffd899" />
          <stop offset="85%" stopColor="#7a6242" />
          <stop offset="100%" stopColor="#241c13" />
        </linearGradient>

        <linearGradient id={`capChamfer-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe6ba" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#54432d" stopOpacity="0.9" />
        </linearGradient>

        {/* Neck Ring Gradient */}
        <linearGradient id={`neckGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4d3e28" />
          <stop offset="30%" stopColor="#c7a164" />
          <stop offset="50%" stopColor="#fff1d6" />
          <stop offset="75%" stopColor="#9e7b44" />
          <stop offset="100%" stopColor="#3d301e" />
        </linearGradient>

        {/* Glass Outer Wall Gradient */}
        <linearGradient id={`glassWall-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="8%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="92%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.32" />
        </linearGradient>

        {/* Inner Liquid Chamber Clip */}
        <clipPath id={`liquidChamber-${id}`}>
          <rect x="62" y="165" width="176" height="250" rx="4" />
        </clipPath>

        {/* Liquid Depth Gradient */}
        <linearGradient id={`liquidGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
          <stop offset="35%" stopColor={accentColor} stopOpacity="0.75" />
          <stop offset="85%" stopColor={accentColor} stopOpacity="0.92" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.80" />
        </linearGradient>

        {/* Liquid Horizontal Highlight */}
        <linearGradient id={`liquidHighlight-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.1" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>

        {/* Crystal Base Reflection */}
        <linearGradient id={`crystalBase-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>

        {/* Vertical Specular Glare */}
        <linearGradient id={`specularLight-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Fine Soft Blur Filter */}
        <filter id={`softEdge-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ground Projection Shadow */}
      <ellipse cx="150" cy="478" rx="105" ry="14" fill={`url(#shadow-${id})`} />

      {/* Outer Heavy Glass Flacon Body */}
      <rect
        x="45"
        y="145"
        width="210"
        height="320"
        rx="8"
        fill="rgba(15, 17, 21, 0.45)"
        stroke={`url(#glassWall-${id})`}
        strokeWidth="3.5"
      />

      {/* Internal Glass Caustics & Liquid Glow */}
      <g clipPath={`url(#liquidChamber-${id})`}>
        {/* Base Liquid Fill */}
        <rect x="62" y="180" width="176" height="235" fill={`url(#liquidGrad-${id})`} />
        {/* Meniscus Line */}
        <ellipse cx="150" cy="182" rx="88" ry="7" fill={accentColor} fillOpacity="0.8" />
        <ellipse cx="150" cy="180" rx="86" ry="5" fill="#ffffff" fillOpacity="0.25" />
        {/* Horizontal Liquid Dimension */}
        <rect x="62" y="180" width="176" height="235" fill={`url(#liquidHighlight-${id})`} />
      </g>

      {/* Atomizer Dip Tube */}
      <line x1="148.5" y1="135" x2="148.5" y2="415" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
      <line x1="151.5" y1="135" x2="151.5" y2="415" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

      {/* Heavy Crystal Glass Base (Solid Glass Bottom) */}
      <rect
        x="47"
        y="415"
        width="206"
        height="48"
        rx="6"
        fill={`url(#crystalBase-${id})`}
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
      />
      {/* Base Light Reflection Prism Line */}
      <line x1="60" y1="452" x2="240" y2="452" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="75" y1="456" x2="225" y2="456" stroke={accentColor} strokeOpacity="0.5" strokeWidth="1" />

      {/* Minimalist Glass Plaque Recess Frame */}
      <rect
        x="80"
        y="235"
        width="140"
        height="100"
        rx="3"
        fill="rgba(8, 8, 10, 0.4)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      <rect
        x="85"
        y="240"
        width="130"
        height="90"
        rx="2"
        fill="none"
        stroke={accentColor}
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      {/* Subtle Emblem Center Motif */}
      <circle cx="150" cy="272" r="10" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.75" />
      <line x1="135" y1="298" x2="165" y2="298" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="140" y1="305" x2="160" y2="305" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* Glass Front Vertical Specular Highlights */}
      <rect x="58" y="152" width="10" height="295" rx="4" fill={`url(#specularLight-${id})`} opacity="0.7" />
      <rect x="74" y="160" width="3" height="280" rx="1.5" fill="#ffffff" opacity="0.3" />
      {/* Soft Right Rim Specular */}
      <rect x="238" y="155" width="8" height="290" rx="3" fill="#ffffff" opacity="0.25" />

      {/* Neck Collar (Metallic Ferrule) */}
      <rect x="130" y="118" width="40" height="28" rx="2" fill={`url(#neckGrad-${id})`} />
      <rect x="127" y="140" width="46" height="6" rx="2" fill={`url(#capChamfer-${id})`} />

      {/* Luxurious Heavy Metallic Cap */}
      <rect x="100" y="48" width="100" height="74" rx="4" fill={`url(#capGrad-${id})`} />
      {/* Top Cap Chamfer & Reflection */}
      <polygon points="100,48 108,40 192,40 200,48" fill={`url(#capChamfer-${id})`} />
      {/* Cap Edge Highlighting */}
      <line x1="108" y1="41" x2="192" y2="41" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="102" y1="48" x2="102" y2="120" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="198" y1="48" x2="198" y2="120" stroke="#000000" strokeWidth="1" strokeOpacity="0.4" />
      {/* Cap Mid-Groove Inset */}
      <line x1="100" y1="85" x2="200" y2="85" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
      <line x1="100" y1="86.5" x2="200" y2="86.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
