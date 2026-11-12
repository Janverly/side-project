import { describe, expect, it } from 'vitest';
import { shortcutSchema } from './schemas';

describe('shortcutSchema', () => {
    it('accepts a valid shortcut', () => {
        const parsed = shortcutSchema.safeParse({ name: 'Big bang', gesture: 'peace', action: 'burst' });
        expect(parsed.success).toBe(true);
    });

    it('trims the name', () => {
        const parsed = shortcutSchema.parse({ name: '  Zap  ', gesture: 'fist', action: 'freeze' });
        expect(parsed.name).toBe('Zap');
    });

    it('rejects short names and unknown gestures or actions', () => {
        expect(shortcutSchema.safeParse({ name: 'Z', gesture: 'peace', action: 'burst' }).success).toBe(
            false,
        );
        expect(
            shortcutSchema.safeParse({ name: 'Valid', gesture: 'none', action: 'burst' }).success,
        ).toBe(false);
        expect(
            shortcutSchema.safeParse({ name: 'Valid', gesture: 'peace', action: 'self_destruct' })
                .success,
        ).toBe(false);
    });
});
