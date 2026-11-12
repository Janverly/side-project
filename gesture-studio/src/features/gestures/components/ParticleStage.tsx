import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { StudioMode, TrackedHand } from '@/types';
import { ParticleEngine } from '../lib/particleEngine';

type Props = {
    handsRef: RefObject<TrackedHand[]>;
    engineRef: { current: ParticleEngine | null };
    mode: StudioMode;
};

export const ParticleStage = ({ handsRef, engineRef, mode }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const engine = new ParticleEngine(canvas);
        engineRef.current = engine;
        engine.start();

        let observer: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => engine.resize());
            observer.observe(canvas);
        }
        const onResize = () => engine.resize();
        window.addEventListener('resize', onResize);

        let frame = 0;
        const followHands = () => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width || canvas.clientWidth;
            const height = rect.height || canvas.clientHeight;
            const points = handsRef.current
                .map((hand) => hand.landmarks[8])
                .filter((tip) => Boolean(tip))
                .map((tip) => ({ x: (1 - tip.x) * width, y: tip.y * height }));
            engine.setPointers(points);
            frame = requestAnimationFrame(followHands);
        };
        frame = requestAnimationFrame(followHands);

        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
            window.removeEventListener('resize', onResize);
            engine.destroy();
            engineRef.current = null;
        };
    }, [engineRef, handsRef]);

    return (
        <div className={`particle-stage ${mode === 'draw' ? 'is-drawing-mode' : ''}`}>
            <canvas ref={canvasRef} className="particle-canvas" aria-label="Interactive particle field" />
            <div className="particle-stage__vignette" aria-hidden="true" />
        </div>
    );
};
