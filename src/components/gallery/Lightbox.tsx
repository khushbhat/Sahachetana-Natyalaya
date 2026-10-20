import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';
import { useDialog, useScrollLock } from '../../lib/hooks';
import { Media } from '../layout/Media';

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function Lightbox({ items, index, onClose, onIndex }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = index !== null && items[index] !== undefined;
  useDialog(open, onClose, ref, closeBtn);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex(((index ?? 0) + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex(((index ?? 0) - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onIndex]);

  // touch swipe
  const startX = useRef<number | null>(null);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photograph ${index + 1} of ${items.length}: ${item.caption}`} ref={ref}>
      <div className="lightbox__backdrop" onClick={onClose} />
      <div
        className="lightbox__stage"
        onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const dx = e.changedTouches[0].clientX - startX.current;
          if (Math.abs(dx) > 50) onIndex((index + (dx < 0 ? 1 : -1) + items.length) % items.length);
          startX.current = null;
        }}
      >
        <figure className="lightbox__figure" key={item.id}>
          <Media image={item.image} placeholder={item.caption} sizes="90vw" eager className="lightbox__media" />
          <figcaption className="lightbox__caption">
            <span className="lightbox__cat">{item.category}</span>
            <span>{item.caption}</span>
            {(item.date || item.venue) && <span className="muted">{[item.date, item.venue].filter(Boolean).join(' · ')}</span>}
            <span className="lightbox__count" aria-hidden="true">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      </div>
      <button ref={closeBtn} type="button" className="icon-btn lightbox__close" onClick={onClose} aria-label="Close gallery viewer">
        <X size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous photograph">
            <ChevronLeft size={26} strokeWidth={1.4} aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next photograph">
            <ChevronRight size={26} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
