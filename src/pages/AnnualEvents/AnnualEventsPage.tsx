import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { initiatives, isPastEdition, natyaaradhana, shivamoggaVaibhava, type Fact, type FestivalEdition } from '../../data/events';
import { photos } from '../../data/images';
import type { GalleryItem } from '../../data/gallery';
import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import { usePageMeta } from '../../lib/hooks';
import { EditorialRow, PageHero, SectionHeading } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { Lightbox } from '../../components/gallery/Lightbox';
import { Ghungroo } from '../../components/ornaments/Ghungroo';
import { Divider } from '../../components/ornaments/Divider';
import { CornerFrame, Stellate } from '../../components/ornaments/Hoysala';

const Verify = ({ show, label = 'To be verified' }: { show?: boolean; label?: string }) =>
  SHOW_VERIFICATION_NOTES && show ? <span className="tag tag--verify">{label}</span> : null;

function FactList({ facts, className }: { facts: Fact[]; className: string }) {
  return (
    <ul className={className}>
      {facts.map((f) => (
        <li key={f.text}>
          <Ghungroo size={14} />
          <span>
            {f.text}
            <Verify show={f.verify} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A full archive record for one festival edition. */
function EditionRecord({ e, onOpen }: { e: FestivalEdition; onOpen: (i: number) => void }) {
  const past = isPastEdition(e);
  const [lead, ...rest] = e.photos ?? [];
  return (
    <article className="edition" aria-labelledby={`edition-${e.edition}-h`}>
      <header className="edition__head">
        <p className="edition__kicker">
          {past ? 'Archive' : 'Forthcoming'} · Edition {e.edition}
        </p>
        <h3 id={`edition-${e.edition}-h`} className="edition__title">
          Natyaaradhana <em>{e.edition}</em>
        </h3>
        {e.summary && <p className="edition__summary">{e.summary}</p>}
      </header>

      <div className="edition__grid">
        {lead && (
          <figure className="edition__lead">
            <button type="button" className="edition__photo-btn" onClick={() => onOpen(0)} aria-label={`Enlarge: ${lead.caption}`}>
              <Media image={lead.image} ratio="3 / 4" sizes="(min-width: 1024px) 34vw, 90vw" />
            </button>
            <figcaption>{lead.caption}</figcaption>
          </figure>
        )}

        <div className="edition__record">
          <dl className="edition__meta">
            <div>
              <dt>Dates</dt>
              <dd>
                {e.datesLabel ?? 'To be confirmed'}
                <Verify show={e.datesVerify} label="Dates to be confirmed" />
              </dd>
            </div>
            {e.venue && (
              <div>
                <dt>Venue</dt>
                <dd>{e.venue}</dd>
              </div>
            )}
            {e.supportedBy && (
              <div>
                <dt>Supported by</dt>
                <dd>{e.supportedBy}</dd>
              </div>
            )}
          </dl>

          {e.days && (
            <>
              <h4 className="edition__h">The programme</h4>
              <ol className="edition__days">
                {e.days.map((d, i) => (
                  <li key={d.label}>
                    <span className="edition__day-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="sr-only">{d.label}: </span>
                    {d.text}
                  </li>
                ))}
              </ol>
            </>
          )}

          {e.highlights && (
            <>
              <h4 className="edition__h">In this edition</h4>
              <ul className="edition__highlights">
                {e.highlights.map((h) => (
                  <li key={h.title}>
                    <strong className="edition__hl-title">{h.title}</strong>
                    <span>
                      {h.text}
                      <Verify show={h.verify} />
                    </span>
                    {h.source && (
                      <a className="edition__source" href={h.source} target="_blank" rel="noreferrer">
                        About the production <ExternalLink size={12} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {rest.length > 0 && (
        <ul className="edition__strip" aria-label={`Photographs from Natyaaradhana ${e.edition}`}>
          {rest.map((p, i) => (
            <li key={p.image.base} className={`edition__thumb edition__thumb--${i + 1}`}>
              <button type="button" className="edition__photo-btn" onClick={() => onOpen(i + 1)} aria-label={`Enlarge: ${p.caption}`}>
                <Media image={p.image} sizes="(min-width: 1024px) 22vw, 45vw" />
              </button>
              <span className="edition__thumb-cap">{p.caption}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function AnnualEventsPage() {
  usePageMeta(
    'Annual Events',
    'The Natyaaradhana National Dance Festival archive, the Dasara programme Shivamogga Vaibhava, and the initiatives of Sahachetana Natyalaya (R.): Bharatiyam, Patyadarshini, Ajita Shri Puraskara and free Bharatanatyam training for underprivileged children.',
  );
  const editions = [...natyaaradhana.editions].sort((a, b) => b.edition - a.edition);
  const strand = Array.from({ length: natyaaradhana.editionCount }, (_, i) => editions.find((e) => e.edition === i + 1));

  // lightbox over the photographs of the edition that was clicked
  const [viewer, setViewer] = useState<{ items: GalleryItem[]; index: number } | null>(null);
  const close = useCallback(() => setViewer(null), []);
  const setIndex = useCallback((index: number) => setViewer((v) => (v ? { ...v, index } : v)), []);
  const openEdition = (e: FestivalEdition) => (index: number) =>
    setViewer({
      index,
      items: (e.photos ?? []).map((p) => ({
        id: p.image.base,
        image: p.image,
        category: 'Natyaaradhana 15',
        caption: p.caption,
        date: e.datesLabel,
        venue: e.venue,
        shape: 'square',
      })),
    });

  return (
    <>
      <PageHero
        eyebrow="Annual Events"
        title="A festival, a Dasara stage, and the year between"
        aside={
          <CornerFrame size={44}>
            <Media image={photos.n15StageLights} ratio="4 / 5" sizes="(min-width: 1024px) 26vw, 80vw" />
          </CornerFrame>
        }
      >
        <p className="lead">
          Each year Sahachetana Natyalaya hosts Natyaaradhana, its national dance festival, presents work on Dasara platforms, and carries
          classical dance to children through its outreach.
        </p>
      </PageHero>

      {/* ---------------- Natyaaradhana ---------------- */}
      <section id="natyaaradhana" className="section section--contrast festival" aria-labelledby="natya-title">
        <Stellate size={900} className="festival__stellate" />
        <div className="container">
          <div className="festival__intro">
            <div>
              <p className="eyebrow reveal">Flagship festival</p>
              <h2 id="natya-title" className="festival__title reveal">
                {natyaaradhana.displayName}
              </h2>
              <p className="festival__sub reveal">
                {natyaaradhana.subtitle}
                <span className="kn" lang="kn">
                  {' '}
                  · {natyaaradhana.kannada} {natyaaradhana.kannadaSubtitle}
                </span>
              </p>
            </div>
            <div className="festival__about reveal reveal-delay-1">
              <p className="lead">{natyaaradhana.summary}</p>
              <FactList facts={natyaaradhana.history} className="festival__history" />
            </div>
          </div>

          <div className="editions reveal" aria-labelledby="editions-title">
            <h3 id="editions-title" className="editions__title">
              {natyaaradhana.editionCount} editions <span className="muted">· the archive grows as each record is supplied</span>
            </h3>
            <ol className="editions__strand">
              {strand.map((e, i) => {
                const n = i + 1;
                const current = n === natyaaradhana.editionCount;
                return (
                  <li key={n} className={`editions__bell ${e ? 'has-record' : ''}`}>
                    <Ghungroo size={current ? 30 : 22} active={current} />
                    <span className="editions__num">{String(n).padStart(2, '0')}</span>
                    <span className="editions__year">{e?.year || '—'}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {editions.map((e) => (
            <EditionRecord key={e.edition} e={e} onOpen={openEdition(e)} />
          ))}
        </div>
      </section>

      {/* ---------------- Shivamogga Vaibhava ---------------- */}
      <section id="shivamogga-vaibhava" className="section vaibhava" aria-labelledby="vaibhava-title">
        <div className="container vaibhava__grid">
          <div className="vaibhava__mark reveal" aria-hidden="true">
            <span className="vaibhava__time">6:00</span>
            <span className="vaibhava__pm">PM</span>
            <span className="vaibhava__where">Freedom Park</span>
          </div>
          <div className="vaibhava__text reveal reveal-delay-1">
            <p className="eyebrow">{shivamoggaVaibhava.context}</p>
            <h2 id="vaibhava-title">{shivamoggaVaibhava.name}</h2>
            <p className="lead">{shivamoggaVaibhava.summary}</p>
            <FactList facts={shivamoggaVaibhava.supplied} className="vaibhava__facts" />
            {shivamoggaVaibhava.editions.length === 0 && (
              <p className="muted vaibhava__note">
                This is a record of past Dasara presentations, not a current schedule. Future dates will be announced on the Programs page.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Initiatives ---------------- */}
      <section id="initiatives" className="section section--surface initiatives" aria-labelledby="initiatives-title">
        <div className="container">
          <SectionHeading
            eyebrow="Initiatives"
            id="initiatives-title"
            title="Through the year"
            align="center"
            divider
            intro={<p>Access, outreach and recognition that extend the classical stage to new dancers and new audiences.</p>}
          />
          {initiatives.filter((it) => it.image).map((it, i) => (
            <EditorialRow
              key={it.id}
              id={it.id}
              reverse={i % 2 === 1}
              frame={i % 2 ? 'offset' : 'corners'}
              mediaWidth="narrow"
              media={<Media image={it.image} placeholder={it.imageLabel} ratio={it.image && it.image.aspect > 1.6 ? '2.4 / 1' : '4 / 3'} />}
              caption={it.imageCaption}
              className="initiative"
            >
              <p className="eyebrow">{it.kind}</p>
              <h3 className="initiative__title">
                {it.name}
                {it.kannada && (
                  <span className="initiative__kn kn" lang="kn">
                    {it.kannada}
                  </span>
                )}
              </h3>
              <p className="lead">{it.summary}</p>
              <FactList facts={it.facts} className="initiative__facts" />
              {it.descriptionPending && <span className="tag tag--placeholder">Full description pending</span>}
            </EditorialRow>
          ))}
          {/* initiatives without photographs yet: a ruled register rather than empty picture frames */}
          <ul className="register">
            {initiatives
              .filter((it) => !it.image)
              .map((it) => (
                <li key={it.id} id={it.id} className="register__item reveal">
                  <p className="eyebrow">{it.kind}</p>
                  <h3 className="register__title">{it.name}</h3>
                  <p>{it.summary}</p>
                  <FactList facts={it.facts} className="initiative__facts" />
                  {it.descriptionPending && <span className="tag tag--placeholder">Full description pending</span>}
                </li>
              ))}
          </ul>
          <Divider variant="gejje" />
          <p className="center">
            <Link to="/programs" className="btn">
              Programs, upcoming and past
            </Link>
          </p>
        </div>
      </section>

      {viewer && <Lightbox items={viewer.items} index={viewer.index} onClose={close} onIndex={setIndex} />}
    </>
  );
}
