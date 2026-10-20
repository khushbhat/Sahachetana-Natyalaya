import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { SITE } from '../../config/site';
import { useDialog, useScrollLock } from '../../lib/hooks';
import { Ghungroo } from '../ornaments/Ghungroo';
import { Pendant } from '../ornaments/Pendant';
import { Divider } from '../ornaments/Divider';

type NavPanelProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  activeIndex: number;
  side: 'left' | 'right';
  label: string;
};

/**
 * Navigation drawer shared by the anklet thread (opens from the left on
 * desktop) and the mobile menu (opens from the right). The seven tabs hang
 * from a gold thread, each marked with its own ghungroo.
 */
export function NavPanel({ id, open, onClose, activeIndex, side, label }: NavPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);
  useEffect(() => {
    if (wrap.current) wrap.current.inert = !open;
  }, [open]);
  useScrollLock(open);

  return (
    <div className={`nav-panel nav-panel--${side} ${open ? 'is-open' : ''}`} ref={wrap}>
      <div className="nav-panel__backdrop" onClick={onClose} />
      <div ref={ref} id={id} className="nav-panel__sheet" role="dialog" aria-modal="true" aria-label={label}>
        <div className="nav-panel__top">
          <span className="nav-panel__kn kn" lang="kn">
            {SITE.nameKannada}
          </span>
          <button type="button" className="icon-btn nav-panel__close" onClick={onClose}>
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>

        <nav aria-label={label} className="nav-panel__nav">
          <div className="nav-panel__pendant">
            <Pendant width={40} />
          </div>
          <ol className="nav-panel__list">
            {NAV_ITEMS.map((item, i) => {
              const current = i === activeIndex;
              return (
                <li key={item.id} className={current ? 'is-current' : ''} style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}>
                  <Link to={item.path} onClick={onClose} aria-current={current ? 'page' : undefined}>
                    <span className="nav-panel__bell">
                      <Ghungroo size={current ? 26 : 20} active={current} />
                    </span>
                    <span className="nav-panel__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="nav-panel__label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="nav-panel__foot">
          <Divider variant="gejje" />
          <p>
            <Link to="/gallery" onClick={onClose} className="text-link">
              Memory gallery
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
