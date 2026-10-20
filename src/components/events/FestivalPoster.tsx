import { natyaaradhana } from '../../data/events';
import { Ghungroo } from '../ornaments/Ghungroo';
import { Stellate } from '../ornaments/Hoysala';
import { archPath } from '../ornaments/ArchFrame';

/**
 * A designed placeholder poster for Natyaaradhana, used until the official
 * festival poster is supplied. Clearly labelled as a placeholder.
 */
export function FestivalPoster({ large = false }: { large?: boolean }) {
  return (
    <div className={`festival-poster ${large ? 'festival-poster--large' : ''}`} role="img" aria-label="Placeholder poster for the Natyaaradhana National Dance Festival">
      <svg className="festival-poster__arch" viewBox="0 0 300 420" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={archPath(300, 420, { spring: 0.4, lobes: 9 })} transform="translate(0 0)" fill="none" stroke="var(--c-gold)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <Stellate size={360} className="festival-poster__stellate" />
      <div className="festival-poster__body">
        <span className="festival-poster__kicker">Sahachetana Natyalaya (R.) presents</span>
        <span className="festival-poster__title">Natya&shy;aradhana</span>
        <span className="festival-poster__sub">National Dance Festival</span>
        <span className="festival-poster__bells" aria-hidden="true">
          <Ghungroo size={16} tilt={-8} />
          <Ghungroo size={22} />
          <Ghungroo size={16} tilt={8} />
        </span>
        <span className="festival-poster__editions">
          <strong>{natyaaradhana.editionCount}</strong> national editions
        </span>
      </div>
      <span className="festival-poster__label">Placeholder poster</span>
    </div>
  );
}
