import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import { Toaster } from 'sonner';
import { BoothPage } from '@/features/booth/pages/BoothPage';
import { CustomizePage } from '@/features/booth/pages/CustomizePage';
import { SessionDetailsModal } from '@/features/sessions/components/SessionDetailsModal';
import { EditSessionPage } from '@/features/sessions/pages/EditSessionPage';
import { SessionsPage } from '@/features/sessions/pages/SessionsPage';

const makeClient = () => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });

export const renderWithProviders = (ui: ReactElement, { route = '/' }: { route?: string } = {}) =>
    render(
        <QueryClientProvider client={makeClient()}>
            <NuqsTestingAdapter hasMemory>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </NuqsTestingAdapter>
            <Toaster />
        </QueryClientProvider>,
    );

/** Renders the real SnapBox routes (same shape as src/routes/index.tsx, without the login guard). */
export const renderSessionApp = (route = '/sessions') =>
    renderWithProviders(
        <Routes>
            <Route path="/booth" element={<BoothPage />} />
            <Route path="/booth/customize" element={<CustomizePage />} />
            <Route path="/sessions" element={<SessionsPage />}>
                <Route path=":id" element={<SessionDetailsModal />} />
            </Route>
            <Route path="/sessions/:id/edit" element={<EditSessionPage />} />
        </Routes>,
        { route },
    );
