import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '../services/authService';

export const useLogin = () => {
    const m = useMutation({
        mutationFn: (values: { email: string; password: string }) =>
            authService.login(values.email, values.password),
    });
    return { login: m.mutate, isLoggingIn: m.isPending };
};

export const useMe = () => {
    const token = useAuthStore((s) => s.token);
    return useQuery({ queryKey: ['me'], queryFn: authService.getMe, enabled: Boolean(token), retry: false });
};
