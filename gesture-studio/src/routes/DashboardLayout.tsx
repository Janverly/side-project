import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { BookOpen, Hand, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/auth.store';

const LINKS = [
    { to: '/studio', label: 'Studio', icon: LayoutGrid },
    { to: '/shortcuts', label: 'Shortcuts', icon: SlidersHorizontal },
    { to: '/guide', label: 'Gesture guide', icon: BookOpen },
];

/** Everything inside needs a login. No token means: go to /login. */
export const DashboardLayout = () => {
    const token = useAuthStore((state) => state.token);
    if (!token) return <Navigate to="/login" replace />;

    return (
        <div className="app-shell">
            <a href="#main-content" className="skip-link">
                Skip to content
            </a>
            <Header />
            <div className="app-body">
                <aside className="sidebar">
                    <nav aria-label="Main navigation">
                        {LINKS.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
                            >
                                <link.icon size={18} />
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                    <div className="sidebar__card">
                        <Hand size={20} />
                        <strong>Hands-free zone</strong>
                        <p>Use the webcam to control the studio. No keyboard needed after login.</p>
                    </div>
                </aside>
                <main id="main-content" tabIndex={-1} className="app-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
