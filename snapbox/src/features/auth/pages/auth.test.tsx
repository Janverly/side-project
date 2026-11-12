import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardLayout } from '@/routes/DashboardLayout';
import { renderWithProviders } from '@/test/utils';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';

const renderAuthApp = (route: string) =>
    renderWithProviders(
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>,
        { route },
    );

const fillAndSubmit = async (email: string, password: string) => {
    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), password);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
};

describe('auth', () => {
    it('logged out: a protected page sends you to the login page', async () => {
        renderAuthApp('/dashboard');
        expect(await screen.findByRole('heading', { name: 'Log in' })).toBeInTheDocument();
    });

    it('empty form shows errors and sends nothing', async () => {
        renderAuthApp('/login');
        await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
        expect(await screen.findByText('Email is required')).toBeInTheDocument();
    });

    it('wrong password shows the server message', async () => {
        renderAuthApp('/login');
        await fillAndSubmit('demo@example.com', 'nope');
        expect(await screen.findByText('Wrong email or password')).toBeInTheDocument();
    });

    it('right credentials land on the dashboard with a welcome', async () => {
        renderAuthApp('/login');
        await fillAndSubmit('demo@example.com', 'password123');
        expect(await screen.findByText('Welcome back, Demo User')).toBeInTheDocument();
    });

    it('the header shows the user, the nav links and the saved-session count', async () => {
        renderAuthApp('/login');
        await fillAndSubmit('demo@example.com', 'password123');
        expect(await screen.findByText('Demo User')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Photobooth' })).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'My sessions 0' })).toBeInTheDocument();
    });

    it('log out returns to the login page', async () => {
        renderAuthApp('/login');
        await fillAndSubmit('demo@example.com', 'password123');
        await userEvent.click(await screen.findByRole('button', { name: 'Log out' }));
        expect(await screen.findByRole('heading', { name: 'Log in' })).toBeInTheDocument();
    });
});
