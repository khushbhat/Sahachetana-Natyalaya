export type NavItem = {
  id: string;
  label: string;
  path: string;
};

/** The seven primary tabs, in information-architecture order. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'founders', label: 'Founders', path: '/founders' },
  { id: 'classes', label: 'Classes', path: '/classes' },
  { id: 'programs', label: 'Programs', path: '/programs' },
  { id: 'events', label: 'Annual Events', path: '/annual-events' },
  { id: 'awards', label: 'Awards & Recognition', path: '/awards' },
  { id: 'contact', label: 'Contact Us', path: '/contact' },
];

export const navIndexForPath = (pathname: string) => {
  const i = NAV_ITEMS.findIndex((n) => n.path !== '/' && pathname.startsWith(n.path));
  return i === -1 ? (pathname === '/' ? 0 : -1) : i;
};
