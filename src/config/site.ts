/**
 * Site-wide configuration. Fill in the confirmed contact details here —
 * every page reads from this file. Empty values render as clearly marked
 * placeholders; nothing is invented.
 */
export const SITE = {
  name: 'Sahachetana Natyalaya (R.)',
  /** Kannada name — spelling to be confirmed by the institution */
  nameKannada: 'ಸಹಚೇತನ ನಾಟ್ಯಾಲಯ (ರಿ.)',
  leader: 'Guru Vidushi Sahana Chethan',
  region: 'Shivamogga, Karnataka',
  /** Public URL once deployed — used for canonical links and the sitemap */
  url: '',
  tagline: 'Where discipline becomes devotion, and every rhythm finds its stage.',
  taglineIsPlaceholder: true,
};

export const CONTACT = {
  email: '', // e.g. 'info@example.org'
  phonePrimary: '', // e.g. '+91 00000 00000'
  phoneSecondary: '',
  /** WhatsApp number in international format, digits only, e.g. '919800000000' */
  whatsapp: '',
  whatsappMessage: 'Namaskara! I would like to know more about classes at Sahachetana Natyalaya.',
  social: [
    { label: 'Instagram', url: '' },
    { label: 'Facebook', url: '' },
    { label: 'YouTube', url: '' },
  ],
};

/** EmailJS public browser credentials, read from .env (see .env.example). */
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

export const emailjsConfigured = () => Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

/** Show "to be verified" badges on source-derived facts. Set false once content is confirmed. */
export const SHOW_VERIFICATION_NOTES = true;
