import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/utils';
import { SaveSessionModal } from './SaveSessionModal';

const setup = (onSubmit = vi.fn(), defaultName?: string) => {
    renderWithProviders(
        <SaveSessionModal open title="Name this moment" submitLabel="Save session" defaultName={defaultName} onClose={vi.fn()} onSubmit={onSubmit} />,
    );
    return onSubmit;
};

it('shows an error and sends nothing when the name is empty', async () => {
    const onSubmit = setup();
    await userEvent.click(screen.getByRole('button', { name: /Save session/ }));
    expect(await screen.findByText('Session name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
});

it('submits the trimmed name', async () => {
    const onSubmit = setup();
    await userEvent.type(screen.getByLabelText('Session name'), '  Friday night ');
    await userEvent.click(screen.getByRole('button', { name: /Save session/ }));
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Friday night' }, expect.any(Function));
});

it('is prefilled when editing', () => {
    setup(vi.fn(), 'Luna');
    expect(screen.getByLabelText('Session name')).toHaveValue('Luna');
});
