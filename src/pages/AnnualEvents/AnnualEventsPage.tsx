import { Link } from 'react-router-dom';
import { initiatives, natyaaradhana } from '../../data/events';
import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import { usePageMeta } from '../../lib/hooks';
import { EditorialRow, PageHero, SectionHeading } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { FestivalPoster } from '../../components/events/FestivalPoster';
import { Ghungroo } from '../../components/ornaments/Ghungroo';
import { Divider } from '../../components/ornaments/Divider';
import { Stellate } from '../../components/ornaments/Hoysala';

export function AnnualEventsPage() {
  usePageMeta(
    'Annual Events',
    'The Natyaaradhana National Dance Festival, Patyadarshini, Bharatheeyam, Ajita Shri Puraskara and free Rangapravesha initiatives of Sahachetana Natyalaya (R.).',
  );
  const editions = Array.from({ length: natyaaradhana.editionCount }, (_, i) => natyaaradhana.editions.find((e) => e.edition === i + 1) ?? { edition: i + 1, year: '' });

  return (
    <>
      <PageHero eyebrow="Annual Events" title="Festivals that keep the stage open">
        <p className="lead">
          Each year Sahachetana Natyalaya curates festivals and programmes that promote classical dance, give emerging artists a platform
          and bring audiences close to the art — many of them free and open to all.
        </p>
      </PageHero>

      {/* ---------------- Natyaaradhana ---------------- */}
      <section className="section section--contrast festival" aria-labelledby="natya-title">
        <Stellate size={900} className="festival__stellate" />
        <div className="container">
          <p className="eyebrow reveal">Flagship festival</p>
          <h2 id="natya-title" className="festival__title reveal">
            {natyaaradhana.displayName}
          </h2>
          <p className="festival__sub reveal">{natyaaradhana.subtitle}</p>

          <div className="festival__grid">
            <div className="festival__poster reveal">
              <FestivalPoster large />
            </div>
            <div className="festival__text reveal reveal-delay-1">
              <p className="lead">{natyaaradhana.summary}</p>
              {natyaaradhana.officialDescription ? (
                <p>{natyaaradhana.officialDescription}</p>
              ) : (
                <p className="festival__pending">
                  <span className="tag tag--placeholder">Description pending</span> The official festival description will be added once
                  supplied by the institution.
                </p>
              )}
              <h3>Festival history</h3>
              <ul className="festival__history">
                {natyaaradhana.history.map((h) => (
                  <li key={h.text}>
                    <Ghungroo size={16} />
                    <span>
                      {h.text}
                      {SHOW_VERIFICATION_NOTES && h.verify && <span className="tag tag--verify">To be verified</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="editions reveal" aria-labelledby="editions-title">
            <h3 id="editions-title" className="editions__title">
              Fifteen editions <span className="muted">· {natyaaradhana.editionsSource.toLowerCase()}</span>
            </h3>
            <ol className="editions__strand">
              {editions.map((e) => (
                <li key={e.edition} className="editions__bell">
                  <Ghungroo size={e.edition === natyaaradhana.editionCount ? 30 : 22} active={e.edition === natyaaradhana.editionCount} />
                  <span className="editions__num">{String(e.edition).padStart(2, '0')}</span>
                  <span className="editions__year">{e.year || '—'}</span>
                </li>
              ))}
            </ol>
            <p className="editions__note muted">Edition years and highlights will be added as they are confirmed.</p>
          </div>

          <div className="festival__archive">
            <h3 className="reveal">Photo archive</h3>
            <ul className="festival__photos">
              {['Opening evening', 'Guest performance', 'Young artists on stage', 'Festival audience'].map((l, i) => (
                <li key={l} className={`reveal festival__photo festival__photo--${i + 1}`}>
                  <Media image={null} placeholder={`Natyaaradhana — ${l}`} />
                </li>
              ))}
            </ul>
            <p className="muted reveal">
              Participating artists and performances from each edition will be listed here when the festival archive is supplied.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Initiatives ---------------- */}
      <section className="section initiatives" aria-labelledby="initiatives-title">
        <div className="container">
          <SectionHeading
            eyebrow="Initiatives"
            id="initiatives-title"
            title="Through the year"
            align="center"
            divider
            intro={<p>Outreach, recognition and debut recitals that extend the classical stage to new artists and new audiences.</p>}
          />
          {initiatives.map((it, i) => (
            <EditorialRow
              key={it.id}
              id={it.id}
              reverse={i % 2 === 0}
              frame={i % 2 ? 'offset' : 'corners'}
              media={<Media image={it.image} placeholder={it.imageLabel} ratio="4 / 3" />}
              className="initiative"
            >
              <p className="eyebrow">{it.kind}</p>
              <h3 className="initiative__title">{it.name}</h3>
              <p className="lead">{it.summary}</p>
              <ul className="initiative__facts">
                {it.facts.map((f) => (
                  <li key={f.text}>
                    {f.text}
                    {SHOW_VERIFICATION_NOTES && f.verify && <span className="tag tag--verify">To be verified</span>}
                  </li>
                ))}
              </ul>
              {it.descriptionPending && <span className="tag tag--placeholder">Full description pending</span>}
            </EditorialRow>
          ))}
          <Divider variant="gejje" />
          <p className="center">
            <Link to="/programs" className="btn">
              See current programs
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
