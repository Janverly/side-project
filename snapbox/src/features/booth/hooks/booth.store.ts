import { create } from 'zustand';
import { BOOTH_MAX_PHOTOS, DEFAULT_STRIP_DESIGN } from '@/lib/constants';
import type { StripDesign } from '@/types';

type State = {
    photos: string[];
    design: StripDesign;
    addPhoto: (photo: string) => void;
    setDesign: (change: Partial<StripDesign>) => void;
    reset: () => void;
};

const initial = () => ({ photos: [] as string[], design: { ...DEFAULT_STRIP_DESIGN } as StripDesign });

// Client state: the photos you just took and how you are styling them. Not persisted on purpose:
// the real record is a saved session. Taking photos never touches the server.
export const useBoothStore = create<State>((set) => ({
    ...initial(),
    addPhoto: (photo) => set((s) => (s.photos.length >= BOOTH_MAX_PHOTOS ? s : { photos: [...s.photos, photo] })),
    setDesign: (change) => set((s) => ({ design: { ...s.design, ...change } })),
    reset: () => set(initial()),
}));
