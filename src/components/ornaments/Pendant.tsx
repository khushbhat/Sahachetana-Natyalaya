import { useId } from 'react';

/**
 * Temple-jewellery pendant: lotus crown, almond-shaped gold body with a
 * granulated inner border, a kemp-red centre stone in a claw setting,
 * flanking seed stones and a fringe of pearl drops.
 */
export function Pendant({ width = 52, className = '' }: { width?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  const gold = `pg-${id}`;
  const stone = `ps-${id}`;

  // granulation dots along the inner almond outline
  const dots = Array.from({ length: 22 }, (_, i) => {
    const t = (i / 22) * Math.PI * 2;
    const x = 32 + Math.sin(t) * 16.5;
    const y = 58 - Math.cos(t) * (Math.cos(t) > 0 ? 22 : 24);
    return { x, y };
  });

  return (
    <svg className={`pendant ${className}`} width={width} height={width * 1.9} viewBox="0 0 64 122" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--bell-fill-1)" />
          <stop offset="55%" stopColor="var(--bell-fill-2)" />
          <stop offset="100%" stopColor="var(--bell-fill-3)" />
        </linearGradient>
        <radialGradient id={stone} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#d4545c" />
          <stop offset="55%" stopColor="var(--c-kemp)" />
          <stop offset="100%" stopColor="#4d0f17" />
        </radialGradient>
      </defs>

      {/* hook and loop */}
      <path d="M32 0v5" stroke="var(--ornament)" strokeWidth="1.2" />
      <ellipse cx="32" cy="8" rx="3" ry="3.4" fill="none" stroke="var(--ornament)" strokeWidth="1.2" />

      {/* lotus crown */}
      <g fill={`url(#${gold})`} stroke="var(--bell-fill-3)" strokeWidth="0.6">
        <path d="M32 12c3 3.5 3 8.5 0 12-3-3.5-3-8.5 0-12z" />
        <path d="M32 24c-2-5-6.5-7.4-11-6.6 1.2 4.6 5.4 7.4 11 6.6z" />
        <path d="M32 24c2-5 6.5-7.4 11-6.6-1.2 4.6-5.4 7.4-11 6.6z" />
        <path d="M32 24.5c-4.6-2-9.6-1-12.6 2.4 4 2.4 9 1.8 12.6-2.4z" />
        <path d="M32 24.5c4.6-2 9.6-1 12.6 2.4-4 2.4-9 1.8-12.6-2.4z" />
      </g>

      {/* almond body */}
      <path
        d="M32 27c14.5 4 22 15.5 22 30 0 15.5-10.5 27.5-22 35.5C20.5 84.5 10 72.5 10 57c0-14.5 7.5-26 22-30z"
        fill={`url(#${gold})`}
        stroke="var(--bell-fill-3)"
        strokeWidth="0.8"
      />
      <path
        d="M32 31.5c11.5 3.6 17.6 13 17.6 25.5 0 12.8-8.4 23-17.6 30C22.8 80 14.4 69.8 14.4 57c0-12.5 6.1-21.9 17.6-25.5z"
        fill="none"
        stroke="var(--bell-fill-3)"
        strokeWidth="0.6"
        opacity="0.7"
      />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.9" fill="var(--bell-fill-1)" stroke="var(--bell-fill-3)" strokeWidth="0.25" />
      ))}

      {/* centre kemp stone in a claw setting */}
      <ellipse cx="32" cy="57.5" rx="10.2" ry="13.4" fill="none" stroke="var(--bell-fill-3)" strokeWidth="0.8" />
      <ellipse cx="32" cy="57.5" rx="8.4" ry="11.4" fill={`url(#${stone})`} />
      <ellipse cx="29" cy="52" rx="2.6" ry="3.6" fill="#fff" opacity="0.28" transform="rotate(-18 29 52)" />
      {[
        [32, 45],
        [32, 70],
        [22.6, 57.5],
        [41.4, 57.5],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="var(--bell-fill-1)" stroke="var(--bell-fill-3)" strokeWidth="0.4" />
      ))}

      {/* seed stones */}
      <circle cx="32" cy="36.5" r="2" fill={`url(#${stone})`} stroke="var(--bell-fill-3)" strokeWidth="0.4" />
      <circle cx="32" cy="80" r="2" fill={`url(#${stone})`} stroke="var(--bell-fill-3)" strokeWidth="0.4" />

      {/* pearl fringe */}
      {[
        [19, 82, 97],
        [25, 88, 104],
        [32, 92.5, 112],
        [39, 88, 104],
        [45, 82, 97],
      ].map(([x, y1, y2]) => (
        <g key={x}>
          <path d={`M${x} ${y1}V${y2 - 3}`} stroke="var(--ornament)" strokeWidth="0.6" />
          <circle cx={x} cy={y2 - 1} r={x === 32 ? 3 : 2.3} fill="var(--c-ivory-light)" stroke="var(--ornament)" strokeWidth="0.6" />
          <circle cx={x - 0.7} cy={y2 - 1.8} r="0.7" fill="#fff" opacity="0.9" />
        </g>
      ))}
      <path d="M32 115v3" stroke="var(--ornament)" strokeWidth="0.6" />
      <path d="M32 118l2 2-2 2-2-2z" fill="var(--ornament)" />
    </svg>
  );
}
