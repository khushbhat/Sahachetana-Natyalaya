import { useCallback, useEffect, useRef, useState } from 'react';
import { LINE_ART_ANKLETS } from '../../data/images';
import { prefersReducedMotion } from '../../lib/hooks';
import { Divider } from '../ornaments/Divider';
import { LogoMark } from '../ornaments/Wordmark';

const SEEN_KEY = 'sn-intro-seen';
const DURATION = 4700; // ms until the sketch hands over to the hero
const EXIT = 900;

/** Whether the opening should play: first homepage visit per session, motion allowed. */
export function shouldPlayIntro(pathname: string, search: string) {
  if (new URLSearchParams(search).has('intro')) return true;
  if (pathname !== '/' || prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

/**
 * The opening: a dancer's sketchbook page. Ivory paper appears, an
 * architectural frame is ruled in, the graphite drawing of gejje-clad feet is
 * revealed stroke by stroke, the bells catch gold, an ornamental line is drawn
 * and the name emerges — then the page lifts away to reveal the hero.
 */
export function OpeningSketch({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(onDone, EXIT);
  }, [onDone]);

  useEffect(() => {
    const t = window.setTimeout(finish, DURATION);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    skipRef.current?.focus({ preventScroll: true });
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [finish]);

  return (
    <div className={`opening ${leaving ? 'is-leaving' : ''}`} role="region" aria-label="Opening — Sahachetana Natyalaya (R.)">
      <svg className="opening__frame" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <rect x="18" y="18" width="964" height="964" pathLength={1} vectorEffect="non-scaling-stroke" />
        <rect x="30" y="30" width="940" height="940" pathLength={1} vectorEffect="non-scaling-stroke" className="thin" />
        <path d="M18 120H982M18 880H982" pathLength={1} vectorEffect="non-scaling-stroke" className="thin" />
      </svg>
      <span className="opening__corner opening__corner--tl" aria-hidden="true" />
      <span className="opening__corner opening__corner--tr" aria-hidden="true" />
      <span className="opening__corner opening__corner--bl" aria-hidden="true" />
      <span className="opening__corner opening__corner--br" aria-hidden="true" />

      <div className="opening__stage">
        <div className="opening__art" aria-hidden="true">
          {/* faint construction lines, as in a sketchbook study */}
          <svg className="opening__guides" viewBox="0 0 900 1058" aria-hidden="true" focusable="false">
            <ellipse cx="300" cy="300" rx="190" ry="120" pathLength={1} />
            <ellipse cx="590" cy="620" rx="170" ry="110" pathLength={1} />
            <path d="M120 980C330 940 600 960 880 930" pathLength={1} />
            <path d="M450 40V1020" pathLength={1} />
          </svg>
          <div className="opening__reveal">
            <div className="opening__graphite" style={{ ['--art' as string]: `url(${LINE_ART_ANKLETS})` }} />
            <div className="opening__gold" style={{ ['--art' as string]: `url(${LINE_ART_ANKLETS})` }} />
          </div>
        </div>

        <div className="opening__title">
          <LogoMark height={64} className="opening__logo" />
          <Divider variant="gejje" className="opening__divider" />
          <p className="opening__name">
            <span>Sahachetana</span> <span>Natyalaya (R.)</span>
          </p>
          <p className="opening__kicker">Bharatanatyam · Karnataka</p>
        </div>
      </div>

      <button ref={skipRef} type="button" className="opening__skip" onClick={finish}>
        Skip introduction
      </button>
    </div>
  );
}
