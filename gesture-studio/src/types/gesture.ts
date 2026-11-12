export type GestureName = 'none' | 'thumbs_up' | 'peace' | 'open_palm' | 'point' | 'fist';

export type ShortcutAction =
    | 'burst'
    | 'shockwave'
    | 'vortex'
    | 'rainbow'
    | 'freeze'
    | 'clear_drawing'
    | 'toggle_mode'
    | 'cycle_color'
    | 'save_art';

export type GestureShortcut = {
    id: string;
    name: string;
    gesture: GestureName;
    action: ShortcutAction;
    enabled: boolean;
};

export type Handedness = 'Left' | 'Right';

export type Landmark = {
    x: number;
    y: number;
    z: number;
};

export type TrackedHand = {
    landmarks: Landmark[];
    handedness: Handedness;
    gesture: GestureName;
    score: number;
    /** True when the index finger is extended and the others are curled, in any orientation. */
    isPointing: boolean;
};

export type TrackerStatus = 'idle' | 'loading' | 'running' | 'error';

export type StudioMode = 'particles' | 'draw';
