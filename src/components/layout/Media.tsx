import { useState, type CSSProperties } from 'react';
import type { PhotoAsset } from '../../data/images';
import { Rosette } from '../ornaments/Hoysala';

type MediaProps = {
  image?: PhotoAsset | null;
  /** Shown on the placeholder when no photograph is supplied yet */
  placeholder?: string;
  /** CSS aspect-ratio for the frame, e.g. '4 / 5' */
  ratio?: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
  /** Override the registry alt text where context needs a different description */
  alt?: string;
};

const src = (base: string, w: number) => `/images/opt/${base}-${w}.webp`;

/**
 * Responsive photograph with a designed placeholder state. Falls back to the
 * placeholder if the file is missing, so a broken image never shows.
 */
export function Media({ image, placeholder = 'Photograph', ratio, sizes = '(min-width: 1024px) 50vw, 100vw', eager, className = '', alt }: MediaProps) {
  const [failed, setFailed] = useState(false);
  const style = ratio ? ({ aspectRatio: ratio } as CSSProperties) : undefined;

  if (!image || failed) {
    return (
      <div className={`media media--placeholder ${className}`} style={style} role="img" aria-label={`${placeholder} — photograph to be supplied`}>
        <div className="media__ph-inner">
          <Rosette size={54} />
          <span className="media__ph-label">{placeholder}</span>
          <span className="media__ph-note">Photograph to be supplied</span>
        </div>
      </div>
    );
  }

  const srcSet = image.widths.map((w) => `${src(image.base, w)} ${w}w`).join(', ');
  const mid = image.widths[Math.min(1, image.widths.length - 1)];
  return (
    <div className={`media ${className}`} style={style}>
      <img
        src={src(image.base, mid)}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt ?? image.alt}
        width={1200}
        height={Math.round(1200 / image.aspect)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...({ fetchpriority: eager ? 'high' : undefined } as Record<string, string | undefined>)}
        style={{ objectPosition: image.focus }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
