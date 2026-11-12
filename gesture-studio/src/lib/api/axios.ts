import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

/**
 * The one HTTP client. Every service uses it.
 * - Adds the token header when you are logged in.
 * - Success: the server sends { code, result }; callers get just `result`.
 * - Failure: callers get the server's { code, title, message } object.
 * - A 401 on a protected call logs you out, and the route guard sends you to /login.
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
});

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response.data.result,
    (error) => {
        const isLoginCall = error.config?.url?.includes('/users/authenticate');
        if (error.response?.status === 401 && !isLoginCall) useAuthStore.getState().logout();
        return Promise.reject(
            error.response?.data ?? { code: 'NETWORK', title: 'Network error', message: error.message },
        );
    },
);
