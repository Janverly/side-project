import { NavLink, Outlet } from 'react-router-dom';

/** Pages anyone can see (login). Just the brand, no navigation. */
export const PublicLayout = () => (
    <div className="app-shell">
        <header className="topbar">
            <NavLink className="brand" to="/login" aria-label="SnapBox">
                <span className="brand-dot" />
                SNAP<span>BOX</span>
            </NavLink>
            <div className="topbar-note">
                DIGITAL MEMORY MAKER <span>✳</span>
            </div>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
);
