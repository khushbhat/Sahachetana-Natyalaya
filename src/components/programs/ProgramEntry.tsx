import { CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import type { Program } from '../../data/programs';
import { formatProgramDate } from '../../lib/programStore';
import { EditorialRow } from '../layout/Editorial';
import { Media } from '../layout/Media';

function ProgramImage({ program }: { program: Program }) {
  if (!program.image) return <Media image={null} placeholder={`${program.category} — poster or photograph`} ratio="4 / 5" />;
  return (
    <div className="media" style={{ aspectRatio: '4 / 5' }}>
      <img src={program.image} alt={`Poster or photograph for ${program.title}`} loading="lazy" decoding="async" />
    </div>
  );
}

export function ProgramEntry({ program, index, preview = false }: { program: Program; index: number; preview?: boolean }) {
  const H = preview ? 'h3' : 'h2';
  return (
    <EditorialRow reverse={index % 2 === 1} frame="corners" mediaWidth="narrow" media={<ProgramImage program={program} />} className="program">
      <p className="eyebrow">{program.category}</p>
      <H className="program__title">{program.title}</H>
      <ul className="program__meta">
        <li>
          <CalendarDays size={16} aria-hidden="true" />
          {program.dateTime ? <time dateTime={program.dateTime}>{formatProgramDate(program.dateTime)}</time> : formatProgramDate('')}
        </li>
        <li>
          <MapPin size={16} aria-hidden="true" />
          {program.venue || 'Venue to be announced'}
        </li>
      </ul>
      <p>{program.description}</p>
      {program.details && (
        <details className="program__details">
          <summary>Additional details</summary>
          <p>{program.details}</p>
        </details>
      )}
      <div className="program__actions">
        {program.registrationUrl ? (
          <a className="btn btn--primary" href={program.registrationUrl} target="_blank" rel="noreferrer">
            Register <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : program.listing === 'upcoming' ? (
          <span className="muted program__noreg">Registration details to be announced</span>
        ) : null}
        {program.isPlaceholder && <span className="tag tag--placeholder">Placeholder content</span>}
        {program.status === 'draft' && <span className="tag tag--verify">Draft — not public</span>}
      </div>
    </EditorialRow>
  );
}
