import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, Hand, ScanFace, Sparkles } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAuthStore } from '@/store/auth.store';
import { useLogin } from '../hooks/useAuth';

const loginSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

const DEMO = { email: 'demo@example.com', password: 'password123' };

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
        setValue,
        formState: { errors },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    if (token) return <Navigate to="/studio" replace />;

    return (
        <div className="login-page">
            <div className="login-page__glow" aria-hidden="true" />
            <section className="login-hero">
                <div className="brand brand--large">
                    <span className="brand__mark" aria-hidden="true">
                        <Hand size={26} />
                    </span>
                    <span>KINETIC</span>
                </div>
                <p className="eyebrow">
                    <Sparkles size={14} /> Webcam hand tracking studio
                </p>
                <h1>
                    Touch nothing.
                    <br />
                    <span className="gradient-text">Create everything.</span>
                </h1>
                <p className="login-hero__copy">
                    Turn your hands into a cursor, a paintbrush and a remote control. Particles, animations
                    and a drawing board — all powered by your webcam and MediaPipe.
                </p>
                <ul className="login-hero__list">
                    <li>
                        <ScanFace size={18} /> 21-point hand tracking in the browser
                    </li>
                    <li>
                        <Sparkles size={18} /> Gesture-triggered particle effects
                    </li>
                    <li>
                        <Hand size={18} /> Draw with your index finger
                    </li>
                </ul>
                <p className="privacy-note">100% local. No camera frames ever leave this device.</p>
            </section>

            <section className="login-card" aria-labelledby="login-title">
                <div className="login-card__header">
                    <span className="badge badge--muted">Demo workspace</span>
                    <h2 id="login-title">Welcome back</h2>
                    <p>Log in to open the studio.</p>
                </div>

                <form
                    noValidate
                    className="form-stack"
                    onSubmit={handleSubmit((values) => {
                        setServerError(null);
                        login(values, {
                            onSuccess: ({ token, user }) => {
                                saveLogin(token, user);
                                navigate('/studio');
                            },
                            onError: (error) =>
                                setServerError(
                                    (error as { message?: string }).message ?? 'Could not log in',
                                ),
                        });
                    })}
                >
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" autoComplete="email" {...register('email')} />
                        {errors.email && <p role="alert">{errors.email.message}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password')}
                        />
                        {errors.password && <p role="alert">{errors.password.message}</p>}
                    </div>
                    {serverError && <p role="alert">{serverError}</p>}

                    <button type="submit" className="btn btn--primary btn--wide" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Opening studio…' : 'Enter studio'}
                        {!isLoggingIn && <ArrowRight size={18} />}
                    </button>
                </form>

                <button
                    type="button"
                    className="demo-fill"
                    onClick={() => {
                        setValue('email', DEMO.email, { shouldValidate: true });
                        setValue('password', DEMO.password, { shouldValidate: true });
                    }}
                >
                    Use demo credentials
                </button>
                <p className="demo-hint">
                    <span>{DEMO.email}</span>
                    <span>{DEMO.password}</span>
                </p>
            </section>
        </div>
    );
};
