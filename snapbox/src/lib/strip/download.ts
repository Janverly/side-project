import { buildStripSvg, safeFileName } from './strip';
import type { StripDesign } from '@/types';

const clickDownload = (href: string, fileName: string) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = href;
    link.click();
};

/** Draws the strip on a canvas and downloads it as a PNG. Resolves once the download has started. */
export const downloadStripPng = (source: StripDesign & { photos: string[]; name?: string }) =>
    new Promise<void>((resolve, reject) => {
        const { svg, width, height } = buildStripSvg(source);
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d')?.drawImage(image, 0, 0);
            clickDownload(canvas.toDataURL('image/png'), `${safeFileName(source.name ?? '')}.png`);
            resolve();
        };
        image.onerror = () => reject(new Error('Could not draw the strip'));
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    });

/** Downloads each photo as its own JPG, a little apart so the browser doesn't block them. */
export const downloadPhotos = (photos: string[]) =>
    photos.forEach((photo, index) => setTimeout(() => clickDownload(photo, `snapbox-photo-${index + 1}.jpg`), index * 250));
