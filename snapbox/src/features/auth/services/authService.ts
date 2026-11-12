import { apiClient } from '@/lib/api/axios';
import type { AuthResponse, User } from '@/types';

export const authService = {
    login: (email: string, password: string) =>
        apiClient.post<never, AuthResponse>('/users/authenticate', { email, password }),
    getMe: () => apiClient.get<never, User>('/users/me'),
};
