import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { MdManageAccounts } from 'react-icons/md';
import { IoIosLogOut, IoMdNotificationsOutline, IoClose, IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from 'react-icons/io';
import { IoMailOpenOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export default function Profile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handlePasswordChange = (e) => {
        e.preventDefault();
        put('/profile/password', {
            onSuccess: () => {
                toast.success('Password changed successfully!');
                setData({
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                });
            },
            onError: () => {
                toast.error('Failed to change password');
            },
        });
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            router.post('/logout', {}, {
                onSuccess: () => {
                    toast.success('Logged out successfully!');
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="flex flex-col lg:flex-row p-5 gap-5">
                {/* Profile Sidebar */}
                <div className="w-full lg:w-1/4">
                    <div className="w-full overflow-hidden shadow-md border border-slate-200 bg-white transition-transform duration-300 hover:scale-[1.01]">
                        <div className="flex justify-center items-center mt-4">
                            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden bg-white border border-slate-200">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user?.avatar || 'https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg'}
                                    alt="User profile"
                                />
                            </div>
                        </div>

                        <div className="text-center mt-3">
                            <h1 className="font-semibold text-slate-900">{user?.name || 'User Name'}</h1>
                        </div>
                        <div className="flex justify-center mt-2 mb-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                                {user?.role || 'Developer'}
                            </span>
                        </div>

                        <div className="flex justify-between gap-3 px-4 mb-4">
                            <div className="flex-1 text-left py-3">
                                <h6 className="text-lg font-bold">1200tk</h6>
                                <p className="text-xs mt-1">Installation Charge</p>
                            </div>
                            <div className="flex-1 text-left py-3">
                                <h6 className="text-lg font-bold">2150tk</h6>
                                <p className="text-xs mt-1">Monthly Charge</p>
                            </div>
                        </div>

                        <div className="px-4 border-b border-gray-300 pt-3">
                            <h1 className="font-bold text-slate-900 text-base">Details</h1>
                        </div>

                        <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-slate-800">
                            <div className="flex gap-4">
                                <div className="flex w-2/5 gap-2">
                                    <div className="flex-1 font-semibold space-y-1">
                                        <p>Email</p>
                                        <p>Phone</p>
                                        <p>Address</p>
                                        <p>District</p>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        {Array(4)
                                            .fill(':')
                                            .map((colon, idx) => (
                                                <p key={idx}>{colon}</p>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex-1 w-3/5 space-y-1">
                                    <p>{user?.email || 'email@example.com'}</p>
                                    <p>{user?.phone || '01309085965'}</p>
                                    <p>{user?.address || 'Address not provided'}</p>
                                    <p>{user?.district || 'Dhaka'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="flex flex-col w-full lg:w-3/4 gap-4">
                    <div className="flex items-center justify-between gap-6 flex-wrap">
                        <div className="flex items-center gap-6 flex-wrap">
                            <button className="flex gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2">
                                <MdManageAccounts size={22} /> <span>Account</span>
                            </button>
                            <button className="flex gap-1 bg-warning text-warning-content hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2">
                                <MdManageAccounts size={22} /> <span>Security</span>
                            </button>
                            <button className="flex gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2">
                                <MdManageAccounts size={22} /> <span>Billing & Plan</span>
                            </button>
                            <button className="flex gap-1 hover:bg-[#FFF2DB] hover:text-warning rounded-md font-semibold text-[16px] px-4 py-2">
                                <MdManageAccounts size={22} /> <span>Notification</span>
                            </button>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 rounded-md font-semibold text-[16px] px-4 py-2 transition-colors"
                        >
                            <IoIosLogOut size={22} /> <span>Logout</span>
                        </button>
                    </div>

                    <div className="px-5 py-4 rounded bg-white shadow">
                        <h5 className="w-full bg-white mb-4 font-bold">Change Password</h5>
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            {/* Alert */}
                            <div className="relative rounded-md border-l-4 border-yellow-500 bg-yellow-50 px-4 py-3">
                                <h5 className="mb-1 text-xl font-semibold text-[#FF9F43]">
                                    Ensure that these requirements are met
                                </h5>
                                <span className="text-md text-[#FF9F43]">
                                    Minimum 8 characters long, uppercase & symbol
                                </span>
                            </div>

                            {/* Fields */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        type="password"
                                        value={data.new_password}
                                        onChange={(e) => setData('new_password', e.target.value)}
                                        placeholder="············"
                                    />
                                    {errors.new_password && (
                                        <p className="mt-1 text-xs text-red-500">{errors.new_password}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        type="password"
                                        value={data.new_password_confirmation}
                                        onChange={(e) =>
                                            setData('new_password_confirmation', e.target.value)
                                        }
                                        placeholder="············"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50"
                                >
                                    {processing ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
