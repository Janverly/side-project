import type { GestureName, GestureShortcut, ShortcutAction } from '@/types';

export const ACTIVE_GESTURES = ['thumbs_up', 'peace', 'open_palm', 'point', 'fist'] as const satisfies readonly GestureName[];

export const GESTURE_LABELS: Record<GestureName, string> = {
    none: 'No gesture',
    thumbs_up: 'Thumbs up',
    peace: 'Peace',
    open_palm: 'Open palm',
    point: 'Point',
    fist: 'Fist',
};

export const GESTURE_EMOJI: Record<GestureName, string> = {
    none: '✋',
    thumbs_up: '👍',
    peace: '✌️',
    open_palm: '🖐️',
    point: '☝️',
    fist: '✊',
};

export const GESTURE_DESCRIPTIONS: Record<GestureName, string> = {
    none: 'No hand pose detected. Hold a pose steady for a moment.',
    thumbs_up: 'Thumb up, fingers curled. Great for celebrations.',
    peace: 'Index and middle fingers up. Fire a sonic ring across the stage.',
    open_palm: 'All five fingers spread. Pull the particle field into a gravity well.',
    point: 'Index finger extended. Draw on the canvas or steer particles.',
    fist: 'All fingers curled. Freeze the particle field mid-air.',
};

export const ACTION_LABELS: Record<ShortcutAction, string> = {
    burst: 'Particle burst',
    shockwave: 'Shockwave',
    vortex: 'Gravity well',
    rainbow: 'Toggle rainbow mode',
    freeze: 'Toggle freeze',
    clear_drawing: 'Clear drawing',
    toggle_mode: 'Switch studio mode',
    cycle_color: 'Next brush colour',
    save_art: 'Save artwork',
};

export const ACTION_DESCRIPTIONS: Record<ShortcutAction, string> = {
    burst: 'Explode a ring of sparks from your fingertip.',
    shockwave: 'Send an expanding energy ring across the stage.',
    vortex: 'Implode the particle field into a spinning gravity well.',
    rainbow: 'Cycle particle colours through the spectrum.',
    freeze: 'Pause every particle so you can draw over a still field.',
    clear_drawing: 'Wipe the drawing board in one motion.',
    toggle_mode: 'Jump between Particles and Draw mode.',
    cycle_color: 'Select the next brush colour.',
    save_art: 'Download the current drawing as a PNG.',
};

export const SHORTCUT_ACTION_OPTIONS = [
    'burst',
    'shockwave',
    'vortex',
    'rainbow',
    'freeze',
    'clear_drawing',
    'toggle_mode',
    'cycle_color',
    'save_art',
] as const satisfies readonly ShortcutAction[];

/**
 * Default mappings. `point` is intentionally not mapped because it is the
 * drawing pose — add your own mapping on the Shortcuts page if you want one.
 */
export const DEFAULT_SHORTCUTS: GestureShortcut[] = [
    { id: 'default-thumbs-up', name: 'Party pop', gesture: 'thumbs_up', action: 'burst', enabled: true },
    { id: 'default-peace', name: 'Sonic wave', gesture: 'peace', action: 'shockwave', enabled: true },
    { id: 'default-open-palm', name: 'Gravity well', gesture: 'open_palm', action: 'vortex', enabled: true },
    { id: 'default-fist', name: 'Deep freeze', gesture: 'fist', action: 'freeze', enabled: true },
];

export const HAND_CONNECTIONS: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [9, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [13, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [0, 17],
];

export const FINGERTIP_INDICES = [4, 8, 12, 16, 20];

export const BRUSH_COLORS = ['#8b5cf6', '#22d3ee', '#f472b6', '#fbbf24', '#4ade80', '#f8fafc'];

export const BRUSH_COLOR_NAMES = ['Violet', 'Cyan', 'Pink', 'Amber', 'Lime', 'Chalk'];

export const BRUSH_SIZES = [2, 4, 7, 12];

export const GESTURE_STABILITY_FRAMES = 4;
export const GESTURE_COOLDOWN_MS = 900;

export const HAND_WASM_PATH = '/wasm';
export const GESTURE_MODEL_PATH = '/models/gesture_recognizer.task';

export const CAMERA_WIDTH = 1280;
export const CAMERA_HEIGHT = 720;

export const MAX_PARTICLES = 520;
export const MIN_PARTICLES = 220;
