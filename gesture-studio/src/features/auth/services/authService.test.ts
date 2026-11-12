import { describe, expect, it } from 'vitest';
import { useAuthStore } from '@/store/auth.store';
import { authService } from './authService';

describe('authService', () => {
    it('logs in with the demo credentials', async () => {
        const response = await authService.login('demo@example.com', 'password123');
        expect(response.token).toBe('demo-token');
        expect(response.user).toMatchObject({ email: 'demo@example.com' });
    });

    it('surfaces the server error for bad credentials', async () => {
        await expect(authService.login('demo@example.com', 'wrong')).rejects.toMatchObject({
            code: 'ALE401',
            title: 'Login failed',
        });
    });

    it('fetches the current user with a valid token', async () => {
        useAuthStore.setState({ token: 'demo-token', user: null });
        const user = await authService.getMe();
        expect(user).toMatchObject({ id: 'u1', email: 'demo@example.com' });
    });

    it('logs out when a protected call returns 401', async () => {
        useAuthStore.setState({
            token: 'expired-token',
            user: { id: 'u1', name: 'Demo User', email: 'demo@example.com' },
        });
        await expect(authService.getMe()).rejects.toMatchObject({ code: 'AUE401' });
        expect(useAuthStore.getState().token).toBeNull();
        expect(useAuthStore.getState().user).toBeNull();
    });
});
