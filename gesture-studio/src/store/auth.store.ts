import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

type State = {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
};

// App-wide client state. Persisted on purpose: a reload keeps you logged in.
export const useAuthStore = create<State>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
        }),
        { name: 'kinetic-auth' },
    ),
);
