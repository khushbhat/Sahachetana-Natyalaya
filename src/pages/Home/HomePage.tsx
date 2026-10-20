import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../../config/site';
import { photos, LINE_ART_ANKLETS } from '../../data/images';
import { sahana, chetan } from '../../data/founders';
import { gallery } from '../../data/gallery';
import { natyaaradhana } from '../../data/events';
import { usePageMeta } from '../../lib/hooks';
import { formatProgramDate, sortPrograms, usePublishedPrograms } from '../../lib/programStore';
import { ArchFrame } from '../../components/ornaments/ArchFrame';
import { CornerFrame, MudraMark, Rosette, Stellate, type MudraKind } from '../../components/ornaments/Hoysala';
import { Divider } from '../../components/ornaments/Divider';
import { Ghungroo } from '../../components/ornaments/Ghungroo';
import { Media } from '../../components/layout/Media';
import { EditorialRow, SectionHeading } from '../../components/layout/Editorial';
import { FestivalPoster } from '../../components/events/FestivalPoster';

const PRINCIPLES: { title: string; text: string; mudra: MudraKind }[] = [
  { title: 'Classical discipline', text: 'Adavus, rhythm and posture practised with patience, until technique becomes second nature.', mudra: 'pataka' },
  { title: 'Bharatanatyam training', text: 'Systematic learning across seven teaching locations, with individual guidance at every stage.', mudra: 'alapadma' },
  { title: 'Performance & choreography', text: 'Repertoire and new choreography brought to the stage — from Margam to theatre.', mudra: 'mukula' },
  { title: 'Cultural curation', text: 'Festivals and programmes that bring dance, theatre, music and literature into one conversation.', mudra: 'alapadma' },
  { title: 'Young artists', text: 'Stage opportunities on distinguished national platforms for dancers at the start of their journey.', mudra: 'mukula' },
  { title: 'Preservation & education', text: 'Keeping a classical inheritance alive by teaching it widely — and generously.', mudra: 'pataka' },
];

const IMPACT = [
  { name: 'Government-school children', text: 'Dance and music education taken into government schools, so that classical arts reach classrooms that rarely see them.' },
  { name: 'Free classical training', text: 'Bharatanatyam taught free of cost to children from economically disadvantaged families — a commitment sustained for over two decades.' },
  { name: 'Bharatheeyam', text: 'An outreach initiative carrying classical arts education to children.' },
  { name: 'Patyadarshini', text: 'Textbook poems and prose reimagined as dance — learned, performed and owned by the children themselves.' },
  { name: 'Free Rangapravesha', text: 'A dancer’s formal debut offered free, so a first solo recital never depends on a family’s means.' },
  { name: 'Dance, theatre & literature', text: 'Free cultural programmes and opportunities for emerging artists to share the stage.' },
];

