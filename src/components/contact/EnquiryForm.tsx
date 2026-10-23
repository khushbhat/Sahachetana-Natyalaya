import { useId, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { EMAILJS, emailjsConfigured } from '../../config/site';
import { LOCATION_OPTIONS } from '../../data/batches';

export const ENQUIRY_CATEGORIES = ['New Admissions', 'Batch Timings', 'Performances', 'Cultural Collaboration', 'Events and Workshops', 'General Enquiry'];

type Values = { name: string; email: string; phone: string; category: string; location: string; message: string; website: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = { kind: 'idle' | 'sending' | 'sent' | 'demo' | 'error'; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your full name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, for example name@example.com.';
  if (!v.phone.trim()) e.phone = 'Please enter a phone number so we can reach you.';
  else if (!PHONE_RE.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a valid phone number.';
  if (!v.category) e.category = 'Please choose what your enquiry is about.';
  if (v.message.trim().length < 10) e.message = 'Please write a short message (at least 10 characters).';
  return e;
}

/**
 * Enquiry form with accessible validation.
 *
 * Delivery: when EmailJS credentials are present in .env (see .env.example)
 * the form sends through EmailJS; otherwise it runs in demo mode and says
 * plainly that nothing was sent. Spam protection: a hidden honeypot field and
 * a minimum fill time. Add EmailJS's reCAPTCHA option for production.
 */
export function EnquiryForm({
  initialCategory = '',
  initialMessage = '',
  initialLocation = '',
}: {
  initialCategory?: string;
  initialMessage?: string;
  initialLocation?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    phone: '',
    category: ENQUIRY_CATEGORIES.includes(initialCategory) ? initialCategory : '',
    location: LOCATION_OPTIONS.includes(initialLocation) ? initialLocation : '',
    message: initialMessage,
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const startedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    setTouched({ name: true, email: true, phone: true, category: true, message: true });
    if (Object.keys(e).length) {
      setStatus({ kind: 'idle' });
      requestAnimationFrame(() => {
        const first = Object.keys(e)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      });
      return;
    }
    // Spam checks: honeypot filled, or submitted implausibly fast
    if (values.website || Date.now() - startedAt.current < 2500) {
      setStatus({ kind: 'error', message: 'Your message could not be accepted. Please wait a moment and try again.' });
      return;
    }

    if (!emailjsConfigured()) {
      setStatus({
        kind: 'demo',
        message:
          'Demo mode: your enquiry passed validation, but no email has been sent. Email delivery will be enabled once the institution’s EmailJS account is connected.',
      });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: values.name,
          reply_to: values.email,
          phone: values.phone,
          category: values.category,
          location: values.location || 'Not specified',
          message: values.message,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus({ kind: 'sent', message: 'Thank you — your enquiry has been sent. We will be in touch soon.' });
      setValues({ name: '', email: '', phone: '', category: '', location: '', message: '', website: '' });
      setTouched({});
    } catch {
      setStatus({ kind: 'error', message: 'Sorry, your enquiry could not be sent. Please try again, or contact us by phone or WhatsApp.' });
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const field = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': touched[k] && errors[k] ? true : undefined,
    'aria-describedby': touched[k] && errors[k] ? `${uid}-${k}-err` : undefined,
  });
  const err = (k: keyof Values) =>
    touched[k] && errors[k] ? (
      <p id={`${uid}-${k}-err`} className="field__error">
        <AlertCircle size={14} aria-hidden="true" /> {errors[k]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;
  const showSummary = errorCount > 0 && Object.keys(touched).length >= 5;

  return (
    <form ref={formRef} className="enquiry" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-req`}>
      <p id={`${uid}-req`} className="enquiry__req muted">
        All fields are required except the class location.
      </p>

      {showSummary && (
        <div className="enquiry__alert enquiry__alert--error" role="alert">
          <AlertCircle size={18} aria-hidden="true" /> Please correct {errorCount} {errorCount === 1 ? 'field' : 'fields'} below.
        </div>
      )}

      <div className="enquiry__row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name</label>
          <input type="text" autoComplete="name" {...field('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>Email address</label>
          <input type="email" autoComplete="email" inputMode="email" {...field('email')} />
          {err('email')}
        </div>
      </div>
      <div className="enquiry__row">
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone number</label>
          <input type="tel" autoComplete="tel" inputMode="tel" {...field('phone')} />
          {err('phone')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-category`}>Enquiry category</label>
          <select {...field('category')}>
            <option value="">Choose a category…</option>
            {ENQUIRY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err('category')}
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-location`}>
          Preferred class location <span className="field__optional">(optional)</span>
        </label>
        <select {...field('location')}>
          <option value="">Not sure yet / not about classes</option>
          {LOCATION_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-message`}>Message</label>
        <textarea rows={6} {...field('message')} />
        {err('message')}
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="enquiry__hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <div className="enquiry__submit">
        <button type="submit" className="btn btn--primary" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? 'Sending…' : emailjsConfigured() ? 'Send enquiry' : 'Send enquiry (demo)'}
        </button>
        {!emailjsConfigured() && <span className="muted enquiry__mode">Demo mode — email delivery not yet connected.</span>}
      </div>

      <p className="enquiry__privacy">
        <strong>Your information.</strong> This form asks for your name, email, phone number and message only so that the academy can reply
        to your enquiry. {emailjsConfigured() ? 'It is delivered by email through the EmailJS service and' : 'While the form is in demo mode nothing is sent or stored. Once connected, enquiries will be delivered by email and'} not used for anything else or shared.
      </p>

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="enquiry__status">
        {status.kind === 'sent' && (
          <p className="enquiry__alert enquiry__alert--success">
            <CheckCircle2 size={18} aria-hidden="true" /> {status.message}
          </p>
        )}
        {status.kind === 'demo' && (
          <p className="enquiry__alert enquiry__alert--info">
            <Info size={18} aria-hidden="true" /> {status.message}
          </p>
        )}
        {status.kind === 'error' && (
          <p className="enquiry__alert enquiry__alert--error">
            <AlertCircle size={18} aria-hidden="true" /> {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
