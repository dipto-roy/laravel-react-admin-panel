import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Course({ courses }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        duration: '',
        fee: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/course', {
            onSuccess: () => {
                toast.success('Course created successfully!');
                reset();
                setIsOpen(false);
            },
            onError: () => {
                toast.error('Failed to create course');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Courses" />

            <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover"
                    >
                        Add Course
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses?.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                                <span className="text-lg font-bold text-primary">${course.fee}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Course Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Course Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="e.g., 6 months"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Fee</label>
                                    <input
                                        type="number"
                                        value={data.fee}
                                        onChange={(e) => setData('fee', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
