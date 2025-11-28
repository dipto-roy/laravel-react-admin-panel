import { Link } from '@inertiajs/react';
import Logo from '../../../src/assets/logo/wbLogo.png';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <Link href="/">
                        <img src={Logo} alt="Logo" className="h-12 sm:h-14 md:h-16" />
                    </Link>
                </div>

                {/* Auth Card */}
                <div className="bg-base-200 shadow-xl rounded-lg p-6 sm:p-8 md:p-10">
                    {children}
                </div>

                {/* Footer Links */}
                <div className="text-center mt-4 md:mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Admin Panel. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
