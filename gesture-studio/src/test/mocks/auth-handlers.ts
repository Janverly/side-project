import { http } from 'msw';
import { fail, ok } from './helpers';

export const DEMO_USER = { id: 'u1', name: 'Demo User', email: 'demo@example.com' };
const DEMO_PASSWORD = 'password123';
const DEMO_TOKEN = 'demo-token';

export const authHandlers = [
    http.post('*/users/authenticate', async ({ request }) => {
        const body = (await request.json()) as { email?: string; password?: string };
        if (body.email === DEMO_USER.email && body.password === DEMO_PASSWORD) {
            return ok({ token: DEMO_TOKEN, user: DEMO_USER });
        }
        return fail('ALE401', 'Login failed', 'Wrong email or password', 401);
    }),

    http.get('*/users/me', ({ request }) =>
        request.headers.get('Authorization') === `Bearer ${DEMO_TOKEN}`
            ? ok(DEMO_USER)
            : fail('AUE401', 'Unauthorized', 'Please log in', 401),
    ),
];
