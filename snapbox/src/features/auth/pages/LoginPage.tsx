import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAuthStore } from '@/store/auth.store';
import { useLogin } from '../hooks/useAuth';

const loginSchema = z.object({
    email: z.string().trim().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});
type LoginValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    useDocumentTitle('Log in');
    const navigate = useNavigate();
    const token = useAuthStore((s) => s.token);
    const saveLogin = useAuthStore((s) => s.login);
    const { login, isLoggingIn } = useLogin();
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } });

    if (token) return <Navigate to="/dashboard" replace />;

    return (
        <section className="auth-card">
            <p className="kicker">WELCOME TO SNAPBOX</p>
            <h1>Log in</h1>
            <form
                noValidate
                className="auth-form"
                onSubmit={handleSubmit((values) => {
                    setServerError(null);
                    login(values, {
                        onSuccess: ({ token, user }) => {
                            saveLogin(token, user);
                            navigate('/dashboard');
                        },
                        onError: (e) => setServerError((e as { message?: string }).message ?? 'Could not log in'),
                    });
                })}
            >
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register('email')} />
                    {errors.email && <p role="alert" className="field-error">{errors.email.message}</p>}
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register('password')} />
                    {errors.password && <p role="alert" className="field-error">{errors.password.message}</p>}
                </div>
                {serverError && <p role="alert" className="field-error">{serverError}</p>}
                <button type="submit" className="primary-button" disabled={isLoggingIn}>
                    Log in
                </button>
            </form>
        </section>
    );
};