export function HomePage() {
  usePageMeta(
    'Home',
    'Sahachetana Natyalaya (R.), led by Guru Vidushi Sahana Chethan — classical Bharatanatyam training, performance, choreography, the Natyaaradhana National Dance Festival and free arts education.',
  );
  const programs = sortPrograms(
    usePublishedPrograms().filter((p) => p.listing === 'upcoming'),
    'upcoming',
  ).slice(0, 2);
  const galleryPreview = gallery.slice(0, 5);

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
              Led by {SITE.leader}, Sahachetana Natyalaya is a home for classical Bharatanatyam — training, performance, choreography and
              cultural curation, offered with a lasting commitment to children who could not otherwise learn.
            </p>
            <div className="btn-row hero__in hero__in--5">
              <Link to="/founders" className="btn btn--primary">
                Explore our journey
              </Link>
              <Link to="/classes" className="btn">
                Join our classes
              </Link>
            </div>
            <dl className="hero__facts hero__in hero__in--5">
              <div>
                <dt>15</dt>
                <dd>national editions of Natyaaradhana</dd>
              </div>
              <div>
                <dt>20+</dt>
                <dd>years of artistic work</dd>
              </div>
              <div>
                <dt>7</dt>
                <dd>teaching locations</dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual">
            <Stellate size={640} className="hero__stellate" />
            <ArchFrame pillars ratio={1.32} className="hero__arch">
              <Media image={photos.heroDancer} eager sizes="(min-width: 1024px) 34vw, 80vw" />
            </ArchFrame>
            <div className="hero__bells" aria-hidden="true">
              <Ghungroo size={18} tilt={-6} />
              <Ghungroo size={24} />
              <Ghungroo size={18} tilt={6} />
            </div>
            <p className="hero__credit">Performance photograph · Sahachetana Natyalaya</p>
          </div>
        </div>
        <a href="#introduction" className="hero__scroll">
          <span>Begin</span>
        </a>
      </section>

      {/* ------------------------------------------------ Introduction */}
      <section id="introduction" className="section intro-section" data-nav-section="home" aria-labelledby="intro-title">
        <div className="container intro-section__grid">
          <figure className="intro-section__media reveal">
            <CornerFrame size={56}>
              <Media image={photos.classTeam} ratio="4 / 3.2" sizes="(min-width: 1024px) 55vw, 100vw" />
            </CornerFrame>
            <div className="intro-section__inset">
              <Media image={photos.gejjeDetail} ratio="1" sizes="240px" />
            </div>
            <figcaption className="editorial__caption">The guru with her young dancers, before a full auditorium.</figcaption>
          </figure>
          <div className="intro-section__text reveal reveal-delay-1">
            <p className="eyebrow">The institution</p>
            <h2 id="intro-title">
              A sustained commitment to <em className="italic-accent">Bharatanatyam</em>
            </h2>
            <p className="lead">
              Sahachetana Natyalaya (R.), led by Vidushi Sahana Chethan, represents a sustained commitment to Bharatanatyam training,
              performance, choreography, cultural curation and socially accessible arts education.
            </p>
            <p>
              The institution brings together disciplined classical practice and real opportunity: its young artists perform on
              distinguished national and international stages.
            </p>
            <p>
              Its work spans the Natyaaradhana National Dance Festival, grassroots arts outreach, free classical Bharatanatyam training for
              economically marginalised students, Rangapravesha initiatives, and free cultural programmes that connect dance, theatre and
              literature.
            </p>
            <p className="intro-section__note">
              The professional profile records <strong>15 national editions</strong> of Natyaaradhana and{' '}
              <strong>more than two decades</strong> of artistic excellence.
            </p>
            <Link to="/founders" className="text-link">
              Our story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Philosophy */}
      <section className="section section--contrast philosophy" data-nav-section="home" aria-labelledby="philosophy-title">
        <Stellate size={760} className="philosophy__stellate" />
        <div className="container">
          <div className="philosophy__head">
            <SectionHeading
              eyebrow="Artistic philosophy"
              title={
                <>
                  Classical discipline, <em className="italic-accent">offered generously.</em>
                </>
              }
              id="philosophy-title"
            />
            <figure className="philosophy__plate reveal" aria-label="Line drawing of a dancer's feet wearing gejje">
              <CornerFrame size={40}>
                <div className="philosophy__plate-art" style={{ ['--art' as string]: `url(${LINE_ART_ANKLETS})` }} />
              </CornerFrame>
              <figcaption>Gejje — the first ornament a dancer ties on, and the rhythm she answers to.</figcaption>
            </figure>
          </div>
          <ol className="principles">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="principle reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <span className="principle__num">{String(i + 1).padStart(2, '0')}</span>
                <MudraMark kind={p.mudra} size={30} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ Social impact */}
      <section className="section impact" data-nav-section="events" aria-labelledby="impact-title">
        <div className="container">
          <div className="impact__grid">
            <div className="impact__lead">
              <SectionHeading
                eyebrow="Social impact"
                id="impact-title"
                title="A stage that belongs to every child"
                intro={
                  <p>
                    For more than two decades, Sahachetana has opened classical training to children whose families could not afford it —
                    and has carried dance into government schools. The aim is simple: talent, not circumstance, should decide who dances.
                  </p>
                }
              />
              <figure className="impact__figure reveal">
                <Media placeholder="Outreach — children in class" ratio="4 / 5" />
                <figcaption className="editorial__caption">Outreach photography to be supplied by the institution.</figcaption>
              </figure>
            </div>
            <ul className="impact__list">
              {IMPACT.map((item, i) => (
                <li key={item.name} className="impact__item reveal" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                  <Ghungroo size={20} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="center reveal">
            <Link to="/annual-events" className="btn">
              Our initiatives
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Founders preview */}
      <section className="section section--surface founders-preview" data-nav-section="founders" aria-labelledby="founders-title">
        <div className="container">
          <SectionHeading eyebrow="Leadership" id="founders-title" title="The founders" align="center" divider />
          <EditorialRow
            media={<Media image={sahana.portrait} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 100vw" />}
            frame="offset"
            mediaWidth="narrow"
          >
            <p className="eyebrow">{sahana.designation}</p>
            <h3 className="founders-preview__name">
              <span className="founders-preview__hon">{sahana.honorific}</span> {sahana.name}
            </h3>
            <p className="lead">{sahana.intro}</p>
            <blockquote className="pull-quote">
              <p>“{sahana.quote?.text}”</p>
            </blockquote>
            <Link to="/founders#sahana-chethan" className="text-link">
              Read her journey <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </EditorialRow>
          <EditorialRow
            media={<Media image={null} placeholder="Portrait — Chetan S." ratio="4 / 5" />}
            frame="offset"
            mediaWidth="narrow"
            reverse
          >
            <p className="eyebrow">{chetan.designation}</p>
            <h3 className="founders-preview__name">{chetan.name}</h3>
            <p className="lead">{chetan.intro}</p>
            <Link to="/founders#chetan-s" className="text-link">
              View profile <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </EditorialRow>
        </div>
      </section>

      {/* ------------------------------------------------ Highlights */}
      <section className="section highlights" data-nav-section="classes" aria-labelledby="highlights-title">
        <div className="container">
          <SectionHeading eyebrow="In numbers" id="highlights-title" title="An institution, measured in seasons" align="center" />
          <ul className="highlights__grid">
            <li className="highlight reveal">
              <span className="highlight__value">15</span>
              <span className="highlight__label">National editions of Natyaaradhana</span>
              <span className="highlight__src">According to the professional profile</span>
            </li>
            <li className="highlight reveal reveal-delay-1">
              <span className="highlight__value">
                20<sup>+</sup>
              </span>
              <span className="highlight__label">Years of artistic work</span>
              <span className="highlight__src">According to the professional profile</span>
            </li>
            <li className="highlight reveal reveal-delay-2">
              <span className="highlight__value">7</span>
              <span className="highlight__label">Teaching locations across the week</span>
              <span className="highlight__src">The institution’s current description</span>
            </li>
            <li className="highlight reveal reveal-delay-2">
              <span className="highlight__value highlight__value--word">Free</span>
              <span className="highlight__label">Classical dance education &amp; social outreach</span>
              <span className="highlight__src">For economically disadvantaged children</span>
            </li>
          </ul>
          <div className="center reveal">
            <Link to="/classes" className="btn btn--primary">
              Find a batch
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Upcoming programs (live from the program store) */}
      <section className="section section--tight upcoming-strip" data-nav-section="programs" aria-labelledby="upcoming-title">
        <div className="container upcoming-strip__grid">
          <div className="reveal">
            <p className="eyebrow">Programs</p>
            <h2 id="upcoming-title">Coming up</h2>
            <Link to="/programs" className="text-link">
              All programs <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="upcoming-strip__list">
            {programs.length === 0 && <li className="placeholder-text">New programs will be announced here.</li>}
            {programs.map((p) => (
              <li key={p.id} className="upcoming-card reveal">
                <span className="upcoming-card__date">{formatProgramDate(p.dateTime)}</span>
                <h3>{p.title}</h3>
                <p className="muted">
                  {p.category} · {p.venue}
                </p>
                {p.isPlaceholder && <span className="tag tag--placeholder">Placeholder</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Featured event */}
      <section className="section section--contrast featured" data-nav-section="events" aria-labelledby="featured-title">
        <div className="container featured__grid">
          <div className="featured__poster reveal">
            <FestivalPoster />
          </div>
          <div className="featured__text reveal reveal-delay-1">
            <p className="eyebrow">Featured festival</p>
            <h2 id="featured-title" className="featured__title">
              {natyaaradhana.displayName}
            </h2>
            <p className="featured__sub">{natyaaradhana.subtitle}</p>
            <Divider align="start" variant="gejje" />
            <p className="lead">{natyaaradhana.summary}</p>
            <p className="muted">
              {natyaaradhana.editionsLabel} — {natyaaradhana.editionsSource.toLowerCase()}.
            </p>
            <Link to="/annual-events" className="btn btn--primary">
              Festival &amp; annual events
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Gallery preview */}
      <section className="section gallery-preview" aria-labelledby="gallery-title">
        <div className="container">
          <div className="gallery-preview__head">
            <SectionHeading eyebrow="Memory gallery" id="gallery-title" title="Moments from the archive" />
            <Link to="/gallery" className="text-link reveal">
              Open the gallery <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="gallery-preview__grid">
            {galleryPreview.map((g, i) => (
              <li key={g.id} className={`gallery-preview__item gallery-preview__item--${i + 1} reveal`}>
                <Link to={`/gallery?category=${encodeURIComponent(g.category)}`} aria-label={`${g.caption} — view ${g.category} in the gallery`}>
                  <Media image={g.image} placeholder={g.caption} sizes="(min-width: 1024px) 33vw, 50vw" />
                  <span className="gallery-preview__cap">
                    <span className="gallery-preview__cat">{g.category}</span>
                    {g.caption}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Invitation */}
      <section className="section invitation" data-nav-section="contact" aria-labelledby="invite-title">
        <div className="container container--narrow center">
          <Rosette size={72} className="invitation__rosette reveal" />
          <p className="eyebrow eyebrow--center reveal">An invitation</p>
          <h2 id="invite-title" className="invitation__title reveal">
            Let the rhythm begin.
          </h2>
          <p className="lead reveal">Join a class, invite our artists to perform, or collaborate with us on a cultural programme.</p>
          <div className="invitation__paths reveal">
            <Link to="/contact?category=New%20Admissions" className="invitation__path">
              <MudraMark kind="alapadma" size={30} />
              <span>Join a class</span>
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
        </div>
      </section>
    </>
  );
}
