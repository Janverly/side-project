import type { CSSProperties } from 'react';
import { BOOTH_DEFAULT_CAPTION } from '@/lib/constants';
import { filterCss } from '@/lib/strip/strip';
import type { StripDesign } from '@/types';

type Props = { photos: string[]; design: StripDesign };

/** The photo strip, drawn the same way on the customize screen, in the details modal and when printing. */
export const PhotoStrip = ({ photos, design }: Props) => (
    <div
        className={`photo-strip template-${design.template} bg-${design.background}`}
        style={{ '--photo-filter': filterCss(design.filter) } as CSSProperties}
    >
        <div className="strip-head">
            SNAP<span>BOX</span>
            <small>YOUR MOMENT, YOUR WAY</small>
        </div>
        <div className="strip-photos">
            {photos.map((photo, index) => (
                <img key={index} className="strip-photo" src={photo} alt={`Photo ${index + 1}`} />
            ))}
        </div>
        <p className="strip-caption">{design.caption || BOOTH_DEFAULT_CAPTION}</p>
        <div className="strip-footer">
            SNAPBOX <span>✳</span> 2026
        </div>
    </div>
);
