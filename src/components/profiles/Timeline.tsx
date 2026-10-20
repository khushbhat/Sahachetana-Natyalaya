import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import type { TimelineEntry } from '../../data/founders';
import { Ghungroo } from '../ornaments/Ghungroo';

/** Vertical timeline strung on an anklet thread: one bell per milestone. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((e, i) => (
        <li key={`${e.year}-${e.title}`} className={`timeline__item reveal ${i % 2 ? 'timeline__item--alt' : ''}`}>
          <span className="timeline__marker" aria-hidden="true">
            <Ghungroo size={20} />
          </span>
          <div className="timeline__card">
            <span className="timeline__year">{e.year}</span>
            <h3 className="timeline__title">{e.title}</h3>
            {e.text && <p>{e.text}</p>}
            <span className="timeline__meta">
              <span>{e.source === 'KN' ? 'Source: Kannada profile (translated)' : 'Source: English professional profile'}</span>
              {SHOW_VERIFICATION_NOTES && e.verify && <span className="tag tag--verify">To be verified</span>}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
