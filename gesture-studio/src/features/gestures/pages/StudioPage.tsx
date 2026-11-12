import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import {
    Eraser,
    Palette,
    Save,
    SlidersHorizontal,
    Snowflake,
    Sparkles,
    Undo2,
    Wand2,
    Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
    ACTION_LABELS,
    ACTIVE_GESTURES,
    BRUSH_COLORS,
    BRUSH_COLOR_NAMES,
    BRUSH_SIZES,
    GESTURE_DESCRIPTIONS,
    GESTURE_EMOJI,
    GESTURE_LABELS,
} from '@/lib/constants/gesture';
import type { GestureName, ShortcutAction, StudioMode } from '@/types';
import { CameraPanel } from '../components/CameraPanel';
import { DrawingBoard, type DrawingBoardHandle } from '../components/DrawingBoard';
import { ParticleStage } from '../components/ParticleStage';
import { useGestureShortcutsStore } from '../hooks/useGestureShortcuts';
import { useHandTracker } from '../hooks/useHandTracker';
import { ParticleEngine } from '../lib/particleEngine';

type Flash = {
    id: number;
    name: string;
    action: ShortcutAction;
    gesture: GestureName;
};

const MODE_PARSER = parseAsStringLiteral(['particles', 'draw'] as const).withDefault('particles');

