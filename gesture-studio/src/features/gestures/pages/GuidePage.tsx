import { Link } from 'react-router-dom';
import {
    Camera,
    CheckCircle2,
    Cpu,
    Hand,
    Lightbulb,
    Lock,
    MousePointer2,
    PenTool,
    Sparkles,
    Zap,
} from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
    ACTIVE_GESTURES,
    GESTURE_DESCRIPTIONS,
    GESTURE_EMOJI,
    GESTURE_LABELS,
} from '@/lib/constants/gesture';

const STEPS = [
    {
        icon: Camera,
        title: '1. Enable the camera',
        copy: 'Press Enable camera in the studio and allow access. The preview mirrors you so movement feels natural.',
    },
    {
        icon: Hand,
        title: '2. Show your hand',
        copy: 'Keep your whole hand in frame, palm toward the camera, about an arm’s length away. Two hands work too.',
    },
    {
        icon: Zap,
        title: '3. Hold a pose',
        copy: 'A gesture must stay steady for a few frames before it locks. This prevents accidental triggers.',
    },
    {
        icon: PenTool,
        title: '4. Point to draw',
        copy: 'Switch to Draw mode and extend only your index finger. Curl it back in to lift the pen.',
    },
];

export const GuidePage = () => {
    useDocumentTitle('Gesture Guide');

    return (
        <section className="guide-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">
                        <Sparkles size={14} /> Learn the language
                    </p>
                    <h1>Gesture Guide</h1>
                    <p className="page-subtitle">
                        Everything you need to go from “what is it doing?” to “look what I can do”.
                    </p>
                </div>
                <Link to="/studio" className="btn btn--primary">
                    <MousePointer2 size={17} /> Open the studio
                </Link>
            </header>

            <section className="guide-steps" aria-label="Getting started">
                {STEPS.map((step) => (
                    <article key={step.title} className="guide-step panel">
                        <span className="guide-step__icon">
                            <step.icon size={20} />
                        </span>
                        <h2>{step.title}</h2>
                        <p>{step.copy}</p>
                    </article>
                ))}
            </section>

            <section className="panel" aria-labelledby="gesture-reference-title">
                <header className="panel__header">
                    <div>
                        <p className="eyebrow">The five poses</p>
                        <h2 id="gesture-reference-title">Gesture reference</h2>
                    </div>
                </header>
                <div className="guide-gestures">
                    {ACTIVE_GESTURES.map((gesture) => (
                        <article key={gesture} className="guide-gesture">
                            <span className="guide-gesture__emoji" aria-hidden="true">
                                {GESTURE_EMOJI[gesture]}
                            </span>
                            <div>
                                <h3>{GESTURE_LABELS[gesture]}</h3>
                                <p>{GESTURE_DESCRIPTIONS[gesture]}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <div className="guide-columns">
                <section className="panel tips-panel" aria-labelledby="tips-title">
                    <header className="panel__header">
                        <div>
                            <p className="eyebrow">
                                <Lightbulb size={14} /> Make it smooth
                            </p>
                            <h2 id="tips-title">Tips for reliable tracking</h2>
                        </div>
                    </header>
                    <ul className="check-list">
                        <li>
                            <CheckCircle2 size={16} /> Use even, front-facing light. Avoid bright windows behind
                            you.
                        </li>
                        <li>
                            <CheckCircle2 size={16} /> Keep the hand large in frame; fill roughly a third of the
                            preview.
                        </li>
                        <li>
                            <CheckCircle2 size={16} /> Separate your fingers clearly for peace and open palm.
                        </li>
                        <li>
                            <CheckCircle2 size={16} /> Hold the pose until the gesture badge says “Gesture
                            locked”.
                        </li>
                        <li>
                            <CheckCircle2 size={16} /> For drawing, point with the index finger and keep the other
                            fingers curled.
                        </li>
                    </ul>
                </section>

                <section className="panel privacy-panel" aria-labelledby="privacy-title">
                    <header className="panel__header">
                        <div>
                            <p className="eyebrow">
                                <Lock size={14} /> Privacy
                            </p>
                            <h2 id="privacy-title">Your camera stays yours</h2>
                        </div>
                    </header>
                    <p>
                        Kinetic runs MediaPipe’s hand model directly in your browser using WebAssembly. Video
                        frames are passed to the local model and are never uploaded, recorded or sent to a
                        server.
                    </p>
                    <p>
                        Shortcuts and your login are stored in this browser only. Stopping the camera releases
                        it immediately.
                    </p>
                    <div className="tech-row">
                        <span className="badge badge--muted">
                            <Cpu size={13} /> MediaPipe
                        </span>
                        <span className="badge badge--muted">Canvas 2D</span>
                        <span className="badge badge--muted">React 19</span>
                        <span className="badge badge--muted">TypeScript</span>
                    </div>
                </section>
            </div>
        </section>
    );
};
