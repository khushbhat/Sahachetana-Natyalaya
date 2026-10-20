/**
 * Architectural ornaments drawn from Hoysala temple vocabulary:
 * stepped plinth corners, lotus rosettes from carved ceilings, the
 * stellate (star-shaped) temple plan, and lathe-turned pillars.
 * All strokes use --ornament so they follow the active theme.
 */
import type { CSSProperties, ReactNode } from 'react';

const S = 'var(--ornament)';

/** Lotus rosette, as carved in Hoysala ceiling panels. Drawn in a 100×100 box. */
export function RosetteGlyph({ cx = 50, cy = 50, r = 50, petals = 8 }: { cx?: number; cy?: number; r?: number; petals?: number }) {
  const k = r / 50;
  const petal = (len: number, w: number) => `M0 0 C ${w} ${-len * 0.35} ${w * 0.7} ${-len * 0.8} 0 ${-len} C ${-w * 0.7} ${-len * 0.8} ${-w} ${-len * 0.35} 0 0Z`;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${k})`} fill="none" stroke={S} strokeWidth={Math.min(1 / k, 6)}>
      <circle r="48" opacity="0.55" />
      <circle r="44" strokeDasharray="0.5 3.2" strokeLinecap="round" strokeWidth="1.6" />
      {Array.from({ length: petals }, (_, i) => (
        <path key={`o${i}`} d={petal(40, 12)} transform={`rotate(${(360 / petals) * i})`} />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <path key={`i${i}`} d={petal(24, 8)} transform={`rotate(${(360 / petals) * i + 180 / petals})`} opacity="0.75" />
      ))}
      <circle r="8" />
      <circle r="3.4" fill={S} stroke="none" />
    </g>
  );
}

export function Rosette({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={`rosette ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <RosetteGlyph />
    </svg>
  );
}

/** Stepped corner from a Hoysala plinth, with a small rosette and bead run. */
export function Corner({ position = 'tl', size = 72 }: { position?: 'tl' | 'tr' | 'bl' | 'br'; size?: number }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[position];
  return (
    <svg
      className={`corner corner--${position}`}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <g fill="none" stroke={S} strokeLinecap="square">
        <path d="M1.5 79V1.5H79" strokeWidth="1.4" />
        <path d="M8 79V14h6V8h65" strokeWidth="0.9" />
        <path d="M14 79V24h10V14h55" strokeWidth="0.6" opacity="0.55" />
        <path d="M30 30l6-6 6 6-6 6z" strokeWidth="0.8" />
      </g>
      <circle cx="36" cy="30" r="1.6" fill={S} />
      {[48, 56, 64, 72].map((p) => (
        <g key={p} fill={S}>
          <circle cx={p} cy="4.8" r="1" />
          <circle cx="4.8" cy={p} r="1" />
        </g>
      ))}
      <g transform="translate(-1 -1)">
        <RosetteGlyph cx={9} cy={9} r={6} petals={8} />
      </g>
    </svg>
  );
}

/** Frames any block with four stepped corners. */
export function CornerFrame({ children, className = '', size = 56 }: { children: ReactNode; className?: string; size?: number }) {
  return (
    <div className={`corner-frame ${className}`} style={{ '--corner': `${size}px` } as CSSProperties}>
      <Corner position="tl" size={size} />
      <Corner position="tr" size={size} />
      <Corner position="bl" size={size} />
      <Corner position="br" size={size} />
      {children}
    </div>
  );
}

/** Stellate temple plan — a 16-point star with rings, used as a quiet background motif. */
export function Stellate({ size = 520, className = '' }: { size?: number; className?: string }) {
  const pts = (n: number, ro: number, ri: number) =>
    Array.from({ length: n * 2 }, (_, i) => {
      const a = (Math.PI / n) * i - Math.PI / 2;
      const r = i % 2 === 0 ? ro : ri;
      return `${(200 + Math.cos(a) * r).toFixed(2)},${(200 + Math.sin(a) * r).toFixed(2)}`;
    }).join(' ');
  return (
    <svg className={`stellate ${className}`} width={size} height={size} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke={S}>
        <circle cx="200" cy="200" r="196" strokeWidth="0.6" opacity="0.6" />
        <circle cx="200" cy="200" r="188" strokeWidth="1.4" strokeDasharray="0.6 7" strokeLinecap="round" />
        <polygon points={pts(16, 178, 148)} strokeWidth="0.8" />
        <polygon points={pts(16, 150, 124)} strokeWidth="0.5" opacity="0.7" transform="rotate(11.25 200 200)" />
        <circle cx="200" cy="200" r="112" strokeWidth="0.6" />
        <polygon points={pts(8, 104, 70)} strokeWidth="0.6" opacity="0.8" />
        <circle cx="200" cy="200" r="64" strokeWidth="0.5" opacity="0.6" />
        {Array.from({ length: 32 }, (_, i) => (
          <line
            key={i}
            x1="200"
            y1={200 - 114}
            x2="200"
            y2={200 - 122}
            strokeWidth="0.7"
            transform={`rotate(${i * 11.25} 200 200)`}
          />
        ))}
      </g>
      <RosetteGlyph cx={200} cy={200} r={52} petals={12} />
    </svg>
  );
}

