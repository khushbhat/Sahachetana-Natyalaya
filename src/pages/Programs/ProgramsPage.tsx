import { useRef, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProgramListing } from '../../data/programs';
import { usePageMeta } from '../../lib/hooks';
import { sortPrograms, usePublishedPrograms } from '../../lib/programStore';
import { PageHero } from '../../components/layout/Editorial';
import { ProgramEntry } from '../../components/programs/ProgramEntry';
import { Ghungroo } from '../../components/ornaments/Ghungroo';

const TABS: { id: ProgramListing; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming Programs' },
  { id: 'past', label: 'Past Programs' },
];

export function ProgramsPage() {
  usePageMeta('Programs', 'Upcoming and past Bharatanatyam programs, performances, festivals and workshops presented by Sahachetana Natyalaya (R.).');
  const [params, setParams] = useSearchParams();
  const view: ProgramListing = params.get('view') === 'past' ? 'past' : 'upcoming';
  const all = usePublishedPrograms();
  const list = sortPrograms(
    all.filter((p) => p.listing === view),
    view,
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: ProgramListing) => setParams(id === 'upcoming' ? {} : { view: id }, { replace: true, preventScrollReset: true });

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    select(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <PageHero eyebrow="Programs" title="On stage, in season">
        <p className="lead">
          Performances, festivals, workshops and Rangapravesha recitals presented by Sahachetana Natyalaya — those to come, and an archive
          of those already danced.
        </p>
      </PageHero>

      <section className="section programs" aria-label="Programs">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Program listings">
            {TABS.map((t, i) => {
              const count = all.filter((p) => p.listing === t.id).length;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={view === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={view === t.id ? 0 : -1}
                  className={`tabs__tab ${view === t.id ? 'is-active' : ''}`}
                  onClick={() => select(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <Ghungroo size={18} active={view === t.id} />
                  {t.label}
                  <span className="tabs__count">{count}</span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={`panel-${view}`} aria-labelledby={`tab-${view}`} className="programs__panel" key={view}>
            {list.length === 0 ? (
              <p className="programs__empty placeholder-text">
                {view === 'upcoming' ? 'New programs will be announced here soon.' : 'The archive of past programs will appear here.'}
              </p>
            ) : (
              list.map((p, i) => <ProgramEntry key={p.id} program={p} index={i} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
