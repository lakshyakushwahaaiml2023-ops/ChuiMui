import React, { useId } from 'react';

/**
 * Tall Slim Architectural Flacon
 * Slender column silhouette, monolithic crystal base, elongated brushed cap.
 */
export default function SlimBottle({
  accentColor = '#4eb8a9',
  className = '',
  style = {},
}) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bottle-svg bottle-slim ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        {/* Soft Ambient Ground Shadow */}
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#000000" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Tall Cap Brushed Silver / Platinum Gradient */}
        <linearGradient id={`slimCapGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c2429" />
          <stop offset="20%" stopColor="#50626b" />
          <stop offset="45%" stopColor="#b4c6ce" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#7c929e" />
          <stop offset="100%" stopColor="#25323a" />
        </linearGradient>

        {/* Neck Band Gradient */}
        <linearGradient id={`neckGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e2d33" />
          <stop offset="35%" stopColor="#9bb5c2" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#678391" />
          <stop offset="100%" stopColor="#19252b" />
        </linearGradient>

        {/* Slender Glass Wall Reflections */}
        <linearGradient id={`glassWall-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="10%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="90%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>

        {/* Liquid Gradient */}
        <linearGradient id={`liquidGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="30%" stopColor={accentColor} stopOpacity="0.72" />
          <stop offset="85%" stopColor={accentColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.82" />
        </linearGradient>

        {/* High Pedestal Base Crystal Gradient */}
        <linearGradient id={`pedestalBase-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.38" />
        </linearGradient>

        {/* Slender Specular Pillar Light */}
        <linearGradient id={`pillarLight-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Liquid Chamber Shape Clip */}
        <clipPath id={`slimLiquidClip-${id}`}>
          <rect x="88" y="156" width="124" height="268" rx="4" />
        </clipPath>
      </defs>

      {/* Ground Projection Shadow */}
      <ellipse cx="150" cy="478" rx="80" ry="12" fill={`url(#shadow-${id})`} />

      {/* Outer Slender Glass Flacon Body */}
      <rect
        x="76"
        y="136"
        width="148"
        height="332"
        rx="6"
        fill="rgba(10, 16, 18, 0.45)"
        stroke={`url(#glassWall-${id})`}
        strokeWidth="3.5"
      />

      {/* Internal Liquid Chamber */}
      <g clipPath={`url(#slimLiquidClip-${id})`}>
        <rect x="88" y="170" width="124" height="254" fill={`url(#liquidGrad-${id})`} />
        {/* Slender Meniscus Curve */}
        <ellipse cx="150" cy="172" rx="62" ry="5.5" fill={accentColor} fillOpacity="0.8" />
        <ellipse cx="150" cy="170.5" rx="60" ry="3.5" fill="#ffffff" fillOpacity="0.3" />
        {/* Soft Inner Glow Column */}
        <rect x="110" y="170" width="80" height="254" fill="#ffffff" opacity="0.05" />
      </g>

      {/* Slender Glass Dip Tube */}
      <line x1="149" y1="126" x2="149" y2="424" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
      <line x1="151" y1="126" x2="151" y2="424" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />

      {/* Heavy Pedestal Solid Crystal Base */}
      <rect
        x="78"
        y="420"
        width="144"
        height="46"
        rx="4"
        fill={`url(#pedestalBase-${id})`}
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
      />
      {/* Base Crystalline Refraction Lines */}
      <line x1="90" y1="454" x2="210" y2="454" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="100" y1="458" x2="200" y2="458" stroke={accentColor} strokeOpacity="0.55" strokeWidth="1" />

      {/* Minimalist Vertical Column Crest */}
      <rect
        x="105"
        y="235"
        width="90"
        height="105"
        rx="2"
        fill="rgba(8, 12, 14, 0.35)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      <rect
        x="109"
        y="239"
        width="82"
        height="97"
        rx="1"
        fill="none"
        stroke={accentColor}
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      <circle cx="150" cy="270" r="8" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.85" />
      <line x1="138" y1="295" x2="162" y2="295" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      <line x1="142" y1="302" x2="158" y2="302" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* Vertical Specular Highlights */}
      <rect x="86" y="142" width="7" height="315" rx="3.5" fill={`url(#pillarLight-${id})`} opacity="0.75" />
      <rect x="97" y="148" width="2" height="300" rx="1" fill="#ffffff" opacity="0.35" />
      {/* Right Rim Specular */}
      <rect x="210" y="145" width="6" height="310" rx="3" fill="#ffffff" opacity="0.25" />

      {/* Flacon Neck Collar */}
      <rect x="134" y="112" width="32" height="26" rx="2" fill={`url(#neckGrad-${id})`} />
      <rect x="130" y="132" width="40" height="5" rx="1.5" fill="#ffffff" opacity="0.7" />

      {/* Elongated Brushed Platinum Cap */}
      <rect x="115" y="32" width="70" height="84" rx="3" fill={`url(#slimCapGrad-${id})`} />
      <rect x="115" y="32" width="70" height="6" rx="1" fill="#ffffff" opacity="0.6" />
      <line x1="117" y1="33" x2="117" y2="114" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="183" y1="33" x2="183" y2="114" stroke="#000000" strokeWidth="1" strokeOpacity="0.5" />
      {/* Micro-grooved cap banding */}
      <line x1="115" y1="72" x2="185" y2="72" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="115" y1="73.5" x2="185" y2="73.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
