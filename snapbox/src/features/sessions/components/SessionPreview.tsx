import type { CSSProperties } from 'react';
import { backgroundColor, filterCss } from '@/lib/strip/strip';
import type { Session } from '@/types';

/** The small card thumbnail: the photos side by side on the strip's background. */
export const SessionPreview = ({ session }: { session: Session }) => (
    <div
        className={`session-preview template-${session.template} bg-${session.background}`}
        style={{ '--session-bg': backgroundColor(session.background), '--session-filter': filterCss(session.filter) } as CSSProperties}
    >
        {session.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${session.name} photo ${index + 1}`} />
        ))}
    </div>
);
