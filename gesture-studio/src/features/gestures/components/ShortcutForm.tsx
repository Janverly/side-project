import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import {
    ACTION_LABELS,
    ACTIVE_GESTURES,
    GESTURE_LABELS,
    SHORTCUT_ACTION_OPTIONS,
} from '@/lib/constants/gesture';
import { shortcutSchema, type ShortcutFormValues } from '../schemas';
import type { ShortcutDraft } from '../hooks/useGestureShortcuts';

type Props = {
    onAdd: (draft: ShortcutDraft) => void;
};

export const ShortcutForm = ({ onAdd }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ShortcutFormValues>({
        resolver: zodResolver(shortcutSchema),
        defaultValues: { name: '', gesture: 'thumbs_up', action: 'burst' },
    });

    return (
        <form
            className="shortcut-form panel"
            noValidate
            onSubmit={handleSubmit((values) => {
                onAdd(values);
                reset({ name: '', gesture: values.gesture, action: values.action });
            })}
        >
            <div className="panel__header">
                <div>
                    <p className="eyebrow">Build your own</p>
                    <h2>Add a shortcut</h2>
                </div>
            </div>
            <div className="shortcut-form__grid">
                <div className="field">
                    <label htmlFor="shortcut-name">Shortcut name</label>
                    <input
                        id="shortcut-name"
                        placeholder="e.g. Rainbow rave"
                        {...register('name')}
                    />
                    {errors.name && <p role="alert">{errors.name.message}</p>}
                </div>
                <div className="field">
                    <label htmlFor="shortcut-gesture">When I show</label>
                    <select id="shortcut-gesture" {...register('gesture')}>
                        {ACTIVE_GESTURES.map((gesture) => (
                            <option key={gesture} value={gesture}>
                                {GESTURE_LABELS[gesture]}
                            </option>
                        ))}
                    </select>
                    {errors.gesture && <p role="alert">{errors.gesture.message}</p>}
                </div>
                <div className="field">
                    <label htmlFor="shortcut-action">Run action</label>
                    <select id="shortcut-action" {...register('action')}>
                        {SHORTCUT_ACTION_OPTIONS.map((action) => (
                            <option key={action} value={action}>
                                {ACTION_LABELS[action]}
                            </option>
                        ))}
                    </select>
                    {errors.action && <p role="alert">{errors.action.message}</p>}
                </div>
            </div>
            <button type="submit" className="btn btn--primary">
                <Plus size={17} /> Add shortcut
            </button>
        </form>
    );
};
