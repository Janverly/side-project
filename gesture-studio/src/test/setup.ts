import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { useAuthStore } from '@/store/auth.store';
import { useGestureShortcutsStore } from '@/features/gestures/hooks/useGestureShortcuts';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));

afterEach(() => {
    cleanup();
    server.resetHandlers();
    useAuthStore.setState({ token: null, user: null });
    useGestureShortcutsStore.getState().resetShortcuts();
    localStorage.clear();
});

afterAll(() => server.close());
