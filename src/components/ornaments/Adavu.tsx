/**
 * Line drawings from the vocabulary of adavus: a dancer's foot struck flat on
 * the floor (tattadavu) with its anklet of bells, and the rhythm it leaves.
 * Drawn with a single even stroke so it sits beside the other ornaments; when
 * placed inside a `.reveal` element the strokes draw themselves in once.
 */
export function AdavuFoot({ width = 160, className = '', strike = true }: { width?: number; className?: string; strike?: boolean }) {
  const bells = [17, 23, 29, 35, 41];
  return (
    <svg
      className={`adavu ${className}`}
      width={width}
      height={width * 0.5}
      viewBox="0 0 120 60"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="var(--ornament)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* shin, heel, sole, toes and instep — one continuous line */}
        <path
          className="adavu__line"
          pathLength={1}
          d="M24 2C23.4 12 19.8 22 15.6 30.5 11.4 39 9.6 45.4 14 48.6 15.6 49.8 18 50 21 50H90.5C97.5 50 103.4 49.2 105.6 46.4 107.2 44.2 105.8 41.4 102.4 40.4 98.2 39.2 93.8 38.8 89 37.6 76.6 34.6 62.4 29 50.2 21.6 43.6 17.6 39.4 10.4 38.2 2"
        />
        {/* toe creases */}
        <path className="adavu__line adavu__line--fine" pathLength={1} d="M95.5 39.6c-.8 3.2-.6 6.2.4 9M100.4 40.6c-.6 2.6-.4 5 .4 7.6" />
        {/* anklet cord */}
        <path className="adavu__line" pathLength={1} d="M19.6 15.4C25.8 19.8 33.4 20.4 40.6 16.2" />
        <path className="adavu__line adavu__line--fine" pathLength={1} d="M19 18.6C25.6 23.2 34 23.6 41.4 19.2" />
      </g>
      {/* bells hanging from the cord */}
      <g className="adavu__bells">
        {bells.map((x, i) => {
          const y = 19.4 + Math.sin(((x - 17) / 24) * Math.PI) * 2.6;
          return (
            <g key={x} transform={`translate(${x} ${y})`}>
              <path d="M0 0v1.4" stroke="var(--ornament)" strokeWidth="0.6" />
              <circle cy="3.4" r="2" fill="var(--bell-fill-2)" stroke="var(--ornament)" strokeWidth="0.5" />
              <path d={`M-1.1 4.2h2.2`} stroke="var(--bell-fill-3)" strokeWidth="0.45" opacity={i % 2 ? 0.8 : 1} />
            </g>
          );
        })}
      </g>
      {/* the floor and the rhythm of the strike */}
      <path d="M2 53.5H118" stroke="var(--ornament-soft)" strokeWidth="0.7" strokeDasharray="1 3.2" strokeLinecap="round" />
      {strike && (
        <g className="adavu__strike" fill="none" stroke="var(--ornament-soft)" strokeWidth="0.8" strokeLinecap="round">
          <path d="M8 56.5c6 2 14 2 20 0" />
          <path d="M4 59c9 1.6 19 1.6 28 0" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}

/**
 * Small museum-catalogue label: a ruled box with a kicker and lines of
 * metadata. Used beside photographs to give them an archival date and place.
 */
export function ArchiveLabel({ kicker, lines, className = '' }: { kicker: string; lines: string[]; className?: string }) {
  return (
    <p className={`archive-label ${className}`}>
      <span className="archive-label__kicker">{kicker}</span>
      {lines.map((l) => (
        <span key={l} className="archive-label__line">
          {l}
        </span>
      ))}
    </p>
  );
}
