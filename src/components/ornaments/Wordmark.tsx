/**
 * The academy's identity: the official logo mark beside the typeset name.
 *
 * The mark is the gold dancer figure from the supplied logo, cropped above its
 * white Kannada lettering (which would vanish on ivory). It is shown at its
 * original proportions and colours — never redrawn or recoloured.
 * Source: images/images/logo/ → `npm run images` → public/images/brand/.
 */
export const LOGO_MARK = '/images/brand/logo-mark.webp';
export const LOGO_MARK_PNG = '/images/brand/logo-mark.png';
/** Includes the white Kannada lettering — use on dark backgrounds only */
export const LOGO_FULL = '/images/brand/logo-full.png';
const MARK_ASPECT = 204 / 387;

export function LogoMark({ height = 46, className = '', decorative = true }: { height?: number; className?: string; decorative?: boolean }) {
  return (
    <picture>
      <source srcSet={LOGO_MARK} type="image/webp" />
      <img
        className={`logo-mark ${className}`}
        src={LOGO_MARK_PNG}
        width={Math.round(height * MARK_ASPECT)}
        height={height}
        alt={decorative ? '' : 'Sahachetana Natyalaya logo'}
        decoding="async"
      />
    </picture>
  );
}

export function Wordmark({ compact = false, tone = 'default' }: { compact?: boolean; tone?: 'default' | 'light' }) {
  return (
    <span className={`wordmark ${compact ? 'wordmark--compact' : ''} wordmark--${tone}`}>
      <LogoMark height={compact ? 36 : 52} className="wordmark__motif" />
      <span className="wordmark__text">
        <span className="wordmark__name">Sahachetana</span>
        <span className="wordmark__sub">Natyalaya (R.)</span>
      </span>
    </span>
  );
}
