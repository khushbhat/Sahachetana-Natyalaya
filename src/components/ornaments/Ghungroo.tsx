import { useId } from 'react';

type GhungrooProps = {
  size?: number;
  active?: boolean;
  className?: string;
  /** Rotate the bell slightly, as bells hang naturally on a cord */
  tilt?: number;
};

/**
 * A single ghungroo (gejje) bell, drawn as engraved temple metalwork:
 * suspension ring, beaded collar, spherical body with a granulated seam,
 * the characteristic slit mouth with round terminals, and a polished highlight.
 * Colours come from --bell-fill-* and --ornament so it follows the theme.
 */
export function Ghungroo({ size = 32, active = false, className = '', tilt = 0 }: GhungrooProps) {
  const id = useId().replace(/:/g, '');
  const body = `gb-${id}`;
  const shine = `gs-${id}`;
  const seamDots = [9.2, 12.4, 15.8, 19.5, 23.2, 26.6, 29.8];

  return (
    <svg
      className={`ghungroo${active ? ' is-active' : ''} ${className}`}
      width={size}
      height={size * 1.25}
      viewBox="0 0 40 50"
      aria-hidden="true"
      focusable="false"
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <defs>
        <radialGradient id={body} cx="36%" cy="34%" r="70%">
          <stop offset="0%" stopColor="var(--bell-fill-1)" />
          <stop offset="48%" stopColor="var(--bell-fill-2)" />
          <stop offset="100%" stopColor="var(--bell-fill-3)" />
        </radialGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* suspension ring and twisted wire */}
      <ellipse cx="20" cy="4.6" rx="3.4" ry="3.6" fill="none" stroke="var(--ornament)" strokeWidth="1.3" />
      <path d="M18.2 7.8 Q20 9.6 21.8 7.8" fill="none" stroke="var(--ornament)" strokeWidth="1" />
      {/* beaded collar */}
      <path d="M14.5 11.6 Q20 9.4 25.5 11.6 L24.6 13.6 Q20 12 15.4 13.6Z" fill={`url(#${body})`} stroke="var(--bell-fill-3)" strokeWidth="0.6" />
      {[15.6, 17.8, 20, 22.2, 24.4].map((x) => (
        <circle key={x} cx={x} cy={11.9 - Math.abs(20 - x) * -0.08} r="0.62" fill="var(--bell-fill-1)" opacity="0.9" />
      ))}

      {/* bell body */}
      <circle cx="20" cy="30" r="16" fill={`url(#${body})`} stroke="var(--bell-fill-3)" strokeWidth="0.8" />
      {/* engraved concentric line near the top */}
      <path d="M9.6 21.6 Q20 15.4 30.4 21.6" fill="none" stroke="var(--bell-fill-3)" strokeWidth="0.6" opacity="0.55" />
      {/* granulated equatorial seam */}
      <path d="M4.6 28.6 Q20 35 35.4 28.6" fill="none" stroke="var(--bell-fill-3)" strokeWidth="0.9" opacity="0.8" />
      <path d="M4.9 31.4 Q20 37.8 35.1 31.4" fill="none" stroke="var(--bell-fill-3)" strokeWidth="0.5" opacity="0.5" />
      {seamDots.map((x, i) => (
        <circle key={i} cx={x} cy={29.9 + Math.sin((i / 6) * Math.PI) * 2.9} r="0.75" fill="var(--bell-fill-1)" opacity="0.85" />
      ))}
      {/* slit mouth with round terminals */}
      <path d="M11.2 38.4 Q20 44.6 28.8 38.4 Q20 42.2 11.2 38.4Z" fill="var(--bell-fill-3)" />
      <circle cx="10.9" cy="38.2" r="1.55" fill="var(--bell-fill-3)" />
      <circle cx="29.1" cy="38.2" r="1.55" fill="var(--bell-fill-3)" />
      {/* polished highlight */}
      <ellipse cx="13.6" cy="23.4" rx="4.8" ry="2.6" transform="rotate(-32 13.6 23.4)" fill={`url(#${shine})`} opacity="0.75" />
      <circle cx="26.6" cy="36" r="0.8" fill="#fff" opacity="0.35" />
    </svg>
  );
}
