import { RotateCcw, Trash2 } from 'lucide-react';
import {
    ACTION_DESCRIPTIONS,
    ACTION_LABELS,
    GESTURE_EMOJI,
    GESTURE_LABELS,
} from '@/lib/constants/gesture';
import type { GestureShortcut } from '@/types';

type Props = {
    shortcuts: GestureShortcut[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onReset: () => void;
};

export const ShortcutList = ({ shortcuts, onToggle, onRemove, onReset }: Props) => (
    <section className="shortcut-list panel" aria-labelledby="shortcut-list-title">
        <header className="panel__header">
            <div>
                <p className="eyebrow">Automations</p>
                <h2 id="shortcut-list-title">Your shortcuts</h2>
            </div>
            <button type="button" className="btn btn--ghost btn--small" onClick={onReset}>
                <RotateCcw size={15} /> Reset defaults
            </button>
        </header>

        {shortcuts.length === 0 ? (
            <div className="empty-state">
                <p>No shortcuts yet. Add one above and it will run in the studio.</p>
            </div>
        ) : (
            <ul className="shortcut-list__items">
                {shortcuts.map((shortcut) => (
                    <li
                        key={shortcut.id}
                        className={`shortcut-row ${shortcut.enabled ? '' : 'is-disabled'}`}
                    >
                        <span className="shortcut-row__gesture" aria-hidden="true">
                            {GESTURE_EMOJI[shortcut.gesture]}
                        </span>
                        <div className="shortcut-row__body">
                            <div className="shortcut-row__title">
                                <strong>{shortcut.name}</strong>
                                <span className="badge badge--muted">{GESTURE_LABELS[shortcut.gesture]}</span>
                            </div>
                            <p>
                                {ACTION_LABELS[shortcut.action]} — {ACTION_DESCRIPTIONS[shortcut.action]}
                            </p>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={shortcut.enabled}
                                onChange={() => onToggle(shortcut.id)}
                                aria-label={`Enable ${shortcut.name}`}
                            />
                            <span className="switch__track" aria-hidden="true" />
                        </label>
                        <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            onClick={() => onRemove(shortcut.id)}
                            aria-label={`Delete ${shortcut.name}`}
                        >
                            <Trash2 size={17} />
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </section>
);
