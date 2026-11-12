import { describe, expect, it } from 'vitest';
import { DEFAULT_SHORTCUTS } from '@/lib/constants/gesture';
import { useGestureShortcutsStore } from './useGestureShortcuts';

const store = () => useGestureShortcutsStore.getState();

describe('gesture shortcut store', () => {
    it('starts with the default shortcuts', () => {
        expect(store().shortcuts).toHaveLength(DEFAULT_SHORTCUTS.length);
        expect(store().shortcuts.map((shortcut) => shortcut.gesture)).toEqual([
            'thumbs_up',
            'peace',
            'open_palm',
            'fist',
        ]);
    });

    it('adds, updates, toggles and removes a shortcut', () => {
        store().addShortcut({ name: 'Party', gesture: 'peace', action: 'rainbow' });
        const added = store().shortcuts.at(-1);
        expect(added).toMatchObject({ name: 'Party', gesture: 'peace', action: 'rainbow', enabled: true });
        expect(added?.id).toMatch(/^shortcut-/);

        store().updateShortcut(added!.id, { name: 'Confetti', action: 'burst' });
        expect(store().shortcuts.at(-1)).toMatchObject({ name: 'Confetti', action: 'burst' });

        store().toggleShortcut(added!.id);
        expect(store().shortcuts.at(-1)?.enabled).toBe(false);

        store().removeShortcut(added!.id);
        expect(store().shortcuts.some((shortcut) => shortcut.id === added!.id)).toBe(false);
    });

    it('resets back to the defaults', () => {
        store().addShortcut({ name: 'Temporary', gesture: 'point', action: 'clear_drawing' });
        store().resetShortcuts();
        expect(store().shortcuts).toEqual(DEFAULT_SHORTCUTS);
    });
});
