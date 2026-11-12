import {
    BOOTH_DEFAULT_CAPTION,
    DEFAULT_EXPORT_STYLE,
    STRIP_BACKGROUNDS,
    STRIP_FILTERS,
    TEMPLATE_EXPORT_STYLES,
} from '@/lib/constants';
import type { StripBackground, StripDesign, StripFilter, StripTemplate } from '@/types';

export const filterCss = (filter: StripFilter | string): string =>
    STRIP_FILTERS.find((f) => f.id === filter)?.css ?? 'none';

export const backgroundColor = (background: StripBackground | string): string =>
    STRIP_BACKGROUNDS.find((b) => b.id === background)?.color ?? '#fffdf8';

export const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

export const escapeXml = (value: string) =>
    value.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c] as string);

export const safeFileName = (name: string) => name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'snapbox-strip';

export const exportStyle = (template: StripTemplate | string, background: StripBackground | string) => {
    const special = TEMPLATE_EXPORT_STYLES[template as keyof typeof TEMPLATE_EXPORT_STYLES];
    return special ?? { ...DEFAULT_EXPORT_STYLE, background: backgroundColor(background) };
};

type StripSource = StripDesign & { photos: string[] };

const WIDTH = 700;
const PHOTO_HEIGHT = 390;
const PHOTO_GAP = 16;
const TOP = 125;
const FOOTER = 155;

/** The strip as an SVG string (what "Download PNG" draws onto a canvas). Pure, so it is easy to test. */
export const buildStripSvg = (source: StripSource) => {
    const { photos, template, filter, background } = source;
    const height = TOP + PHOTO_HEIGHT * photos.length + PHOTO_GAP * (photos.length - 1) + FOOTER;
    const style = exportStyle(template, background);
    const bordered = template === 'olive' || template === 'cocoa';
    const photoWidth = WIDTH - 80;

    const images = photos
        .map((photo, index) => {
            const y = TOP + index * (PHOTO_HEIGHT + PHOTO_GAP);
            const frame = bordered
                ? `<rect x="40" y="${y}" width="${photoWidth}" height="${PHOTO_HEIGHT}" fill="none" stroke="${style.border}" stroke-width="6" />`
                : '';
            return `<image href="${photo}" x="40" y="${y}" width="${photoWidth}" height="${PHOTO_HEIGHT}" preserveAspectRatio="xMidYMid slice" style="filter:${filterCss(filter)}" />${frame}`;
        })
        .join('');

    const font = 'font-family="Arial,sans-serif"';
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${height}" viewBox="0 0 ${WIDTH} ${height}">` +
        `<rect width="100%" height="100%" fill="${style.background}"/>` +
        `<text x="40" y="48" ${font} font-size="26" font-weight="700" fill="${style.ink}">SNAP<tspan fill="${style.accent}">BOX</tspan></text>` +
        `<text x="40" y="78" ${font} font-size="11" letter-spacing="2" fill="${style.ink}">YOUR MOMENT, YOUR WAY</text>` +
        images +
        `<text x="${WIDTH / 2}" y="${height - 75}" text-anchor="middle" ${font} font-size="24" font-weight="600" fill="${style.ink}">${escapeXml(source.caption || BOOTH_DEFAULT_CAPTION)}</text>` +
        `<line x1="40" x2="${WIDTH - 40}" y1="${height - 50}" y2="${height - 50}" stroke="${style.border}"/>` +
        `<text x="40" y="${height - 25}" ${font} font-size="11" letter-spacing="2" fill="${style.ink}">SNAPBOX</text>` +
        `<text x="${WIDTH - 40}" y="${height - 25}" text-anchor="end" ${font} font-size="11" letter-spacing="2" fill="${style.ink}">2026</text>` +
        `</svg>`;

    return { svg, width: WIDTH, height };
};
