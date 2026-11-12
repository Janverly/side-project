import { Suspense, lazy, type ComponentType } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { DashboardLayout } from './DashboardLayout';
import { PublicLayout } from './PublicLayout';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/features/auth/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const BoothPage = lazy(() => import('@/features/booth/pages/BoothPage').then((m) => ({ default: m.BoothPage })));
const CustomizePage = lazy(() => import('@/features/booth/pages/CustomizePage').then((m) => ({ default: m.CustomizePage })));
const SessionsPage = lazy(() => import('@/features/sessions/pages/SessionsPage').then((m) => ({ default: m.SessionsPage })));
const EditSessionPage = lazy(() => import('@/features/sessions/pages/EditSessionPage').then((m) => ({ default: m.EditSessionPage })));
const SessionDetailsModal = lazy(() =>
    import('@/features/sessions/components/SessionDetailsModal').then((m) => ({ default: m.SessionDetailsModal })),
);

export const lazyElement = (Component: ComponentType) => (
    <Suspense fallback={<LoadingSpinner />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/dashboard" replace /> },
    {
        // No login needed
        element: <PublicLayout />,
        children: [{ path: '/login', element: lazyElement(LoginPage) }],
    },
    {
        // Login needed (DashboardLayout redirects to /login when logged out)
        element: <DashboardLayout />,
        children: [
            { path: '/dashboard', element: lazyElement(DashboardPage) },
            { path: '/booth', element: lazyElement(BoothPage) },
            { path: '/booth/customize', element: lazyElement(CustomizePage) },
            {
                path: '/sessions',
                element: lazyElement(SessionsPage),
                // Nested: the details modal renders inside the list page's <Outlet />.
                children: [{ path: ':id', element: lazyElement(SessionDetailsModal) }],
            },
            // A sibling, not a child: the editor is a full page with no list behind it.
            { path: '/sessions/:id/edit', element: lazyElement(EditSessionPage) },
        ],
    },
    { path: '*', element: <p>Page not found</p> },
]);
