import { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { IoIosLogOut, IoMdNotificationsOutline, IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from 'react-icons/io';
import { IoMailOpenOutline, IoClose } from 'react-icons/io5';
import { FaRegUserCircle, FaFileInvoiceDollar, FaQuestion } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';
import { TbCurrencyDollar } from 'react-icons/tb';
import { HiMenuAlt3 } from 'react-icons/hi';
import Logo from '../../../src/assets/logo/wbLogo.png';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    const dropdownRef = useRef(null);
    const profileImageRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const notificationIconRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationOpen((prev) => !prev);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileImageRef.current &&
                !profileImageRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }

            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target) &&
                notificationIconRef.current &&
                !notificationIconRef.current.contains(event.target)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            router.post('/logout');
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Top Navbar */}
            <nav className="navbar px-5 bg-base-200 shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="navbar-start flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden btn btn-ghost btn-sm"
                    >
                        <HiMenuAlt3 size={24} />
                    </button>

                    <Link href="/">
                        <img src={Logo} alt="logo" className="h-12" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="navbar-center hidden lg:flex">
                    <li className="group/item relative font-medium text-base text-primary-content">
                        <Link
                            href="/"
                            className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary cursor-pointer"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li className="group/item relative font-medium text-base text-primary-content">
                        <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary cursor-pointer">
                            Task
                            <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                            <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                        </span>

                        <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/card"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Card
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/table"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Table
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/profile"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="group/item relative font-medium text-base text-primary-content">
                        <span className="flex items-center gap-1 p-2 rounded-md transition-colors duration-300 group-hover/item:bg-secondary cursor-pointer">
                            Academic
                            <IoIosArrowDown className="block group-hover/item:hidden transition-transform duration-300" />
                            <IoIosArrowUp className="hidden group-hover/item:block transition-transform duration-300" />
                        </span>

                        <ul className="absolute top-10 left-0 p-2 bg-base-200 rounded-md text-primary-content shadow-lg z-20 transform origin-top opacity-0 scale-y-0 translate-y-2 transition-all duration-300 ease-out group-hover/item:opacity-100 group-hover/item:scale-y-100 group-hover/item:translate-y-0">
                            <li>
                                <Link
                                    href="/course"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Course
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/class"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Class
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/department"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Department
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subject"
                                    className="block min-w-40 p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    Subject
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="navbar-end flex items-center gap-3">
                    {/* Theme Toggle */}
                    <label className="swap swap-rotate hidden lg:flex">
                        <input
                            type="checkbox"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {/* Notification Icon */}
                    <div className="relative">
                        <button
                            type="button"
                            ref={notificationIconRef}
                            onClick={toggleNotificationDropdown}
                            className="relative p-1 rounded-full hover:bg-base-300 transition-colors"
                            aria-label="Notifications"
                        >
                            <IoMdNotificationsOutline size={32} />
                            <span className="absolute text-error-content -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-error text-xs flex items-center justify-center">
                                5
                            </span>
                        </button>

                        {isNotificationOpen && (
                            <div
                                ref={notificationDropdownRef}
                                className="absolute right-0 top-11 mt-3 w-80 bg-secondary-content shadow-lg rounded-md text-sm text-primary-content z-50"
                            >
                                <div className="flex items-center justify-between border-b border-base-300 pr-5">
                                    <h1 className="px-4 py-3 font-semibold">Notifications</h1>
                                    <div className="flex gap-3">
                                        <h1 className="bg-[#FFF2DB] text-warning text-[12px] px-2 py-1 rounded-sm">
                                            8 New
                                        </h1>
                                        <IoMailOpenOutline size={24} />
                                    </div>
                                </div>

                                <ul className="max-h-80 overflow-y-auto">
                                    {[1, 2, 3].map((item) => (
                                        <li
                                            key={item}
                                            className="flex relative group py-3 border-b border-base-300 hover:bg-base-100 cursor-pointer items-center"
                                        >
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 ml-3">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg"
                                                    alt="Profile"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-[14px] font-medium">
                                                    Send connection request
                                                </p>
                                                <p className="text-[10px]">
                                                    Peter send you connection request
                                                </p>
                                                <p className="text-xs opacity-70">4 days ago</p>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3">
                                                <IoClose size={30} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-70 mx-auto border-t border-base-300 px-4 py-2 my-4 text-center text-xs text-warning-content bg-warning rounded-sm cursor-pointer">
                                    View all notifications
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <div
                            ref={profileImageRef}
                            onClick={toggleDropdown}
                            className="w-10 h-10 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-secondary"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg"
                                alt="Profile"
                            />
                        </div>

                        {isDropdownVisible && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 top-14 mt-3 w-64 bg-secondary-content shadow-lg rounded-md text-sm text-primary-content z-50"
                            >
                                <div className="flex items-center gap-3 p-4 border-b border-base-300">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="font-semibold">
                                            {auth?.user?.name || 'User'}
                                        </h1>
                                        <p className="text-xs opacity-70">
                                            {auth?.user?.email || ''}
                                        </p>
                                    </div>
                                </div>

                                <ul className="py-2 text-sm">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-4 px-4 py-2 hover:bg-base-200"
                                        >
                                            <FaRegUserCircle size={24} />
                                            <h1 className="text-[14px] font-semibold">My Profile</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-4 px-4 py-2 hover:bg-base-200"
                                        >
                                            <MdOutlineSettings size={24} />
                                            <h1 className="text-[14px] font-semibold">Settings</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/billing"
                                            className="flex items-center gap-4 px-4 py-2 border-b border-base-300 hover:bg-base-200"
                                        >
                                            <FaFileInvoiceDollar size={24} />
                                            <h1 className="text-[14px] font-semibold">Billing</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pricing"
                                            className="flex items-center gap-4 px-4 py-2 hover:bg-base-200"
                                        >
                                            <TbCurrencyDollar size={24} />
                                            <h1 className="text-[14px] font-semibold">Pricing</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/faq"
                                            className="flex items-center gap-4 px-4 py-2 hover:bg-base-200"
                                        >
                                            <FaQuestion size={24} />
                                            <h1 className="text-[14px] font-semibold">FAQ</h1>
                                        </Link>
                                    </li>
                                </ul>

                                <div className="p-3">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-error text-error-content text-sm font-medium hover:brightness-95"
                                    >
                                        Logout
                                        <IoIosLogOut />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-40 lg:hidden ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/card"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Card
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/table"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Table
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="pt-4 border-t border-base-300">
                            <p className="text-xs font-semibold text-gray-500 mb-2">Academic</p>
                            <Link
                                href="/course"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Course
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/class"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Class
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/department"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Department
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/subject"
                                className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Subject
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="pt-16 min-h-screen">{children}</main>
        </div>
    );
}
