import AuthLayout from '../../Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                toast.success('Login successful!');
            },
            onError: () => {
                toast.error('Login failed. Please check your credentials.');
            },
        });
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Welcome Back!</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                    Please sign in to your account
                </p>

                {status && (
                    <div className="mb-4 p-3 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div>
                        <label className="block text-sm md:text-base font-medium mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-sm md:text-base"
                            placeholder="email@example.com"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm md:text-base font-medium mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-sm md:text-base"
                            placeholder="············"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary w-4 h-4"
                            />
                            <span className="ml-2 text-sm md:text-base">Remember me</span>
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm md:text-base text-primary hover:underline font-medium"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-primary text-white py-2.5 md:py-3 px-4 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 font-semibold text-sm md:text-base mt-2"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm md:text-base">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:underline font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
