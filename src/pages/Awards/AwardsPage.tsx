import { awards, RECIPIENT_GROUPS } from '../../data/awards';
import { usePageMeta } from '../../lib/hooks';
import { PageHero, SectionHeading } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { Corner, Rosette } from '../../components/ornaments/Hoysala';
import { Ghungroo } from '../../components/ornaments/Ghungroo';

export function AwardsPage() {
  usePageMeta('Awards & Recognition', 'Honours and recognition received by Guru Vidushi Sahana Chethan and Sahachetana Natyalaya (R.) — a curated archive.');
  const sorted = [...awards].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <PageHero eyebrow="Awards & Recognition" title="An archive of honour">
        <p className="lead">
          Recognition received for a life in classical dance — for performance, teaching and service to the community. Each entry is kept
          as part of the institution’s record and will grow with the achievements of its teachers and students.
        </p>
      </PageHero>

      <section className="section awards" aria-labelledby="awards-title">
        <div className="container">
          <SectionHeading eyebrow="Founder & Artistic Director" id="awards-title" title="Honours received by Guru Vidushi Sahana Chethan" />
          <ol className="award-line">
            {sorted.map((a, i) => (
              <li key={a.id} className={`award reveal ${i % 2 ? 'award--alt' : ''}`}>
                <div className="award__year" aria-hidden="true">
                  <span>{a.year}</span>
                  <Ghungroo size={22} />
                </div>
                <div className="award__certificate">
                  <div className="certificate-frame">
                    <Corner position="tl" size={34} />
                    <Corner position="tr" size={34} />
                    <Corner position="bl" size={34} />
                    <Corner position="br" size={34} />
                    <Media image={a.certificate} placeholder={`${a.title} — certificate or photograph`} ratio="4 / 3" />
                  </div>
                </div>
                <div className="award__text">
                  <p className="eyebrow">{a.year}</p>
                  <h3 className="award__title">{a.title}</h3>
                  <dl className="award__meta">
                    <div>
                      <dt>Recipient</dt>
                      <dd>{a.recipient}</dd>
                    </div>
                    <div>
                      <dt>Awarded by</dt>
                      <dd>{a.organisation || <span className="placeholder-text">To be confirmed</span>}</dd>
                    </div>
                  </dl>
                  {a.description ? <p>{a.description}</p> : <p className="placeholder-text">Citation and description to be added.</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="more-title">
        <div className="container">
          <SectionHeading eyebrow="Growing archive" id="more-title" title="Recognition across the institution" align="center" />
          <ul className="recipient-groups">
            {RECIPIENT_GROUPS.filter((g) => g.type !== 'founder').map((g) => {
              const list = awards.filter((a) => a.recipientType === g.type);
              return (
                <li key={g.type} className="recipient-group reveal">
                  <Rosette size={48} />
                  <h3>{g.label}</h3>
                  {list.length ? (
                    <ul>
                      {list.map((a) => (
                        <li key={a.id}>
                          {a.year} — {a.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="placeholder-text">{g.empty}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
