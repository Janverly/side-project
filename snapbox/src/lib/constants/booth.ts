// Everything the photobooth lets you pick from. No magic strings or numbers in components.
export const BOOTH_MAX_PHOTOS = 3;
export const BOOTH_DEFAULT_CAPTION = 'A little memory';
export const BOOTH_COUNTDOWN_START = 3;
export const BOOTH_COUNTDOWN_TICK_MS = 650;
export const BOOTH_JPEG_QUALITY = 0.86;

export const STRIP_TEMPLATES = [
    { id: 'classic', label: 'Classic', hint: 'clean + warm' },
    { id: 'film', label: 'Film', hint: 'date stamp' },
    { id: 'polaroid', label: 'Polaroid', hint: 'airy + soft' },
    { id: 'minimal', label: 'Minimal', hint: 'black + white' },
    { id: 'olive', label: 'Olive', hint: 'bold + playful' },
    { id: 'cocoa', label: 'Cocoa', hint: 'soft + retro' },
] as const;
export const STRIP_TEMPLATE_IDS = ['classic', 'film', 'polaroid', 'minimal', 'olive', 'cocoa'] as const;

export const STRIP_FILTERS = [
    { id: 'original', label: 'Original', css: 'none' },
    { id: 'bw', label: 'B&W', css: 'grayscale(1)' },
    { id: 'vintage', label: 'Vintage', css: 'sepia(.45) saturate(.8)' },
    { id: 'warm', label: 'Warm', css: 'sepia(.15) saturate(1.25)' },
    { id: 'cool', label: 'Cool', css: 'saturate(.8) hue-rotate(12deg)' },
] as const;
export const STRIP_FILTER_IDS = ['original', 'bw', 'vintage', 'warm', 'cool'] as const;

export const STRIP_BACKGROUNDS = [
    { id: 'paper', color: '#fffdf8' },
    { id: 'blush', color: '#e9b6a8' },
    { id: 'ink', color: '#1e1e1c' },
    { id: 'lemon', color: '#f2d75f' },
    { id: 'mint', color: '#b9d1a9' },
] as const;
export const STRIP_BACKGROUND_IDS = ['paper', 'blush', 'ink', 'lemon', 'mint'] as const;

export const DEFAULT_STRIP_DESIGN = {
    template: 'classic',
    filter: 'original',
    background: 'paper',
    caption: BOOTH_DEFAULT_CAPTION,
} as const;

// Colors used by the PNG export for templates that ignore the chosen background.
export const TEMPLATE_EXPORT_STYLES = {
    olive: { background: '#515838', ink: '#f5efe4', accent: '#ebb15b', border: '#f5efe4' },
    cocoa: { background: '#432e22', ink: '#f7ede2', accent: '#efa19a', border: '#f7ede2' },
} as const;
export const DEFAULT_EXPORT_STYLE = { ink: '#1e1e1c', accent: '#e87453', border: '#d9d5ca' } as const;
