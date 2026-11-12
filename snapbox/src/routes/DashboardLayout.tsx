import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/auth.store';

/** Everything inside needs a login. No token means: go to /login. The top bar holds the feature links. */
export const DashboardLayout = () => {
    const token = useAuthStore((s) => s.token);
    if (!token) return <Navigate to="/login" replace />;

    return (
        <div className="app-shell">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
