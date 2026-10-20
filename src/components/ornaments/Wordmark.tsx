/**
 * Temporary typographic wordmark for Sahachetana Natyalaya (R.).
 * This is NOT the institution's official logo — replace the <WordmarkMotif />
 * with the supplied logo artwork when available (see ASSETS.md).
 */
export function WordmarkMotif({ size = 40 }: { size?: number }) {
  return (
    <svg className="wordmark__motif" width={size} height={size * 1.15} viewBox="0 0 40 46" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--ornament)" strokeLinecap="round">
        {/* cusped arch */}
        <path
          d="M4 45V20q0-4 2.6-7.2Q7 9.4 10.6 8.2 12.4 4.6 16.4 3.6 18 0.8 20 0.6q2 .2 3.6 3 4 1 5.8 4.6 3.6 1.2 4 4.6Q36 16 36 20v25"
          strokeWidth="1.1"
        />
        <path d="M8 45V21q0-8 12-14 12 6 12 14v24" strokeWidth="0.6" opacity="0.6" />
        {/* gejje bell */}
        <path d="M20 14v4" strokeWidth="0.8" />
        <circle cx="20" cy="26" r="7.4" strokeWidth="1" fill="var(--ornament-faint)" />
        <path d="M13 25q7 3.2 14 0" strokeWidth="0.6" />
        <path d="M16 30q4 2.4 8 0" strokeWidth="1" />
        <circle cx="20" cy="19" r="1" fill="var(--ornament)" stroke="none" />
        {/* plinth */}
        <path d="M2 45h36M10 40h20" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export function Wordmark({ compact = false, tone = 'default' }: { compact?: boolean; tone?: 'default' | 'light' }) {
  return (
    <span className={`wordmark ${compact ? 'wordmark--compact' : ''} wordmark--${tone}`}>
      <WordmarkMotif size={compact ? 30 : 36} />
      <span className="wordmark__text">
        <span className="wordmark__name">Sahachetana</span>
        <span className="wordmark__sub">Natyalaya (R.)</span>
      </span>
    </span>
  );
}
