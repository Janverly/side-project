import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Modal } from '@/components/shared/Modal';
import { PhotoStrip } from '@/components/shared/PhotoStrip';
import { downloadStripPng } from '@/lib/strip/download';
import { formatDate } from '@/lib/strip/strip';
import { sessionKeys, useDeleteSession, useSession } from '../hooks/useSessions';

/** Renders inside the sessions list page's <Outlet />, so the list stays visible behind it. */
export const SessionDetailsModal = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const qc = useQueryClient();
    const { data: session, isLoading, isError } = useSession(id);
    const { deleteSession, isDeleting } = useDeleteSession(id);

    const close = () => navigate('/sessions');

    const handleDelete = () => {
        if (!window.confirm('Delete this photo session?')) return;
        deleteSession(undefined, {
            onSuccess: () => {
                close();
                qc.removeQueries({ queryKey: sessionKeys.detail(id) }); // after leaving, so no refetch
                toast('Session deleted.');
            },
            onError: () => toast.error('Could not delete the session.'),
        });
    };

    return (
        <Modal open wide onClose={close} title={session?.name ?? 'Session details'} kicker={session ? formatDate(session.createdAt) : undefined}>
            {isLoading && <LoadingSpinner />}
            {isError && <p role="alert">Could not load this session.</p>}
            {session && (
                <div className="details">
                    <div className="strip-stage">
                        <div className="print-area">
                            <PhotoStrip photos={session.photos} design={session} />
                        </div>
                    </div>
                    <div className="dialog-actions details-actions">
                        <Link className="outline-button" to={`/sessions/${id}/edit`}>
                            Edit
                        </Link>
                        <button className="outline-button" type="button" onClick={() => window.print()}>
                            Print
                        </button>
                        <button
                            className="outline-button"
                            type="button"
                            onClick={() =>
                                downloadStripPng(session).then(
                                    () => toast('PNG downloaded.'),
                                    () => toast.error('Could not create the PNG.'),
                                )
                            }
                        >
                            Download PNG
                        </button>
                        <button className="primary-button" type="button" disabled={isDeleting} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
