import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { BOOTH_COUNTDOWN_START, BOOTH_COUNTDOWN_TICK_MS, BOOTH_MAX_PHOTOS } from '@/lib/constants';
import { downloadPhotos } from '@/lib/strip/download';
import { useBoothStore } from '../hooks/booth.store';
import { useCamera } from '../hooks/useCamera';

export const BoothPage = () => {
    useDocumentTitle('Photobooth');
    const navigate = useNavigate();
    const photos = useBoothStore((s) => s.photos);
    const addPhoto = useBoothStore((s) => s.addPhoto);
    const { videoRef, info, start, flip, takeFrame, setNotice } = useCamera();
    const phoneInput = useRef<HTMLInputElement>(null);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

    const remaining = BOOTH_MAX_PHOTOS - photos.length;
    const canCapture = info.live && remaining > 0 && countdown === null;

    const capture = () => {
        if (!canCapture) return;
        let n = BOOTH_COUNTDOWN_START;
        setCountdown(n);
        timer.current = setInterval(() => {
            n -= 1;
            if (n > 0) return setCountdown(n);
            if (timer.current) clearInterval(timer.current);
            setCountdown(null);
            const frame = takeFrame();
            if (frame) addPhoto(frame);
        }, BOOTH_COUNTDOWN_TICK_MS);
    };

    const addPhonePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file || remaining <= 0) return;
        const reader = new FileReader();
        reader.onload = () => {
            addPhoto(String(reader.result));
            setNotice('PHONE CAMERA', 'Photo added. Take another or continue to customize.');
        };
        reader.readAsDataURL(file);
    };

    const saveAll = () => {
        if (!photos.length) return toast('Take photos before saving them.');
        downloadPhotos(photos);
        toast(`${photos.length} photos sent to your downloads.`);
    };

    return (
        <section className="screen active booth-screen">
            <div className="intro-copy">
                <p className="kicker">YOUR MOMENT, YOUR WAY</p>
                <h1>
                    Make a little
                    <br />
                    <em>memory.</em>
                </h1>
                <p className="intro-text">Three frames, one good story. Set the scene and let SnapBox catch the mood.</p>
                <div className="stepper" aria-label="Photobooth steps">
                    <span className="current">01</span>
                    <i />
                    <span>02</span>
                    <i />
                    <span>03</span>
                    <i />
                    <span>04</span>
                </div>
            </div>

            <div className="booth-card">
                <div className="booth-toolbar">
                    <span className="live-dot" />
                    <span>{info.status}</span>
                    <span className="toolbar-spacer" />
                    <button className="text-control" type="button" onClick={flip}>
                        ↻ FLIP
                    </button>
                </div>

                <div className="camera-window">
                    <video ref={videoRef} autoPlay playsInline muted />
                    {!info.live && (
                        <div className="camera-placeholder">
                            <span className="placeholder-icon">◎</span>
                            <strong>Camera is waiting</strong>
                            <small>{info.help}</small>
                            <div className="camera-start-actions">
                                <button className="outline-button" type="button" disabled={info.starting} onClick={start}>
                                    Enable camera
                                </button>
                                {info.fallback && (
                                    <button className="outline-button" type="button" onClick={() => phoneInput.current?.click()}>
                                        Use phone camera
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <input ref={phoneInput} type="file" accept="image/*" capture="environment" hidden onChange={addPhonePhoto} aria-label="Phone camera" />
                    <div className="camera-overlay">
                        <span>SNAPBOX / 2026</span>
                        <span>
                            {photos.length} / {BOOTH_MAX_PHOTOS}
                        </span>
                    </div>
                    <div className="countdown" aria-live="polite">
                        {countdown !== null && (
                            <span key={countdown} className="countdown-number">
                                {countdown}
                            </span>
                        )}
                    </div>
                </div>

                <div className="capture-row">
                    <button className="shutter" type="button" aria-label="Take photo" disabled={!canCapture} onClick={capture}>
                        <span />
                    </button>
                    <div className="capture-copy">
                        <strong>{remaining ? `Take photo ${photos.length + 1}` : 'All photos captured'}</strong>
                        <span>
                            {remaining
                                ? `${remaining} photo${remaining === 1 ? '' : 's'} remaining`
                                : 'Ready to customize your strip'}
                        </span>
                    </div>
                    <div className="photo-save-actions">
                        <button className="save-photo-button design-strip-button" type="button" onClick={() => navigate('/booth/customize')}>
                            Choose strip
                        </button>
                        <button className="save-photo-button" type="button" disabled={!photos.length} onClick={saveAll}>
                            Save ↓
                        </button>
                    </div>
                </div>

                <div className="thumbnail-row" aria-label="Captured photos">
                    {photos.map((photo, index) => (
                        <div key={index} className="thumbnail">
                            <img src={photo} alt={`Captured photo ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
