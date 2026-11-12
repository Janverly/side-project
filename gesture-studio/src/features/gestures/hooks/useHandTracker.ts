import { useCallback, useEffect, useRef, useState } from 'react';
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import {
    CAMERA_HEIGHT,
    CAMERA_WIDTH,
    GESTURE_MODEL_PATH,
    HAND_WASM_PATH,
} from '@/lib/constants/gesture';
import type { GestureName, TrackerStatus, TrackedHand } from '@/types';
import {
    GestureStabilizer,
    isIndexPointPose,
    resolveGesture,
} from '../lib/gestureRecognition';

const describeCameraError = (error: unknown): string => {
    if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
            return 'Camera permission was denied. Allow camera access in your browser, then try again.';
        }
        if (error.name === 'NotFoundError') {
            return 'No camera was found. Connect a webcam and reload the page.';
        }
        if (error.name === 'NotReadableError') {
            return 'The camera is already in use by another app. Close it and try again.';
        }
    }
    if (error instanceof Error && error.message) return error.message;
    return 'The camera could not start. Check permissions and try again.';
};

export type HandTracker = ReturnType<typeof useHandTracker>;

export const useHandTracker = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const recognizerRef = useRef<GestureRecognizer | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const rafRef = useRef(0);
    const handsRef = useRef<TrackedHand[]>([]);
    const stabilizerRef = useRef(new GestureStabilizer());
    const lastVideoTimeRef = useRef(-1);
    const lastUiUpdateRef = useRef(0);
    const frameCountRef = useRef(0);
    const fpsWindowRef = useRef(0);

    const [status, setStatus] = useState<TrackerStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [hands, setHands] = useState<TrackedHand[]>([]);
    const [gesture, setGesture] = useState<GestureName>('none');
    const [fps, setFps] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const detectLoop = useCallback(() => {
        const video = videoRef.current;
        const recognizer = recognizerRef.current;
        if (!video || !recognizer) return;

        if (video.readyState >= 2 && video.videoWidth > 0 && video.currentTime !== lastVideoTimeRef.current) {
            lastVideoTimeRef.current = video.currentTime;
            const now = performance.now();
            try {
                const result = recognizer.recognizeForVideo(video, now);
                const tracked: TrackedHand[] = result.landmarks.map((landmarks, index) => {
                    const category = result.gestures[index]?.[0];
                    const resolved = resolveGesture(
                        landmarks,
                        category?.categoryName,
                        category?.score ?? 0,
                    );
                    const handedness =
                        result.handedness[index]?.[0]?.categoryName === 'Left' ? 'Left' : 'Right';
                    return {
                        landmarks: landmarks.map((point) => ({ x: point.x, y: point.y, z: point.z })),
                        handedness,
                        gesture: resolved.gesture,
                        score: resolved.score,
                        isPointing: isIndexPointPose(landmarks),
                    };
                });

                handsRef.current = tracked;
                const stabilized = stabilizerRef.current.update(tracked[0]?.gesture ?? 'none');

                if (now - lastUiUpdateRef.current > 90) {
                    lastUiUpdateRef.current = now;
                    setHands(tracked);
                    setGesture(stabilized);
                }

                frameCountRef.current += 1;
                if (now - fpsWindowRef.current >= 500) {
                    setFps(Math.round((frameCountRef.current * 1000) / (now - fpsWindowRef.current)));
                    frameCountRef.current = 0;
                    fpsWindowRef.current = now;
                }
            } catch (loopError) {
                console.error('Hand tracking frame failed', loopError);
            }
        }

        rafRef.current = requestAnimationFrame(detectLoop);
    }, []);

    const stop = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.srcObject = null;
        }
        handsRef.current = [];
        stabilizerRef.current.reset();
        setHands([]);
        setGesture('none');
        setFps(0);
        setStatus('idle');
        setIsRunning(false);
    }, []);

    const start = useCallback(async () => {
        if (isRunning || status === 'loading') return;
        setError(null);
        setStatus('loading');

        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('Camera access needs localhost or HTTPS. Open the app on localhost and try again.');
            }

            // Ask for the camera first so a denied permission fails fast instead
            // of downloading the MediaPipe model for nothing.
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: { ideal: CAMERA_WIDTH },
                    height: { ideal: CAMERA_HEIGHT },
                    facingMode: 'user',
                },
            });
            streamRef.current = stream;

            const video = videoRef.current;
            if (!video) throw new Error('The camera preview is not ready yet. Try again in a moment.');

            video.srcObject = stream;
            await video.play();

            if (!recognizerRef.current) {
                try {
                    const fileset = await FilesetResolver.forVisionTasks(HAND_WASM_PATH);
                    recognizerRef.current = await GestureRecognizer.createFromOptions(fileset, {
                        baseOptions: {
                            modelAssetPath: GESTURE_MODEL_PATH,
                            delegate: 'GPU',
                        },
                        runningMode: 'VIDEO',
                        numHands: 2,
                        minHandDetectionConfidence: 0.5,
                        minHandPresenceConfidence: 0.5,
                        minTrackingConfidence: 0.5,
                    });
                } catch (modelError) {
                    console.error('MediaPipe model failed to load', modelError);
                    throw new Error(
                        'The gesture model could not load. Make sure the files in public/models and public/wasm are present, then try again.',
                    );
                }
            }

            stabilizerRef.current.reset();
            lastVideoTimeRef.current = -1;
            frameCountRef.current = 0;
            fpsWindowRef.current = performance.now();
            lastUiUpdateRef.current = 0;
            setStatus('running');
            setIsRunning(true);
            rafRef.current = requestAnimationFrame(detectLoop);
        } catch (startError) {
            streamRef.current?.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
            setError(describeCameraError(startError));
            setStatus('error');
            setIsRunning(false);
        }
    }, [detectLoop, isRunning, status]);

    useEffect(
        () => () => {
            cancelAnimationFrame(rafRef.current);
            streamRef.current?.getTracks().forEach((track) => track.stop());
            recognizerRef.current?.close();
            recognizerRef.current = null;
        },
        [],
    );

    return {
        videoRef,
        handsRef,
        hands,
        gesture,
        status,
        error,
        fps,
        isRunning,
        start,
        stop,
    };
};