/** Lathe-turned Hoysala pillar segments (capital, turned bulb, base). */
function PillarCapital() {
  return (
    <svg viewBox="0 0 28 56" width="28" height="56" aria-hidden="true" focusable="false" className="pillar__part">
      <g fill="none" stroke={S} strokeWidth="0.9">
        <path d="M0 2h28M2 6h24" />
        <path d="M3 6c0 6 4 9 11 9s11-3 11-9" />
        <path d="M5 15h18M7 19h14" />
        <path d="M6 19c-2 6 2 10 8 10s10-4 8-10" />
        <path d="M9 29h10M10 33h8M10 33v23M18 33v23" />
        <path d="M14 8v4" opacity="0.6" />
      </g>
    </svg>
  );
}

function PillarBulb() {
  return (
    <svg viewBox="0 0 28 104" width="28" height="104" aria-hidden="true" focusable="false" className="pillar__part">
      <g fill="none" stroke={S} strokeWidth="0.9">
        <path d="M10 0v8M18 0v8" />
        <path d="M8 8h12M6 12h16" />
        <path d="M6 12c-5 10-5 22 0 30h16c5-8 5-20 0-30" />
        <path d="M4 27h20" opacity="0.55" />
        <path d="M5 42h18M7 46h14" />
        <path d="M7 46c-3 6-3 12 0 16h14c3-4 3-10 0-16" />
        <path d="M6 66h16M4 70h20" />
        <path d="M5 70c-4 8-4 16 2 22h14c6-6 6-14 2-22" />
        <path d="M8 96h12M10 96v8M18 96v8" />
      </g>
      <circle cx="14" cy="27" r="1.4" fill={S} />
    </svg>
  );
}

function PillarBase() {
  return (
    <svg viewBox="0 0 28 44" width="28" height="44" aria-hidden="true" focusable="false" className="pillar__part">
      <g fill="none" stroke={S} strokeWidth="0.9">
        <path d="M10 0v10M18 0v10" />
        <path d="M8 10h12M6 14h16M6 14l-2 8h20l-2-8" />
        <path d="M2 22h24M2 22v8h24v-8M0 34h28M0 38h28M0 42h28" />
      </g>
    </svg>
  );
}

export function Pillar({ className = '' }: { className?: string }) {
  return (
    <div className={`pillar ${className}`} aria-hidden="true">
      <PillarCapital />
      <span className="pillar__shaft" />
      <PillarBulb />
      <span className="pillar__shaft" />
      <PillarBase />
    </div>
  );
}

/** Kalasha finial for the apex of an arch. */
export function Finial({ className = '' }: { className?: string }) {
  return (
    <svg className={`finial ${className}`} viewBox="0 0 40 52" width="40" height="52" aria-hidden="true" focusable="false">
      <g fill="none" stroke={S} strokeWidth="1">
        <path d="M20 2c3 4 3 8 0 11-3-3-3-7 0-11z" fill="var(--ornament-faint)" />
        <path d="M14 15h12M12 18h16" />
        <path d="M12 18c-6 6-6 16 2 20h12c8-4 8-14 2-20" />
        <path d="M11 28h18" opacity="0.5" />
        <path d="M13 38h14M9 42h22M6 46h28M2 50h36" />
      </g>
      <circle cx="20" cy="28" r="1.6" fill={S} />
    </svg>
  );
}

export type MudraKind = 'alapadma' | 'mukula' | 'pataka';

/** Mudra-inspired markers: open lotus (Alapadma), bud (Mukula), raised flat hand (Pataka). */
export function MudraMark({ kind = 'alapadma', size = 22, className = '' }: { kind?: MudraKind; size?: number; className?: string }) {
  return (
    <svg className={`mudra ${className}`} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g fill="none" stroke={S} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'alapadma' && (
          <>
            {[-60, -30, 0, 30, 60].map((a) => (
              <path key={a} d="M16 27c-2.6-5.6-2.6-12.4 0-18 2.6 5.6 2.6 12.4 0 18z" transform={`rotate(${a} 16 27)`} />
            ))}
            <path d="M9 29h14" />
          </>
        )}
        {kind === 'mukula' && (
          <>
            <path d="M16 4c5 5 7 11 4.6 17-1 2.6-2.6 4-4.6 4s-3.6-1.4-4.6-4C9 15 11 9 16 4z" />
            <path d="M16 9c2.2 3.6 2.6 8 1 12M16 9c-2.2 3.6-2.6 8-1 12" opacity="0.6" />
            <path d="M16 25v4M12 29h8" />
          </>
        )}
        {kind === 'pataka' && (
          <>
            <path d="M12 29V14.5c0-1.2.4-8.5.4-9.6 0-1.6 2.6-1.6 2.6 0V4c0-1.6 2.7-1.6 2.7 0v1c0-1.5 2.6-1.5 2.6 0v1.2c0-1.4 2.4-1.4 2.4 0V20c0 4.6-2.4 9-7 9" />
            <path d="M12 18c-1.6-1.6-3.6-3.4-4.8-2.4-1 .9.2 2.6 1.6 4.4L12 24" />
          </>
        )}
      </g>
    </svg>
  );
}
