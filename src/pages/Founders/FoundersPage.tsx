import { Link } from 'react-router-dom';
import { sahana, chetan } from '../../data/founders';
import { usePageMeta } from '../../lib/hooks';
import { PageHero, SectionHeading } from '../../components/layout/Editorial';
import { FounderProfile } from '../../components/profiles/FounderProfile';
import { Timeline } from '../../components/profiles/Timeline';
import { Divider } from '../../components/ornaments/Divider';

export function FoundersPage() {
  usePageMeta(
    'Founders',
    'Guru Vidushi Sahana Chethan, Founder & Artistic Director, and Chetan S., Artistic Director of Sahachetana Natyalaya (R.) — biography, training, performances and honours.',
  );
  return (
    <>
      <PageHero eyebrow="Founders" title="The founders">
        <p className="lead">
          Two lives devoted to one stage. Sahachetana Natyalaya was founded on a conviction learned the hard way — that an artistic dream
          should never be lost for want of money.
        </p>
      </PageHero>

      <section className="section" aria-label="Guru Vidushi Sahana Chethan">
        <div className="container">
          <FounderProfile founder={sahana} />
        </div>
      </section>

      <div className="container">
        <Divider variant="gejje" />
      </div>

      <section className="section" aria-label="Chetan S.">
        <div className="container">
          <FounderProfile founder={chetan} reverse />
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="timeline-title">
        <div className="container container--narrow">
          <SectionHeading
            eyebrow="Institutional timeline"
            id="timeline-title"
            title="Milestones"
            align="center"
            intro={
              <p>
                Dates drawn from the supplied profiles. Items from the Kannada profile are translated and marked for verification until
                confirmed by the institution.
              </p>
            }
          />
          <Timeline entries={sahana.timeline} />
          <p className="center">
            <Link to="/awards" className="btn">
              Awards &amp; recognition
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
