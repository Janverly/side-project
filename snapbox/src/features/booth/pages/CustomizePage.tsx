import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { StripDesigner } from '@/components/shared/StripDesigner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { downloadStripPng } from '@/lib/strip/download';
// Saving a booth session is a sessions-feature action, so this page uses that feature's hook and dialog.
import { SaveSessionModal } from '@/features/sessions/components/SaveSessionModal';
import { useCreateSession } from '@/features/sessions/hooks/useSessions';
import { mapSessionApiError, sessionApiErrorMessage } from '@/features/sessions/utils/mapSessionApiError';
import { useBoothStore } from '../hooks/booth.store';

export const CustomizePage = () => {
    useDocumentTitle('Style your strip');
    const navigate = useNavigate();
    const { photos, design, setDesign, reset } = useBoothStore();
    const { createSession, isCreating } = useCreateSession();
    const [saving, setSaving] = useState(false);

    const needPhotos = (action: string) => {
        if (photos.length) return false;
        toast(`Take a photo before ${action}.`);
        return true;
    };

    return (
        <section className="screen active customize-screen">
            <div className="section-heading">
                <div>
                    <p className="kicker">THE GOOD PART</p>
                    <h2>
                        Style your <em>strip.</em>
                    </h2>
                </div>
                <Link className="back-button" to="/booth">
                    ← Back to camera
                </Link>
            </div>

            <StripDesigner
                photos={photos}
                design={design}
                onDesignChange={setDesign}
                actions={
                    <>
                        <button className="outline-button" type="button" onClick={() => { reset(); navigate('/booth'); }}>
                            Retake photos
                        </button>
                        <button className="outline-button" type="button" onClick={() => !needPhotos('printing') && window.print()}>
                            Print strip
                        </button>
                        <button
                            className="outline-button"
                            type="button"
                            onClick={() =>
                                !needPhotos('downloading') &&
                                downloadStripPng({ ...design, photos }).then(
                                    () => toast('PNG downloaded.'),
                                    () => toast.error('Could not create the PNG.'),
                                )
                            }
                        >
                            Download PNG
                        </button>
                        <button
                            className="primary-button"
                            type="button"
                            onClick={() => (photos.length ? setSaving(true) : toast('Take at least one photo before saving.'))}
                        >
                            Save session <span>↗</span>
                        </button>
                    </>
                }
            />

            <SaveSessionModal
                open={saving}
                title="Name this moment"
                submitLabel="Save session"
                isSubmitting={isCreating}
                onClose={() => setSaving(false)}
                onSubmit={({ name }, setError) =>
                    createSession(
                        { name, ...design, photos },
                        {
                            onSuccess: () => {
                                toast.success('Session saved to your archive.');
                                reset();
                                navigate('/sessions');
                            },
                            onError: (e) => {
                                const mapped = mapSessionApiError(e);
                                if (mapped) setError(mapped.field, { message: mapped.message });
                                else toast.error(sessionApiErrorMessage(e, 'Could not save the session'));
                            },
                        },
                    )
                }
            />
        </section>
    );
};
