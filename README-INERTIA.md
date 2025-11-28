# Laravel + Inertia.js + React Admin Panel

This is a complete conversion of your React Admin Panel to Laravel + Inertia.js architecture.

## 🚀 Features

- **No REST API** - Direct data flow from Laravel controllers via Inertia
- **Responsive Design** - Mobile-first approach with TailwindCSS & DaisyUI
- **Modern UI** - Beautiful dashboard with charts and statistics
- **Authentication** - Complete auth system (Login, Register, Password Reset)
- **CRUD Operations** - Full resource management (Cards, Tables, Courses, etc.)
- **Role Management** - User roles and permissions
- **Academic Module** - Course, Class, Department, Subject management

## 📁 Project Structure

```
/resources
  /js
    /Pages          # Inertia page components
      /Dashboard
      /Profile
      /Card
      /Academic
      /Auth
    /Components     # Reusable components
    /Layouts        # Layout components (AppLayout, AuthLayout)
    /utils          # Helper functions
  /css              # Stylesheets
/app
  /Http
    /Controllers    # Laravel controllers
  /Models           # Eloquent models
/routes
  web.php          # Web routes
```

## 🛠️ Installation

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 3. Database Migration

```bash
# Run migrations
php artisan migrate

# (Optional) Seed database
php artisan db:seed
```

### 4. Build Assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 5. Start Server

```bash
# Start Laravel development server
php artisan serve

# Application will be available at http://localhost:8000
```

## 📝 Key Routes

### Authentication

- `GET /login` - Login page
- `POST /login` - Handle login
- `GET /register` - Registration page
- `POST /register` - Handle registration
- `GET /forgot-password` - Forgot password page
- `POST /logout` - Logout user

### Dashboard

- `GET /` - Dashboard homepage
- `GET /dashboard` - Dashboard

### Profile

- `GET /profile` - User profile
- `PUT /profile` - Update profile
- `PUT /profile/password` - Change password

### Card Module

- `GET /card` - List all cards
- `POST /card` - Create new card
- `GET /card/{id}` - View card details
- `PUT /card/{id}` - Update card
- `DELETE /card/{id}` - Delete card

### Table Module

- `GET /table` - List table data
- `POST /table` - Create record
- `PUT /table/{id}` - Update record
- `DELETE /table/{id}` - Delete record

### Academic Modules

- `GET /course` - Courses
- `GET /class` - Classes
- `GET /department` - Departments
- `GET /subject` - Subjects

## 🎨 UI Components

### Layouts

- **AppLayout** - Main application layout with navbar, sidebar, notifications
- **AuthLayout** - Authentication pages layout

### Pages

- **Dashboard** - Analytics dashboard with charts
- **Profile** - User profile management
- **Card** - Card listing with pagination
- **Table** - Data table with search and filters
- **Course** - Course management
- **Login/Register** - Authentication pages

## 🔧 Inertia.js Usage

### Controller Example

```php
use Inertia\Inertia;

public function index()
{
    $users = User::all();

    return Inertia::render('Users/Index', [
        'users' => $users,
    ]);
}
```

### Form Submission Example

```jsx
import { useForm } from "@inertiajs/react";

const { data, setData, post, processing, errors } = useForm({
  name: "",
  email: "",
});

const handleSubmit = (e) => {
  e.preventDefault();
  post("/users");
};
```

### Navigation Example

```jsx
import { Link } from "@inertiajs/react";

<Link href="/dashboard">Dashboard</Link>;
```

## 🎯 Key Differences from React Router

### Before (React Router)

```jsx
import { NavLink } from "react-router";
import axios from "axios";

<NavLink to="/profile">Profile</NavLink>;

// API call
axios.post("/api/users", data);
```

### After (Inertia.js)

```jsx
import { Link, useForm } from "@inertiajs/react";

<Link href="/profile">Profile</Link>;

// Form submission
const { post } = useForm({ ...data });
post("/users");
```

## 🔐 Authentication

Authentication is handled through Laravel's built-in auth system. The `ProfileController` handles:

- Login
- Registration
- Password reset
- Logout

## 📊 Database Models Needed

Create these models in your Laravel application:

```bash
php artisan make:model Card -m
php artisan make:model Course -m
php artisan make:model ClassModel -m
php artisan make:model Department -m
php artisan make:model Subject -m
php artisan make:model TableData -m
```

## 🚨 Important Notes

1. **No axios or fetch** - All data fetching is done through Inertia props
2. **No React Router** - Navigation is handled by Inertia's `<Link>` component
3. **Form submissions** - Use `useForm()` hook instead of axios
4. **Data flow** - Always from Laravel controllers via `Inertia::render()`

## 📦 Dependencies

### PHP/Laravel

- Laravel 10.x or 11.x
- Inertia.js Laravel adapter

### JavaScript

- @inertiajs/react
- React 19.x
- TailwindCSS 4.x
- DaisyUI 5.x
- React Icons
- React Toastify
- AOS (Animate On Scroll)

## 🐛 Troubleshooting

### Vite not compiling

```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Inertia version mismatch

```bash
composer require inertiajs/inertia-laravel
npm install @inertiajs/react
```

### Missing routes

Make sure to import all controllers in `routes/web.php`

## 📱 Responsive Design

The application is fully responsive:

- **Desktop** - Full sidebar navigation
- **Tablet** - Collapsible sidebar
- **Mobile** - Drawer navigation

## 🎨 Theme Support

The application includes dark/light theme toggle functionality built with DaisyUI themes.

## 🔄 State Management

No external state management needed - Inertia handles state through:

- Props from server
- Form state with `useForm()`
- Page props with `usePage()`

## 📈 Performance

- Server-side rendering ready
- Automatic code splitting
- Lazy loading of components
- Optimized bundle size

## 🤝 Contributing

This is a converted admin panel. To add new features:

1. Create Laravel controller
2. Add route in `web.php`
3. Create Inertia page component
4. Use `Inertia::render()` to pass data

## 📄 License

This project is open-source and available under the MIT License.

## 👨‍💻 Author

Converted from React SPA to Laravel + Inertia.js architecture.

---

**Need Help?** Check the [Inertia.js documentation](https://inertiajs.com) or [Laravel documentation](https://laravel.com/docs).
