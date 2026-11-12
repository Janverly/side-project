import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { StripDesigner } from '@/components/shared/StripDesigner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { downloadStripPng } from '@/lib/strip/download';
import type { Session, StripDesign } from '@/types';
import { SaveSessionModal } from '../components/SaveSessionModal';
import { useSession, useUpdateSession } from '../hooks/useSessions';
import { mapSessionApiError, sessionApiErrorMessage } from '../utils/mapSessionApiError';

// Split out so the design state starts from the loaded session (hooks can't run before the data exists).
const EditSession = ({ session }: { session: Session }) => {
    const navigate = useNavigate();
    const { updateSession, isUpdating } = useUpdateSession(session.id);
    const [design, setDesign] = useState<StripDesign>({
        template: session.template,
        filter: session.filter,
        background: session.background,
        caption: session.caption,
    });
    const [saving, setSaving] = useState(false);

    return (
        <section className="screen active customize-screen">
            <div className="section-heading">
                <div>
                    <p className="kicker">EDITING {session.name.toUpperCase()}</p>
                    <h2>
                        Style your <em>strip.</em>
                    </h2>
                </div>
                <Link className="back-button" to="/sessions">
                    ← Back to sessions
                </Link>
            </div>

            <StripDesigner
                photos={session.photos}
                design={design}
                onDesignChange={(change) => setDesign((d) => ({ ...d, ...change }))}
                actions={
                    <>
                        <button className="outline-button" type="button" onClick={() => window.print()}>
                            Print strip
                        </button>
                        <button
                            className="outline-button"
                            type="button"
                            onClick={() =>
                                downloadStripPng({ ...design, photos: session.photos, name: session.name }).then(
                                    () => toast('PNG downloaded.'),
                                    () => toast.error('Could not create the PNG.'),
                                )
                            }
                        >
                            Download PNG
                        </button>
                        <button className="primary-button" type="button" onClick={() => setSaving(true)}>
                            Save changes <span>↗</span>
                        </button>
                    </>
                }
            />

            <SaveSessionModal
                open={saving}
                title="Name this moment"
                submitLabel="Save changes"
                defaultName={session.name}
                isSubmitting={isUpdating}
                onClose={() => setSaving(false)}
                onSubmit={({ name }, setError) =>
                    updateSession(
                        { name, ...design, photos: session.photos },
                        {
                            onSuccess: () => {
                                toast.success('Session updated.');
                                navigate('/sessions');
                            },
                            onError: (e) => {
                                const mapped = mapSessionApiError(e);
                                if (mapped) setError(mapped.field, { message: mapped.message });
                                else toast.error(sessionApiErrorMessage(e, 'Could not save changes'));
                            },
                        },
                    )
                }
            />
        </section>
    );
};

export const EditSessionPage = () => {
    useDocumentTitle('Edit session');
    const { id = '' } = useParams();
    const { data: session, isLoading } = useSession(id);

    if (isLoading) return <LoadingSpinner />;
    if (!session) return <p role="alert">Session not found.</p>;
    return <EditSession key={session.id} session={session} />;
};
