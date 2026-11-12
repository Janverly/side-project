import { GESTURE_EMOJI, GESTURE_LABELS } from '@/lib/constants/gesture';
import type { GestureName } from '@/types';

type Props = {
    gesture: GestureName;
    score?: number;
    compact?: boolean;
};

export const GestureBadge = ({ gesture, score, compact = false }: Props) => {
    const isActive = gesture !== 'none';
    return (
        <div
            className={`gesture-badge ${isActive ? 'is-active' : ''} ${compact ? 'gesture-badge--compact' : ''}`}
            data-gesture={gesture}
        >
            <span className="gesture-badge__emoji" aria-hidden="true">
                {GESTURE_EMOJI[gesture]}
            </span>
            <span className="gesture-badge__text">
                <small>{isActive ? 'Gesture locked' : 'Waiting for hand'}</small>
                <strong>{GESTURE_LABELS[gesture]}</strong>
            </span>
            {typeof score === 'number' && isActive && (
                <span className="gesture-badge__score" title="MediaPipe confidence">
                    {Math.round(score * 100)}%
                </span>
            )}
        </div>
    );
};
