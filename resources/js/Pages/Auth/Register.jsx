import AuthLayout from '../../Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                toast.success('Registration successful!');
            },
            onError: () => {
                toast.error('Registration failed. Please try again.');
            },
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Create Account</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                    Fill in the details to get started
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div>
                        <label className="block text-sm md:text-base font-medium mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-sm md:text-base"
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

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

                    <div>
                        <label className="block text-sm md:text-base font-medium mb-1.5">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-sm md:text-base"
                            placeholder="············"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-primary text-white py-2.5 md:py-3 px-4 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 font-semibold text-sm md:text-base mt-2"
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm md:text-base">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
