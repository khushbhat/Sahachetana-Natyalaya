import { useId } from 'react';
import { RosetteGlyph } from './Hoysala';

type DividerProps = {
  variant?: 'rosette' | 'gejje' | 'simple';
  align?: 'center' | 'start';
  className?: string;
};

const S = 'var(--ornament)';

/** A small hanging bell for the gejje divider (simplified for small sizes). */
function MiniBell({ x, y, len }: { x: number; y: number; len: number }) {
  return (
    <g>
      <path d={`M${x} ${y}v${len}`} stroke={S} strokeWidth="0.7" />
      <circle cx={x} cy={y + len + 4.2} r="4" fill="var(--ornament-faint)" stroke={S} strokeWidth="0.8" />
      <path d={`M${x - 2.4} ${y + len + 6.4}q2.4 1.6 4.8 0`} fill="none" stroke={S} strokeWidth="0.8" />
      <path d={`M${x - 3.9} ${y + len + 3.6}q3.9 1.6 7.8 0`} fill="none" stroke={S} strokeWidth="0.4" opacity="0.8" />
    </g>
  );
}

/**
 * Ornamental section divider: fading hairlines, a run of diamonds and beads,
 * and a central lotus rosette — or, in the gejje variant, a strand of bells.
 */
export function Divider({ variant = 'rosette', align = 'center', className = '' }: DividerProps) {
  const id = `dv${useId().replace(/:/g, '')}`;
  return (
    <svg
      className={`divider divider--${align} ${className}`}
      viewBox="0 0 480 56"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${id}-l`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--ornament)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--ornament)" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="1" x2="0">
          <stop offset="0" stopColor="var(--ornament)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--ornament)" />
        </linearGradient>
      </defs>
      <path d="M0 22h188" stroke={`url(#${id}-l)`} strokeWidth="0.9" />
      <path d="M292 22h188" stroke={`url(#${id}-r)`} strokeWidth="0.9" />
      <path d="M60 26h128M292 26h128" stroke={S} strokeWidth="0.4" opacity="0.5" />

      {variant !== 'simple' &&
        [154, 168, 312, 326].map((x) => <circle key={x} cx={x} cy="22" r="1.4" fill={S} />)}
      <g fill="none" stroke={S} strokeWidth="0.9">
        <path d="M176 22l6-5 6 5-6 5z" />
        <path d="M292 22l6-5 6 5-6 5z" />
        <path d="M196 22c6-8 14-8 18 0-4 8-12 8-18 0zM284 22c-6-8-14-8-18 0 4 8 12 8 18 0z" opacity="0.8" />
      </g>

      {variant === 'gejje' ? (
        <g>
          <path d="M214 22q26 10 52 0" fill="none" stroke={S} strokeWidth="0.9" />
          <MiniBell x={222} y={25} len={6} />
          <MiniBell x={240} y={27} len={11} />
          <MiniBell x={258} y={25} len={6} />
          <path d="M240 12l4 4-4 4-4-4z" fill={S} />
        </g>
      ) : (
        <RosetteGlyph cx={240} cy={22} r={variant === 'simple' ? 9 : 15} petals={8} />
      )}
    </svg>
  );
}
