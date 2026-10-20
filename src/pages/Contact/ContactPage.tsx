import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, SITE } from '../../config/site';
import { batches } from '../../data/batches';
import { usePageMeta } from '../../lib/hooks';
import { EnquiryForm } from '../../components/contact/EnquiryForm';
import { WhatsAppButton } from '../../components/contact/WhatsAppButton';
import { CornerFrame, Rosette, Stellate } from '../../components/ornaments/Hoysala';
import { Divider } from '../../components/ornaments/Divider';

const pending = (label: string) => <span className="placeholder-text">{label} to be added</span>;

export function ContactPage() {
  usePageMeta('Contact Us', 'Enquire about Bharatanatyam classes, performances, cultural collaborations, events and workshops at Sahachetana Natyalaya (R.).');
  const [params] = useSearchParams();
  const batch = params.get('batch');
  const initialMessage = batch ? `I would like to know more about ${batch}.` : '';

  return (
    <>
      <section className="contact-hero">
        <Stellate size={720} className="contact-hero__stellate" />
        <div className="container container--narrow center">
          <p className="eyebrow eyebrow--center reveal">Contact us</p>
          <h1 className="contact-hero__title reveal">Let the rhythm begin.</h1>
          <Divider variant="gejje" className="reveal" />
          <p className="lead reveal">
            Whether you wish to learn Bharatanatyam, collaborate on a cultural programme, invite our artists to perform, or learn more about
            Sahachetana Natyalaya, we would be delighted to hear from you.
          </p>
        </div>
      </section>

      <section className="section contact" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <aside className="contact__info reveal">
            <CornerFrame size={44} className="contact__card">
              <div className="contact__card-inner">
                <h2 className="contact__h">Reach us</h2>
                <ul className="contact__list">
                  <li>
                    <Mail size={18} aria-hidden="true" />
                    <div>
                      <span className="contact__k">Email</span>
                      {CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : pending('Official email')}
                    </div>
                  </li>
                  <li>
                    <Phone size={18} aria-hidden="true" />
                    <div>
                      <span className="contact__k">Primary phone</span>
                      {CONTACT.phonePrimary ? <a href={`tel:${CONTACT.phonePrimary.replace(/\s/g, '')}`}>{CONTACT.phonePrimary}</a> : pending('Primary phone')}
                    </div>
                  </li>
                  <li>
                    <Phone size={18} aria-hidden="true" />
                    <div>
                      <span className="contact__k">Secondary phone</span>
                      {CONTACT.phoneSecondary ? <a href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, '')}`}>{CONTACT.phoneSecondary}</a> : pending('Secondary phone')}
                    </div>
                  </li>
                </ul>
                <div className="contact__actions">
                  <WhatsAppButton message={initialMessage || undefined} />
                  {CONTACT.email ? (
                    <a className="btn" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry — Sahachetana Natyalaya')}`}>
                      <Mail size={16} aria-hidden="true" /> Email us
                    </a>
                  ) : (
                    <span className="btn" aria-disabled="true" title="Email address to be added in src/config/site.ts">
                      <Mail size={16} aria-hidden="true" /> Email <span className="btn__note">(address to be added)</span>
                    </span>
                  )}
                </div>

                <h2 className="contact__h">Teaching locations</h2>
                <p>
                  Classes run at seven teaching locations through the week. Addresses and batch details will be published as they are
                  confirmed.
                </p>
                <ul className="contact__batches">
                  {batches.map((b) => (
                    <li key={b.id}>
                      <span>{b.name}</span>
                      <span className="muted">{b.location}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="contact__h">Follow</h2>
                <ul className="contact__social">
                  {CONTACT.social.map((s) => (
                    <li key={s.label}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.label}
                        </a>
                      ) : (
                        <span className="placeholder-text">{s.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CornerFrame>
          </aside>

          <div className="contact__form reveal reveal-delay-1">
            <h2>Send an enquiry</h2>
            <EnquiryForm key={params.toString()} initialCategory={params.get('category') ?? ''} initialMessage={initialMessage} />
          </div>
        </div>

        <div className="container">
          <div className="map-ph reveal" role="img" aria-label="Map placeholder — location map to be added once the address is confirmed">
            <svg className="map-ph__lines" viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 210C120 180 180 240 300 200S520 120 620 150 760 90 800 110" />
              <path d="M0 120C160 140 240 80 380 110S600 210 800 180" />
              <path d="M260 0C250 90 300 180 270 300M560 0C590 110 520 200 560 300" />
            </svg>
            <div className="map-ph__pin">
              <MapPin size={28} aria-hidden="true" />
              <Rosette size={40} />
            </div>
            <p className="map-ph__label">
              Map to be added once the address is confirmed
              <span>{SITE.region}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
