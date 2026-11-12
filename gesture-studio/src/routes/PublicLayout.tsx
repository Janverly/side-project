import { Outlet } from 'react-router-dom';

/** Pages anyone can see (login). */
export const PublicLayout = () => (
    <div className="public-shell">
        <main>
            <Outlet />
        </main>
    </div>
);
