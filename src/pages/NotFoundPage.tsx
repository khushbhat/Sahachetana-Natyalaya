import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/hooks';
import { Ghungroo } from '../components/ornaments/Ghungroo';
import { Divider } from '../components/ornaments/Divider';

export function NotFoundPage() {
  usePageMeta('Page not found', 'The page you were looking for could not be found.');
  return (
    <section className="section not-found">
      <div className="container container--narrow center">
        <Ghungroo size={56} />
        <p className="eyebrow eyebrow--center">Page not found</p>
        <h1>A step out of rhythm</h1>
        <Divider />
        <p className="lead">The page you were looking for has moved or does not exist.</p>
        <Link to="/" className="btn btn--primary">
          Return home
        </Link>
      </div>
    </section>
  );
}
