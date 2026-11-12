import { GESTURE_STABILITY_FRAMES } from '@/lib/constants/gesture';
import type { GestureName, Landmark } from '@/types';

type Finger = { mcp: number; pip: number; tip: number };

const FINGERS: Record<'thumb' | 'index' | 'middle' | 'ring' | 'pinky', Finger> = {
    thumb: { mcp: 2, pip: 3, tip: 4 },
    index: { mcp: 5, pip: 6, tip: 8 },
    middle: { mcp: 9, pip: 10, tip: 12 },
    ring: { mcp: 13, pip: 14, tip: 16 },
    pinky: { mcp: 17, pip: 18, tip: 20 },
};

const EPSILON = 1e-6;

const distance = (a: Landmark, b: Landmark) => Math.hypot(a.x - b.x, a.y - b.y);

/** Angle in degrees at point b, between the lines b→a and b→c. */
const angleAt = (a: Landmark, b: Landmark, c: Landmark) => {
    const abx = a.x - b.x;
    const aby = a.y - b.y;
    const cbx = c.x - b.x;
    const cby = c.y - b.y;
    const magnitude = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
    if (magnitude < EPSILON) return 0;
    const cosine = Math.max(-1, Math.min(1, (abx * cbx + aby * cby) / magnitude));
    return (Math.acos(cosine) * 180) / Math.PI;
};

/**
 * Rotation-tolerant extension test: the finger is straight at the PIP joint
 * and the tip reaches further from the wrist than the PIP joint does.
 */
export const isFingerExtended = (landmarks: Landmark[], finger: Finger): boolean => {
    if (landmarks.length < 21) return false;
    const wrist = landmarks[0];
    const mcp = landmarks[finger.mcp];
    const pip = landmarks[finger.pip];
    const tip = landmarks[finger.tip];
    if (!wrist || !mcp || !pip || !tip) return false;

    const straightness = angleAt(mcp, pip, tip);
    const reach = distance(wrist, tip) / (distance(wrist, pip) + EPSILON);
    return straightness > 150 && reach > 1.06;
};

export type FingerState = Record<'thumb' | 'index' | 'middle' | 'ring' | 'pinky', boolean>;

export const getFingerState = (landmarks: Landmark[]): FingerState => ({
    thumb: isFingerExtended(landmarks, FINGERS.thumb),
    index: isFingerExtended(landmarks, FINGERS.index),
    middle: isFingerExtended(landmarks, FINGERS.middle),
    ring: isFingerExtended(landmarks, FINGERS.ring),
    pinky: isFingerExtended(landmarks, FINGERS.pinky),
});

/** Index-only pose, used for drawing regardless of hand rotation. */
export const isIndexPointPose = (landmarks: Landmark[]): boolean => {
    if (landmarks.length < 21) return false;
    const fingers = getFingerState(landmarks);
    return fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
};

/**
 * Landmark-only fallback classifier. MediaPipe's canned classifier is the
 * primary source; this fills in when it returns None or a low-confidence
 * result (for example when a hand is rotated away from the camera).
 */
export const recognizeGesture = (landmarks: Landmark[]): { gesture: GestureName; score: number } => {
    if (landmarks.length < 21) return { gesture: 'none', score: 0 };

    const fingers = getFingerState(landmarks);
    const fourCurled = !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
    const fourExtended = fingers.index && fingers.middle && fingers.ring && fingers.pinky;

    const wrist = landmarks[0];
    const thumbMcp = landmarks[2];
    const thumbTip = landmarks[4];
    const thumbPointsUp = thumbTip.y < wrist.y - 0.06 && thumbTip.y < thumbMcp.y - 0.03;

    if (fingers.thumb && fourCurled && thumbPointsUp) {
        return { gesture: 'thumbs_up', score: 0.95 };
    }
    if (fourExtended) {
        return { gesture: 'open_palm', score: 0.94 };
    }
    if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
        return { gesture: 'peace', score: 0.92 };
    }
    if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
        return { gesture: 'point', score: 0.91 };
    }
    if (fourCurled && !fingers.thumb) {
        return { gesture: 'fist', score: 0.9 };
    }
    return { gesture: 'none', score: 0.2 };
};

const CATEGORY_MAP: Record<string, GestureName> = {
    Thumb_Up: 'thumbs_up',
    Victory: 'peace',
    Open_Palm: 'open_palm',
    Pointing_Up: 'point',
    Closed_Fist: 'fist',
    Thumb_Down: 'none',
    ILoveYou: 'none',
    None: 'none',
};

export const mapMediaPipeCategory = (category?: string | null): GestureName =>
    category ? (CATEGORY_MAP[category] ?? 'none') : 'none';

/**
 * Prefer MediaPipe's trained classifier, then fall back to landmarks.
 * `score` is MediaPipe's confidence for the chosen category.
 */
export const resolveGesture = (
    landmarks: Landmark[],
    category: string | undefined,
    categoryScore: number,
): { gesture: GestureName; score: number } => {
    const trained = mapMediaPipeCategory(category);
    if (trained !== 'none' && categoryScore >= 0.5) {
        return { gesture: trained, score: categoryScore };
    }
    const fallback = recognizeGesture(landmarks);
    return fallback.gesture === 'none' ? { gesture: 'none', score: 0 } : fallback;
};

/**
 * Requires a pose to hold for several frames before it becomes the active
 * gesture. This keeps the UI and shortcuts from flickering between frames.
 */
export class GestureStabilizer {
    private candidate: GestureName = 'none';
    private streak = 0;
    private stable: GestureName = 'none';

    private readonly frames: number;

    constructor(frames = GESTURE_STABILITY_FRAMES) {
        this.frames = frames;
    }

    update(next: GestureName): GestureName {
        if (next === this.candidate) {
            this.streak += 1;
        } else {
            this.candidate = next;
            this.streak = 1;
        }
        if (this.streak >= this.frames) this.stable = this.candidate;
        return this.stable;
    }

    get value(): GestureName {
        return this.stable;
    }

    reset(): void {
        this.candidate = 'none';
        this.streak = 0;
        this.stable = 'none';
    }
}
