import { prefersReducedMotion } from '../../lib/hooks';
import { Ghungroo } from '../ornaments/Ghungroo';

type ThreadItem = { id: string; label: string };

type BatchThreadProps = {
  items: ThreadItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  label?: string;
};

/**
 * Anklet thread for the Classes page: one bell per venue. Vertical and sticky
 * beside the venues on wide screens; a horizontal strand on small screens.
 * Each bell scrolls to its venue; the active bell follows scrolling.
 */
export function BatchThread({ items, activeId, onSelect, label = 'Venues' }: BatchThreadProps) {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(history.state, '', `#${id}`);
    onSelect(id);
    // move focus to the venue heading for keyboard and screen-reader users
    el.querySelector<HTMLElement>('h2, h3')?.focus({ preventScroll: true });
  };

  return (
    <nav className="batch-thread" aria-label={label}>
      <span className="batch-thread__cord" aria-hidden="true" />
      <ol>
        {items.map((b, i) => {
          const active = b.id === activeId || (!activeId && i === 0);
          return (
            <li key={b.id}>
              <button type="button" className={`batch-thread__bell ${active ? 'is-active' : ''}`} aria-current={active ? 'true' : undefined} onClick={() => go(b.id)}>
                <span className="batch-thread__link" aria-hidden="true" />
                <Ghungroo size={active ? 30 : 22} active={active} tilt={i % 2 ? 5 : -5} />
                <span className="batch-thread__label">{b.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
