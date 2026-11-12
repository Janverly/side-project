import { Link, useNavigate } from 'react-router-dom';
import { Hand, LogOut, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export const Header = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <header className="app-header">
            <Link to="/studio" className="brand" aria-label="Kinetic studio home">
                <span className="brand__mark" aria-hidden="true">
                    <Hand size={20} />
                </span>
                <span>KINETIC</span>
                <span className="brand__tag">hand studio</span>
            </Link>

            <div className="app-header__actions">
                <span className="privacy-chip">
                    <ShieldCheck size={14} /> Local only
                </span>
                {user && (
                    <span className="user-chip">
                        <span className="user-chip__avatar" aria-hidden="true">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="user-chip__name">{user.name}</span>
                    </span>
                )}
                <button
                    type="button"
                    className="btn btn--ghost btn--small"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                >
                    <LogOut size={15} /> Log out
                </button>
            </div>
        </header>
    );
};
