import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { PhotoStrip } from '@/components/shared/PhotoStrip';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useBoothStore } from '@/features/booth/hooks/booth.store';
import type { Session } from '@/types';
import { SessionGrid } from '../components/SessionGrid';
import { useSessionCount, useSessions } from '../hooks/useSessions';
import { useSessionSearch } from '../hooks/useSessionSearch';

export const SessionsPage = () => {
    useDocumentTitle('My sessions');
    const [q, setQ] = useSessionSearch();
    const { data: sessions, isLoading, isError } = useSessions(q);
    const { data: total = 0 } = useSessionCount();
    const resetBooth = useBoothStore((s) => s.reset);
    const [printing, setPrinting] = useState<Session | null>(null);

    // A card's Print button renders that strip off-screen, prints, then clears it.
    useEffect(() => {
        if (!printing) return;
        const frame = requestAnimationFrame(() => {
            window.print();
            setPrinting(null);
        });
        return () => cancelAnimationFrame(frame);
    }, [printing]);

    return (
        <section className="screen active sessions-screen">
            <div className="section-heading sessions-heading">
                <div>
                    <p className="kicker">YOUR ARCHIVE</p>
                    <h1 className="page-title">
                        My photo <em>sessions.</em>
                    </h1>
                    <p className="section-subtitle">The little moments worth keeping close.</p>
                </div>
                <Link className="primary-button" to="/booth" onClick={resetBooth}>
                    New session <span>+</span>
                </Link>
            </div>

            <div className="sessions-toolbar">
                <span>
                    <strong>{total}</strong> saved sessions
                </span>
                <label className="search-box">
                    <span aria-hidden="true">⌕</span>
                    <input aria-label="Search sessions" placeholder="Search sessions" value={q} onChange={(e) => setQ(e.target.value || null)} />
                </label>
            </div>

            {isLoading && <LoadingSpinner />}
            {isError && <p role="alert">Could not load your sessions.</p>}
            {sessions && sessions.length > 0 && <SessionGrid sessions={sessions} onPrint={setPrinting} />}
            {sessions && sessions.length === 0 && (
                <EmptyState title="No memories here yet." text="Your next favorite photo strip starts with one click.">
                    <Link className="primary-button" to="/booth" onClick={resetBooth}>
                        Open photobooth <span>↗</span>
                    </Link>
                </EmptyState>
            )}

            {printing && (
                <div className="print-area print-only">
                    <PhotoStrip photos={printing.photos} design={printing} />
                </div>
            )}

            <Outlet />
        </section>
    );
};
