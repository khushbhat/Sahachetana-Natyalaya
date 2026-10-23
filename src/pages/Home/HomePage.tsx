import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE, SHOW_VERIFICATION_NOTES } from '../../config/site';
import { photos, LINE_ART_ANKLETS, type PhotoAsset } from '../../data/images';
import { sahana, chetan } from '../../data/founders';
import { gallery } from '../../data/gallery';
import { latestEdition, isPastEdition, natyaaradhana } from '../../data/events';
import { schedule, venues } from '../../data/batches';
import { usePageMeta } from '../../lib/hooks';
import { effectiveListing, formatProgramDate, sortPrograms, usePublishedPrograms } from '../../lib/programStore';
import { ArchFrame } from '../../components/ornaments/ArchFrame';
import { CornerFrame, MudraMark, Rosette, Stellate } from '../../components/ornaments/Hoysala';
import { Divider } from '../../components/ornaments/Divider';
import { Ghungroo } from '../../components/ornaments/Ghungroo';
import { AdavuFoot, ArchiveLabel } from '../../components/ornaments/Adavu';
import { Media } from '../../components/layout/Media';
import { SectionHeading } from '../../components/layout/Editorial';

type WorkItem = { title: string; text: string; image: PhotoAsset; caption: string; to: string; cta: string };

const WORK: WorkItem[] = [
  {
    title: 'Bharatanatyam training',
    text: `${schedule.length} weekly classes at ${venues.length} venues in and around Shivamogga, from junior batches to Vidwat preparation.`,
    image: photos.n15AdavuFeet,
    caption: 'Adavus in unison — feet, bells and the floor.',
    to: '/classes',
    cta: 'See the timetable',
  },
  {
    title: 'Performance & student development',
    text: 'Repertoire and new choreography taken to the stage, so that students learn to perform as well as to practise.',
    image: photos.n15Trio,
    caption: 'Three dancers, one line.',
    to: '/programs',
    cta: 'Programs',
  },
  {
    title: 'Natyaaradhana',
    text: 'The academy’s national dance festival — fifteen editions, according to the professional profile.',
    image: photos.n15Backdrop,
    caption: 'The Natyaaradhana 15 stage.',
    to: '/annual-events#natyaaradhana',
    cta: 'The festival archive',
  },
  {
    title: 'Cultural programming',
    text: 'Dasara presentations such as Shivamogga Vaibhava, and evenings that bring dance, theatre and literature together.',
    image: photos.n15Spotlight,
    caption: 'A single beam through the haze.',
    to: '/annual-events#shivamogga-vaibhava',
    cta: 'Annual events',
  },
  {
    title: 'Community & access',
    text: 'Free Bharatanatyam training for underprivileged children, and outreach such as Bharatiyam and Patyadarshini.',
    image: photos.n15YoungEnsemble,
    caption: 'Young dancers on the festival stage.',
    to: '/annual-events#initiatives',
    cta: 'Initiatives',
  },
];

const MEMORIES = ['g-n15-finale', 'g-hair', 'g-n15-pleats', 'g-jasmine', 'g-n15-smile', 'g-wings'];

