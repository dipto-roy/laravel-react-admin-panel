import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiX, FiEdit2, FiTrash2, FiBook } from 'react-icons/fi';

export default function Subject({ subjects, departments, pagination }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        code: '',
        description: '',
        department_id: '',
        credits: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            put(`/subject/${editingId}`, {
                onSuccess: () => {
                    toast.success('Subject updated successfully!');
                    reset();
                    setIsOpen(false);
                    setIsEditMode(false);
                    setEditingId(null);
                },
                onError: () => {
                    toast.error('Failed to update subject');
                },
            });
        } else {
            post('/subject', {
                onSuccess: () => {
                    toast.success('Subject created successfully!');
                    reset();
                    setIsOpen(false);
                },
                onError: () => {
                    toast.error('Failed to create subject');
                },
            });
        }
    };

    const handleEdit = (subject) => {
        setData({
            name: subject.name,
            code: subject.code || '',
            description: subject.description || '',
            department_id: subject.department_id || '',
            credits: subject.credits || '',
        });
        setEditingId(subject.id);
        setIsEditMode(true);
        setIsOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this subject?')) {
            destroy(`/subject/${id}`, {
                onSuccess: () => {
                    toast.success('Subject deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete subject');
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

    const getDepartmentName = (departmentId) => {
        const dept = departments?.find(d => d.id === departmentId);
        return dept ? dept.name : 'N/A';
    };

    return (
        <AppLayout>
            <Head title="Subjects" />

            <div className="p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6 bg-secondary p-4 rounded-lg shadow">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary-content">📚 Subjects</h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-primary-hover transition-colors font-semibold"
                    >
                        + Add Subject
                    </button>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {subjects?.data?.map((subject) => (
                        <div
                            key={subject.id}
                            className="bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 pr-2">
                                        <h3 className="text-lg sm:text-xl font-bold mb-1">{subject.name}</h3>
                                        {subject.code && (
                                            <span className="text-xs bg-white/20 px-2 py-1 rounded font-semibold inline-block">
                                                {subject.code}
                                            </span>
                                        )}
                                    </div>
                                    <FiBook size={24} className="opacity-80" />
                                </div>
                            </div>
                            
                            <div className="p-4 space-y-3">
                                {subject.description && (
                                    <p className="text-sm text-primary-content/80 line-clamp-3">
                                        {subject.description}
                                    </p>
                                )}
                                
                                <div className="space-y-2">
                                    {subject.department_id && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-primary-content/60">Department:</span>
                                            <span className="font-semibold text-primary">
                                                {getDepartmentName(subject.department_id)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {subject.credits && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-primary-content/60">Credits:</span>
                                            <span className="font-semibold text-success">{subject.credits}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-accent">
                                    <button
                                        onClick={() => handleEdit(subject)}
                                        className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-2 rounded transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                    >
                                        <FiEdit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(subject.id)}
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
                {(!subjects?.data || subjects.data.length === 0) && (
                    <div className="text-center py-16 bg-base-200 rounded-lg">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-primary-content mb-2">No Subjects Yet</h3>
                        <p className="text-primary-content/60 mb-4">Get started by creating your first subject</p>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors"
                        >
                            Create Subject
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <a
                                key={page}
                                href={`/subject?page=${page}`}
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
                                {isEditMode ? '✏️ Edit Subject' : '➕ Create New Subject'}
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
                                        Subject Name <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                        placeholder="e.g., Data Structures"
                                        required
                                    />
                                    {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                        Subject Code
                                    </label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content uppercase"
                                        placeholder="e.g., CS201"
                                        maxLength="20"
                                    />
                                    {errors.code && <p className="text-error text-sm mt-1">{errors.code}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                        Department
                                    </label>
                                    <select
                                        value={data.department_id}
                                        onChange={(e) => setData('department_id', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                    >
                                        <option value="">Select Department</option>
                                        {departments?.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department_id && <p className="text-error text-sm mt-1">{errors.department_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                        Credits
                                    </label>
                                    <input
                                        type="number"
                                        value={data.credits}
                                        onChange={(e) => setData('credits', e.target.value)}
                                        className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                        placeholder="e.g., 3"
                                        min="0"
                                        step="0.5"
                                    />
                                    {errors.credits && <p className="text-error text-sm mt-1">{errors.credits}</p>}
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
                                    placeholder="Brief description of the subject"
                                />
                                {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
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
                                    {processing ? 'Saving...' : isEditMode ? 'Update Subject' : 'Create Subject'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
