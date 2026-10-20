import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/navigation/Header';
import { AnkletThread } from '../components/navigation/AnkletThread';
import { NavPanel } from '../components/navigation/NavPanel';
import { Footer } from '../components/layout/Footer';
import { OpeningSketch, shouldPlayIntro } from '../components/intro/OpeningSketch';
import { NAV_ITEMS, navIndexForPath } from '../data/navigation';
import { useActiveSection, useRevealOnScroll, useTheme } from '../lib/hooks';

export function Layout() {
  const { pathname, search, hash } = useLocation();
  const { theme, toggle } = useTheme();
  const [intro, setIntro] = useState(() => shouldPlayIntro(pathname, search));
  const [panel, setPanel] = useState<null | 'anklet' | 'menu'>(null);
  const close = useCallback(() => setPanel(null), []);

  // Route change: close panels, go to top (or to the requested anchor)
  useEffect(() => {
    setPanel(null);
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  useRevealOnScroll();

  // On the long homepage, the anklet follows the visitor through the preview sections
  const spy = useActiveSection('[data-nav-section]', 'data-nav-section', pathname);
  const routeIndex = navIndexForPath(pathname);
  const spyIndex = pathname === '/' && spy ? NAV_ITEMS.findIndex((n) => n.id === spy) : -1;
  const activeIndex = spyIndex >= 0 ? spyIndex : routeIndex;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {intro && <OpeningSketch onDone={() => setIntro(false)} />}
      <Header theme={theme} onToggleTheme={toggle} onOpenMenu={() => setPanel('menu')} menuOpen={panel === 'menu'} menuId="menu-panel" />
      <AnkletThread activeIndex={activeIndex} open={panel === 'anklet'} onOpen={() => setPanel('anklet')} panelId="anklet-panel" />
      <NavPanel id="anklet-panel" side="left" label="Anklet navigation" open={panel === 'anklet'} onClose={close} activeIndex={routeIndex} />
      <NavPanel id="menu-panel" side="right" label="Main menu" open={panel === 'menu'} onClose={close} activeIndex={routeIndex} />
      <main id="main" className={`site-main ${intro ? 'is-behind-intro' : 'is-ready'}`} tabIndex={-1}>
        <Outlet />
      </main>
      <div className="site-main site-main--footer">
        <Footer />
      </div>
    </>
  );
}