export function HomePage() {
  usePageMeta(
    'Home',
    'Sahachetana Natyalaya (R.), Shivamogga — Bharatanatyam classes, performance, choreography and the Natyaaradhana National Dance Festival, led by Guru Vidushi Sahana Chethan.',
  );
  const [work, setWork] = useState(0);
  const upcoming = sortPrograms(
    usePublishedPrograms().filter((p) => effectiveListing(p) === 'upcoming'),
    'upcoming',
  ).slice(0, 2);
  const memories = MEMORIES.map((id) => gallery.find((g) => g.id === id)!).filter(Boolean);
  const ed = latestEdition;
  const edPast = isPastEdition(ed);

  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section className="hero" data-nav-section="home" aria-labelledby="hero-title">
        <div className="hero__sketch" aria-hidden="true" style={{ ['--art' as string]: `url(${LINE_ART_ANKLETS})` }} />
        <div className="container container--wide hero__grid">
          <div className="hero__text">
            <p className="eyebrow hero__in hero__in--1">Bharatanatyam · {SITE.region}</p>
            <h1 id="hero-title" className="hero__title hero__in hero__in--2">
              <span className="hero__line">Sahachetana</span>
              <span className="hero__line hero__line--2">
                Natyalaya <span className="hero__reg">(R.)</span>
              </span>
            </h1>
            <p className="hero__kn kn hero__in hero__in--3" lang="kn">
              {SITE.nameKannada}
            </p>
            <p className="hero__tagline hero__in hero__in--3">{SITE.tagline}</p>
            <p className="hero__intro hero__in hero__in--4">
              Founded by {SITE.leader}, the academy teaches Bharatanatyam across Shivamogga, takes its students to the stage, and each year
              hosts Natyaaradhana, its national dance festival.
            </p>
            <div className="btn-row hero__in hero__in--5">
              <Link to="/classes" className="btn btn--primary">
                Join a class
              </Link>
              <Link to="/founders" className="btn">
                Meet the founders
              </Link>
            </div>
          </div>

          <div className="hero__visual">
            <Stellate size={640} className="hero__stellate" />
            <ArchFrame pillars ratio={1.32} className="hero__arch">
              <Media image={photos.heroDancer} eager sizes="(min-width: 1024px) 34vw, 80vw" />
            </ArchFrame>
            <div className="hero__bells" aria-hidden="true">
              <Ghungroo size={16} tilt={-6} />
              <Ghungroo size={22} />
              <Ghungroo size={16} tilt={6} />
            </div>
            <ArchiveLabel className="hero__label" kicker="Pl. 1" lines={[`Natyaaradhana ${ed.edition}`, ed.venue ?? '', 'September 2026']} />
          </div>
        </div>
        <a href="#introduction" className="hero__scroll">
          <span>Begin</span>
        </a>
      </section>

      {/* ------------------------------------------------ About the academy */}
      <section id="introduction" className="section about" data-nav-section="home" aria-labelledby="intro-title">
        <div className="container container--wide">
          <figure className="about__plate reveal">
            <Media image={photos.n15Finale} ratio="2.08 / 1" sizes="(min-width: 1400px) 1300px, 100vw" />
            <figcaption className="about__caption">
              <span>The company in a closing tableau</span>
              <span>Natyaaradhana {ed.edition} · Kuvempu Rangamandira</span>
            </figcaption>
          </figure>
        </div>
        <div className="container about__grid">
          <div className="about__head reveal">
            <p className="eyebrow">The academy</p>
            <h2 id="intro-title">
              A school, a stage <em className="italic-accent">and a festival</em>
            </h2>
            <AdavuFoot width={150} className="about__foot" />
          </div>
          <div className="about__text reveal reveal-delay-1">
            <p className="lead">
              Sahachetana Natyalaya (R.) is a Bharatanatyam academy in Shivamogga, founded and led by Guru Vidushi Sahana Chethan, with
              Chetan S. as Artistic Director.
            </p>
            <p>
              Its work runs from the weekly class to the festival stage: Bharatanatyam training, student performances, choreography,
              cultural programmes such as the Dasara presentation <em>Shivamogga Vaibhava</em>, and the Natyaaradhana National Dance
              Festival. Alongside, the academy offers free Bharatanatyam training to underprivileged children.
            </p>
            <Link to="/founders" className="text-link">
              The academy’s story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Founders preview */}
      <section className="section section--surface founders-preview" data-nav-section="founders" aria-labelledby="founders-title">
        <div className="container founders-preview__grid">
          <figure className="founders-preview__portrait reveal">
            <ArchFrame ratio={1.28}>
              <Media image={sahana.portrait} sizes="(min-width: 1024px) 34vw, 90vw" />
            </ArchFrame>
          </figure>
          <div className="founders-preview__text">
            <p className="eyebrow reveal">The founders</p>
            <h2 id="founders-title" className="sr-only">
              The founders
            </h2>
            <article className="founders-preview__person reveal">
              <p className="founders-preview__role">{sahana.designation}</p>
              <h3 className="founders-preview__name">
                <span className="founders-preview__hon">{sahana.honorific}</span> {sahana.name}
              </h3>
              <p>
                Bharatanatyam exponent, choreographer, cultural curator and teacher. MPA in Bharatanatyam, Vidwat, trained in the Madhuri
                Margam under Dr. Tulasi Ramachandra; a Doordarshan B-High Grade Artiste.
              </p>
              <Link to="/founders#sahana-chethan" className="text-link">
                Her profile <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article className="founders-preview__person founders-preview__person--second reveal reveal-delay-1">
              <MudraMark kind="pataka" size={26} />
              <div>
                <p className="founders-preview__role">{chetan.designation}</p>
                <h3 className="founders-preview__name">{chetan.name}</h3>
                <p>{chetan.intro}</p>
                <Link to="/founders#chetan-s" className="text-link">
                  His profile <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ The academy's work */}
      <section className="section section--contrast work" data-nav-section="classes" aria-labelledby="work-title">
        <Stellate size={760} className="work__stellate" />
        <div className="container work__grid">
          <div className="work__head reveal">
            <p className="eyebrow">The work</p>
            <h2 id="work-title">
              From the first adavu <em className="italic-accent">to the festival stage</em>
            </h2>
          </div>

          <div className="work__stage" aria-hidden="true">
            {WORK.map((w, i) => (
              <figure key={w.title} className={`work__frame ${i === work ? 'is-active' : ''}`}>
                <CornerFrame size={40}>
                  <Media image={w.image} ratio="4 / 5" sizes="(min-width: 1024px) 34vw, 1px" />
                </CornerFrame>
                <figcaption>{w.caption}</figcaption>
              </figure>
            ))}
          </div>

          <ol className="work__list">
            {WORK.map((w, i) => (
              <li
                key={w.title}
                className={`work__item reveal ${i === work ? 'is-active' : ''}`}
                onMouseEnter={() => setWork(i)}
                onFocus={() => setWork(i)}
              >
                <span className="work__num" aria-hidden="true">
                  {['i', 'ii', 'iii', 'iv', 'v'][i]}
                </span>
                <div className="work__body">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <Link to={w.to} className="text-link">
                    {w.cta} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
                <div className="work__thumb" aria-hidden="true">
                  <Media image={w.image} ratio="4 / 3" sizes="(max-width: 1023px) 40vw, 1px" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ Featured festival (archive) */}
      <section className="section festival-feature" data-nav-section="events" aria-labelledby="featured-title">
        <div className="container festival-feature__grid">
          <figure className="festival-feature__media reveal">
            <Media image={photos.n15Backdrop} ratio="3 / 4" sizes="(min-width: 1024px) 40vw, 100vw" />
            <figcaption className="festival-feature__kn kn" lang="kn">
              {natyaaradhana.kannada}–{ed.edition} · {natyaaradhana.kannadaSubtitle}
            </figcaption>
          </figure>
          <div className="festival-feature__text reveal reveal-delay-1">
            <p className="eyebrow">{edPast ? 'From the archive' : 'Featured festival'}</p>
            <h2 id="featured-title" className="festival-feature__title">
              {natyaaradhana.displayName} <span className="festival-feature__ed">{ed.edition}</span>
            </h2>
            <p className="festival-feature__sub">{natyaaradhana.subtitle}</p>
            <dl className="festival-feature__meta">
              <div>
                <dt>Held</dt>
                <dd>
                  {ed.datesLabel}
                  {SHOW_VERIFICATION_NOTES && ed.datesVerify && <span className="tag tag--verify">Dates to be confirmed</span>}
                </dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{ed.venue}</dd>
              </div>
            </dl>
            <ol className="festival-feature__days">
              {ed.days?.map((d) => (
                <li key={d.label}>
                  <span>{d.label}</span>
                  {d.text}
                </li>
              ))}
            </ol>
            <p className="festival-feature__hl">
              The edition included <em>Prathibimba</em>, a multi-medium tribute to Da. Ra. Bendre by Vidu. Prathibha Ramaswamy and Vidu. Janani
              Murali, and a Kathak presentation by Priyanka.
            </p>
            <Link to="/annual-events#natyaaradhana" className="btn btn--primary">
              Visit the festival archive
            </Link>
          </div>
        </div>

        <div className="container upcoming-line reveal" data-nav-section="programs">
          <span className="upcoming-line__k">Coming up</span>
          {upcoming.length === 0 ? (
            <span className="upcoming-line__v">No new programs have been announced yet — new dates will appear here first.</span>
          ) : (
            <ul className="upcoming-line__list">
              {upcoming.map((p) => (
                <li key={p.id}>
                  <strong>{p.title}</strong> · {formatProgramDate(p.dateTime, p.dateLabel)}
                  {p.venue && ` · ${p.venue}`}
                </li>
              ))}
            </ul>
          )}
          <Link to="/programs" className="text-link">
            All programs <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Photo memories */}
      <section className="section section--surface memories" aria-labelledby="gallery-title">
        <div className="container container--wide">
          <div className="memories__head">
            <SectionHeading eyebrow="Memory gallery" id="gallery-title" title="Before the curtain, and after" />
            <Link to="/gallery" className="text-link reveal">
              Open the gallery <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="memories__grid">
            {memories.map((g, i) => (
              <li key={g.id} className={`memories__item memories__item--${i + 1} reveal`}>
                <Link to={`/gallery?category=${encodeURIComponent(g.category)}`} aria-label={`${g.caption} — more in ${g.category}`}>
                  <Media image={g.image} sizes="(min-width: 1024px) 40vw, 50vw" />
                </Link>
                <p className="memories__cap">{g.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Invitation */}
      <section className="section invitation" data-nav-section="contact" aria-labelledby="invite-title">
        <div className="container container--narrow center">
          <Rosette size={64} className="invitation__rosette reveal" />
          <p className="eyebrow eyebrow--center reveal">An invitation</p>
          <h2 id="invite-title" className="invitation__title reveal">
            Come to class. Come to the stage.
          </h2>
          <p className="lead reveal">Find a batch near you, ask about a performance, or write to us about a cultural collaboration.</p>
          <div className="invitation__paths reveal">
            <Link to="/classes" className="invitation__path">
              <MudraMark kind="alapadma" size={30} />
              <span>Find a class</span>
            </Link>
            <Link to="/contact?category=Performances" className="invitation__path">
              <MudraMark kind="pataka" size={30} />
              <span>Enquire about a performance</span>
            </Link>
            <Link to="/contact?category=Cultural%20Collaboration" className="invitation__path">
              <MudraMark kind="mukula" size={30} />
              <span>Collaborate on a programme</span>
            </Link>
          </div>
          <Divider variant="gejje" className="reveal" />
        </div>
      </section>
    </>
  );
}
