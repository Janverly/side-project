import type { STRIP_BACKGROUND_IDS, STRIP_FILTER_IDS, STRIP_TEMPLATE_IDS } from '@/lib/constants';

export type StripTemplate = (typeof STRIP_TEMPLATE_IDS)[number];
export type StripFilter = (typeof STRIP_FILTER_IDS)[number];
export type StripBackground = (typeof STRIP_BACKGROUND_IDS)[number];

/** Everything the "Style your strip" screen controls. */
export type StripDesign = {
    template: StripTemplate;
    filter: StripFilter;
    background: StripBackground;
    caption: string;
};

export type Session = StripDesign & {
    id: string;
    name: string;
    photos: string[]; // data URLs
    createdAt: string; // ISO date
};

export type SessionInput = Pick<Session, 'name' | 'photos'> & StripDesign;
