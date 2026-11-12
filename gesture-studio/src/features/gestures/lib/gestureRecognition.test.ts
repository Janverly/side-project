import { describe, expect, it } from 'vitest';
import {
    GestureStabilizer,
    getFingerState,
    isFingerExtended,
    isIndexPointPose,
    mapMediaPipeCategory,
    recognizeGesture,
    resolveGesture,
} from './gestureRecognition';
import { makeHand, rotateHand } from '@/test/fixtures/hand';

const INDEX = { mcp: 5, pip: 6, tip: 8 };

describe('finger state', () => {
    it('reads extended and curled fingers from landmarks', () => {
        const open = getFingerState(makeHand());
        expect(open).toEqual({ thumb: true, index: true, middle: true, ring: true, pinky: true });

        const fist = getFingerState(
            makeHand({ thumb: false, index: false, middle: false, ring: false, pinky: false }),
        );
        expect(fist).toEqual({ thumb: false, index: false, middle: false, ring: false, pinky: false });
    });

    it('stays rotation tolerant', () => {
        const rotated = rotateHand(makeHand(), 42);
        expect(isFingerExtended(rotated, INDEX)).toBe(true);

        const pointing = makeHand({ index: true, middle: false, ring: false, pinky: false });
        expect(isIndexPointPose(rotateHand(pointing, 42))).toBe(true);
    });

    it('rejects malformed landmark lists', () => {
        expect(isFingerExtended([], INDEX)).toBe(false);
        expect(recognizeGesture(makeHand().slice(0, 10))).toEqual({ gesture: 'none', score: 0 });
    });
});

describe('recognizeGesture', () => {
    it.each([
        ['open_palm', { thumb: true, index: true, middle: true, ring: true, pinky: true }],
        ['peace', { thumb: false, index: true, middle: true, ring: false, pinky: false }],
        ['point', { thumb: false, index: true, middle: false, ring: false, pinky: false }],
        ['fist', { thumb: false, index: false, middle: false, ring: false, pinky: false }],
        ['thumbs_up', { thumb: true, index: false, middle: false, ring: false, pinky: false }],
    ] as const)('recognises %s', (expected, pose) => {
        expect(recognizeGesture(makeHand(pose)).gesture).toBe(expected);
    });

    it('returns none for ambiguous poses', () => {
        const ambiguous = makeHand({ thumb: false, index: false, middle: true, ring: false, pinky: true });
        expect(recognizeGesture(ambiguous).gesture).toBe('none');
    });
});

describe('MediaPipe bridge', () => {
    it('maps trained categories', () => {
        expect(mapMediaPipeCategory('Thumb_Up')).toBe('thumbs_up');
        expect(mapMediaPipeCategory('Victory')).toBe('peace');
        expect(mapMediaPipeCategory('Open_Palm')).toBe('open_palm');
        expect(mapMediaPipeCategory('Pointing_Up')).toBe('point');
        expect(mapMediaPipeCategory('Closed_Fist')).toBe('fist');
        expect(mapMediaPipeCategory('Thumb_Down')).toBe('none');
        expect(mapMediaPipeCategory(undefined)).toBe('none');
        expect(mapMediaPipeCategory('Not_A_Gesture')).toBe('none');
    });

    it('prefers confident trained results', () => {
        expect(resolveGesture(makeHand(), 'Victory', 0.82)).toEqual({ gesture: 'peace', score: 0.82 });
    });

    it('falls back to landmarks when the trained score is low', () => {
        const hand = makeHand({ thumb: false, index: true, middle: true, ring: false, pinky: false });
        expect(resolveGesture(hand, 'Open_Palm', 0.3)).toEqual({ gesture: 'peace', score: 0.92 });
    });

    it('reports none when neither source is confident', () => {
        const hand = makeHand({ thumb: false, index: false, middle: true, ring: false, pinky: true });
        expect(resolveGesture(hand, 'None', 0)).toEqual({ gesture: 'none', score: 0 });
    });
});

describe('GestureStabilizer', () => {
    it('only promotes a pose once it has held for the required frames', () => {
        const stabilizer = new GestureStabilizer(3);
        expect(stabilizer.update('peace')).toBe('none');
        expect(stabilizer.update('peace')).toBe('none');
        expect(stabilizer.update('peace')).toBe('peace');
        expect(stabilizer.value).toBe('peace');
    });

    it('restarts the streak when the pose changes', () => {
        const stabilizer = new GestureStabilizer(2);
        stabilizer.update('peace');
        expect(stabilizer.update('fist')).toBe('none');
        expect(stabilizer.update('fist')).toBe('fist');
    });

    it('resets back to none', () => {
        const stabilizer = new GestureStabilizer(1);
        stabilizer.update('open_palm');
        stabilizer.reset();
        expect(stabilizer.value).toBe('none');
    });
});
