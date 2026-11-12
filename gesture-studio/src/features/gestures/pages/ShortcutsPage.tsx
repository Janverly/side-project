import { Link } from 'react-router-dom';
import { ArrowLeft, MousePointerClick, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ACTION_DESCRIPTIONS, SHORTCUT_ACTION_OPTIONS, ACTION_LABELS } from '@/lib/constants/gesture';
import { ShortcutForm } from '../components/ShortcutForm';
import { ShortcutList } from '../components/ShortcutList';
import { useGestureShortcutsStore, type ShortcutDraft } from '../hooks/useGestureShortcuts';

export const ShortcutsPage = () => {
    useDocumentTitle('Gesture Shortcuts');
    const shortcuts = useGestureShortcutsStore((state) => state.shortcuts);
    const addShortcut = useGestureShortcutsStore((state) => state.addShortcut);
    const toggleShortcut = useGestureShortcutsStore((state) => state.toggleShortcut);
    const removeShortcut = useGestureShortcutsStore((state) => state.removeShortcut);
    const resetShortcuts = useGestureShortcutsStore((state) => state.resetShortcuts);

    const handleAdd = (draft: ShortcutDraft) => {
        addShortcut(draft);
        toast.success(`“${draft.name}” added`, { description: 'Show the gesture in the studio to run it.' });
    };

    return (
        <section className="shortcuts-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">
                        <Sparkles size={14} /> Personalise
                    </p>
                    <h1>Gesture Shortcuts</h1>
                    <p className="page-subtitle">
                        Map a hand pose to an action. Shortcuts run the moment the studio locks onto the
                        gesture — no keyboard required.
                    </p>
                </div>
                <Link to="/studio" className="btn btn--ghost">
                    <ArrowLeft size={17} /> Back to studio
                </Link>
            </header>

            <div className="shortcuts-grid">
                <ShortcutForm onAdd={handleAdd} />
                <ShortcutList
                    shortcuts={shortcuts}
                    onToggle={(id) => {
                        const shortcut = shortcuts.find((item) => item.id === id);
                        toggleShortcut(id);
                        if (shortcut) {
                            toast.info(`${shortcut.name} ${shortcut.enabled ? 'disabled' : 'enabled'}`);
                        }
                    }}
                    onRemove={(id) => {
                        const shortcut = shortcuts.find((item) => item.id === id);
                        removeShortcut(id);
                        if (shortcut) toast.info(`${shortcut.name} deleted`);
                    }}
                    onReset={() => {
                        resetShortcuts();
                        toast.info('Default shortcuts restored');
                    }}
                />
            </div>

            <section className="action-reference panel" aria-labelledby="action-reference-title">
                <header className="panel__header">
                    <div>
                        <p className="eyebrow">
                            <MousePointerClick size={14} /> Action library
                        </p>
                        <h2 id="action-reference-title">What each action does</h2>
                    </div>
                </header>
                <div className="action-reference__grid">
                    {SHORTCUT_ACTION_OPTIONS.map((action) => (
                        <article key={action} className="action-card">
                            <strong>{ACTION_LABELS[action]}</strong>
                            <p>{ACTION_DESCRIPTIONS[action]}</p>
                        </article>
                    ))}
                </div>
            </section>

            <p className="fine-print">
                Shortcuts are saved in this browser. The <strong>Point</strong> pose is used for drawing,
                so map it carefully — it still works while you draw.
            </p>
        </section>
    );
};
