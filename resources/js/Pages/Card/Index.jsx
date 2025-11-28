import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiUpload, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function Card({ students, pagination, departments }) {
    const [openAdd, setOpenAdd] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(pagination?.current_page || 1);
    const totalPages = pagination?.last_page || 1;
    const [imagePreview, setImagePreview] = useState(null);

    // Debug log to check departments
    console.log('Departments received:', departments);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        department: '',
        proficiency: '',
        destination: '',
        address: '',
        sscGpa: '',
        hscGpa: '',
        image: null,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            post(`/card/${editingId}`, {
                forceFormData: true,
                _method: 'put',
                onSuccess: () => {
                    toast.success('Card updated successfully!');
                    reset();
                    setImagePreview(null);
                    setOpenAdd(false);
                    setIsEditMode(false);
                    setEditingId(null);
                },
                onError: (errors) => {
                    if (errors.email) {
                        toast.error('This email is already registered!');
                    } else {
                        toast.error('Failed to update card. Please check all fields.');
                    }
                },
            });
        } else {
            post('/card', {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Card created successfully!');
                    reset();
                    setImagePreview(null);
                    setOpenAdd(false);
                },
                onError: (errors) => {
                    if (errors.email) {
                        toast.error('This email is already registered!');
                    } else {
                        toast.error('Failed to create card. Please check all fields.');
                    }
                },
            });
        }
    };

    const handleEdit = (card) => {
        setData({
            name: card.name,
            email: card.email,
            phone: card.phone,
            dob: card.dob || '',
            gender: card.gender || '',
            department: card.department || '',
            proficiency: card.proficiency || '',
            destination: card.destination || '',
            address: card.address || '',
            sscGpa: card.sscGpa || '',
            hscGpa: card.hscGpa || '',
            image: null,
        });
        if (card.image) {
            setImagePreview(`/${card.image}`);
        }
        setEditingId(card.id);
        setIsEditMode(true);
        setOpenAdd(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this card?')) {
            destroy(`/card/${id}`, {
                onSuccess: () => {
                    toast.success('Card deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete card');
                },
            });
        }
    };

    const closeModal = () => {
        setOpenAdd(false);
        setIsEditMode(false);
        setEditingId(null);
        setImagePreview(null);
        reset();
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.location.href = `/card?page=${page}`;
        }
    };

    return (
        <AppLayout>
            <Head title="Card" />

            <div className="p-3 sm:p-5 space-y-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-secondary w-full mb-5 shadow-md p-3 rounded-lg">
                    <h1 className="bg-primary text-white px-4 py-2 h-10 font-bold text-base rounded flex items-center justify-center">
                        Student Cards
                    </h1>
                    <button
                        onClick={() => setOpenAdd(true)}
                        className="flex items-center justify-center gap-2 font-bold text-white bg-primary hover:bg-primary-hover px-4 py-2 h-10 text-base cursor-pointer rounded transition-colors"
                    >
                        <span className="text-xl">+</span>
                        <span>Create Card</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {students?.map((data, i) => (
                        <div
                            key={i}
                            className="bg-base-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between rounded-lg overflow-hidden"
                        >
                            <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-32 md:w-40 mx-auto sm:mx-0 overflow-hidden rounded-lg">
                                    <img
                                        src={data?.image ? `/${data.image}` : 'https://randomuser.me/api/portraits/men/11.jpg'}
                                        alt={data?.name}
                                        className="h-40 sm:h-48 md:h-52 w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://randomuser.me/api/portraits/men/11.jpg';
                                        }}
                                    />
                                </div>

                                <div className="flex-1 sm:pl-2 md:pl-4">
                                    <ul className="text-primary-content text-left space-y-1 text-sm">
                                        <li>
                                            <span className="font-bold">Name:</span>{' '}
                                            <span className="font-normal break-words">{data?.name}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Email:</span>{' '}
                                            <span className="font-normal break-all">{data?.email}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Phone:</span>{' '}
                                            <span className="font-normal">{data?.phone}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">DOB:</span>{' '}
                                            <span className="font-normal">{data?.dob}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Gender:</span>{' '}
                                            <span className="font-normal">{data?.gender}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Department:</span>{' '}
                                            <span className="font-normal">{data?.department}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Proficiency:</span>{' '}
                                            <span className="font-normal">{data?.proficiency}</span>
                                        </li>
                                        <li>
                                            <span className="font-bold">Destination:</span>{' '}
                                            <span className="font-normal">{data?.destination}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-2 mx-4 sm:mx-5 mt-3 sm:mt-5">
                                <div className="flex-1 h-1 bg-primary/50"></div>
                                <div className="flex-1 h-1 bg-primary/65"></div>
                                <div className="flex-1 h-1 bg-primary/80"></div>
                                <div className="flex-1 h-1 bg-primary"></div>
                            </div>

                            <div className="flex flex-col sm:flex-row p-4 sm:p-5 gap-3 sm:gap-5 text-center">
                                <div className="w-full sm:w-1/2">
                                    <p className="font-bold text-primary-content text-sm">
                                        Address: <span className="font-normal break-words">{data?.address || 'N/A'}</span>
                                    </p>
                                </div>

                                <div className="w-full sm:w-1/2 sm:border-l border-t sm:border-t-0 border-accent pt-3 sm:pt-0 space-y-1">
                                    <p className="font-semibold text-primary-content text-sm">
                                        SSC GPA: <span>{data?.sscGpa || 'N/A'}</span>
                                    </p>
                                    <p className="font-semibold text-primary-content text-sm">
                                        HSC GPA: <span>{data?.hscGpa || 'N/A'}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 p-4 sm:p-5">
                                <button 
                                    onClick={() => handleEdit(data)}
                                    className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-2 rounded transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                >
                                    <FiEdit2 size={16} />
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(data.id)}
                                    className="flex-1 bg-error/10 text-error hover:bg-error hover:text-white px-3 py-2 rounded transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                >
                                    <FiTrash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap px-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-4 py-2 border border-accent bg-base-200 cursor-pointer hover:bg-primary hover:text-neutral-content rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                        Prev
                    </button>
                    <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 sm:px-4 py-2 border bg-base-200 hover:bg-secondary cursor-pointer border-accent rounded transition-colors text-sm font-medium ${
                                        page === currentPage ? 'bg-primary text-neutral-content hover:bg-primary-hover' : ''
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 sm:px-4 py-2 border border-accent bg-base-200 hover:bg-primary hover:text-neutral-content cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors text-sm font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Add/Edit Modal - Fully Responsive */}
            {openAdd && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
                    <div className="bg-base-200 rounded-xl max-w-6xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden shadow-2xl animate-fadeIn">
                        {/* Modal Header - Sticky */}
                        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-hover z-10 flex items-center justify-between p-4 sm:p-5 shadow-lg">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                <span className="hidden sm:inline">{isEditMode ? '✏️' : '📋'}</span>
                                {isEditMode ? 'Edit Student Card' : 'Create New Student Card'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-2xl sm:text-3xl text-white hover:text-error hover:rotate-90 transition-all duration-300 p-1 rounded-full hover:bg-white/20"
                                aria-label="Close modal"
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Scrollable Form Content */}
                        <div className="overflow-y-auto max-h-[calc(98vh-140px)] sm:max-h-[calc(95vh-140px)]">
                            <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6">
                                {/* Image Upload Section - Centered */}
                                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 sm:p-6">
                                    <div className="flex justify-center">
                                        <div className="w-full max-w-xs">
                                            <label className="block text-sm sm:text-base font-semibold mb-3 text-center text-primary-content">
                                                📸 Profile Image
                                            </label>
                                            {imagePreview ? (
                                                <div className="relative w-full max-w-[180px] sm:max-w-[200px] h-56 sm:h-64 mx-auto group">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-xl shadow-xl border-4 border-primary/20"
                                                    />
                                                    <label className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-xl">
                                                        <FiUpload className="text-white text-3xl sm:text-4xl mb-2 animate-bounce" />
                                                        <span className="text-white text-xs sm:text-sm font-semibold px-3 py-1 bg-primary rounded-full">
                                                            Change Image
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            ) : (
                                                <label className="w-full max-w-[180px] sm:max-w-[200px] h-56 sm:h-64 mx-auto border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 hover:border-primary-hover transition-all duration-300 group bg-white/50">
                                                    <FiUpload className="text-primary text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform" />
                                                    <span className="text-primary-content text-sm sm:text-base font-semibold">Upload Image</span>
                                                    <span className="text-primary-content/60 text-xs mt-2 px-3 py-1 bg-secondary rounded-full">
                                                        PNG, JPG (Max 5MB)
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}
                                            {errors.image && (
                                                <p className="text-error text-xs sm:text-sm mt-2 text-center bg-error/10 rounded p-2">
                                                    {errors.image}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields - Responsive Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                                    {/* Name Field */}
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Name <span className="text-error text-lg">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="Enter full name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-error text-xs sm:text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Email <span className="text-error text-lg">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="example@email.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-error text-xs sm:text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Phone <span className="text-error text-lg">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="01712345678"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="text-error text-xs sm:text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Date of Birth Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                        />
                                    </div>

                                    {/* Gender Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Gender
                                        </label>
                                        <select
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content cursor-pointer"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Department Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Department
                                        </label>
                                        <select
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content cursor-pointer"
                                        >
                                            <option value="">Select Department</option>
                                            {departments?.map((dept) => (
                                                <option key={dept.id} value={dept.name}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Proficiency Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Proficiency
                                        </label>
                                        <input
                                            type="text"
                                            value={data.proficiency}
                                            onChange={(e) => setData('proficiency', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="IELTS 7.5, TOEFL 100"
                                        />
                                    </div>

                                    {/* Destination Field */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Destination
                                        </label>
                                        <input
                                            type="text"
                                            value={data.destination}
                                            onChange={(e) => setData('destination', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="USA, UK, Canada"
                                        />
                                    </div>

                                    {/* Address Field - Full Width */}
                                    <div className="sm:col-span-2 lg:col-span-3">
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="Enter full address"
                                        />
                                    </div>

                                    {/* SSC GPA */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            SSC GPA
                                        </label>
                                        <input
                                            type="text"
                                            value={data.sscGpa}
                                            onChange={(e) => setData('sscGpa', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="5.00"
                                        />
                                    </div>

                                    {/* HSC GPA */}
                                    <div>
                                        <label className="block text-sm sm:text-base font-semibold mb-2 text-primary-content">
                                            HSC GPA
                                        </label>
                                        <input
                                            type="text"
                                            value={data.hscGpa}
                                            onChange={(e) => setData('hscGpa', e.target.value)}
                                            className="w-full h-11 sm:h-12 px-4 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-base-200 text-primary-content"
                                            placeholder="5.00"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer - Sticky */}
                        <div className="sticky bottom-0 bg-gradient-to-t from-base-200 to-transparent backdrop-blur-sm flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-5 border-t-2 border-accent/30 shadow-lg">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-secondary hover:bg-secondary/80 text-primary-content rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg"
                            >
                                ✕ Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {isEditMode ? 'Updating...' : 'Creating...'}
                                    </span>
                                ) : (
                                    isEditMode ? '✓ Update Card' : '✓ Create Card'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
