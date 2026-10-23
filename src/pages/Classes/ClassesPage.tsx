import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { classesAtVenue, formatDays, formatRange, formatTime, schedule, venueById, venues, WEEK } from '../../data/batches';
import { photos } from '../../data/images';
import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import { useActiveSection, usePageMeta } from '../../lib/hooks';
import { PageHero } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { BatchThread } from '../../components/classes/BatchThread';
import { CornerFrame } from '../../components/ornaments/Hoysala';
import { AdavuFoot } from '../../components/ornaments/Adavu';

/** One restrained tone per venue, so a venue reads the same in the grid and the list */
const venueTone = (venueId: string) => `tone-${venues.findIndex((v) => v.id === venueId) + 1}`;
const enquireHref = (venueName: string) =>
  `/contact?category=${encodeURIComponent('Batch Timings')}&location=${encodeURIComponent(venueName)}`;

export function ClassesPage() {
  usePageMeta(
    'Classes',
    `Bharatanatyam classes in Shivamogga — ${schedule.length} weekly batches at ${venues.length} venues, from junior batches to Vidwat preparation, with Sahachetana Natyalaya (R.).`,
  );
  const spy = useActiveSection('[data-venue]', 'data-venue');
  const [selected, setSelected] = useState<string | null>(null);
  // A click lights its bell at once; the scroll spy takes over when the venue
  // is reached or the visitor scrolls by hand.
  useEffect(() => {
    if (selected && spy === selected) setSelected(null);
  }, [spy, selected]);
  useEffect(() => {
    if (!selected) return;
    const clear = () => setSelected(null);
    addEventListener('wheel', clear, { passive: true });
    addEventListener('touchstart', clear, { passive: true });
    addEventListener('keydown', clear);
    return () => {
      removeEventListener('wheel', clear);
      removeEventListener('touchstart', clear);
      removeEventListener('keydown', clear);
    };
  }, [selected]);
  const active = selected ?? spy;

  const byDay = WEEK.map((d) => ({
    ...d,
    classes: schedule.filter((c) => c.days.includes(d.id)).sort((a, b) => a.start.localeCompare(b.start)),
  }));

  return (
    <>
      <PageHero
        eyebrow="Classes"
        title="The weekly timetable"
        aside={
          <CornerFrame size={44}>
            <Media image={photos.n15AdavuFeet} ratio="1" sizes="(min-width: 1024px) 28vw, 80vw" />
          </CornerFrame>
        }
      >
        <p className="lead">
          Bharatanatyam is learned a little at a time, twice a week, for years. The academy teaches {schedule.length} batches at {venues.length}{' '}
          venues in and around Shivamogga — from junior classes to preparation for the Vidwat examination.
        </p>
        <p>Choose a day and a place that suits you, then send an enquiry — we will reply with joining details.</p>
      </PageHero>

      {/* ---------------- Week at a glance ---------------- */}
      <section className="section section--tight timetable" aria-labelledby="week-title">
        <div className="container container--wide">
          <div className="timetable__head reveal">
            <h2 id="week-title">The week at a glance</h2>
            <AdavuFoot width={120} strike={false} />
          </div>

          <div className="week reveal" role="table" aria-label="Weekly class timetable">
            <div className="week__row week__row--head" role="row">
              {WEEK.map((d) => (
                <span key={d.id} className="week__day" role="columnheader">
                  <span className="week__day-short" aria-hidden="true">
                    {d.id}
                  </span>
                  <span className="week__day-long">{d.label}</span>
                </span>
              ))}
            </div>
            <div className="week__row" role="row">
              {byDay.map((d) => (
                <div key={d.id} className="week__cell" role="cell">
                  <span className="week__cell-day">{d.label}</span>
                  {d.classes.length === 0 && <span className="week__rest">No class</span>}
                  {d.classes.map((c) => {
                    const v = venueById(c.venueId);
                    return (
                      <a key={c.id} href={`#${v.id}`} className={`week__slot ${venueTone(v.id)}`}>
                        <span className="week__time">{formatTime(c.start)}</span>
                        <span className="week__venue">{v.short}</span>
                        <span className="week__level">{c.level}</span>
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p className="timetable__note muted reveal">
            Days, times and levels as published by the academy. Each class runs for one hour. Fees are shared on enquiry.
          </p>
        </div>
      </section>

      {/* ---------------- Venues ---------------- */}
      <section className="section classes" aria-labelledby="venues-title">
        <div className="container classes__grid">
          <BatchThread items={venues.map((v) => ({ id: v.id, label: v.short }))} activeId={active} onSelect={setSelected} />

          <div className="classes__list">
            <h2 id="venues-title" className="classes__title reveal">
              Where we teach
            </h2>
            {venues.map((v, i) => {
              const classes = classesAtVenue(v.id);
              return (
                <section key={v.id} id={v.id} data-venue={v.id} className={`venue ${venueTone(v.id)} reveal`} aria-labelledby={`${v.id}-h`}>
                  <p className="venue__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div className="venue__main">
                    <h3 id={`${v.id}-h`} tabIndex={-1} className="venue__name">
                      {v.name}
                    </h3>
                    <p className="venue__locality">{v.locality}</p>

                    <ul className="venue__classes">
                      {classes.map((c) => (
                        <li key={c.id}>
                          <span className="venue__days">{formatDays(c)}</span>
                          <span className="venue__time">{formatRange(c)}</span>
                          <span className="venue__level">{c.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="venue__aside">
                    <p className="venue__address">
                      <span className="venue__k">Address</span>
                      {v.address}
                      {SHOW_VERIFICATION_NOTES && v.status !== 'verified' && v.note && <span className="venue__note">{v.note}</span>}
                    </p>
                    <div className="venue__actions">
                      <Link to={enquireHref(v.name)} className="btn">
                        Enquire <span className="sr-only">about classes at {v.name}</span>
                      </Link>
                      {v.mapUrl && (
                        <a href={v.mapUrl} className="text-link" target="_blank" rel="noreferrer">
                          Get directions <ExternalLink size={14} aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
            <p className="classes__more reveal">
              Not sure which batch suits your child?{' '}
              <Link to={`/contact?category=${encodeURIComponent('New Admissions')}`} className="text-link">
                Ask us <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
