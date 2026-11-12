import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Toaster } from 'sonner';
import { router } from '@/routes';
import './index.css';

const queryClient = new QueryClient();

async function enableMocking() {
    if (import.meta.env.VITE_USE_MOCKS !== 'true') return;
    const { worker } = await import('@/test/mocks/browser');
    await worker.start({ onUnhandledFrame: 'bypass' });
}

enableMocking().then(() => {
    const root = document.getElementById('root');
    if (!root) throw new Error('Root element not found');
    createRoot(root).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <NuqsAdapter>
                    <RouterProvider router={router} />
                </NuqsAdapter>
                <Toaster theme="dark" position="bottom-right" closeButton richColors />
            </QueryClientProvider>
        </StrictMode>,
    );
});
