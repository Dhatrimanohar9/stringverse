import React from 'react';
import { motion } from 'framer-motion';

// STRING Character — Translucent crystal entity
export const StringCharacter: React.FC<{ size?: number; animate?: boolean }> = ({
  size = 160,
  animate = true,
}) => {
  return (
    <motion.div
      className={animate ? 'animate-float' : ''}
      style={{ width: size, height: size }}
      aria-label="String character: translucent crystal entity representing immutability"
    >
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size * 1.125}>
        {/* Glow aura */}
        <ellipse cx="80" cy="160" rx="40" ry="8" fill="rgba(96,165,250,0.2)" />

        {/* Crystal body - hexagonal prism */}
        <defs>
          <linearGradient id="crystalBody" x1="40" y1="40" x2="130" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="crystalFace" x1="60" y1="60" x2="100" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="crystalGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Legs */}
        <rect x="62" y="138" width="10" height="22" rx="5" fill="url(#crystalBody)" opacity="0.8" />
        <rect x="88" y="138" width="10" height="22" rx="5" fill="url(#crystalBody)" opacity="0.8" />

        {/* Main crystal body */}
        <polygon
          points="80,20 115,50 120,100 115,135 80,148 45,135 40,100 45,50"
          fill="url(#crystalBody)"
          stroke="#93c5fd"
          strokeWidth="1.5"
          opacity="0.9"
          filter="url(#crystalGlow)"
        />

        {/* Crystal face highlight */}
        <polygon
          points="80,32 105,55 108,95 105,122 80,132 55,122 52,95 55,55"
          fill="url(#crystalFace)"
        />

        {/* Inner crystal lattice lines */}
        <line x1="80" y1="32" x2="80" y2="132" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.4" />
        <line x1="52" y1="95" x2="108" y2="95" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.4" />
        <line x1="55" y1="55" x2="105" y2="122" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.3" />
        <line x1="105" y1="55" x2="55" y2="122" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.3" />

        {/* Arms */}
        <ellipse cx="34" cy="85" rx="10" ry="6" fill="url(#crystalBody)" opacity="0.8" transform="rotate(-20 34 85)" />
        <ellipse cx="126" cy="85" rx="10" ry="6" fill="url(#crystalBody)" opacity="0.8" transform="rotate(20 126 85)" />

        {/* Eyes */}
        <circle cx="70" cy="88" r="5" fill="#eff6ff" />
        <circle cx="90" cy="88" r="5" fill="#eff6ff" />
        <circle cx="71" cy="89" r="3" fill="#1e3a8a" />
        <circle cx="91" cy="89" r="3" fill="#1e3a8a" />
        {/* Eye sparkles */}
        <circle cx="72" cy="87" r="1" fill="white" />
        <circle cx="92" cy="87" r="1" fill="white" />

        {/* Crown/top crystal spike */}
        <polygon points="80,8 86,28 74,28" fill="#bfdbfe" opacity="0.9" />
        <polygon points="68,15 72,30 64,30" fill="#93c5fd" opacity="0.7" />
        <polygon points="92,15 96,30 88,30" fill="#93c5fd" opacity="0.7" />

        {/* Immutable lock badge */}
        <circle cx="112" cy="50" r="12" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
        <rect x="108" y="50" width="8" height="6" rx="1" fill="#60a5fa" />
        <path d="M109 50 Q112 44 115 50" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Shimmer particles */}
        <circle cx="45" cy="65" r="2" fill="#bfdbfe" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="118" cy="110" r="1.5" fill="#bfdbfe" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="58" cy="120" r="1" fill="#93c5fd" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" begin="1s" />
        </circle>
      </svg>
    </motion.div>
  );
};

