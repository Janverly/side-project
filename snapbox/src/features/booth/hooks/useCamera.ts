import { useCallback, useEffect, useRef, useState } from 'react';
import { BOOTH_JPEG_QUALITY } from '@/lib/constants';

type FacingMode = 'user' | 'environment';
type Info = { status: string; help: string; live: boolean; starting: boolean; fallback: boolean };

const READY: Info = {
    status: 'CAMERA READY',
    help: 'Allow camera access to start your session',
    live: false,
    starting: false,
    fallback: false,
};

/** Owns the webcam: start, flip, grab a mirrored frame, and always stop the tracks on unmount. */
export const useCamera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const facingRef = useRef<FacingMode>('user');
    const [info, setInfo] = useState<Info>(READY);

    const stop = useCallback(() => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
    }, []);
    useEffect(() => stop, [stop]);

    const start = useCallback(async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setInfo({
                ...READY,
                status: 'USE PHONE CAMERA',
                help: 'Webcam access needs HTTPS. Use the phone camera button below.',
                fallback: true,
            });
            return;
        }
        setInfo((i) => ({ ...i, status: 'REQUESTING CAMERA', help: 'Allow camera access in your browser prompt.', starting: true }));
        try {
            stop();
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingRef.current, width: { ideal: 1280 }, height: { ideal: 800 } },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
            setInfo({ ...READY, status: 'LIVE CAMERA', live: true });
        } catch (error) {
            setInfo({
                ...READY,
                status: 'CAMERA UNAVAILABLE',
                help:
                    (error as Error).name === 'NotAllowedError'
                        ? 'Camera access was blocked. Allow it in site settings, then try again.'
                        : 'Camera could not start. Check that it is connected and not in use.',
                fallback: true,
            });
        }
    }, [stop]);

    const flip = useCallback(() => {
        facingRef.current = facingRef.current === 'user' ? 'environment' : 'user';
        void start();
    }, [start]);

    /** One frame as a JPEG data URL, mirrored to match the preview. `null` if the camera isn't live. */
    const takeFrame = useCallback((): string | null => {
        const video = videoRef.current;
        if (!video || !streamRef.current) return null;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 960;
        canvas.height = video.videoHeight || 600;
        const context = canvas.getContext('2d');
        if (!context) return null;
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', BOOTH_JPEG_QUALITY);
    }, []);

    const setNotice = useCallback((status: string, help: string) => setInfo((i) => ({ ...i, status, help })), []);

    return { videoRef, info, start, flip, takeFrame, setNotice };
};
