import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';

const makeClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });

export const renderWithProviders = (
    ui: ReactElement,
    { route = '/' }: { route?: string } = {},
) =>
    render(
        <QueryClientProvider client={makeClient()}>
            <NuqsTestingAdapter hasMemory>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </NuqsTestingAdapter>
        </QueryClientProvider>,
    );
