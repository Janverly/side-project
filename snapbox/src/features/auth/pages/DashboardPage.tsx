import { Link } from 'react-router-dom';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useMe } from '../hooks/useAuth';

export const DashboardPage = () => {
    useDocumentTitle('Dashboard');
    const { data: me, isLoading } = useMe();

    return (
        <section className="screen active dashboard-screen">
            <p className="kicker">DIGITAL MEMORY MAKER</p>
            <h1 className="page-title">
                Say <em>cheese.</em>
            </h1>
            {isLoading && <LoadingSpinner />}
            {me && <p className="intro-text">Welcome back, {me.name}</p>}
            <div className="dashboard-actions">
                <Link className="primary-button" to="/booth">
                    Open photobooth <span>↗</span>
                </Link>
                <Link className="outline-button" to="/sessions">
                    My sessions
                </Link>
            </div>
        </section>
    );
};