// STRINGBUILDER Character — Mechanical orange builder
export const StringBuilderCharacter: React.FC<{ size?: number; animate?: boolean }> = ({
  size = 160,
  animate = true,
}) => {
  return (
    <motion.div
      className={animate ? 'animate-float' : ''}
      style={{ width: size, height: size, animationDelay: '0.8s' }}
      aria-label="StringBuilder character: mechanical orange builder representing mutability"
    >
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size * 1.125}>
        {/* Shadow */}
        <ellipse cx="80" cy="162" rx="38" ry="7" fill="rgba(249,115,22,0.2)" />

        <defs>
          <linearGradient id="mechBody" x1="40" y1="40" x2="120" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="mechAccent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Legs with mechanical joints */}
        <rect x="58" y="136" width="12" height="24" rx="6" fill="url(#mechBody)" />
        <rect x="90" y="136" width="12" height="24" rx="6" fill="url(#mechBody)" />
        {/* Joint bolts */}
        <circle cx="64" cy="145" r="3" fill="#7c2d12" />
        <circle cx="96" cy="145" r="3" fill="#7c2d12" />

        {/* Main body — modular block shape */}
        <rect x="45" y="60" width="70" height="80" rx="8" fill="url(#mechBody)" />

        {/* Body panel lines (modular look) */}
        <line x1="45" y1="90" x2="115" y2="90" stroke="#c2410c" strokeWidth="1.5" opacity="0.6" />
        <line x1="45" y1="110" x2="115" y2="110" stroke="#c2410c" strokeWidth="1.5" opacity="0.6" />
        <line x1="80" y1="60" x2="80" y2="140" stroke="#c2410c" strokeWidth="1" opacity="0.4" />

        {/* Panel bolts */}
        <circle cx="52" cy="68" r="3" fill="#7c2d12" />
        <circle cx="108" cy="68" r="3" fill="#7c2d12" />
        <circle cx="52" cy="132" r="3" fill="#7c2d12" />
        <circle cx="108" cy="132" r="3" fill="#7c2d12" />

        {/* Head */}
        <rect x="52" y="30" width="56" height="36" rx="8" fill="url(#mechBody)" />
        {/* Head panel */}
        <rect x="58" y="36" width="44" height="24" rx="4" fill="#c2410c" opacity="0.5" />

        {/* Eyes (LED style) */}
        <rect x="62" y="40" width="12" height="8" rx="2" fill="#000" />
        <rect x="86" y="40" width="12" height="8" rx="2" fill="#000" />
        <rect x="64" y="42" width="8" height="4" rx="1" fill="#fbbf24">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="88" y="42" width="8" height="4" rx="1" fill="#fbbf24">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
        </rect>

        {/* Neck connector */}
        <rect x="70" y="62" width="20" height="6" rx="3" fill="#c2410c" />

        {/* Arms — mechanical extendable */}
        <rect x="22" y="68" width="26" height="12" rx="6" fill="url(#mechBody)" />
        <circle cx="22" cy="74" r="6" fill="#c2410c" />
        {/* Tool hand */}
        <rect x="8" y="68" width="16" height="12" rx="4" fill="#fbbf24" />
        <line x1="10" y1="74" x2="22" y2="74" stroke="#7c2d12" strokeWidth="2" />

        <rect x="112" y="68" width="26" height="12" rx="6" fill="url(#mechBody)" />
        <circle cx="138" cy="74" r="6" fill="#c2410c" />
        <rect x="136" y="68" width="16" height="12" rx="4" fill="#fbbf24" />

        {/* Gear on body */}
        <g transform="translate(70, 100)">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#fbbf24" strokeWidth="2">
            <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="10" r="4" fill="#fbbf24">
            <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Mutable badge */}
        <circle cx="112" cy="50" r="12" fill="#7c2d12" stroke="#f97316" strokeWidth="1.5" />
        <text x="112" y="55" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">M</text>

        {/* Energy particles */}
        <circle cx="40" cy="80" r="2" fill="#fbbf24" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;3;2" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="122" cy="95" r="1.5" fill="#fb923c" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" begin="0.4s" />
        </circle>
      </svg>
    </motion.div>
  );
};