export const StudioPage = () => {
    useDocumentTitle('Gesture Studio');
    const tracker = useHandTracker();
    const shortcuts = useGestureShortcutsStore((state) => state.shortcuts);
    const engineRef = useRef<ParticleEngine | null>(null);
    const drawingRef = useRef<DrawingBoardHandle | null>(null);
    const lastTriggeredRef = useRef<GestureName>('none');

    const [mode, setMode] = useQueryState('mode', MODE_PARSER);
    const [colorIndex, setColorIndex] = useState(0);
    const [brushIndex, setBrushIndex] = useState(1);
    const [strokeCount, setStrokeCount] = useState(0);
    const [rainbow, setRainbow] = useState(false);
    const [frozen, setFrozen] = useState(false);
    const [flash, setFlash] = useState<Flash | null>(null);

    const modeRef = useRef<StudioMode>(mode);
    modeRef.current = mode;
    const rainbowRef = useRef(rainbow);
    rainbowRef.current = rainbow;
    const frozenRef = useRef(frozen);
    frozenRef.current = frozen;

    const color = BRUSH_COLORS[colorIndex];
    const brushSize = BRUSH_SIZES[brushIndex];

    const cycleColor = useCallback(() => {
        setColorIndex((index) => {
            const next = (index + 1) % BRUSH_COLORS.length;
            toast.info(`${BRUSH_COLOR_NAMES[next]} brush selected`);
            return next;
        });
    }, []);

    const runAction = useCallback(
        (action: ShortcutAction, name: string, gesture: GestureName) => {
            const engine = engineRef.current;
            switch (action) {
                case 'burst':
                    engine?.triggerBurst();
                    break;
                case 'shockwave':
                    engine?.triggerShockwave();
                    break;
                case 'vortex':
                    engine?.triggerVortex();
                    break;
                case 'rainbow': {
                    const next = !rainbowRef.current;
                    rainbowRef.current = next;
                    setRainbow(next);
                    engine?.setRainbow(next);
                    break;
                }
                case 'freeze': {
                    const next = !frozenRef.current;
                    frozenRef.current = next;
                    setFrozen(next);
                    engine?.setFrozen(next);
                    break;
                }
                case 'clear_drawing':
                    drawingRef.current?.clear();
                    break;
                case 'toggle_mode':
                    setMode(modeRef.current === 'particles' ? 'draw' : 'particles');
                    break;
                case 'cycle_color':
                    cycleColor();
                    break;
                case 'save_art':
                    if (strokeCount > 0) {
                        drawingRef.current?.save();
                    } else {
                        toast.info('Draw a little first, then save.');
                    }
                    break;
                default:
                    break;
            }
            setFlash({ id: Date.now(), name, action, gesture });
            toast.success(name, { description: ACTION_LABELS[action] });
        },
        [cycleColor, setMode, strokeCount],
    );

    useEffect(() => {
        if (tracker.gesture === 'none') {
            lastTriggeredRef.current = 'none';
            return;
        }
        if (lastTriggeredRef.current === tracker.gesture) return;
        lastTriggeredRef.current = tracker.gesture;
        const matches = shortcuts.filter(
            (shortcut) => shortcut.enabled && shortcut.gesture === tracker.gesture,
        );
        for (const shortcut of matches) {
            runAction(shortcut.action, shortcut.name, shortcut.gesture);
        }
    }, [runAction, shortcuts, tracker.gesture]);

    useEffect(() => {
        engineRef.current?.setRainbow(rainbow);
        engineRef.current?.setFrozen(frozen);
    }, [rainbow, frozen]);

    const enabledCount = shortcuts.filter((shortcut) => shortcut.enabled).length;

    return (
        <section className="studio-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">
                        <Sparkles size={14} /> Live hand tracking
                    </p>
                    <h1>Gesture Studio</h1>
                    <p className="page-subtitle">
                        Move your hands to steer the particles, hold a pose to fire an effect, or point to
                        draw. Everything runs locally in your browser.
                    </p>
                </div>
                <Link to="/shortcuts" className="btn btn--ghost">
                    <SlidersHorizontal size={17} /> {enabledCount} shortcuts active
                </Link>
            </header>

            <div className="studio-grid">
                <CameraPanel tracker={tracker} />

                <section className="stage-panel panel" aria-labelledby="stage-title">
                    <header className="stage-panel__header">
                        <div>
                            <p className="eyebrow">Output</p>
                            <h2 id="stage-title">
                                {mode === 'particles' ? 'Particle field' : 'Drawing board'}
                            </h2>
                        </div>
                        <div className="mode-switch" role="group" aria-label="Studio mode">
                            <button
                                type="button"
                                className={mode === 'particles' ? 'is-active' : ''}
                                aria-pressed={mode === 'particles'}
                                onClick={() => setMode('particles')}
                            >
                                <Zap size={15} /> Particles
                            </button>
                            <button
                                type="button"
                                className={mode === 'draw' ? 'is-active' : ''}
                                aria-pressed={mode === 'draw'}
                                onClick={() => setMode('draw')}
                            >
                                <Palette size={15} /> Draw
                            </button>
                        </div>
                    </header>

                    <div className="stage-shell">
                        <ParticleStage handsRef={tracker.handsRef} engineRef={engineRef} mode={mode} />
                        <DrawingBoard
                            ref={drawingRef}
                            handsRef={tracker.handsRef}
                            active={mode === 'draw'}
                            color={color}
                            brushSize={brushSize}
                            onStrokesChange={setStrokeCount}
                        />

                        <div className="stage-chips">
                            {rainbow && <span className="badge badge--rainbow">Rainbow mode</span>}
                            {frozen && <span className="badge badge--ice">Particles frozen</span>}
                            {!tracker.isRunning && (
                                <span className="badge badge--muted">Enable the camera to begin</span>
                            )}
                        </div>

                        {mode === 'draw' && strokeCount === 0 && (
                            <div className="stage-hint">
                                <span aria-hidden="true">☝️</span>
                                <strong>Point your index finger</strong>
                                <p>Keep the other fingers curled and move your hand to draw.</p>
                            </div>
                        )}

                        {flash && (
                            <div key={flash.id} className="gesture-flash" aria-live="polite">
                                <span className="gesture-flash__emoji" aria-hidden="true">
                                    {GESTURE_EMOJI[flash.gesture]}
                                </span>
                                <strong>{flash.name}</strong>
                                <small>{ACTION_LABELS[flash.action]}</small>
                            </div>
                        )}

                        <div className="stage-corner" aria-hidden="true">
                            <span>{mode === 'draw' ? 'DRAW MODE' : 'PARTICLE MODE'}</span>
                        </div>
                    </div>

                    <footer className="stage-toolbar">
                        {mode === 'draw' ? (
                            <>
                                <div className="tool-group" aria-label="Brush colour">
                                    <span className="tool-label">
                                        <Palette size={14} /> Colour
                                    </span>
                                    <div className="swatches">
                                        {BRUSH_COLORS.map((swatch, index) => (
                                            <button
                                                key={swatch}
                                                type="button"
                                                className={`swatch ${index === colorIndex ? 'is-active' : ''}`}
                                                style={{ background: swatch }}
                                                onClick={() => setColorIndex(index)}
                                                aria-label={`${BRUSH_COLOR_NAMES[index]} brush`}
                                                aria-pressed={index === colorIndex}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="tool-group" aria-label="Brush size">
                                    <span className="tool-label">Size</span>
                                    <div className="size-pills">
                                        {BRUSH_SIZES.map((size, index) => (
                                            <button
                                                key={size}
                                                type="button"
                                                className={index === brushIndex ? 'is-active' : ''}
                                                onClick={() => setBrushIndex(index)}
                                                aria-pressed={index === brushIndex}
                                                aria-label={`Brush size ${size}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="tool-group tool-group--actions">
                                    <button
                                        type="button"
                                        className="btn btn--ghost btn--small"
                                        onClick={() => drawingRef.current?.undo()}
                                        disabled={strokeCount === 0}
                                    >
                                        <Undo2 size={15} /> Undo
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn--ghost btn--small"
                                        onClick={() => drawingRef.current?.clear()}
                                        disabled={strokeCount === 0}
                                    >
                                        <Eraser size={15} /> Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn--primary btn--small"
                                        onClick={() => drawingRef.current?.save()}
                                        disabled={strokeCount === 0}
                                    >
                                        <Save size={15} /> Save PNG
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="stage-toolbar__hint">
                                    <Wand2 size={16} /> Try a gesture: thumbs up, peace, open palm or fist.
                                </p>
                                <div className="tool-group tool-group--actions">
                                    <button
                                        type="button"
                                        className={`btn btn--ghost btn--small ${rainbow ? 'is-on' : ''}`}
                                        onClick={() => setRainbow((value) => !value)}
                                        aria-pressed={rainbow}
                                    >
                                        <Sparkles size={15} /> Rainbow
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn--ghost btn--small ${frozen ? 'is-on' : ''}`}
                                        onClick={() => setFrozen((value) => !value)}
                                        aria-pressed={frozen}
                                    >
                                        <Snowflake size={15} /> Freeze
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn--primary btn--small"
                                        onClick={() => engineRef.current?.triggerBurst()}
                                    >
                                        <Zap size={15} /> Burst
                                    </button>
                                </div>
                            </>
                        )}
                    </footer>
                </section>
            </div>

            <section className="gesture-deck" aria-label="Gesture reference">
                {ACTIVE_GESTURES.map((gesture) => {
                    const mapped = shortcuts.filter((shortcut) => shortcut.enabled && shortcut.gesture === gesture);
                    return (
                        <article
                            key={gesture}
                            className="gesture-card"
                            title={GESTURE_DESCRIPTIONS[gesture]}
                        >
                            <span className="gesture-card__emoji" aria-hidden="true">
                                {GESTURE_EMOJI[gesture]}
                            </span>
                            <div>
                                <strong>{GESTURE_LABELS[gesture]}</strong>
                                <p>{mapped.length > 0 ? mapped.map((item) => item.name).join(', ') : 'Not mapped'}</p>
                            </div>
                            <span className={`gesture-card__dot ${tracker.gesture === gesture ? 'is-live' : ''}`} />
                        </article>
                    );
                })}
            </section>

        </section>
    );
};
