import { useId, type ReactNode } from 'react';
import { Finial, Pillar } from './Hoysala';

/**
 * Builds a cusped (multifoil) temple arch as an SVG path.
 * Coordinates are in a w×h box; the arch springs at `spring`·h.
 * Lobes bulge outward and meet in inward-pointing cusps.
 */
export function archPath(w: number, h: number, { spring = 0.34, lobes = 7, bulge = 0.085 } = {}) {
  const cx = w / 2;
  const sy = h * spring;
  const rx = w / 2 / (1 + bulge);
  const ry = sy / (1 + bulge);
  const x0 = cx - rx;
  const pt = (t: number, k = 1) => [cx - rx * k * Math.cos(t), sy - ry * k * Math.sin(t)] as const;
  let d = `M${x0.toFixed(4)} ${h} L${x0.toFixed(4)} ${sy.toFixed(4)}`;
  for (let i = 0; i < lobes; i++) {
    const a = (Math.PI / lobes) * i;
    const b = (Math.PI / lobes) * (i + 1);
    const [qx, qy] = pt((a + b) / 2, 1 + bulge * 2.1);
    const [ex, ey] = pt(b);
    d += ` Q${qx.toFixed(4)} ${qy.toFixed(4)} ${ex.toFixed(4)} ${ey.toFixed(4)}`;
  }
  d += ` L${(w - x0).toFixed(4)} ${h} Z`;
  return d;
}

// archPath is linear in w and h, so a unit box gives the objectBoundingBox clip.
const CLIP_PATH = archPath(1, 1);

type ArchFrameProps = {
  children: ReactNode;
  className?: string;
  pillars?: boolean;
  /** Ratio of height to width for the outline path (should match the CSS aspect ratio) */
  ratio?: number;
};

/**
 * Frames a photograph in a cusped Hoysala arch, with double gold outline,
 * a kalasha finial at the apex and optional lathe-turned pillars.
 */
export function ArchFrame({ children, className = '', pillars = false, ratio = 1.3 }: ArchFrameProps) {
  const id = `arch${useId().replace(/:/g, '')}`;
  const W = 400;
  const H = W * ratio;
  const outline = archPath(W, H);
  return (
    <div className={`arch-frame ${pillars ? 'arch-frame--pillars' : ''} ${className}`}>
      <svg width="0" height="0" className="arch-frame__defs" aria-hidden="true" focusable="false">
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={CLIP_PATH} />
        </clipPath>
      </svg>
      {pillars && <Pillar className="arch-frame__pillar arch-frame__pillar--l" />}
      <div className="arch-frame__inner">
        <div className="arch-frame__media" style={{ clipPath: `url(#${id})` }}>
          {children}
        </div>
        <svg className="arch-frame__line" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d={outline} fill="none" stroke="var(--ornament)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg
          className="arch-frame__line arch-frame__line--outer"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d={outline} fill="none" stroke="var(--ornament)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </svg>
        <Finial className="arch-frame__finial" />
      </div>
      {pillars && <Pillar className="arch-frame__pillar arch-frame__pillar--r" />}
    </div>
  );
}
