import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { HAND_CONNECTIONS } from '@/lib/constants/gesture';
import type { TrackedHand } from '@/types';

type Props = {
    handsRef: RefObject<TrackedHand[]>;
    active: boolean;
};

const HAND_COLORS = ['#22d3ee', '#f472b6'];

export const HandOverlay = ({ handsRef, active }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frame = 0;
        const render = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
                canvas.width = Math.floor(rect.width * dpr);
                canvas.height = Math.floor(rect.height * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            ctx.clearRect(0, 0, rect.width, rect.height);
            if (active) {
                handsRef.current.forEach((hand, handIndex) => {
                    const color = HAND_COLORS[handIndex % HAND_COLORS.length];
                    ctx.strokeStyle = color;
                    ctx.fillStyle = color;
                    ctx.lineWidth = 2;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;

                    for (const [from, to] of HAND_CONNECTIONS) {
                        const a = hand.landmarks[from];
                        const b = hand.landmarks[to];
                        if (!a || !b) continue;
                        ctx.beginPath();
                        ctx.moveTo((1 - a.x) * rect.width, a.y * rect.height);
                        ctx.lineTo((1 - b.x) * rect.width, b.y * rect.height);
                        ctx.stroke();
                    }

                    for (const [index, point] of hand.landmarks.entries()) {
                        const isTip = [4, 8, 12, 16, 20].includes(index);
                        ctx.beginPath();
                        ctx.arc(
                            (1 - point.x) * rect.width,
                            point.y * rect.height,
                            isTip ? 3.4 : 2,
                            0,
                            Math.PI * 2,
                        );
                        ctx.fill();
                    }
                    ctx.shadowBlur = 0;
                });
            }
            frame = requestAnimationFrame(render);
        };

        frame = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frame);
    }, [active, handsRef]);

    return <canvas ref={canvasRef} className="hand-overlay" aria-hidden="true" />;
};
