import { apiClient } from '@/lib/api/axios';
import type { Session, SessionInput } from '@/types';

export const sessionService = {
    getSessions: (q = '') => apiClient.get<never, Session[]>('/sessions', { params: { q } }),
    getSession: (id: string) => apiClient.get<never, Session>(`/sessions/${id}`),
    createSession: (input: SessionInput) => apiClient.post<never, Session>('/sessions', input),
    updateSession: (id: string, input: SessionInput) => apiClient.put<never, Session>(`/sessions/${id}`, input),
    deleteSession: (id: string) => apiClient.delete<never, null>(`/sessions/${id}`),
};
