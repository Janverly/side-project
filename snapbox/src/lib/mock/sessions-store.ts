import { SESSION_STORAGE_KEY } from '@/lib/constants';
import type { Session, SessionInput } from '@/types';

/**
 * The fake database. Saved sessions live in localStorage (same key as the original SnapBox),
 * so they survive a reload even though the "server" is MSW running in the browser.
 */
const read = (): Session[] => {
    try {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Session[]) : [];
    } catch {
        return [];
    }
};

// Throws when the browser storage is full (photos are big). The handler turns that into an error reply.
const write = (items: Session[]) => localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(items));

const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const sessionsStore = {
    reset() {
        localStorage.removeItem(SESSION_STORAGE_KEY);
    },
    /** Newest first. `q` matches the name or the caption. */
    list(q = '') {
        const query = q.trim().toLowerCase();
        return read()
            .filter((s) => !query || s.name.toLowerCase().includes(query) || s.caption.toLowerCase().includes(query))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    get: (id: string) => read().find((s) => s.id === id),
    /** `excludeId` lets a session keep its own name when it is edited. */
    findByName: (name: string, excludeId?: string) =>
        read().find((s) => s.name.toLowerCase() === name.trim().toLowerCase() && s.id !== excludeId),
    create(input: SessionInput) {
        const item: Session = { ...input, id: newId(), createdAt: new Date().toISOString() };
        write([item, ...read()]);
        return item;
    },
    update(id: string, input: SessionInput) {
        const items = read();
        const idx = items.findIndex((s) => s.id === id);
        if (idx === -1) return undefined;
        items[idx] = { ...items[idx], ...input };
        write(items);
        return items[idx];
    },
    remove(id: string) {
        const items = read();
        const next = items.filter((s) => s.id !== id);
        if (next.length === items.length) return false;
        write(next);
        return true;
    },
};
