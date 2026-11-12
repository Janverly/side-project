import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SessionInput } from '@/types';
import { sessionService } from '../services/sessionService';

export const sessionKeys = {
    all: ['sessions'] as const,
    lists: () => [...sessionKeys.all, 'list'] as const,
    list: (q: string) => [...sessionKeys.lists(), { q }] as const,
    details: () => [...sessionKeys.all, 'detail'] as const,
    detail: (id: string) => [...sessionKeys.details(), id] as const,
};

export const useSessions = (q: string) =>
    useQuery({
        queryKey: sessionKeys.list(q),
        queryFn: () => sessionService.getSessions(q),
        placeholderData: keepPreviousData, // typing in the search box doesn't flash the whole grid
    });

/** How many sessions are saved (the badge in the header). Shares the unfiltered list's cache. */
export const useSessionCount = () =>
    useQuery({
        queryKey: sessionKeys.list(''),
        queryFn: () => sessionService.getSessions(''),
        select: (sessions) => sessions.length,
    });

export const useSession = (id: string) =>
    useQuery({ queryKey: sessionKeys.detail(id), queryFn: () => sessionService.getSession(id), retry: false });

export const useCreateSession = () => {
    const qc = useQueryClient();
    const m = useMutation({
        mutationFn: (input: SessionInput) => sessionService.createSession(input),
        onSuccess: () => qc.invalidateQueries({ queryKey: sessionKeys.lists() }),
    });
    return { createSession: m.mutate, isCreating: m.isPending };
};

export const useUpdateSession = (id: string) => {
    const qc = useQueryClient();
    const m = useMutation({
        mutationFn: (input: SessionInput) => sessionService.updateSession(id, input),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: sessionKeys.lists() });
            qc.invalidateQueries({ queryKey: sessionKeys.detail(id) });
        },
    });
    return { updateSession: m.mutate, isUpdating: m.isPending };
};

export const useDeleteSession = (id: string) => {
    const qc = useQueryClient();
    const m = useMutation({
        mutationFn: () => sessionService.deleteSession(id),
        // Only refresh the lists here. The caller removes the detail query AFTER it navigates away
        // (removing it while the modal is still mounted makes the modal refetch a deleted item).
        onSuccess: () => qc.invalidateQueries({ queryKey: sessionKeys.lists() }),
    });
    return { deleteSession: m.mutate, isDeleting: m.isPending };
};
