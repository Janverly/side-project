import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderSessionApp } from '@/test/utils';
import { seedSessions } from '@/test/seed';

const cardTitles = () => screen.getAllByRole('article').map((a) => within(a).getByRole('heading').textContent);

describe('SessionsPage', () => {
    it('shows the empty state when nothing is saved', async () => {
        renderSessionApp();
        expect(await screen.findByText('No memories here yet.')).toBeInTheDocument();
        expect(screen.getByText('saved sessions').closest('span')).toHaveTextContent('0 saved sessions');
    });

    it('lists saved sessions, newest first, with the total', async () => {
        seedSessions('First', 'Second', 'Third');
        renderSessionApp();
        await screen.findByText('Third');
        expect(cardTitles()).toEqual(['Third', 'Second', 'First']);
        expect(screen.getByText('saved sessions').closest('span')).toHaveTextContent('3 saved sessions');
    });

    it('search filters the list but not the total', async () => {
        seedSessions('Friday night', 'Beach day');
        renderSessionApp();
        await screen.findByText('Beach day');
        await userEvent.type(screen.getByLabelText('Search sessions'), 'beach');
        await vi.waitFor(() => expect(cardTitles()).toEqual(['Beach day']));
        expect(screen.getByText('saved sessions').closest('span')).toHaveTextContent('2 saved sessions');
    });

    it('a card links to its details and edit pages', async () => {
        const [luna] = seedSessions('Luna');
        renderSessionApp();
        const card = within(await screen.findByRole('article'));
        expect(card.getByRole('link', { name: /View strip/ })).toHaveAttribute('href', `/sessions/${luna.id}`);
        expect(card.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', `/sessions/${luna.id}/edit`);
    });

    it('delete on a card asks first, then removes it', async () => {
        const confirm = vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
        seedSessions('Luna');
        renderSessionApp();
        const card = within(await screen.findByRole('article'));
        await userEvent.click(card.getByRole('button', { name: 'Delete' }));
        expect(screen.getByRole('article')).toBeInTheDocument(); // cancelled
        await userEvent.click(card.getByRole('button', { name: 'Delete' }));
        expect(await screen.findByText('No memories here yet.')).toBeInTheDocument();
        expect(confirm).toHaveBeenCalledTimes(2);
    });

    it('print on a card prints that strip', async () => {
        seedSessions('Luna');
        renderSessionApp();
        await userEvent.click(within(await screen.findByRole('article')).getByRole('button', { name: 'Print' }));
        await vi.waitFor(() => expect(window.print).toHaveBeenCalled());
    });

    it('New session goes to the camera and starts fresh', async () => {
        renderSessionApp();
        await userEvent.click(await screen.findByRole('link', { name: /New session/ }));
        expect(await screen.findByRole('heading', { name: /Make a little/ })).toBeInTheDocument();
    });
});

describe('EditSessionPage', () => {
    it('loads the session and saves changes with the same name', async () => {
        const [luna] = seedSessions('Luna');
        renderSessionApp(`/sessions/${luna.id}/edit`);
        await userEvent.click(await screen.findByRole('button', { name: 'Vintage' }));
        await userEvent.clear(screen.getByLabelText('Caption'));
        await userEvent.type(screen.getByLabelText('Caption'), 'Edited');
        await userEvent.click(screen.getByRole('button', { name: /Save changes/ }));
        expect(screen.getByLabelText('Session name')).toHaveValue('Luna');
        await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Save changes/ }));
        expect(await screen.findByText('Session updated.')).toBeInTheDocument();
        const card = within(await screen.findByRole('article'));
        await vi.waitFor(() => expect(card.getByText(/Edited/)).toBeInTheDocument());
    });

    it("rejects another session's name", async () => {
        const [, rex] = seedSessions('Luna', 'Rex');
        renderSessionApp(`/sessions/${rex.id}/edit`);
        await userEvent.click(await screen.findByRole('button', { name: /Save changes/ }));
        const name = screen.getByLabelText('Session name');
        await userEvent.clear(name);
        await userEvent.type(name, 'luna');
        await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Save changes/ }));
        expect(await screen.findByText('Name taken')).toBeInTheDocument();
    });

    it('shows not found for an unknown session', async () => {
        renderSessionApp('/sessions/nope/edit');
        expect(await screen.findByText('Session not found.')).toBeInTheDocument();
    });
});
