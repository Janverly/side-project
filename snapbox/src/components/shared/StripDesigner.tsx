import type { ReactNode } from 'react';
import { SESSION_CAPTION_MAX, STRIP_BACKGROUNDS, STRIP_FILTERS, STRIP_TEMPLATES } from '@/lib/constants';
import type { StripDesign } from '@/types';
import { PhotoStrip } from './PhotoStrip';

type Props = {
    photos: string[];
    design: StripDesign;
    onDesignChange: (change: Partial<StripDesign>) => void;
    /** The row of buttons under the controls (Retake, Print, Download, Save...). */
    actions: ReactNode;
};

/** "Style your strip": live preview on the left, the four controls on the right. Fully controlled. */
export const StripDesigner = ({ photos, design, onDesignChange, actions }: Props) => (
    <div className="customize-layout">
        <div className="strip-stage">
            <div className="print-area">
                <PhotoStrip photos={photos} design={design} />
            </div>
        </div>

        <div className="controls-panel">
            <div className="control-group">
                <div className="control-label">
                    <span>01</span>
                    <strong>Strip design</strong>
                </div>
                <div className="choice-grid template-choices">
                    {STRIP_TEMPLATES.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            className={`choice${design.template === t.id ? ' active' : ''}`}
                            aria-pressed={design.template === t.id}
                            onClick={() => onDesignChange({ template: t.id })}
                        >
                            <span className={`design-preview design-${t.id}`}>
                                <i />
                                <i />
                                <i />
                            </span>
                            <b>{t.label}</b>
                            <small>{t.hint}</small>
                        </button>
                    ))}
                </div>
            </div>

            <div className="control-group">
                <div className="control-label">
                    <span>02</span>
                    <strong>Filter</strong>
                </div>
                <div className="filter-row">
                    {STRIP_FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            className={`filter-choice${design.filter === f.id ? ' active' : ''}`}
                            aria-pressed={design.filter === f.id}
                            onClick={() => onDesignChange({ filter: f.id })}
                        >
                            <i className={`filter-swatch ${f.id}`} />
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="control-group">
                <div className="control-label">
                    <span>03</span>
                    <strong>Caption</strong>
                </div>
                <input
                    className="caption-input"
                    aria-label="Caption"
                    maxLength={SESSION_CAPTION_MAX}
                    value={design.caption}
                    placeholder="Write a caption..."
                    onChange={(e) => onDesignChange({ caption: e.target.value })}
                />
            </div>

            <div className="control-group">
                <div className="control-label">
                    <span>04</span>
                    <strong>Background</strong>
                </div>
                <div className="background-row">
                    {STRIP_BACKGROUNDS.map((b) => (
                        <button
                            key={b.id}
                            type="button"
                            className={`background-choice ${b.id}${design.background === b.id ? ' active' : ''}`}
                            aria-label={`Background ${b.id}`}
                            aria-pressed={design.background === b.id}
                            onClick={() => onDesignChange({ background: b.id })}
                        />
                    ))}
                </div>
            </div>

            <div className="action-row">{actions}</div>
        </div>
    </div>
);
