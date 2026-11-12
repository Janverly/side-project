import { Camera, CameraOff, Hand, Loader2, ShieldCheck, Video } from 'lucide-react';
import type { HandTracker } from '../hooks/useHandTracker';
import { HandOverlay } from './HandOverlay';
import { GestureBadge } from './GestureBadge';
import { GESTURE_DESCRIPTIONS } from '@/lib/constants/gesture';

type Props = {
    tracker: HandTracker;
};

export const CameraPanel = ({ tracker }: Props) => {
    const { status, error, isRunning, gesture, hands, fps, handsRef, videoRef } = tracker;
    const mainHand = hands[0];

    return (
        <section className="camera-panel panel" aria-labelledby="camera-title">
            <header className="panel__header">
                <div>
                    <p className="eyebrow">
                        <Video size={14} /> Input
                    </p>
                    <h2 id="camera-title">Camera</h2>
                </div>
                <span className={`status-pill ${isRunning ? 'is-live' : ''}`}>
                    <span className="status-pill__dot" aria-hidden="true" />
                    {isRunning ? 'Live' : 'Offline'}
                </span>
            </header>

            <div className={`camera-frame ${isRunning ? 'is-live' : ''}`}>
                <video
                    ref={videoRef}
                    className="camera-feed"
                    autoPlay
                    muted
                    playsInline
                    aria-label="Webcam preview"
                />
                <HandOverlay handsRef={handsRef} active={isRunning} />

                {isRunning && (
                    <>
                        <div className="camera-hud camera-hud--top">
                            <span className="hud-chip">
                                <span className="live-dot" aria-hidden="true" /> {fps} fps
                            </span>
                            <span className="hud-chip">
                                <Hand size={13} /> {hands.length} {hands.length === 1 ? 'hand' : 'hands'}
                            </span>
                        </div>
                        <div className="camera-hud camera-hud--bottom">
                            <GestureBadge gesture={gesture} score={mainHand?.score} />
                        </div>
                    </>
                )}

                {!isRunning && status === 'idle' && (
                    <div className="camera-placeholder">
                        <span className="camera-placeholder__icon">
                            <Camera size={30} />
                        </span>
                        <h3>Camera is off</h3>
                        <p>Enable your webcam to start tracking your hand in 3D.</p>
                        <button type="button" className="btn btn--primary" onClick={() => void tracker.start()}>
                            <Camera size={18} /> Enable camera
                        </button>
                        <p className="microcopy">
                            <ShieldCheck size={13} /> Frames never leave your device
                        </p>
                    </div>
                )}

                {status === 'loading' && (
                    <div className="camera-placeholder camera-placeholder--loading">
                        <Loader2 className="spin" size={34} />
                        <h3>Warming up the tracker</h3>
                        <p>Loading the MediaPipe gesture model and camera.</p>
                    </div>
                )}

                {status === 'error' && !isRunning && (
                    <div className="camera-placeholder camera-placeholder--error">
                        <span className="camera-placeholder__icon">
                            <CameraOff size={30} />
                        </span>
                        <h3>Camera unavailable</h3>
                        <p role="alert">{error}</p>
                        <button type="button" className="btn btn--primary" onClick={() => void tracker.start()}>
                            Try again
                        </button>
                    </div>
                )}
            </div>

            <footer className="camera-panel__footer">
                <p className="camera-panel__hint">
                    {isRunning ? GESTURE_DESCRIPTIONS[gesture] : 'Tip: keep your whole hand inside the frame.'}
                </p>
                {isRunning && (
                    <button type="button" className="btn btn--ghost btn--small" onClick={tracker.stop}>
                        <CameraOff size={15} /> Stop camera
                    </button>
                )}
            </footer>
        </section>
    );
};
