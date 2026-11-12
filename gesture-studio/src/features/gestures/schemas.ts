import { z } from 'zod';
import { ACTIVE_GESTURES, SHORTCUT_ACTION_OPTIONS } from '@/lib/constants/gesture';

export const shortcutSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(32, 'Keep the name under 32 characters'),
    gesture: z.enum(ACTIVE_GESTURES, {
        message: 'Choose a gesture',
    }),
    action: z.enum(SHORTCUT_ACTION_OPTIONS, {
        message: 'Choose an action',
    }),
});

export type ShortcutFormValues = z.infer<typeof shortcutSchema>;
