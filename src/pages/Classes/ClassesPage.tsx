import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, GraduationCap, MapPin, User, Users } from 'lucide-react';
import { batches } from '../../data/batches';
import { photos } from '../../data/images';
import { useActiveSection, usePageMeta } from '../../lib/hooks';
import { EditorialRow, PageHero } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { BatchThread } from '../../components/classes/BatchThread';
import { CornerFrame } from '../../components/ornaments/Hoysala';

export function ClassesPage() {
  usePageMeta(
    'Classes',
    'Structured Bharatanatyam classes across seven teaching locations through the week — systematic learning, individual guidance and stage experience at Sahachetana Natyalaya (R.).',
  );
  const spy = useActiveSection('[data-batch]', 'data-batch');
  const [selected, setSelected] = useState<string | null>(null);
  // A click lights its bell at once; the scroll spy takes over when the batch
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

  return (
    <>
      <PageHero
        eyebrow="Classes"
        title="Seven batches, one discipline"
        aside={
          <CornerFrame size={44}>
            <Media image={photos.gejjeDetail} ratio="1" sizes="(min-width: 1024px) 28vw, 80vw" />
          </CornerFrame>
        }
      >
        <p className="lead">
          Sahachetana Natyalaya conducts structured Bharatanatyam training at seven teaching locations through the week, welcoming students
          from many communities and backgrounds to the discipline, technique and expressive traditions of Indian classical dance.
        </p>
        <p>
          With an emphasis on systematic learning, individual guidance and stage experience, every batch is part of the institution’s
          continuing commitment to nurturing dedicated young artists.
        </p>
      </PageHero>

      <section className="section classes" aria-label="Batches">
        <div className="container classes__grid">
          <BatchThread batches={batches} activeId={active} onSelect={setSelected} />

          <div className="classes__list">
            <p className="classes__notice">
              <span className="tag tag--placeholder">Placeholder</span> Locations, days and timings will be published once confirmed by the
              institution.
            </p>
            {batches.map((b, i) => (
              <section key={b.id} id={b.id} data-batch={b.id} className="batch" aria-labelledby={`${b.id}-h`}>
                <EditorialRow
                  reverse={i % 2 === 1}
                  frame="corners"
                  media={<Media image={b.image} placeholder={`${b.name} — class photograph`} ratio="5 / 4" sizes="(min-width: 1024px) 40vw, 100vw" />}
                >
                  <p className="batch__num" aria-hidden="true">
                    {b.name.replace(/\D+/g, '')}
                  </p>
                  <p className="eyebrow">{b.name}</p>
                  <h2 id={`${b.id}-h`} tabIndex={-1} className="batch__title">
                    {b.location}
                  </h2>
                  <p>{b.description}</p>
                  <dl className="batch__details">
                    <div>
                      <dt>
                        <MapPin size={16} aria-hidden="true" /> Address
                      </dt>
                      <dd>
                        {b.address}
                        <br />
                        <span className="muted">{b.landmark}</span>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <CalendarDays size={16} aria-hidden="true" /> Days
                      </dt>
                      <dd>{b.days}</dd>
                    </div>
                    <div>
                      <dt>
                        <Clock size={16} aria-hidden="true" /> Timings
                      </dt>
                      <dd>{b.timings}</dd>
                    </div>
                    <div>
                      <dt>
                        <GraduationCap size={16} aria-hidden="true" /> Level
                      </dt>
                      <dd>{b.level}</dd>
                    </div>
                    {b.ageGroup && (
                      <div>
                        <dt>
                          <Users size={16} aria-hidden="true" /> Age group
                        </dt>
                        <dd>{b.ageGroup}</dd>
                      </div>
                    )}
                    <div>
                      <dt>
                        <User size={16} aria-hidden="true" /> Teacher
                      </dt>
                      <dd>{b.teacher}</dd>
                    </div>
                  </dl>
                  <Link to={`/contact?category=${encodeURIComponent('Batch Timings')}&batch=${encodeURIComponent(b.name)}`} className="btn">
                    Enquire about {b.name}
                  </Link>
                </EditorialRow>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
