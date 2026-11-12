import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { downloadStripPng } from '@/lib/strip/download';
import { formatDate } from '@/lib/strip/strip';
import type { Session } from '@/types';
import { useDeleteSession } from '../hooks/useSessions';
import { SessionPreview } from './SessionPreview';

type CardProps = { session: Session; onPrint: (session: Session) => void };

const SessionCard = ({ session, onPrint }: CardProps) => {
    const { deleteSession, isDeleting } = useDeleteSession(session.id);

    const handleDelete = () => {
        if (!window.confirm('Delete this photo session?')) return;
        deleteSession(undefined, {
            onSuccess: () => toast('Session deleted.'),
            onError: () => toast.error('Could not delete the session.'),
        });
    };

    return (
        <article className="session-card">
            <SessionPreview session={session} />
            <div className="session-info">
                <h3>{session.name}</h3>
                <p>
                    {formatDate(session.createdAt)} · {session.caption}
                </p>
                <div className="session-actions">
                    <Link to={`/sessions/${session.id}`}>View strip ↗</Link>
                    <Link to={`/sessions/${session.id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => onPrint(session)}>
                        Print
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            downloadStripPng(session).then(
                                () => toast('PNG downloaded.'),
                                () => toast.error('Could not create the PNG.'),
                            )
                        }
                    >
                        PNG
                    </button>
                    <button type="button" className="delete" disabled={isDeleting} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

type Props = { sessions: Session[]; onPrint: (session: Session) => void };

export const SessionGrid = ({ sessions, onPrint }: Props) => (
    <div className="sessions-grid">
        {sessions.map((session) => (
            <SessionCard key={session.id} session={session} onPrint={onPrint} />
        ))}
    </div>
);
