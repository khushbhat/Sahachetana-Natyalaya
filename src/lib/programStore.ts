/**
 * Program repository.
 *
 * The public Programs page and the admin prototype both go through this
 * interface. Today it is backed by localStorage (one browser only). To connect
 * a real backend later, implement `ProgramRepository` against your API and
 * swap `repository` below — the components do not change.
 */
import { useSyncExternalStore } from 'react';
import { seedPrograms, type Program } from '../data/programs';

export interface ProgramRepository {
  list(): Program[];
  save(program: Program): void;
  remove(id: string): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
}

// v2: placeholder seeds replaced by real records — older browser copies are ignored
const KEY = 'sn-programs-v2';

function createLocalRepository(): ProgramRepository {
  const listeners = new Set<() => void>();
  let cache: Program[] = read();

  function read(): Program[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as Program[];
      }
    } catch {
      /* storage unavailable or corrupt — fall back to seed data */
    }
    return seedPrograms;
  }

  function write(next: Program[]) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Quota exceeded (usually a large uploaded image) — leave the stored list unchanged
      throw new Error('This browser could not store the change — try a smaller image or an image URL.');
    }
    cache = next;
    listeners.forEach((l) => l());
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) {
        cache = read();
        listeners.forEach((l) => l());
      }
    });
  }

  return {
    list: () => cache,
    save(program) {
      const exists = cache.some((p) => p.id === program.id);
      const stamped = { ...program, updatedAt: new Date().toISOString() };
      write(exists ? cache.map((p) => (p.id === program.id ? stamped : p)) : [stamped, ...cache]);
    },
    remove(id) {
      write(cache.filter((p) => p.id !== id));
    },
    reset() {
      try {
        localStorage.removeItem(KEY);
      } catch {
        /* ignore */
      }
      cache = seedPrograms;
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const repository: ProgramRepository = createLocalRepository();

/** All programs, including drafts (admin). */
export function useAllPrograms() {
  return useSyncExternalStore(repository.subscribe, repository.list, repository.list);
}

/** Published programs for the public site. */
export function usePublishedPrograms() {
  const all = useAllPrograms();
  return all.filter((p) => p.status === 'published');
}

/** Last moment of a program, or null when it has no date. */
function endsAt(p: Program) {
  const day = p.endDate || p.dateTime;
  if (!day) return null;
  const d = new Date(day.length <= 10 ? `${day}T23:59:59` : day);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Where a program belongs today. A dated program that has ended is always
 * Past, whatever it was filed under — so nothing over is shown as upcoming.
 */
export function effectiveListing(p: Program, now = new Date()): Program['listing'] {
  const end = endsAt(p);
  if (end) return end < now ? 'past' : 'upcoming';
  return p.listing;
}

export function sortPrograms(list: Program[], listing: Program['listing']) {
  const dir = listing === 'upcoming' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (!a.dateTime && !b.dateTime) return 0;
    if (!a.dateTime) return 1;
    if (!b.dateTime) return -1;
    return (new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()) * dir;
  });
}

export function formatProgramDate(dateTime: string, label?: string) {
  if (label) return label;
  if (!dateTime) return 'Date to be announced';
  const d = new Date(dateTime);
  if (Number.isNaN(d.getTime())) return dateTime;
  const hasTime = dateTime.includes('T') && !dateTime.endsWith('T00:00');
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(hasTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  });
}

export const newProgramId = () => `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
