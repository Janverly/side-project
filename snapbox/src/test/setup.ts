import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { useBoothStore } from '@/features/booth/hooks/booth.store';
import { sessionsStore } from '@/lib/mock/sessions-store';
import { useAuthStore } from '@/store/auth.store';
import { server } from './mocks/server';

beforeAll(() => {
    server.listen({ onUnhandledFrame: 'error' });
    window.print = vi.fn(); // jsdom has no printing
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
    useAuthStore.setState({ token: null, user: null });
    localStorage.clear();
    sessionsStore.reset(); // the fake database
    useBoothStore.getState().reset(); // so photos don't leak between tests
    vi.restoreAllMocks();
});

afterAll(() => server.close());
