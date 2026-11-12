import { z } from 'zod';
import {
    BOOTH_MAX_PHOTOS,
    SESSION_CAPTION_MAX,
    SESSION_NAME_MAX,
    STRIP_BACKGROUND_IDS,
    STRIP_FILTER_IDS,
    STRIP_TEMPLATE_IDS,
} from '@/lib/constants';

export const sessionNameSchema = z
    .string()
    .trim()
    .min(1, 'Session name is required')
    .max(SESSION_NAME_MAX, `Maximum ${SESSION_NAME_MAX} characters`);

// The single source of truth: the save dialog and the mock backend both use it.
export const createSessionSchema = z.object({
    name: sessionNameSchema,
    caption: z.string().max(SESSION_CAPTION_MAX, `Maximum ${SESSION_CAPTION_MAX} characters`),
    template: z.enum(STRIP_TEMPLATE_IDS),
    filter: z.enum(STRIP_FILTER_IDS),
    background: z.enum(STRIP_BACKGROUND_IDS),
    photos: z
        .array(z.string().min(1))
        .min(1, 'Take at least one photo before saving.')
        .max(BOOTH_MAX_PHOTOS, `Maximum ${BOOTH_MAX_PHOTOS} photos`),
});

export type SessionNameValues = { name: string };
