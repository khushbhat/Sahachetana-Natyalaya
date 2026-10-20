import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Eye, LogOut, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import type { Program } from '../../data/programs';
import { usePageMeta, useDialog } from '../../lib/hooks';
import { formatProgramDate, newProgramId, repository, useAllPrograms } from '../../lib/programStore';
import { EventForm } from '../../components/admin/EventForm';
import { ProgramEntry } from '../../components/programs/ProgramEntry';
import { Wordmark } from '../../components/ornaments/Wordmark';
import { CornerFrame } from '../../components/ornaments/Hoysala';

/*
 * FRONTEND-ONLY PROTOTYPE. There is no real authentication here: the demo
 * credentials below live in the browser bundle and anyone can read them.
 * Replace with server-side authentication before managing real content.
 */
const DEMO_USER = 'demo';
const DEMO_PASS = 'natya';
const SESSION_KEY = 'sn-admin-demo';

const blank = (): Program => ({
  id: newProgramId(),
  title: '',
  dateTime: '',
  venue: '',
  category: 'Performance',
  description: '',
  details: '',
  image: '',
  registrationUrl: '',
  listing: 'upcoming',
  status: 'draft',
  updatedAt: new Date().toISOString(),
});

function PrototypeBanner() {
  return (
    <div className="admin-banner" role="note">
      <AlertTriangle size={18} aria-hidden="true" />
      <p>
        <strong>Prototype — not secure.</strong> This demo login has no real authentication. Changes are saved only in this browser’s local
        storage and are visible only on this device.
      </p>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (u.trim() === DEMO_USER && pw === DEMO_PASS) onLogin();
    else setError('Those are not the demo credentials. Use the username and password shown below.');
  };
  return (
    <div className="container container--narrow admin-login">
      <CornerFrame size={44}>
        <div className="admin-login__card">
          <Wordmark />
          <h1>Admin login</h1>
          <p className="muted">Event management prototype</p>
          <PrototypeBanner />
          <form onSubmit={submit} noValidate className="admin-login__form">
            <div className="field">
              <label htmlFor="admin-user">Username</label>
              <input id="admin-user" autoComplete="off" value={u} onChange={(e) => setU(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="admin-pass">Password</label>
              <input id="admin-pass" type="password" autoComplete="off" value={pw} onChange={(e) => setPw(e.target.value)} aria-describedby={error ? 'admin-err' : undefined} />
            </div>
            {error && (
              <p id="admin-err" className="field__error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--primary">
              Enter prototype
            </button>
          </form>
          <p className="admin-login__demo">
            Demo credentials — username <code>{DEMO_USER}</code>, password <code>{DEMO_PASS}</code>
          </p>
        </div>
      </CornerFrame>
    </div>
  );
}

function ConfirmDelete({ program, onCancel, onConfirm }: { program: Program; onCancel: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  useDialog(true, onCancel, ref, cancelRef);
  return (
    <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="del-title" aria-describedby="del-desc" ref={ref}>
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__card">
        <h2 id="del-title">Delete this event?</h2>
        <p id="del-desc">
          “{program.title || 'Untitled event'}” will be removed from the public Programs page. This cannot be undone (you can restore the sample
          data with “Reset demo data”).
        </p>
        <div className="btn-row">
          <button ref={cancelRef} type="button" className="btn" onClick={onCancel}>
            Keep event
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            <Trash2 size={16} aria-hidden="true" /> Delete event
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const programs = useAllPrograms();
  const [editing, setEditing] = useState<{ program: Program; isNew: boolean } | null>(null);
  const [draft, setDraft] = useState<Program | null>(null);
  const [deleting, setDeleting] = useState<Program | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const startEdit = (program: Program, isNew = false) => {
    setEditing({ program, isNew });
    setDraft(program);
    setError('');
    setNotice('');
    requestAnimationFrame(() => document.getElementById('admin-editor')?.scrollIntoView({ block: 'start' }));
  };

  const save = (p: Program) => {
    try {
      repository.save(p);
      setNotice(`“${p.title}” ${editing?.isNew ? 'added' : 'saved'} — ${p.status === 'published' ? 'now shown' : 'saved as a draft, hidden'} on the Programs page.`);
      setEditing(null);
      setDraft(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const preview = draft ?? null;

  return (
    <div className="container admin">
      <header className="admin__head">
        <div>
          <p className="eyebrow">Admin · prototype</p>
          <h1>Event management</h1>
        </div>
        <div className="btn-row">
          <Link to="/programs" className="btn btn--small">
            <Eye size={14} aria-hidden="true" /> View public page
          </Link>
          <button type="button" className="btn btn--small" onClick={onLogout}>
            <LogOut size={14} aria-hidden="true" /> Log out
          </button>
        </div>
      </header>
      <PrototypeBanner />

      <div aria-live="polite" className="admin__notices">
        {notice && <p className="enquiry__alert enquiry__alert--success">{notice}</p>}
        {error && <p className="enquiry__alert enquiry__alert--error">{error}</p>}
      </div>

      <section className="admin__list" aria-labelledby="list-title">
        <div className="admin__list-head">
          <h2 id="list-title">Events ({programs.length})</h2>
          <div className="btn-row">
            <button type="button" className="btn btn--primary btn--small" onClick={() => startEdit(blank(), true)}>
              <Plus size={14} aria-hidden="true" /> Add event
            </button>
            <button
              type="button"
              className="btn btn--small"
              onClick={() => {
                repository.reset();
                setNotice('Demo data restored to the original sample programs.');
                setEditing(null);
                setDraft(null);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" /> Reset demo data
            </button>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Listing</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id}>
                  <th scope="row">
                    {p.title || 'Untitled'}
                    {p.isPlaceholder && <span className="tag tag--placeholder">Sample</span>}
                  </th>
                  <td>{formatProgramDate(p.dateTime)}</td>
                  <td>{p.listing === 'upcoming' ? 'Upcoming' : 'Past'}</td>
                  <td>
                    <span className={`status status--${p.status}`}>{p.status === 'published' ? 'Published' : 'Draft'}</span>
                  </td>
                  <td className="admin-table__actions">
                    <button type="button" className="icon-btn" onClick={() => startEdit(p)} aria-label={`Edit ${p.title}`}>
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <button type="button" className="icon-btn" onClick={() => setDeleting(p)} aria-label={`Delete ${p.title}`}>
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={5} className="placeholder-text">
                    No events yet — add one, or reset the demo data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editing && (
        <section id="admin-editor" className="admin__editor" aria-label="Event editor">
          <EventForm
            key={editing.program.id}
            initial={editing.program}
            isNew={editing.isNew}
            onChange={setDraft}
            onSubmit={save}
            onCancel={() => {
              setEditing(null);
              setDraft(null);
            }}
          />
          <div className="admin__preview">
            <h2>Live preview</h2>
            <p className="muted">How this event will appear on the Programs page.</p>
            {preview && (
              <div className="admin__preview-frame">
                <ProgramEntry program={{ ...preview, title: preview.title || 'Untitled event', description: preview.description || 'Description…' }} index={0} preview />
              </div>
            )}
          </div>
        </section>
      )}

      {deleting && (
        <ConfirmDelete
          program={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={() => {
            repository.remove(deleting.id);
            setNotice(`“${deleting.title}” deleted.`);
            if (editing?.program.id === deleting.id) {
              setEditing(null);
              setDraft(null);
            }
            setDeleting(null);
          }}
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  usePageMeta('Admin (prototype)', 'Frontend-only event management prototype for Sahachetana Natyalaya (R.).');
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const login = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setAuthed(true);
  };
  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  };
  return <section className="section admin-page">{authed ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />}</section>;
}
