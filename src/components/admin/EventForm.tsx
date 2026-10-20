import { useId, useState, type FormEvent } from 'react';
import { PROGRAM_CATEGORIES, type Program } from '../../data/programs';

type EventFormProps = {
  initial: Program;
  onChange: (p: Program) => void;
  onSubmit: (p: Program) => void;
  onCancel: () => void;
  isNew: boolean;
};

const MAX_UPLOAD = 900 * 1024; // keep uploads small — localStorage holds ~5 MB in total

export function EventForm({ initial, onChange, onSubmit, onCancel, isNew }: EventFormProps) {
  const uid = useId();
  const [p, setP] = useState<Program>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof Program>(k: K, v: Program[K]) => {
    const next = { ...p, [k]: v };
    setP(next);
    onChange(next);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((e) => ({ ...e, image: 'Please choose an image file.' }));
      return;
    }
    if (file.size > MAX_UPLOAD) {
      setErrors((e) => ({ ...e, image: 'This image is larger than 900 KB. Please use a smaller image or paste an image URL.' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setErrors(({ image: _omit, ...rest }) => rest);
      update('image', String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!p.title.trim()) errs.title = 'A title is required.';
    if (!p.description.trim()) errs.description = 'A short description is required.';
    if (p.registrationUrl && !/^https?:\/\//i.test(p.registrationUrl)) errs.registrationUrl = 'Registration link must start with http:// or https://';
    if (p.image && !p.image.startsWith('data:image/') && !/^(https?:\/\/|\/)/i.test(p.image)) errs.image = 'Image must be an uploaded file, a full URL or a site path such as /images/…';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ ...p, isPlaceholder: false });
  };

  const id = (k: string) => `${uid}-${k}`;
  const err = (k: string) =>
    errors[k] ? (
      <p className="field__error" id={`${id(k)}-err`}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ id: id(k), 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined });

  return (
    <form className="admin-form" onSubmit={submit} noValidate>
      <h2>{isNew ? 'Add an event' : 'Edit event'}</h2>
      <div className="field">
        <label htmlFor={id('title')}>Title</label>
        <input {...a11y('title')} value={p.title} onChange={(e) => update('title', e.target.value)} />
        {err('title')}
      </div>
      <div className="enquiry__row">
        <div className="field">
          <label htmlFor={id('date')}>Date and time</label>
          <input type="datetime-local" {...a11y('date')} value={p.dateTime} onChange={(e) => update('dateTime', e.target.value)} />
          <p className="field__hint">Leave empty for “Date to be announced”.</p>
        </div>
        <div className="field">
          <label htmlFor={id('venue')}>Venue</label>
          <input {...a11y('venue')} value={p.venue} onChange={(e) => update('venue', e.target.value)} />
        </div>
      </div>
      <div className="enquiry__row">
        <div className="field">
          <label htmlFor={id('category')}>Category</label>
          <select {...a11y('category')} value={p.category} onChange={(e) => update('category', e.target.value)}>
            {PROGRAM_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={id('listing')}>Listed under</label>
          <select {...a11y('listing')} value={p.listing} onChange={(e) => update('listing', e.target.value as Program['listing'])}>
            <option value="upcoming">Upcoming programs</option>
            <option value="past">Past programs</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={id('description')}>Description</label>
        <textarea rows={4} {...a11y('description')} value={p.description} onChange={(e) => update('description', e.target.value)} />
        {err('description')}
      </div>
      <div className="field">
        <label htmlFor={id('details')}>Additional details (optional)</label>
        <textarea rows={3} {...a11y('details')} value={p.details ?? ''} onChange={(e) => update('details', e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor={id('reg')}>Registration URL (optional)</label>
        <input type="url" {...a11y('registrationUrl')} id={id('reg')} value={p.registrationUrl ?? ''} onChange={(e) => update('registrationUrl', e.target.value)} placeholder="https://" />
        {err('registrationUrl')}
      </div>
      <fieldset className="field admin-form__image">
        <legend>Event image</legend>
        <label htmlFor={id('imgurl')} className="field__hint">
          Paste an image URL or site path…
        </label>
        <input id={id('imgurl')} value={p.image.startsWith('data:') ? '(uploaded file)' : p.image} onChange={(e) => update('image', e.target.value)} placeholder="/images/… or https://…" />
        <label htmlFor={id('imgfile')} className="field__hint">
          …or upload a small image (max 900 KB, stored only in this browser)
        </label>
        <input id={id('imgfile')} type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
        {p.image && (
          <button type="button" className="btn btn--small" onClick={() => update('image', '')}>
            Remove image
          </button>
        )}
        {err('image')}
      </fieldset>
      <fieldset className="field admin-form__status">
        <legend>Status</legend>
        <label>
          <input type="radio" name={id('status')} checked={p.status === 'draft'} onChange={() => update('status', 'draft')} /> Draft — hidden from the public site
        </label>
        <label>
          <input type="radio" name={id('status')} checked={p.status === 'published'} onChange={() => update('status', 'published')} /> Published
        </label>
      </fieldset>
      <div className="btn-row">
        <button type="submit" className="btn btn--primary">
          {isNew ? 'Add event' : 'Save changes'}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
