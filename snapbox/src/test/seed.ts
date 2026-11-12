import { sessionsStore } from '@/lib/mock/sessions-store';
import type { SessionInput } from '@/types';

export const PHOTO = 'data:image/jpeg;base64,/9j/AAA';

export const sessionInput = (name: string, extra: Partial<SessionInput> = {}): SessionInput => ({
    name,
    caption: 'A little memory',
    template: 'classic',
    filter: 'original',
    background: 'paper',
    photos: [PHOTO],
    ...extra,
});

/** Puts sessions straight into the fake database (oldest first, so the last one is the newest). */
export const seedSessions = (...names: string[]) => names.map((n) => sessionsStore.create(sessionInput(n)));
