import React from 'react';

interface DigiroLogoIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const DigiroLogoIcon: React.FC<DigiroLogoIconProps> = ({ size = 36, className = '', style }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <defs>
        {/* Top Arc Light Green Gradient */}
        <linearGradient id="digiroTopArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A2D065" />
          <stop offset="60%" stopColor="#87BA4A" />
          <stop offset="100%" stopColor="#6C9F32" />
        </linearGradient>

        {/* Middle Arc Medium Green Gradient */}
        <linearGradient id="digiroMidArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#78A63D" />
          <stop offset="100%" stopColor="#4D7728" />
        </linearGradient>

        {/* Bottom Arc Dark Forest Gradient */}
        <linearGradient id="digiroBotArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#255134" />
          <stop offset="100%" stopColor="#143722" />
        </linearGradient>
      </defs>

      {/* Dispersing Rounded Square Digital Particles (Left Side) */}
      <rect x="80" y="248" width="18" height="18" rx="5" fill="#99C762" />
      <rect x="110" y="325" width="22" height="22" rx="6" fill="#78A63D" />
      
      <rect x="88" y="195" width="22" height="22" rx="6" fill="#99C762" />
      <rect x="118" y="222" width="26" height="26" rx="7" fill="#87BA4A" />
      <rect x="135" y="260" width="34" height="34" rx="9" fill="#58822C" />
      <rect x="146" y="305" width="24" height="24" rx="6" fill="#2E5A3B" />
      
      <rect x="132" y="152" width="26" height="26" rx="7" fill="#A2D065" />
      <rect x="162" y="168" width="34" height="34" rx="9" fill="#78A63D" />
      <rect x="168" y="215" width="32" height="32" rx="8" fill="#699738" />
      <rect x="188" y="272" width="28" height="28" rx="7" fill="#1B442A" />

      {/* Top Arc Layer */}
      <path
        d="M 195 115 H 335 C 418 115 470 170 470 260 C 470 345 425 415 365 435 C 375 415 390 380 395 350 C 410 305 415 250 385 195 C 360 155 315 145 255 145 H 215 C 200 145 195 130 195 115 Z"
        fill="url(#digiroTopArc)"
      />

      {/* Bottom Shadow Arc Layer */}
      <path
        d="M 188 385 H 325 C 410 385 455 315 455 245 C 455 325 415 415 330 415 H 188 C 168 415 158 395 158 375 C 158 355 172 345 192 345 H 320 C 365 345 395 318 395 275 C 395 325 355 365 295 365 H 188 Z"
        fill="url(#digiroBotArc)"
      />

      {/* Middle Inner Arc Loop */}
      <path
        d="M 228 175 H 320 C 375 175 412 210 412 265 C 412 325 372 355 315 355 H 228 C 210 355 198 342 198 325 C 198 308 212 296 228 296 H 305 C 330 296 350 282 350 260 C 350 238 330 220 305 220 H 228 C 210 220 198 208 198 192 C 198 176 210 175 228 175 Z"
        fill="url(#digiroMidArc)"
      />
    </svg>
  );
};
