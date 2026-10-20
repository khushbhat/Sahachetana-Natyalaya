import type { ReactNode } from 'react';
import { Divider } from '../ornaments/Divider';
import { CornerFrame, Rosette } from '../ornaments/Hoysala';

/* ---------------- Section heading ---------------- */
type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'start' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  divider?: boolean;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = 'start', as: H = 'h2', divider = false, id }: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align} reveal`}>
      {eyebrow && <p className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`}>{eyebrow}</p>}
      <H id={id}>{title}</H>
      {divider && <Divider align={align} />}
      {intro && <div className="section-heading__intro lead">{intro}</div>}
    </header>
  );
}

/* ---------------- Inner-page hero ---------------- */
type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  kannada?: string;
  children?: ReactNode;
  aside?: ReactNode;
};

/** Opening band for inner pages: large serif title under a carved lintel. */
export function PageHero({ eyebrow, title, kannada, children, aside }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__lintel" aria-hidden="true" />
      <div className="container page-hero__grid">
        <div className="page-hero__text">
          <p className="eyebrow reveal">{eyebrow}</p>
          <h1 className="page-hero__title reveal">{title}</h1>
          {kannada && (
            <p className="page-hero__kn kn reveal" lang="kn">
              {kannada}
            </p>
          )}
          <Divider align="start" className="reveal" />
          {children && <div className="page-hero__intro reveal reveal-delay-1">{children}</div>}
        </div>
        <div className="page-hero__aside reveal reveal-delay-2" aria-hidden={aside ? undefined : true}>
          {aside ?? <Rosette size={220} className="page-hero__rosette" />}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Alternating image / text row ---------------- */
type EditorialRowProps = {
  media: ReactNode;
  children: ReactNode;
  reverse?: boolean;
  frame?: 'corners' | 'plain' | 'offset';
  caption?: ReactNode;
  className?: string;
  id?: string;
  mediaWidth?: 'half' | 'wide' | 'narrow';
} & Record<`data-${string}`, string>;

/**
 * The editorial building block: photograph on one side, text on the other.
 * Rows alternate with `reverse`; on narrow screens the image stacks above.
 */
export function EditorialRow({ media, children, reverse = false, frame = 'corners', caption, className = '', id, mediaWidth = 'half', ...rest }: EditorialRowProps) {
  const figure =
    frame === 'corners' ? (
      <CornerFrame size={48}>{media}</CornerFrame>
    ) : frame === 'offset' ? (
      <div className="offset-frame">{media}</div>
    ) : (
      media
    );
  return (
    <div id={id} className={`editorial editorial--${mediaWidth} ${reverse ? 'editorial--reverse' : ''} ${className}`} {...rest}>
      <figure className="editorial__media reveal">
        {figure}
        {caption && <figcaption className="editorial__caption">{caption}</figcaption>}
      </figure>
      <div className="editorial__body reveal reveal-delay-1">{children}</div>
    </div>
  );
}
