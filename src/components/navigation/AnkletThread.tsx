import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { useScrollProgress } from '../../lib/hooks';
import { Ghungroo } from '../ornaments/Ghungroo';
import { Pendant } from '../ornaments/Pendant';

type AnkletThreadProps = {
  activeIndex: number;
  open: boolean;
  onOpen: () => void;
  panelId: string;
};

/** Small twisted-wire link between bell and thread. */
function Connector() {
  return (
    <svg className="anklet__connector" width="10" height="14" viewBox="0 0 10 14" aria-hidden="true" focusable="false">
      <path d="M5 0v3" stroke="var(--ornament)" strokeWidth="0.9" />
      <path d="M5 3l3 3.5L5 10 2 6.5z" fill="var(--ornament-faint)" stroke="var(--ornament)" strokeWidth="0.8" />
      <path d="M5 10v4" stroke="var(--ornament)" strokeWidth="0.9" />
    </svg>
  );
}

/**
 * The ornamental anklet thread: a braided gold cord hanging from a temple
 * pendant, with one ghungroo per section. The pendant opens the navigation
 * panel; each bell links straight to its section and shows its name on hover.
 * The cord fills with gold as the visitor scrolls through the page.
 */
export function AnkletThread({ activeIndex, open, onOpen, panelId }: AnkletThreadProps) {
  const progress = useScrollProgress();
  return (
    <aside className="anklet" aria-label="Anklet navigation">
      <button
        type="button"
        className="anklet__pendant"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        title="Open navigation"
      >
        <Pendant width={40} />
        <span className="sr-only">Open anklet navigation panel</span>
      </button>

      <div className="anklet__cord" aria-hidden="true">
        <span className="anklet__cord-fill" style={{ transform: `scaleY(${progress})` }} />
      </div>

      <ol className="anklet__bells">
        {NAV_ITEMS.map((item, i) => {
          const current = i === activeIndex;
          return (
            <li key={item.id} className={`anklet__item ${current ? 'is-current' : ''}`}>
              <span className="anklet__bead" aria-hidden="true" />
              <Link to={item.path} className="anklet__bell" aria-current={current ? 'page' : undefined} aria-label={item.label}>
                <Connector />
                <Ghungroo size={current ? 30 : 22} active={current} tilt={i % 2 ? 4 : -4} />
                <span className="anklet__tip" aria-hidden="true">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
