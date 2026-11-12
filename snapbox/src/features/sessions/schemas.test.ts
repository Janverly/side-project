import { describe, expect, it } from 'vitest';
import { createSessionSchema, sessionNameSchema } from './schemas';

const valid = {
    name: 'Friday night',
    caption: 'A little memory',
    template: 'classic',
    filter: 'original',
    background: 'paper',
    photos: ['data:image/jpeg;base64,AAA'],
};

describe('createSessionSchema', () => {
    it('accepts valid input', () => {
        expect(createSessionSchema.safeParse(valid).success).toBe(true);
    });
    it('trims the name and rejects an empty one', () => {
        expect(createSessionSchema.parse({ ...valid, name: '  Luna ' }).name).toBe('Luna');
        expect(createSessionSchema.safeParse({ ...valid, name: '   ' }).success).toBe(false);
    });
    it('rejects names over the maximum', () => {
        expect(sessionNameSchema.safeParse('x'.repeat(35)).success).toBe(false);
        expect(sessionNameSchema.safeParse('x'.repeat(34)).success).toBe(true);
    });
    it('needs at least one photo and at most three', () => {
        expect(createSessionSchema.safeParse({ ...valid, photos: [] }).success).toBe(false);
        expect(createSessionSchema.safeParse({ ...valid, photos: ['a', 'b', 'c', 'd'] }).success).toBe(false);
    });
    it('rejects an unknown template', () => {
        expect(createSessionSchema.safeParse({ ...valid, template: 'neon' }).success).toBe(false);
    });
});
