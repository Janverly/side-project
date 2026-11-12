import { http } from 'msw';
import { createSessionSchema } from '@/features/sessions/schemas';
import { sessionsStore } from '@/lib/mock/sessions-store';
import { fail, ok } from './helpers';

// Paths start with /api on purpose: `*/sessions/:id` alone would also match Vite's own
// module requests such as /src/features/sessions/schemas.ts in the browser.
const storageFull = () =>
    fail('PSE507', 'Storage full', 'Your browser storage is full. Delete a session and try again.', 507);

export const sessionHandlers = [
    http.get('*/api/sessions', ({ request }) => ok(sessionsStore.list(new URL(request.url).searchParams.get('q') ?? ''))),

    http.get('*/api/sessions/:id', ({ params }) => {
        const item = sessionsStore.get(String(params.id));
        return item ? ok(item) : fail('PNF404', 'Not found', 'Session not found', 404);
    }),

    http.post('*/api/sessions', async ({ request }) => {
        const parsed = createSessionSchema.safeParse(await request.json());
        if (!parsed.success) return fail('PVE400', 'Invalid', parsed.error.issues[0].message);
        if (sessionsStore.findByName(parsed.data.name)) return fail('PLE400', 'Name taken', 'Name taken');
        try {
            return ok(sessionsStore.create(parsed.data), 'VS201', 201);
        } catch {
            return storageFull();
        }
    }),

    http.put('*/api/sessions/:id', async ({ request, params }) => {
        const id = String(params.id);
        const parsed = createSessionSchema.safeParse(await request.json());
        if (!parsed.success) return fail('PVE400', 'Invalid', parsed.error.issues[0].message);
        if (sessionsStore.findByName(parsed.data.name, id)) return fail('PLE400', 'Name taken', 'Name taken');
        try {
            const item = sessionsStore.update(id, parsed.data);
            return item ? ok(item) : fail('PNF404', 'Not found', 'Session not found', 404);
        } catch {
            return storageFull();
        }
    }),

    http.delete('*/api/sessions/:id', ({ params }) =>
        sessionsStore.remove(String(params.id)) ? ok(null) : fail('PNF404', 'Not found', 'Session not found', 404),
    ),
];
