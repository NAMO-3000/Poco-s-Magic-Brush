import React from 'react';

interface PenguinPocoProps {
  brushColor?: string;
  isPainting?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  mood?: 'happy' | 'excited' | 'thinking' | 'proud';
}

export const PenguinPoco: React.FC<PenguinPocoProps> = ({
  brushColor = '#EF4444',
  isPainting = false,
  size = 'md',
  className = '',
  mood = 'happy',
}) => {
  const sizeClasses = {
    sm: 'w-20 h-24',
    md: 'w-32 h-36',
    lg: 'w-44 h-52',
    xl: 'w-56 h-64',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
      aria-label="Poco the Penguin"
    >
      <svg
        viewBox="0 0 200 240"
        className={`w-full h-full drop-shadow-lg transition-transform duration-300 ${
          isPainting ? 'animate-bounce' : 'hover:scale-105'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pocoBelly" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </radialGradient>
          <linearGradient id="pocoBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="brushWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="brushGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Feet */}
        <ellipse cx="75" cy="225" rx="18" ry="10" fill="#F59E0B" />
        <ellipse cx="125" cy="225" rx="18" ry="10" fill="#F59E0B" />

        {/* Main Body */}
        <ellipse cx="100" cy="135" rx="62" ry="85" fill="url(#pocoBody)" />

        {/* White Belly */}
        <ellipse cx="100" cy="148" rx="44" ry="60" fill="url(#pocoBelly)" />

        {/* Cute Artist Scarf / Collar */}
        <path
          d="M 68 88 Q 100 102 132 88 Q 120 110 100 108 Q 80 110 68 88 Z"
          fill="#3B82F6"
        />
        <rect x="94" y="98" width="12" height="22" rx="4" fill="#2563EB" />

        {/* Left Wing */}
        <path
          d="M 42 120 C 25 135 22 165 38 180 C 44 165 48 145 52 130 Z"
          fill="#1E293B"
          className="origin-top-right transition-transform"
        />

        {/* Cute Face */}
        {/* Blushing cheeks */}
        <ellipse cx="68" cy="80" rx="9" ry="6" fill="#FCA5A5" opacity="0.85" />
        <ellipse cx="132" cy="80" rx="9" ry="6" fill="#FCA5A5" opacity="0.85" />

        {/* Eyes */}
        {mood === 'proud' || mood === 'excited' ? (
          // Happy closed curving eyes
          <>
            <path
              d="M 72 68 Q 80 60 88 68"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 112 68 Q 120 60 128 68"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : (
          // Big sparkly eyes
          <>
            <ellipse cx="80" cy="66" rx="9" ry="12" fill="#0F172A" />
            <circle cx="77" cy="62" r="3.5" fill="#FFFFFF" />
            <circle cx="83" cy="70" r="1.5" fill="#FFFFFF" />

            <ellipse cx="120" cy="66" rx="9" ry="12" fill="#0F172A" />
            <circle cx="117" cy="62" r="3.5" fill="#FFFFFF" />
            <circle cx="123" cy="70" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Beak */}
        <path
          d="M 90 74 Q 100 88 110 74 Q 100 70 90 74 Z"
          fill="#F59E0B"
        />

        {/* Artist Beret Hat */}
        <path
          d="M 60 42 C 60 20 140 20 140 42 C 145 48 135 54 100 52 C 65 54 55 48 60 42 Z"
          fill="#EC4899"
        />
        <circle cx="100" cy="22" r="5" fill="#DB2777" />

        {/* Right Arm holding Magic Brush */}
        <g className={`origin-bottom-left ${isPainting ? 'animate-pulse' : ''}`}>
          {/* Arm */}
          <path
            d="M 148 120 C 168 120 178 140 162 160 C 154 150 148 135 146 120 Z"
            fill="#1E293B"
          />

          {/* Magic Paint Brush */}
          <g transform={isPainting ? 'rotate(-15 160 120)' : 'rotate(0 160 120)'}>
            {/* Wooden handle */}
            <rect
              x="156"
              y="75"
              width="9"
              height="80"
              rx="4.5"
              fill="url(#brushWood)"
              transform="rotate(25 156 75)"
            />
            {/* Metal ferrule */}
            <rect
              x="146"
              y="54"
              width="13"
              height="16"
              rx="3"
              fill="#CBD5E1"
              transform="rotate(25 146 54)"
            />
            {/* Bristles colored with active brushColor */}
            <path
              d="M 136 32 C 142 22 154 22 158 32 C 162 42 144 54 136 32 Z"
              fill={brushColor}
              filter="url(#brushGlow)"
              transform="rotate(25 136 32)"
            />
            {/* Magic Sparkle on brush tip */}
            <polygon
              points="140,16 142,22 148,24 142,26 140,32 138,26 132,24 138,22"
              fill="#FDE047"
              className="animate-pulse"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
