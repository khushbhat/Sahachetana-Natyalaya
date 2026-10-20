import type { Batch } from '../../data/batches';
import { prefersReducedMotion } from '../../lib/hooks';
import { Ghungroo } from '../ornaments/Ghungroo';

type BatchThreadProps = {
  batches: Batch[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

/**
 * Seven-bell anklet thread for the Classes page. Vertical and sticky beside
 * the batches on wide screens; a horizontal strand under the header on small
 * screens. Each bell scrolls to its batch; the active bell follows scrolling.
 */
export function BatchThread({ batches, activeId, onSelect }: BatchThreadProps) {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(history.state, '', `#${id}`);
    onSelect(id);
    // move focus to the batch heading for keyboard and screen-reader users
    el.querySelector<HTMLElement>('h2, h3')?.focus({ preventScroll: true });
  };

  return (
    <nav className="batch-thread" aria-label="Batches">
      <span className="batch-thread__cord" aria-hidden="true" />
      <ol>
        {batches.map((b, i) => {
          const active = b.id === activeId || (!activeId && i === 0);
          return (
            <li key={b.id}>
              <button type="button" className={`batch-thread__bell ${active ? 'is-active' : ''}`} aria-current={active ? 'true' : undefined} onClick={() => go(b.id)}>
                <span className="batch-thread__link" aria-hidden="true" />
                <Ghungroo size={active ? 30 : 22} active={active} tilt={i % 2 ? 5 : -5} />
                <span className="batch-thread__label">
                  <span className="batch-thread__pre">Batch</span> {b.name.replace(/\D+/g, '')}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
