import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/* ---------------- Theme ---------------- */
export type Theme = 'light' | 'dark';
const THEME_KEY = 'sn-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow system changes until the visitor makes an explicit choice
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_KEY)) return;
      } catch {
        /* ignore */
      }
      setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}

/* ---------------- Reduced motion ---------------- */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------------- Scroll lock ---------------- */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('is-locked');
    document.body.style.paddingRight = sbw ? `${sbw}px` : '';
    return () => {
      document.body.classList.remove('is-locked');
      document.body.style.paddingRight = '';
    };
  }, [locked]);
}

/* ---------------- Focus trap + Escape + focus restore ---------------- */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useDialog(open: boolean, onClose: () => void, ref: RefObject<HTMLElement>, initialFocus?: RefObject<HTMLElement>) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const first = initialFocus?.current ?? node?.querySelector<HTMLElement>(FOCUSABLE);
    // wait a frame so transitions don't swallow focus
    const raf = requestAnimationFrame(() => first?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, ref, initialFocus]);
}

/* ---------------- Scroll reveal ---------------- */
/**
 * Adds .is-visible to every .reveal element once it enters the viewport,
 * including elements rendered later (tab switches, filters, route changes).
 */
export function useRevealOnScroll() {
  useLayoutEffect(() => {
    const instant = !('IntersectionObserver' in window) || prefersReducedMotion();
    const io = instant
      ? null
      : new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io?.unobserve(e.target);
              }
            }),
          { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
        );
    const scan = () =>
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible):not([data-reveal])').forEach((el) => {
        el.dataset.reveal = '';
        if (io) io.observe(el);
        else el.classList.add('is-visible');
      });
    scan();
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), scan()));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ---------------- Active section (scroll spy) ---------------- */
/**
 * Returns the id of the element (matched by `selector`, keyed by `attr`) that
 * currently crosses the reading line in the upper-middle of the viewport.
 */
export function useActiveSection(selector: string, attr: string, dep?: unknown) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length) {
      setActive(null);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).getAttribute(attr));
        });
      },
      { rootMargin: '-38% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, attr, dep]);
  return active;
}

/* ---------------- Scroll progress ---------------- */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* ---------------- Page metadata ---------------- */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === 'Home' ? 'Sahachetana Natyalaya (R.) — Bharatanatyam training, performance & cultural curation' : `${title} · Sahachetana Natyalaya (R.)`;
    const set = (sel: string, attr: string, value: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(sel);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', document.title);
    set('meta[property="og:description"]', 'content', description);
  }, [title, description]);
}
