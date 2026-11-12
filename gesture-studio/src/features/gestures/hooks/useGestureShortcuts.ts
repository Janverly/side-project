import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_SHORTCUTS } from '@/lib/constants/gesture';
import type { GestureShortcut, ShortcutAction } from '@/types';

export type ShortcutDraft = {
    name: string;
    gesture: GestureShortcut['gesture'];
    action: ShortcutAction;
};

type State = {
    shortcuts: GestureShortcut[];
    addShortcut: (draft: ShortcutDraft) => void;
    updateShortcut: (id: string, patch: Partial<Omit<GestureShortcut, 'id'>>) => void;
    removeShortcut: (id: string) => void;
    toggleShortcut: (id: string) => void;
    resetShortcuts: () => void;
};

const makeId = () => `shortcut-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const seed = (): GestureShortcut[] => DEFAULT_SHORTCUTS.map((shortcut) => ({ ...shortcut }));

// Persisted on purpose: custom shortcuts survive a reload.
export const useGestureShortcutsStore = create<State>()(
    persist(
        (set) => ({
            shortcuts: seed(),
            addShortcut: (draft) =>
                set((state) => ({
                    shortcuts: [
                        ...state.shortcuts,
                        { ...draft, id: makeId(), enabled: true },
                    ],
                })),
            updateShortcut: (id, patch) =>
                set((state) => ({
                    shortcuts: state.shortcuts.map((shortcut) =>
                        shortcut.id === id ? { ...shortcut, ...patch } : shortcut,
                    ),
                })),
            removeShortcut: (id) =>
                set((state) => ({
                    shortcuts: state.shortcuts.filter((shortcut) => shortcut.id !== id),
                })),
            toggleShortcut: (id) =>
                set((state) => ({
                    shortcuts: state.shortcuts.map((shortcut) =>
                        shortcut.id === id ? { ...shortcut, enabled: !shortcut.enabled } : shortcut,
                    ),
                })),
            resetShortcuts: () => set({ shortcuts: seed() }),
        }),
        { name: 'kinetic-shortcuts' },
    ),
);
