# ❌ ERR_CONNECTION_REFUSED Error - Solution Guide

## 🔍 Understanding the Error

The error `ERR_CONNECTION_REFUSED` when trying to access:

- `http://localhost:8000/api/profile`
- `http://localhost:8000/api/login`

This happens because:

1. **You converted from React SPA to Inertia.js** - Inertia doesn't use `/api/*` endpoints
2. **Old React code is still running** - Using axios to make API calls
3. **Laravel server is not running** - No server at `localhost:8000`
4. **Wrong configuration** - Need to use Laravel + Inertia setup, not standalone React

---

## ✅ Solution

### Problem: Your project structure confusion

```
❌ WRONG (What you're running now):
- Old React app from src/main.jsx
- Using axios to call /api/* endpoints
- No Laravel backend running
- vite.config.js configured for standalone React

✅ CORRECT (Inertia.js setup):
- New Inertia app from resources/js/app.jsx
- NO API calls - data comes via props
- Laravel backend serves pages with Inertia::render()
- Both Laravel (port 8000) and Vite (port 5173) running
```

---

## 🚀 Quick Fix

### Step 1: Install Laravel

You have the Inertia files ready, but Laravel isn't installed. Run:

```bash
./install-laravel.sh
```

Or manually:

```bash
# Install Laravel in a new directory
cd /home/dip-roy/task101
composer create-project laravel/laravel laravel-admin
cd laravel-admin

# Copy your Inertia files
cp -r ../frontend/resources .
cp -r ../frontend/routes .
cp -r ../frontend/app .
cp -r ../frontend/database .
cp -r ../frontend/config .
cp ../frontend/vite.config.js .
cp ../frontend/package.json .
cp ../frontend/.env .

# Install dependencies
composer require inertiajs/inertia-laravel tightenco/ziggy
npm install

# Setup database
php artisan migrate

# Generate app key
php artisan key:generate
```

### Step 2: Register Inertia Middleware

Edit `bootstrap/app.php` or create `app/Http/Kernel.php`:

```php
// bootstrap/app.php (Laravel 11+)
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->create();
```

### Step 3: Start Both Servers

**Terminal 1 - Vite (for assets):**

```bash
npm run dev
```

**Terminal 2 - Laravel (for backend):**

```bash
php artisan serve
```

### Step 4: Visit Your App

Open: `http://localhost:8000`

---

## 📊 Architecture Comparison

### Before (Old React - Causing Errors)

```
Browser → Vite (port 5173)
   ↓
React App (src/main.jsx)
   ↓
axios.get('/api/login') → ❌ localhost:8000 (No server!)
```

### After (Inertia.js - Correct)

```
Browser → Laravel (port 8000)
   ↓
Controller → Inertia::render('Auth/Login', ['props'])
   ↓
Vite compiles resources/js/app.jsx
   ↓
React Component receives props (no API calls needed)
```

---

## 🔧 Files Changed

### 1. package.json ✅ (Already updated)

```diff
- "axios": "^1.13.2"
- "react-router": "^7.8.2"
+ "@inertiajs/react": "^1.0.0"
+ "laravel-vite-plugin": "^1.0.0"
```

### 2. vite.config.js ✅ (Already updated)

```diff
- import tailwindcss from '@tailwindcss/vite'
- plugins: [react(), tailwindcss()]
+ import laravel from 'laravel-vite-plugin'
+ plugins: [laravel({ input: ['resources/js/app.jsx'] }), react()]
```

### 3. Entry Point (Need to ensure Laravel serves this)

```
❌ OLD: index.html → src/main.jsx
✅ NEW: resources/views/app.blade.php → resources/js/app.jsx
```

---

## 🐛 Why It's Not Working

### Current State:

1. You're running `npm run dev` which starts **Vite standalone**
2. Vite serves `index.html` → loads `src/main.jsx`
3. `src/main.jsx` uses **React Router** and **axios**
4. axios tries to call `localhost:8000/api/*` but **no server exists**

### What Should Happen:

1. Run `php artisan serve` → Starts **Laravel server on port 8000**
2. Run `npm run dev` → Starts **Vite dev server on port 5173** (for hot reload)
3. Visit `localhost:8000` → Laravel serves `resources/views/app.blade.php`
4. Blade template loads `resources/js/app.jsx` via Vite
5. Inertia handles navigation **without API calls**

---

## 📝 Verification Checklist

After setup, verify:

- [ ] `composer.json` exists (Laravel installed)
- [ ] `php artisan serve` runs successfully
- [ ] `npm run dev` shows Vite compiling `resources/js/app.jsx`
- [ ] `http://localhost:8000` loads (not 8000/api/\*)
- [ ] No axios or API calls in browser console
- [ ] Inertia links work (no page reload on navigation)

---

## 🎯 Quick Commands

```bash
# Stop any running servers first
# Ctrl+C in terminals

# Method 1: Use installation script
./install-laravel.sh

# Method 2: Manual setup
composer install                    # Install Laravel
composer require inertiajs/inertia-laravel
npm install                         # Install Inertia React + deps
php artisan key:generate           # Generate app key
php artisan migrate                # Setup database

# Start servers (2 terminals)
npm run dev                        # Terminal 1
php artisan serve                  # Terminal 2

# Visit
http://localhost:8000              # ✅ Works
http://localhost:8000/login        # ✅ Works
http://localhost:8000/api/login    # ❌ Should NOT exist
```

---

## 💡 Key Differences

| Old React SPA       | New Inertia.js               |
| ------------------- | ---------------------------- |
| No backend needed   | Requires Laravel             |
| API calls (axios)   | Props from controller        |
| Client-side routing | Server-side routing          |
| `src/main.jsx`      | `resources/js/app.jsx`       |
| REST endpoints      | Inertia::render()            |
| One server (Vite)   | Two servers (Laravel + Vite) |

---

## 🚨 Common Mistakes

### 1. Running only Vite

```bash
❌ npm run dev  # Only this = old React app loads
✅ npm run dev + php artisan serve  # Both needed
```

### 2. Accessing /api/\* routes

```bash
❌ http://localhost:8000/api/login  # Inertia doesn't use /api
✅ http://localhost:8000/login      # Direct Laravel route
```

### 3. Making axios calls

```jsx
❌ axios.post('/api/login', data)  # Old way
✅ useForm().post('/login')         # Inertia way
```

---

## ✅ Success Indicators

You'll know it's working when:

1. **No API errors in console** - No more ERR_CONNECTION_REFUSED
2. **Inertia requests visible** - Network tab shows `X-Inertia: true` headers
3. **No page reloads** - Navigation is smooth (SPA behavior)
4. **Props available** - Components receive data as props
5. **Laravel logs show** - Storage/logs/laravel.log has activity

---

## 📞 Still Having Issues?

Check:

1. Is Laravel installed? → `ls composer.json`
2. Is Laravel running? → `curl localhost:8000`
3. Is Vite compiling? → Check terminal output
4. Are you using old files? → Check browser is loading `resources/js/app.jsx` not `src/main.jsx`

Run the installation script and follow the prompts:

```bash
./install-laravel.sh
```

---

## 🎉 Result

After proper setup:

- ✅ No more API calls
- ✅ No more connection errors
- ✅ Smooth Inertia navigation
- ✅ Data flows through props
- ✅ Full Laravel + Inertia.js working!
