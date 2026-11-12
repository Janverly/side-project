import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderSessionApp } from '@/test/utils';
import { seedSessions } from '@/test/seed';

const openModal = async (name: string) => within(await screen.findByRole('dialog', { name }));

it('opens on top of the list with the strip and its actions', async () => {
    const [luna] = seedSessions('Luna');
    renderSessionApp(`/sessions/${luna.id}`);
    const dialog = await openModal('Luna');
    expect(screen.getByRole('heading', { name: /My photo sessions/ })).toBeInTheDocument(); // list still behind
    expect(dialog.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', `/sessions/${luna.id}/edit`);
    expect(dialog.getByAltText('Photo 1')).toBeInTheDocument();
});

it('print opens the print dialog', async () => {
    const [luna] = seedSessions('Luna');
    renderSessionApp(`/sessions/${luna.id}`);
    await userEvent.click((await openModal('Luna')).getByRole('button', { name: 'Print' }));
    expect(window.print).toHaveBeenCalled();
});

it('delete removes the session and closes the modal', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const [luna] = seedSessions('Luna', 'Rex');
    renderSessionApp(`/sessions/${luna.id}`);
    await userEvent.click((await openModal('Luna')).getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText('Session deleted.')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Luna' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rex' })).toBeInTheDocument();
});

it('cancelling the confirm keeps the session', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const [luna] = seedSessions('Luna');
    renderSessionApp(`/sessions/${luna.id}`);
    await userEvent.click((await openModal('Luna')).getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog', { name: 'Luna' })).toBeInTheDocument();
});

it('shows an error for a session that does not exist', async () => {
    renderSessionApp('/sessions/nope');
    expect(await screen.findByText('Could not load this session.')).toBeInTheDocument();
});
