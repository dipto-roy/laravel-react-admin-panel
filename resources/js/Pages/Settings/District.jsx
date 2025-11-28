import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiX, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';

export default function District({ districts, pagination }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        code: '',
        description: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            put(`/district/${editingId}`, {
                onSuccess: () => {
                    toast.success('District updated successfully!');
                    reset();
                    setIsOpen(false);
                    setIsEditMode(false);
                    setEditingId(null);
                },
                onError: () => {
                    toast.error('Failed to update district');
                },
            });
        } else {
            post('/district', {
                onSuccess: () => {
                    toast.success('District created successfully!');
                    reset();
                    setIsOpen(false);
                },
                onError: () => {
                    toast.error('Failed to create district');
                },
            });
        }
    };

    const handleEdit = (district) => {
        setData({
            name: district.name,
            code: district.code || '',
            description: district.description || '',
            is_active: district.is_active ?? true,
        });
        setEditingId(district.id);
        setIsEditMode(true);
        setIsOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this district?')) {
            destroy(`/district/${id}`, {
                onSuccess: () => {
                    toast.success('District deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete district');
                },
            });
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsEditMode(false);
        setEditingId(null);
        reset();
    };

    return (
        <AppLayout>
            <Head title="Districts" />

            <div className="p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6 bg-secondary p-4 rounded-lg shadow">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary-content">🗺️ Districts</h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-primary-hover transition-colors font-semibold"
                    >
                        + Add District
                    </button>
                </div>

                {/* Districts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {districts?.data?.map((district) => (
                        <div
                            key={district.id}
                            className="bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 pr-2">
                                        <h3 className="text-lg sm:text-xl font-bold mb-1">{district.name}</h3>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded font-semibold inline-block">
                                            {district.code}
                                        </span>
                                    </div>
                                    <FiMapPin size={24} className="opacity-80" />
                                </div>
                            </div>
                            
                            <div className="p-4 space-y-3">
                                {district.description && (
                                    <p className="text-sm text-primary-content/80 line-clamp-3">
                                        {district.description}
                                    </p>
                                )}
                                
                                <div className="flex items-center justify-between text-sm pt-2 border-t border-accent">
                                    <span className="text-primary-content/60">Upazilas:</span>
                                    <span className="font-semibold text-primary">{district.upazilas_count || 0}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-primary-content/60">Status:</span>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        district.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                                    }`}>
                                        {district.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-accent">
                                    <button
                                        onClick={() => handleEdit(district)}
                                        className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-2 rounded transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                    >
                                        <FiEdit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(district.id)}
                                        className="flex-1 bg-error/10 text-error hover:bg-error hover:text-white px-3 py-2 rounded transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                    >
                                        <FiTrash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!districts?.data || districts.data.length === 0) && (
                    <div className="text-center py-16 bg-base-200 rounded-lg">
                        <div className="text-6xl mb-4">🗺️</div>
                        <h3 className="text-xl font-semibold text-primary-content mb-2">No Districts Yet</h3>
                        <p className="text-primary-content/60 mb-4">Get started by creating your first district</p>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors"
                        >
                            Create District
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <a
                                key={page}
                                href={`/district?page=${page}`}
                                className={`px-4 py-2 rounded border ${
                                    page === pagination.current_page
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-base-200 text-primary-content border-accent hover:bg-secondary'
                                }`}
                            >
                                {page}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-base-200 rounded-xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-fadeIn">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-primary-hover p-4 sm:p-5 flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                {isEditMode ? '✏️ Edit District' : '➕ Create New District'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-error transition-colors p-1 rounded-full hover:bg-white/20"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(95vh-180px)]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                        District Name <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                        placeholder="e.g., Dhaka"
                                        required
                                    />
                                    {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                        District Code <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content uppercase"
                                        placeholder="e.g., DHA"
                                        maxLength="10"
                                        required
                                    />
                                    {errors.code && <p className="text-error text-sm mt-1">{errors.code}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content resize-none"
                                    rows="4"
                                    placeholder="Brief description of the district"
                                />
                                {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 rounded border-2 border-accent"
                                />
                                <label htmlFor="is_active" className="text-sm sm:text-base font-semibold text-primary-content cursor-pointer">
                                    Active Status
                                </label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-accent">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-primary-content rounded-lg transition-colors font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-lg disabled:opacity-50 transition-all font-semibold"
                                >
                                    {processing ? 'Saving...' : isEditMode ? 'Update District' : 'Create District'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