// STRINGBUFFER Character — Armored green guardian
export const StringBufferCharacter: React.FC<{ size?: number; animate?: boolean; showLock?: boolean }> = ({
  size = 160,
  animate = true,
  showLock = false,
}) => {
  return (
    <motion.div
      className={animate ? 'animate-float' : ''}
      style={{ width: size, height: size, animationDelay: '1.6s' }}
      aria-label="StringBuffer character: armored guardian representing synchronized thread safety"
    >
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size * 1.125}>
        {/* Shadow */}
        <ellipse cx="80" cy="162" rx="40" ry="8" fill="rgba(16,185,129,0.2)" />

        <defs>
          <linearGradient id="guardBody" x1="40" y1="40" x2="120" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="40%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="armorPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="guardGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Legs with armor */}
        <rect x="56" y="134" width="14" height="26" rx="7" fill="url(#guardBody)" />
        <rect x="90" y="134" width="14" height="26" rx="7" fill="url(#guardBody)" />
        {/* Knee guards */}
        <rect x="54" y="140" width="18" height="8" rx="4" fill="url(#armorPlate)" />
        <rect x="88" y="140" width="18" height="8" rx="4" fill="url(#armorPlate)" />

        {/* Main armored body */}
        <rect x="42" y="62" width="76" height="76" rx="10" fill="url(#guardBody)" />

        {/* Chest armor plates */}
        <polygon points="80,68 112,76 112,118 80,126 48,118 48,76" fill="url(#armorPlate)" opacity="0.6" />

        {/* Armor rivets */}
        <circle cx="52" cy="72" r="3" fill="#047857" />
        <circle cx="108" cy="72" r="3" fill="#047857" />
        <circle cx="52" cy="128" r="3" fill="#047857" />
        <circle cx="108" cy="128" r="3" fill="#047857" />

        {/* Chest energy core */}
        <circle cx="80" cy="97" r="14" fill="#022c22" stroke="#10b981" strokeWidth="2" filter="url(#guardGlow)" />
        <circle cx="80" cy="97" r="9" fill="#10b981" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="97" r="5" fill="#34d399">
          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Helmet / head */}
        <rect x="50" y="28" width="60" height="40" rx="12" fill="url(#guardBody)" />
        {/* Visor */}
        <rect x="56" y="36" width="48" height="20" rx="6" fill="#022c22" />
        {/* Visor glow */}
        <rect x="58" y="38" width="44" height="16" rx="5" fill="#10b981" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
        </rect>
        {/* Visor scan line */}
        <line x1="58" y1="46" x2="102" y2="46" stroke="#34d399" strokeWidth="2" opacity="0.8">
          <animate attributeName="y1" values="38;54;38" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="38;54;38" dur="1.5s" repeatCount="indefinite" />
        </line>

        {/* Neck */}
        <rect x="68" y="64" width="24" height="6" rx="3" fill="#047857" />

        {/* Shoulder armor */}
        <ellipse cx="34" cy="80" rx="16" ry="10" fill="url(#armorPlate)" />
        <ellipse cx="126" cy="80" rx="16" ry="10" fill="url(#armorPlate)" />

        {/* Arms */}
        <rect x="18" y="72" width="18" height="28" rx="8" fill="url(#guardBody)" />
        <rect x="124" y="72" width="18" height="28" rx="8" fill="url(#guardBody)" />

        {/* Fists */}
        <rect x="14" y="96" width="22" height="16" rx="8" fill="url(#armorPlate)" />
        <rect x="124" y="96" width="22" height="16" rx="8" fill="url(#armorPlate)" />

        {/* Lock icon on chest */}
        {showLock && (
          <g>
            <circle cx="80" cy="97" r="20" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2">
              <animate attributeName="r" values="20;24;20" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <rect x="72" y="96" width="16" height="12" rx="3" fill="#34d399" />
            <path d="M74 96 Q80 88 86 96" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="80" cy="102" r="2" fill="#022c22" />
            <line x1="80" y1="104" x2="80" y2="108" stroke="#022c22" strokeWidth="2" />
          </g>
        )}

        {/* Synchronized badge */}
        <circle cx="112" cy="48" r="12" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
        <text x="112" y="52" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">SYN</text>

        {/* Armor edge highlights */}
        <path d="M42 80 L42 100" stroke="#34d399" strokeWidth="1" opacity="0.5" />
        <path d="M118 80 L118 100" stroke="#34d399" strokeWidth="1" opacity="0.5" />

        {/* Green energy particles */}
        <circle cx="38" cy="90" r="2" fill="#34d399" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="124" cy="110" r="1.5" fill="#6ee7b7" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="68" cy="136" r="1" fill="#10b981" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
        </circle>
      </svg>
    </motion.div>
  );
};
