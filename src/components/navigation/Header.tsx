import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { Wordmark } from '../ornaments/Wordmark';
import type { Theme } from '../../lib/hooks';

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  menuOpen: boolean;
  menuId: string;
};

export function Header({ theme, onToggleTheme, onOpenMenu, menuOpen, menuId }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__frieze" aria-hidden="true" />
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand" aria-label="Sahachetana Natyalaya (R.) — home">
          <Wordmark />
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink to={item.path} end={item.path === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            title={theme === 'light' ? 'Dark theme' : 'Light theme'}
          >
            {theme === 'light' ? <Moon size={18} strokeWidth={1.5} aria-hidden="true" /> : <Sun size={18} strokeWidth={1.5} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
          >
            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            <span className="menu-btn__label">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
