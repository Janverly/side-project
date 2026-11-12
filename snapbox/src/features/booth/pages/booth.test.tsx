import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PHOTO, seedSessions } from '@/test/seed';
import { renderSessionApp } from '@/test/utils';
import { useBoothStore } from '../hooks/booth.store';

describe('booth store', () => {
    it('keeps at most three photos and resets cleanly', () => {
        const { addPhoto, setDesign, reset } = useBoothStore.getState();
        ['a', 'b', 'c', 'd'].forEach(addPhoto);
        setDesign({ template: 'cocoa' });
        expect(useBoothStore.getState().photos).toEqual(['a', 'b', 'c']);
        expect(useBoothStore.getState().design.template).toBe('cocoa');
        reset();
        expect(useBoothStore.getState().photos).toEqual([]);
        expect(useBoothStore.getState().design.template).toBe('classic');
    });
});

describe('BoothPage', () => {
    it('starts with a disabled shutter and an empty counter', async () => {
        renderSessionApp('/booth');
        expect(await screen.findByRole('button', { name: 'Take photo' })).toBeDisabled();
        expect(screen.getByText('0 / 3')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled();
    });

    it('goes live when the browser grants the camera', async () => {
        const stop = vi.fn();
        const getUserMedia = vi.fn().mockResolvedValue({ getTracks: () => [{ stop }] });
        Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia }, configurable: true });
        renderSessionApp('/booth');
        await userEvent.click(await screen.findByRole('button', { name: 'Enable camera' }));
        expect(await screen.findByText('LIVE CAMERA')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Take photo' })).toBeEnabled();
    });

    it('explains a blocked camera and offers the phone camera', async () => {
        const getUserMedia = vi.fn().mockRejectedValue(Object.assign(new Error('no'), { name: 'NotAllowedError' }));
        Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia }, configurable: true });
        renderSessionApp('/booth');
        await userEvent.click(await screen.findByRole('button', { name: 'Enable camera' }));
        expect(await screen.findByText(/Camera access was blocked/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Use phone camera' })).toBeInTheDocument();
    });

    it('adds a photo from the phone camera and counts it', async () => {
        renderSessionApp('/booth');
        const file = new File(['x'], 'me.jpg', { type: 'image/jpeg' });
        await userEvent.upload(await screen.findByLabelText('Phone camera'), file);
        expect(await screen.findByAltText('Captured photo 1')).toBeInTheDocument();
        expect(screen.getByText('1 / 3')).toBeInTheDocument();
        expect(screen.getByText('2 photos remaining')).toBeInTheDocument();
    });

    it('Choose strip opens the customize screen with the photos taken so far', async () => {
        useBoothStore.getState().addPhoto(PHOTO);
        renderSessionApp('/booth');
        await userEvent.click(await screen.findByRole('button', { name: 'Choose strip' }));
        expect(await screen.findByRole('heading', { name: 'Style your strip.' })).toBeInTheDocument();
        expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    });
});

describe('CustomizePage', () => {
    const open = () => {
        useBoothStore.getState().addPhoto(PHOTO);
        renderSessionApp('/booth/customize');
    };

    it('changes the live preview as you pick design, filter, caption and background', async () => {
        open();
        await userEvent.click(await screen.findByRole('button', { name: /Cocoa/ }));
        await userEvent.click(screen.getByRole('button', { name: 'B&W' }));
        await userEvent.click(screen.getByRole('button', { name: 'Background mint' }));
        await userEvent.clear(screen.getByLabelText('Caption'));
        await userEvent.type(screen.getByLabelText('Caption'), 'Hello');
        const strip = screen.getByAltText('Photo 1').closest('.photo-strip') as HTMLElement;
        expect(strip).toHaveClass('template-cocoa', 'bg-mint');
        expect(strip.style.getPropertyValue('--photo-filter')).toBe('grayscale(1)');
        expect(within(strip).getByText('Hello')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cocoa/ })).toHaveAttribute('aria-pressed', 'true');
    });

    it('Save session asks for a name, saves, and lands on the sessions list', async () => {
        open();
        await userEvent.click(await screen.findByRole('button', { name: /Cocoa/ }));
        await userEvent.click(screen.getByRole('button', { name: /Save session/ }));
        await userEvent.type(screen.getByLabelText('Session name'), 'Friday night');
        await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Save session/ }));
        expect(await screen.findByRole('heading', { name: 'Friday night' })).toBeInTheDocument();
        expect(await screen.findByText('Session saved to your archive.')).toBeInTheDocument();
        expect(useBoothStore.getState().photos).toEqual([]);
    });

    it('shows "Name taken" under the name for a duplicate and stays put', async () => {
        seedSessions('Rex');
        open();
        await userEvent.click(await screen.findByRole('button', { name: /Save session/ }));
        await userEvent.type(screen.getByLabelText('Session name'), 'rex');
        await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Save session/ }));
        expect(await screen.findByText('Name taken')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('cannot save without photos', async () => {
        renderSessionApp('/booth/customize');
        await userEvent.click(await screen.findByRole('button', { name: /Save session/ }));
        expect(await screen.findByText('Take at least one photo before saving.')).toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('Retake photos clears the photos and goes back to the camera', async () => {
        open();
        await userEvent.click(await screen.findByRole('button', { name: 'Retake photos' }));
        expect(await screen.findByRole('heading', { name: /Make a little/ })).toBeInTheDocument();
        expect(useBoothStore.getState().photos).toEqual([]);
    });

    it('Print strip opens the print dialog', async () => {
        open();
        await userEvent.click(await screen.findByRole('button', { name: 'Print strip' }));
        expect(window.print).toHaveBeenCalled();
    });
});
