import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { CONTACT, SITE } from '../../config/site';
import { Wordmark } from '../ornaments/Wordmark';
import { Divider } from '../ornaments/Divider';
import { Stellate } from '../ornaments/Hoysala';

const orPlaceholder = (v: string, label: string) => v || <span className="placeholder-text">{label} to be added</span>;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__frieze" aria-hidden="true" />
      <Stellate size={560} className="site-footer__stellate" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Wordmark tone="light" />
          <p className="site-footer__kn kn" lang="kn">
            {SITE.nameKannada}
          </p>
          <p>
            Classical Bharatanatyam training, performance, choreography and cultural curation — led by {SITE.leader}, with free classical
            dance education for children who could not otherwise learn.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Footer">
          <h2 className="site-footer__h">Explore</h2>
          <ul>
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <Link to={n.path}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/gallery">Memory Gallery</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__h">Visit &amp; write</h2>
          <ul className="site-footer__contact">
            <li>
              <span className="site-footer__k">Email</span>
              {CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : orPlaceholder('', 'Email')}
            </li>
            <li>
              <span className="site-footer__k">Phone</span>
              {CONTACT.phonePrimary ? <a href={`tel:${CONTACT.phonePrimary.replace(/\s/g, '')}`}>{CONTACT.phonePrimary}</a> : orPlaceholder('', 'Phone')}
            </li>
            <li>
              <span className="site-footer__k">Teaching</span>
              Seven teaching locations across the week · {SITE.region}
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__h">Follow</h2>
          <ul>
            {CONTACT.social.map((s) => (
              <li key={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ) : (
                  <span className="placeholder-text">{s.label} — link to be added</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <Divider variant="gejje" className="site-footer__divider" />
      </div>

      <div className="site-footer__base">
        <div className="container site-footer__base-inner">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Typographic wordmark is a temporary treatment, not the official logo.
          </p>
          <Link to="/admin" className="site-footer__admin">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
