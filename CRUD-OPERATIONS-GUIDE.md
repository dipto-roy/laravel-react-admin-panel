# CRUD Operations Guide

## ✅ Complete CRUD Modules

All modules now have full **Create, Read, Update, Delete** functionality.

---

## 📦 Card Module

**Location**: `/card`

### Features:

- ✅ Create new student cards with image upload
- ✅ Edit existing cards (update all fields including image)
- ✅ Delete cards (with confirmation)
- ✅ View all cards in grid layout
- ✅ Pagination support

### Backend:

- **Controller**: `/app/Http/Controllers/CardController.php`
- **Model**: `/app/Models/Card.php`
- **Routes**: `Route::resource('card', CardController::class)`

### Frontend:

- **Page**: `/resources/js/Pages/Card/Index.jsx`
- **Actions**:
  - Click "Edit" button on any card to update
  - Click "Delete" button to remove (with confirmation)
  - Click "+ Create Card" to add new

---

## 🎓 Academic Modules

### 1. Course Module

**Location**: `/course`

- ✅ Create/Edit/Delete courses
- Fields: name, description, duration, fee
- Icon: 🎓 FiBookOpen

### 2. Class Module

**Location**: `/class`

- ✅ Create/Edit/Delete classes
- Fields: name, description
- Icon: 🏫 FiBook

### 3. Department Module

**Location**: `/department`

- ✅ Create/Edit/Delete departments
- Fields: name, code, description
- Icon: 🏢 FiLayers

### 4. Subject Module

**Location**: `/subject`

- ✅ Create/Edit/Delete subjects
- Fields: name, code, description
- Icon: 📚 FiFileText

### Backend:

- **Controllers**:
  - `CourseController.php`
  - `ClassController.php`
  - `DepartmentController.php`
  - `SubjectController.php`
- **Routes**: Resource routes for each

### Frontend:

- **Pages**: `/resources/js/Pages/Academic/`
  - `Course.jsx`
  - `Class.jsx`
  - `Department.jsx`
  - `Subject.jsx`

---

## ⚙️ Settings Modules

### 1. District Module

**Location**: `/district`

- ✅ Create/Edit/Delete districts
- Fields: name, code, description, is_active
- Shows upazila count
- Icon: 🗺️ FiMapPin

### 2. Upazila Module

**Location**: `/upazila`

- ✅ Create/Edit/Delete upazilas
- Fields: name, code, district_id, description, is_active
- Dropdown to select parent district
- Icon: 🧭 FiNavigation

### 3. Zone Module

**Location**: `/zone`

- ✅ Create/Edit/Delete zones
- Fields: name, code, upazila_id, description, is_active
- Dropdown to select parent upazila (shows district)
- Icon: 🎯 FiTarget

### Backend:

- **Controllers**:
  - `DistrictController.php`
  - `UpazilaController.php`
  - `ZoneController.php`
- **Models**: District, Upazila, Zone (with relationships)
- **Routes**: Resource routes with hierarchical relationships

### Frontend:

- **Pages**: `/resources/js/Pages/Settings/`
  - `District.jsx`
  - `Upazila.jsx`
  - `Zone.jsx`

---

## 🔄 How to Access CRUD Operations

### Navigation Menu:

1. **Academic Dropdown** (top navbar)

   - Course
   - Class
   - Department
   - Subject

2. **Settings Dropdown** (top navbar)

   - District
   - Upazila
   - Zone

3. **Card** (sidebar)
   - Student Cards

### Common Actions:

- **Create**: Click "+ Add [Module]" button
- **Edit**: Click Edit icon (✏️) on any card
- **Delete**: Click Delete icon (🗑️) with confirmation
- **View**: All items displayed in responsive grid

---

## 💡 CRUD Implementation Pattern

All modules follow the same pattern:

```jsx
const { data, setData, post, put, delete: destroy } = useForm({...});

// Create
post('/module', { onSuccess: () => toast.success('Created!') });

// Update
put(`/module/${id}`, { onSuccess: () => toast.success('Updated!') });

// Delete
destroy(`/module/${id}`, { onSuccess: () => toast.success('Deleted!') });
```

### Backend Pattern:

```php
Route::resource('module', ModuleController::class);
// Provides: index, store, show, update, destroy
```

---

## 🎨 UI Features

- ✅ Responsive modal forms
- ✅ Form validation with error messages
- ✅ Success/Error toast notifications
- ✅ Confirmation dialogs for delete
- ✅ Loading states during processing
- ✅ Smooth animations and transitions
- ✅ Mobile-friendly design

---

## 📊 Database Relationships

### Settings Module Hierarchy:

```
District (1)
  └── Upazila (many)
       └── Zone (many)
```

### Features:

- Foreign key constraints with cascade delete
- Active/Inactive status toggle
- Unique validation on name and code
- Relationship eager loading for performance

---

## 🚀 Quick Start

1. **Navigate to any module** using the top navigation
2. **Click "+ Add"** button to create new item
3. **Click Edit icon** on any card to modify
4. **Click Delete icon** to remove (confirmation required)
5. **All changes save automatically** with toast notifications

All CRUD operations are now fully functional across all modules!
