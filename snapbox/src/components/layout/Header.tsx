import { NavLink, useNavigate } from 'react-router-dom';
import { useSessionCount } from '@/features/sessions/hooks/useSessions';
import { useAuthStore } from '@/store/auth.store';

const navClass = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? ' active' : ''}`;

export const Header = () => {
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const { data: count = 0 } = useSessionCount();

    return (
        <header className="topbar">
            <NavLink className="brand" to="/dashboard" aria-label="SnapBox home">
                <span className="brand-dot" />
                SNAP<span>BOX</span>
            </NavLink>
            <nav className="main-nav" aria-label="Main navigation">
                <NavLink className={navClass} to="/booth">
                    Photobooth
                </NavLink>
                <NavLink className={navClass} to="/sessions">
                    My sessions <span className="session-count">{count}</span>
                </NavLink>
            </nav>
            <div className="topbar-user">
                {user && <span className="user-name">{user.name}</span>}
                <button
                    type="button"
                    className="text-control"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                >
                    Log out
                </button>
            </div>
        </header>
    );
};
