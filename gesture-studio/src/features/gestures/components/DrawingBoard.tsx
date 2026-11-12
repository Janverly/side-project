import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import type { TrackedHand } from '@/types';

type Point = { x: number; y: number };

type Stroke = {
    color: string;
    width: number;
    points: Point[];
};

export type DrawingBoardHandle = {
    clear: () => void;
    undo: () => void;
    save: () => void;
    getArtworkDataUrl: () => string | null;
};

type Props = {
    handsRef: RefObject<TrackedHand[]>;
    active: boolean;
    color: string;
    brushSize: number;
    onStrokesChange?: (count: number) => void;
};

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length === 0) return;
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = stroke.color;

    if (stroke.points.length === 1) {
        const [point] = stroke.points;
        ctx.beginPath();
        ctx.arc(point.x, point.y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return;
    }

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let index = 1; index < stroke.points.length; index += 1) {
        ctx.lineTo(stroke.points[index].x, stroke.points[index].y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
};

const drawSegment = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) {
        drawStroke(ctx, stroke);
        return;
    }
    const previous = stroke.points[stroke.points.length - 2];
    const point = stroke.points[stroke.points.length - 1];
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = stroke.color;
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.shadowBlur = 0;
};

export const DrawingBoard = forwardRef<DrawingBoardHandle, Props>(function DrawingBoard(
    { handsRef, active, color, brushSize, onStrokesChange },
    ref,
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const strokesRef = useRef<Stroke[]>([]);
    const currentStrokeRef = useRef<Stroke | null>(null);
    const sizeRef = useRef({ width: 0, height: 0 });
    const redrawRef = useRef<() => void>(() => undefined);
    const optionsRef = useRef({ color, brushSize });
    optionsRef.current = { color, brushSize };

    const notify = useCallback(() => {
        onStrokesChange?.(strokesRef.current.length);
    }, [onStrokesChange]);

    const addPoint = useCallback(
        (point: Point) => {
            const ctx = ctxRef.current;
            if (!ctx) return;
            let stroke = currentStrokeRef.current;
            if (!stroke) {
                stroke = {
                    color: optionsRef.current.color,
                    width: optionsRef.current.brushSize,
                    points: [],
                };
                strokesRef.current.push(stroke);
                currentStrokeRef.current = stroke;
                notify();
            }
            const previous = stroke.points[stroke.points.length - 1];
            if (previous && distance(previous, point) < 0.8) return;
            stroke.points.push(point);
            drawSegment(ctx, stroke);
        },
        [notify],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;

        const redraw = () => {
            ctx.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);
            for (const stroke of strokesRef.current) drawStroke(ctx, stroke);
        };
        redrawRef.current = redraw;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            sizeRef.current = { width: rect.width, height: rect.height };
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            redraw();
        };

        resize();
        let observer: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(resize);
            observer.observe(canvas);
        }
        window.addEventListener('resize', resize);
        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', resize);
            redrawRef.current = () => undefined;
            ctxRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!active) {
            currentStrokeRef.current = null;
            return;
        }

        let frame = 0;
        let lastPoint: Point | null = null;
        const follow = () => {
            const hand = handsRef.current.find((candidate) => candidate.isPointing);
            const tip = hand?.landmarks[8];
            if (tip) {
                const { width, height } = sizeRef.current;
                const point = { x: (1 - tip.x) * width, y: tip.y * height };
                if (!lastPoint || distance(lastPoint, point) >= 0.8) {
                    addPoint(point);
                    lastPoint = point;
                }
            } else {
                lastPoint = null;
                currentStrokeRef.current = null;
            }
            frame = requestAnimationFrame(follow);
        };
        frame = requestAnimationFrame(follow);
        return () => cancelAnimationFrame(frame);
    }, [active, addPoint, handsRef]);

    const pointFromEvent = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
        const rect = event.currentTarget.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const buildArtwork = useCallback((): string | null => {
        const source = canvasRef.current;
        if (!source || strokesRef.current.length === 0) return null;
        const output = document.createElement('canvas');
        output.width = source.width;
        output.height = source.height;
        const ctx = output.getContext('2d');
        if (!ctx) return null;
        const gradient = ctx.createRadialGradient(
            output.width / 2,
            output.height / 2,
            output.width * 0.05,
            output.width / 2,
            output.height / 2,
            output.width * 0.75,
        );
        gradient.addColorStop(0, '#12162e');
        gradient.addColorStop(1, '#05060f');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, output.width, output.height);
        ctx.drawImage(source, 0, 0);
        try {
            return output.toDataURL('image/png');
        } catch {
            return null;
        }
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            clear: () => {
                strokesRef.current = [];
                currentStrokeRef.current = null;
                const { width, height } = sizeRef.current;
                ctxRef.current?.clearRect(0, 0, width, height);
                notify();
            },
            undo: () => {
                strokesRef.current.pop();
                currentStrokeRef.current = null;
                redrawRef.current();
                notify();
            },
            save: () => {
                const dataUrl = buildArtwork();
                if (!dataUrl) return;
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `kinetic-art-${Date.now()}.png`;
                link.click();
            },
            getArtworkDataUrl: () => buildArtwork(),
        }),
        [buildArtwork, notify],
    );

    return (
        <canvas
            ref={canvasRef}
            className={`drawing-canvas ${active ? 'is-active' : ''}`}
            aria-label="Virtual drawing board"
            onPointerDown={(event) => {
                if (!active) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                currentStrokeRef.current = null;
                addPoint(pointFromEvent(event));
            }}
            onPointerMove={(event) => {
                if (!active || event.buttons !== 1) return;
                addPoint(pointFromEvent(event));
            }}
            onPointerUp={() => {
                currentStrokeRef.current = null;
            }}
            onPointerLeave={() => {
                currentStrokeRef.current = null;
            }}
        />
    );
});
