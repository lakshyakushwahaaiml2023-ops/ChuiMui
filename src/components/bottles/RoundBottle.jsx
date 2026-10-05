import React, { useId } from 'react';

/**
 * Round Curvilinear Luxury Flacon
 * Soft spherical shoulders, heavy circular crystal base, dome crown cap.
 */
export default function RoundBottle({
  accentColor = '#e26d85',
  className = '',
  style = {},
}) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bottle-svg bottle-round ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        {/* Soft Ambient Ground Shadow */}
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Dome Cap Polished Rose-Gold / Metallic Gradient */}
        <linearGradient id={`domeCap-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#542e39" />
          <stop offset="25%" stopColor="#a36272" />
          <stop offset="48%" stopColor="#f7d0d8" />
          <stop offset="70%" stopColor="#c77b8d" />
          <stop offset="100%" stopColor="#3d1e26" />
        </linearGradient>

        {/* Neck Band Gradient */}
        <linearGradient id={`neckGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3d1e26" />
          <stop offset="35%" stopColor="#e8aebb" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#ba7283" />
          <stop offset="100%" stopColor="#2b141b" />
        </linearGradient>

        {/* Outer Round Glass Highlight */}
        <linearGradient id={`roundGlass-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="12%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="88%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.32" />
        </linearGradient>

        {/* Liquid Gradient */}
        <radialGradient id={`liquidSphere-${id}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="55%" stopColor={accentColor} stopOpacity="0.75" />
          <stop offset="90%" stopColor={accentColor} stopOpacity="0.92" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.78" />
        </radialGradient>

        {/* Base Solid Crystal Refraction */}
        <linearGradient id={`curvedBase-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>

        {/* Spherical Reflection Arc */}
        <linearGradient id={`specularArc-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Liquid Chamber Shape Clip */}
        <clipPath id={`roundLiquidClip-${id}`}>
          <path d="M72,240 C72,185 105,170 150,170 C195,170 228,185 228,240 C228,340 216,400 150,400 C84,400 72,340 72,240 Z" />
        </clipPath>
      </defs>

      {/* Ground Projection Shadow */}
      <ellipse cx="150" cy="478" rx="100" ry="15" fill={`url(#shadow-${id})`} />

      {/* Outer Round Flacon Glass Body */}
      <path
        d="M56,245 C56,170 98,150 150,150 C202,150 244,170 244,245 C244,365 228,455 150,455 C72,455 56,365 56,245 Z"
        fill="rgba(18, 14, 18, 0.45)"
        stroke={`url(#roundGlass-${id})`}
        strokeWidth="3.5"
      />

      {/* Inner Liquid Chamber with Glow */}
      <g clipPath={`url(#roundLiquidClip-${id})`}>
        <rect x="60" y="170" width="180" height="240" fill={`url(#liquidSphere-${id})`} />
        {/* Curved Meniscus */}
        <ellipse cx="150" cy="188" rx="65" ry="9" fill={accentColor} fillOpacity="0.85" />
        <ellipse cx="150" cy="186" rx="63" ry="5" fill="#ffffff" fillOpacity="0.25" />
      </g>

      {/* Central Glass Dip Tube */}
      <line x1="148.5" y1="135" x2="148.5" y2="400" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
      <line x1="151.5" y1="135" x2="151.5" y2="400" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

      {/* Heavy Curved Glass Bottom */}
      <path
        d="M66,395 C75,438 105,453 150,453 C195,453 225,438 234,395 C222,430 190,443 150,443 C110,443 78,430 66,395 Z"
        fill={`url(#curvedBase-${id})`}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      {/* Curved Prism Accent Under Base */}
      <path
        d="M85,440 C110,450 190,450 215,440"
        stroke={accentColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Soft Round Center Crest / Label */}
      <circle cx="150" cy="275" r="42" fill="rgba(10, 8, 12, 0.4)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
      <circle cx="150" cy="275" r="37" fill="none" stroke={accentColor} strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="150" cy="275" r="8" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.8" />
      <line x1="132" y1="298" x2="168" y2="298" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

      {/* Left Specular Curved Shoulder Light Reflection */}
      <path
        d="M72,210 C75,175 105,158 135,155 C120,165 98,185 92,225 C82,295 90,360 85,395 C75,355 68,275 72,210 Z"
        fill={`url(#specularArc-${id})`}
      />
      {/* Right Edge Rim Glint */}
      <path
        d="M232,205 C236,255 234,335 220,385 C224,345 226,275 224,225 Z"
        fill="#ffffff"
        opacity="0.3"
      />

      {/* Flacon Neck Collar */}
      <rect x="135" y="128" width="30" height="24" rx="2" fill={`url(#neckGrad-${id})`} />
      <rect x="132" y="146" width="36" height="5" rx="1.5" fill="#f7d0d8" opacity="0.8" />

      {/* Spherical Dome Luxury Crown Cap */}
      <circle cx="150" cy="85" r="42" fill={`url(#domeCap-${id})`} />
      {/* Cap Rim Collar Ring */}
      <ellipse cx="150" cy="122" rx="35" ry="8" fill={`url(#neckGrad-${id})`} />
      <ellipse cx="150" cy="120" rx="34" ry="4" fill="#ffffff" fillOpacity="0.4" />
      {/* Dome Top Highlight */}
      <ellipse cx="144" cy="65" rx="18" ry="10" fill="#ffffff" fillOpacity="0.45" />
      <ellipse cx="140" cy="62" rx="8" ry="4" fill="#ffffff" fillOpacity="0.75" />
    </svg>
  );
}
