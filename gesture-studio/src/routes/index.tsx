import { Suspense, lazy, type ComponentType } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { DashboardLayout } from './DashboardLayout';
import { PublicLayout } from './PublicLayout';
import { NotFound } from './NotFound';

const LoginPage = lazy(() =>
    import('@/features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage })),
);
const StudioPage = lazy(() =>
    import('@/features/gestures/pages/StudioPage').then((module) => ({ default: module.StudioPage })),
);
const ShortcutsPage = lazy(() =>
    import('@/features/gestures/pages/ShortcutsPage').then((module) => ({
        default: module.ShortcutsPage,
    })),
);
const GuidePage = lazy(() =>
    import('@/features/gestures/pages/GuidePage').then((module) => ({ default: module.GuidePage })),
);

export const lazyElement = (Component: ComponentType) => (
    <Suspense fallback={<LoadingSpinner />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/studio" replace /> },
    {
        element: <PublicLayout />,
        children: [{ path: '/login', element: lazyElement(LoginPage) }],
    },
    {
        element: <DashboardLayout />,
        children: [
            { path: '/studio', element: lazyElement(StudioPage) },
            { path: '/shortcuts', element: lazyElement(ShortcutsPage) },
            { path: '/guide', element: lazyElement(GuidePage) },
        ],
    },
    { path: '*', element: <NotFound /> },
]);
