import type { Landmark } from '@/types';

type FingerName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export type HandPose = Partial<Record<FingerName, boolean>>;

type FingerSpec = {
    /** Joint landmark indices: MCP, PIP, TIP. */
    joints: [number, number, number];
    /** Unit-ish direction the finger points away from the wrist. */
    direction: [number, number];
};

const WRIST: Landmark = { x: 0.5, y: 0.9, z: 0 };

const FINGERS: Record<FingerName, FingerSpec> = {
    thumb: { joints: [2, 3, 4], direction: [0.9, -0.45] },
    index: { joints: [5, 6, 8], direction: [-0.5, -1] },
    middle: { joints: [9, 10, 12], direction: [-0.15, -1] },
    ring: { joints: [13, 14, 16], direction: [0.2, -1] },
    pinky: { joints: [17, 18, 20], direction: [0.55, -1] },
};

const normalize = ([x, y]: [number, number]): [number, number] => {
    const length = Math.hypot(x, y) || 1;
    return [x / length, y / length];
};

/**
 * Builds a synthetic 21-point hand. Fingers are extended unless `pose`
 * marks them false. Curled fingers fold sideways at the PIP joint, which
 * keeps them clearly "not extended" for the rotation-tolerant classifier.
 */
export const makeHand = (pose: HandPose = {}): Landmark[] => {
    const landmarks: Landmark[] = Array.from({ length: 21 }, () => ({ ...WRIST }));
    landmarks[0] = { ...WRIST };

    for (const [name, spec] of Object.entries(FINGERS) as Array<[FingerName, FingerSpec]>) {
        const extended = pose[name] ?? true;
        const [ux, uy] = normalize(spec.direction);
        const [px, py] = [-uy, ux];
        const [mcpIndex, pipIndex, tipIndex] = spec.joints;

        const mcp: Landmark = { x: WRIST.x + ux * 0.2, y: WRIST.y + uy * 0.2, z: 0 };
        const pip: Landmark = extended
            ? { x: mcp.x + ux * 0.12, y: mcp.y + uy * 0.12, z: 0 }
            : { x: mcp.x + px * 0.11, y: mcp.y + py * 0.11, z: 0 };
        const tip: Landmark = extended
            ? { x: pip.x + ux * 0.1, y: pip.y + uy * 0.1, z: 0 }
            : { x: mcp.x - ux * 0.02 + px * 0.02, y: mcp.y - uy * 0.02 + py * 0.02, z: 0 };

        landmarks[mcpIndex] = mcp;
        landmarks[pipIndex] = pip;
        landmarks[tipIndex] = tip;
    }

    return landmarks;
};

/** Rotates every landmark around the wrist, to prove classifiers are rotation-tolerant. */
export const rotateHand = (landmarks: Landmark[], degrees: number): Landmark[] => {
    const radians = (degrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const wrist = landmarks[0] ?? WRIST;
    return landmarks.map((point) => {
        const dx = point.x - wrist.x;
        const dy = point.y - wrist.y;
        return {
            x: wrist.x + dx * cos - dy * sin,
            y: wrist.y + dx * sin + dy * cos,
            z: point.z,
        };
    });
};
