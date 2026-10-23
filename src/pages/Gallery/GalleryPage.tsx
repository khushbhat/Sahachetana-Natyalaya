import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Expand } from 'lucide-react';
import { activeCategories, gallery } from '../../data/gallery';
import { SHOW_VERIFICATION_NOTES } from '../../config/site';
import { usePageMeta } from '../../lib/hooks';
import { PageHero } from '../../components/layout/Editorial';
import { Media } from '../../components/layout/Media';
import { Lightbox } from '../../components/gallery/Lightbox';

export function GalleryPage() {
  usePageMeta('Memory Gallery', 'Photographs from Natyaaradhana, performances, the moments before the curtain and community programmes of Sahachetana Natyalaya (R.).');
  const [params, setParams] = useSearchParams();
  const requested = params.get('category');
  const categories = activeCategories();
  const category = categories.find((c) => c === requested) ?? 'All';
  const items = category === 'All' ? gallery : gallery.filter((g) => g.category === category);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const counts = Object.fromEntries(categories.map((c) => [c, gallery.filter((g) => g.category === c).length]));

  return (
    <>
      <PageHero eyebrow="Memory Gallery" title="Moments from the archive">
        <p className="lead">
          The stage, the wings and the green room — a growing archive of Sahachetana’s life on and off the stage, beginning with Natyaaradhana 15.
        </p>
      </PageHero>

      <section className="section gallery" aria-label="Gallery">
        <div className="container container--wide">
          <div className="filters" role="group" aria-label="Filter by category">
            {(['All', ...categories] as const).map((c) => (
              <button
                key={c}
                type="button"
                className={`filters__btn ${category === c ? 'is-active' : ''}`}
                aria-pressed={category === c}
                onClick={() => setParams(c === 'All' ? {} : { category: c }, { replace: true, preventScrollReset: true })}
              >
                {c}
                <span className="filters__count">{c === 'All' ? gallery.length : counts[c]}</span>
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {items.length} {items.length === 1 ? 'item' : 'items'}
            {category !== 'All' ? ` in ${category}` : ''}.
          </p>

          <ul className="masonry">
            {items.map((g, i) => (
              <li key={g.id} className={`masonry__item masonry__item--${g.shape}`}>
                <button type="button" className="masonry__btn" onClick={() => setOpen(i)} aria-label={`Open: ${g.caption}`}>
                  <Media image={g.image} placeholder={g.caption} sizes="(min-width: 1200px) 30vw, (min-width: 700px) 45vw, 100vw" />
                  <span className="masonry__overlay" aria-hidden="true">
                    <Expand size={18} strokeWidth={1.5} />
                  </span>
                </button>
                <p className="masonry__cap">
                  <span className="masonry__cat">{g.category}</span>
                  {g.caption}
                  {SHOW_VERIFICATION_NOTES && g.verify && <span className="tag tag--verify">To be verified</span>}
                </p>
              </li>
            ))}
            {items.length === 0 && <li className="placeholder-text">Photographs for this category will be added soon.</li>}
          </ul>
        </div>
      </section>

      <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />
    </>
  );
}
