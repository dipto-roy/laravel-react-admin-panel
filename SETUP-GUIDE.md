# 🚀 Complete Setup Guide - Laravel + Inertia.js Admin Panel

## 📋 Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 18.x
- MySQL or PostgreSQL
- Git

---

## 🔧 Step-by-Step Installation

### Step 1: Laravel Setup

If you don't have a Laravel project yet:

```bash
# Create new Laravel project
composer create-project laravel/laravel admin-panel
cd admin-panel

# Install Inertia Laravel adapter
composer require inertiajs/inertia-laravel
```

### Step 2: Copy Converted Files

Copy all the generated files from `frontend/` to your Laravel project:

```bash
# Copy resources
cp -r frontend/resources/* ./resources/

# Copy app files (Controllers, Models, Middleware)
cp -r frontend/app/* ./app/

# Copy routes
cp frontend/routes/web.php ./routes/

# Copy database migrations
cp frontend/database/migrations/* ./database/migrations/

# Copy config files
cp frontend/vite-inertia.config.js ./vite.config.js
cp frontend/package-inertia.json ./package.json
```

### Step 3: Install JavaScript Dependencies

```bash
# Install npm packages
npm install

# Key packages installed:
# - @inertiajs/react (Inertia React adapter)
# - react & react-dom
# - @vitejs/plugin-react
# - laravel-vite-plugin
# - tailwindcss & daisyui
```

### Step 4: Environment Configuration

```bash
# Copy .env.example if needed
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin_panel
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Step 5: TailwindCSS Configuration

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "synthwave"],
  },
};
```

### Step 6: Register Inertia Middleware

Update `bootstrap/app.php` or register in `app/Http/Kernel.php`:

```php
// In app/Http/Kernel.php
protected $middlewareGroups = [
    'web' => [
        // ... other middleware
        \App\Http\Middleware\HandleInertiaRequests::class,
    ],
];
```

**For Laravel 11+** in `bootstrap/app.php`:

```php
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->create();
```

### Step 7: Database Setup

```bash
# Run migrations
php artisan migrate

# (Optional) Create a test user
php artisan tinker
```

In tinker:

```php
\App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
]);
```

### Step 8: Build Assets

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
```

### Step 9: Start Development Server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev

# Visit: http://localhost:8000
```

---

## 🗂️ File Structure Overview

```
/admin-panel
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── DashboardController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── CardController.php
│   │   │   ├── CourseController.php
│   │   │   └── ...
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── User.php
│       ├── Card.php
│       ├── Course.php
│       └── ...
├── database/
│   └── migrations/
│       ├── 2024_01_01_000001_create_cards_table.php
│       ├── 2024_01_01_000002_create_courses_table.php
│       └── ...
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── app.jsx (Entry point)
│   │   ├── Pages/
│   │   │   ├── Dashboard/Index.jsx
│   │   │   ├── Profile/Index.jsx
│   │   │   ├── Card/Index.jsx
│   │   │   ├── Academic/Course.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── Layouts/
│   │   │   ├── AppLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   └── Components/
│   │       └── (Shared components)
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
├── vite.config.js
├── package.json
└── tailwind.config.js
```

---

## 🎯 Key Concepts

### 1. **No REST API**

All data comes through Laravel controllers using `Inertia::render()`:

```php
return Inertia::render('Dashboard/Index', [
    'stats' => $statistics,
    'users' => User::all(),
]);
```

### 2. **Form Submissions**

Use Inertia's `useForm` hook instead of axios:

```jsx
const { data, setData, post, processing } = useForm({
  name: "",
  email: "",
});

const handleSubmit = (e) => {
  e.preventDefault();
  post("/users");
};
```

### 3. **Navigation**

Use Inertia's `Link` component:

```jsx
import { Link } from "@inertiajs/react";

<Link href="/dashboard">Dashboard</Link>;
```

### 4. **Accessing Props**

Use `usePage` hook:

```jsx
import { usePage } from "@inertiajs/react";

const { auth, flash } = usePage().props;
```

---

## 🔐 Authentication Setup

The authentication system is built-in. Routes are defined in `routes/web.php`:

- **Login**: `GET/POST /login`
- **Register**: `GET/POST /register`
- **Logout**: `POST /logout`
- **Password Reset**: `GET/POST /forgot-password`

Test credentials (if you created a user):

- Email: `admin@example.com`
- Password: `password`

---

## 🎨 Customization

### Change Theme

In `resources/js/Layouts/AppLayout.jsx`, the theme toggle is already implemented.

### Add New Page

1. **Create Controller**:

```bash
php artisan make:controller ProductController --resource
```

2. **Add Route** in `routes/web.php`:

```php
Route::resource('products', ProductController::class);
```

3. **Create Page Component** in `resources/js/Pages/Product/Index.jsx`:

```jsx
import AppLayout from "../../Layouts/AppLayout";

export default function Index({ products }) {
  return (
    <AppLayout>
      <h1>Products</h1>
      {/* Your content */}
    </AppLayout>
  );
}
```

4. **Controller Method**:

```php
public function index()
{
    return Inertia::render('Product/Index', [
        'products' => Product::all(),
    ]);
}
```

---

## 📊 Database Seeding (Optional)

Create seeders for testing:

```bash
php artisan make:seeder CardSeeder
php artisan make:seeder CourseSeeder
```

In `database/seeders/CardSeeder.php`:

```php
public function run()
{
    Card::create([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+1234567890',
        // ... other fields
    ]);
}
```

Run seeders:

```bash
php artisan db:seed
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Vite not loading assets

**Solution**:

```bash
npm run build
php artisan optimize:clear
```

### Issue 2: Inertia props not updating

**Solution**: Clear cache

```bash
php artisan cache:clear
php artisan view:clear
php artisan config:clear
```

### Issue 3: 404 on routes

**Solution**: Ensure routes are registered and middleware is set up correctly.

### Issue 4: CSRF token mismatch

**Solution**: Inertia automatically handles CSRF. Make sure you're using Inertia forms.

---

## 📦 Production Deployment

```bash
# 1. Build assets
npm run build

# 2. Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Set environment to production
APP_ENV=production
APP_DEBUG=false

# 4. Deploy to server
# Copy files to server
# Run migrations
php artisan migrate --force
```

---

## 🔒 Security Checklist

- [ ] Change `APP_KEY` in production
- [ ] Set `APP_DEBUG=false`
- [ ] Configure proper CORS settings
- [ ] Use HTTPS in production
- [ ] Set up rate limiting
- [ ] Implement proper authentication
- [ ] Validate all user inputs
- [ ] Use environment variables for sensitive data

---

## 📚 Additional Resources

- [Inertia.js Documentation](https://inertiajs.com)
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [DaisyUI Documentation](https://daisyui.com)

---

## 🤝 Support

If you encounter issues:

1. Check the console for errors
2. Review Laravel logs: `storage/logs/laravel.log`
3. Ensure all dependencies are installed
4. Clear all caches
5. Rebuild assets

---

## ✅ Final Checklist

- [ ] PHP and Composer installed
- [ ] Node.js and npm installed
- [ ] Database created and configured
- [ ] `.env` file configured
- [ ] Dependencies installed (`composer install` & `npm install`)
- [ ] Migrations run (`php artisan migrate`)
- [ ] Assets built (`npm run dev` or `npm run build`)
- [ ] Server running (`php artisan serve`)
- [ ] Can access login page at `http://localhost:8000/login`

---

**Congratulations! 🎉** Your Laravel + Inertia.js Admin Panel is ready to use!

For questions or issues, refer to the documentation links above or check the project's README-INERTIA.md file.
