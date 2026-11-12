import { describe, expect, it } from 'vitest';
import type { StripDesign } from '@/types';
import { backgroundColor, buildStripSvg, escapeXml, filterCss, safeFileName } from './strip';

const base: StripDesign & { photos: string[] } = {
    template: 'classic',
    filter: 'bw',
    background: 'mint',
    caption: 'Hi & <bye>',
    photos: ['data:a', 'data:b'],
};

describe('strip helpers', () => {
    it('maps filters and backgrounds, with safe fallbacks', () => {
        expect(filterCss('bw')).toBe('grayscale(1)');
        expect(filterCss('nope')).toBe('none');
        expect(backgroundColor('mint')).toBe('#b9d1a9');
        expect(backgroundColor('nope')).toBe('#fffdf8');
    });
    it('escapes XML and builds a safe file name', () => {
        expect(escapeXml(`<a href="x">&</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
        expect(safeFileName('Friday Night Out!')).toBe('friday-night-out-');
        expect(safeFileName('')).toBe('snapbox-strip');
    });
    it('buildStripSvg grows with the photo count and escapes the caption', () => {
        const two = buildStripSvg({ ...base, photos: ['a', 'b'] });
        const three = buildStripSvg({ ...base, photos: ['a', 'b', 'c'] });
        expect(three.height - two.height).toBe(390 + 16);
        expect(two.svg).toContain('Hi &amp; &lt;bye&gt;');
        expect(two.svg).toContain('fill="#b9d1a9"');
    });
    it('olive and cocoa ignore the chosen background and draw frames', () => {
        const { svg } = buildStripSvg({ ...base, template: 'olive' });
        expect(svg).toContain('fill="#515838"');
        expect(svg).toContain('stroke-width="6"');
    });
});
