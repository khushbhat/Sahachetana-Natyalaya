import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Founder } from '../../data/founders';
import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import { ArchFrame } from '../ornaments/ArchFrame';
import { MudraMark, Rosette } from '../ornaments/Hoysala';
import { Divider } from '../ornaments/Divider';
import { Media } from '../layout/Media';

const MUDRAS = ['alapadma', 'mukula', 'pataka'] as const;

/** A full editorial profile: portrait, introduction, chaptered biography and structured facts. */
export function FounderProfile({ founder, reverse = false }: { founder: Founder; reverse?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const bioId = useId();
  const chapters = founder.biography;
  const visible = expanded ? chapters : chapters.slice(0, 2);
  const hidden = chapters.length - 2;

  return (
    <article id={founder.id} className={`profile ${reverse ? 'profile--reverse' : ''} ${founder.isPlaceholder ? 'profile--placeholder' : ''}`} aria-labelledby={`${founder.id}-name`}>
      <header className="profile__head">
        <div className="profile__portrait reveal">
          <ArchFrame ratio={1.25}>
            <Media image={founder.portrait} placeholder={`Portrait — ${founder.name}`} sizes="(min-width: 1024px) 36vw, 90vw" />
          </ArchFrame>
          {founder.isPlaceholder && <p className="editorial__caption">Portrait to be supplied by the institution.</p>}
        </div>
        <div className="profile__intro reveal reveal-delay-1">
          <p className="eyebrow">
            {founder.designation} · {founder.organisation}
          </p>
          <h2 id={`${founder.id}-name`} className="profile__name">
            {founder.honorific && <span className="profile__hon">{founder.honorific}</span>}
            {founder.name}
          </h2>
          <Divider align="start" />
          <p className="lead">{founder.intro}</p>
          {founder.quote && (
            <blockquote className="pull-quote pull-quote--large">
              <p>“{founder.quote.text}”</p>
              <footer>{founder.quote.source}</footer>
            </blockquote>
          )}
          {founder.isPlaceholder && <span className="tag tag--placeholder">Full profile to be supplied</span>}
        </div>
      </header>

      {!founder.isPlaceholder && (
        <nav className="profile__toc reveal" aria-label={`Sections of ${founder.name}’s profile`}>
          <a href={`#${founder.id}-journey`}>Journey</a>
          {founder.sections.map((s) => (
            <a key={s.id} href={`#${founder.id}-${s.id}`}>
              {s.title}
            </a>
          ))}
          {founder.stages.length > 0 && <a href={`#${founder.id}-stages`}>Stages</a>}
          {founder.honours.length > 0 && <a href={`#${founder.id}-honours`}>Honours</a>}
        </nav>
      )}

      {!founder.isPlaceholder && (
        <section id={`${founder.id}-journey`} className="profile__bio" aria-label="Biography">
          <div id={bioId} className="profile__chapters">
            {visible.map((c, i) => (
              <div key={c.heading} className="chapter reveal">
                <span className="chapter__num" aria-hidden="true">
                  {['i', 'ii', 'iii', 'iv', 'v', 'vi'][i] ?? i + 1}
                </span>
                <div className="chapter__body">
                  <h3>{c.heading}</h3>
                  {c.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {hidden > 0 && (
            <button type="button" className="btn profile__more" aria-expanded={expanded} aria-controls={bioId} onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Show less' : `Continue reading · ${hidden} more chapter${hidden > 1 ? 's' : ''}`}
              <ChevronDown size={16} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
            </button>
          )}
          <p className="profile__source muted">Biography translated and adapted from the supplied Kannada profile.</p>
        </section>
      )}

      <div className="profile__facts">
        {founder.sections.map((s, i) => (
          <section key={s.id} id={`${founder.id}-${s.id}`} className="fact-card reveal" aria-labelledby={`${founder.id}-${s.id}-h`}>
            <MudraMark kind={MUDRAS[i % 3]} size={28} />
            <h3 id={`${founder.id}-${s.id}-h`}>{s.title}</h3>
            <ul>
              {s.items.map((it) => (
                <li key={it.text} className={it.text.startsWith('[') ? 'placeholder-text' : undefined}>
                  {it.text}
                  {SHOW_VERIFICATION_NOTES && it.verify && (
                    <span className="tag tag--verify" title={it.note}>
                      To be verified
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {founder.stages.length > 0 && (
        <section id={`${founder.id}-stages`} className="stages reveal" aria-labelledby={`${founder.id}-stages-h`}>
          <div className="stages__head">
            <Rosette size={44} />
            <h3 id={`${founder.id}-stages-h`}>Selected stages</h3>
          </div>
          <ul className="stages__list">
            {founder.stages.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {founder.honours.length > 0 && (
        <section id={`${founder.id}-honours`} className="honours reveal" aria-labelledby={`${founder.id}-honours-h`}>
          <h3 id={`${founder.id}-honours-h`}>Selected honours</h3>
          <ul className="honours__list">
            {founder.honours.map((h) => (
              <li key={h.title}>
                <span className="honours__year">{h.year}</span>
                <span className="honours__title">{h.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
