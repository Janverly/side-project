import { describe, expect, it } from 'vitest';
import type { SessionInput } from '@/types';
import { sessionService } from './sessionService';

const input = (name: string): SessionInput => ({
    name,
    caption: 'Hello',
    template: 'film',
    filter: 'warm',
    background: 'mint',
    photos: ['data:image/jpeg;base64,AAA'],
});

describe('sessionService', () => {
    it('getSessions starts empty', async () => {
        expect(await sessionService.getSessions()).toEqual([]);
    });
    it('createSession returns the new session and it shows in the list', async () => {
        const created = await sessionService.createSession(input('Luna'));
        expect(created).toMatchObject({ name: 'Luna', template: 'film' });
        expect((await sessionService.getSessions()).map((s) => s.name)).toEqual(['Luna']);
    });
    it('getSessions filters by name or caption', async () => {
        await sessionService.createSession(input('Luna'));
        await sessionService.createSession({ ...input('Rex'), caption: 'Good boy' });
        expect((await sessionService.getSessions('boy')).map((s) => s.name)).toEqual(['Rex']);
        expect((await sessionService.getSessions('luna')).map((s) => s.name)).toEqual(['Luna']);
    });
    it('rejects a duplicate name with a mapped error', async () => {
        await sessionService.createSession(input('Luna'));
        await expect(sessionService.createSession(input('luna'))).rejects.toMatchObject({
            code: 'PLE400',
            title: 'Name taken',
        });
    });
    it('rejects invalid input', async () => {
        await expect(sessionService.createSession({ ...input('Luna'), photos: [] })).rejects.toMatchObject({
            code: 'PVE400',
        });
    });
    it('updateSession allows keeping its own name', async () => {
        const { id } = await sessionService.createSession(input('Luna'));
        const updated = await sessionService.updateSession(id, { ...input('Luna'), caption: 'Updated' });
        expect(updated.caption).toBe('Updated');
    });
    it('deleteSession removes the session', async () => {
        const { id } = await sessionService.createSession(input('Luna'));
        await sessionService.deleteSession(id);
        await expect(sessionService.getSession(id)).rejects.toMatchObject({ code: 'PNF404' });
    });
});
