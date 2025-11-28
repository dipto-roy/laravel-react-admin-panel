<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SubjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Guest Routes (Authentication)
Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::post('login', [ProfileController::class, 'login']);

    Route::get('register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('register', [ProfileController::class, 'register']);

    Route::get('forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('password.request');

    Route::post('forgot-password', [ProfileController::class, 'forgotPassword']);

    Route::get('reset-password/{token}', function ($token) {
        return Inertia::render('Auth/ResetPassword', ['token' => $token]);
    })->name('password.reset');

    Route::post('reset-password', [ProfileController::class, 'resetPassword']);

    Route::get('verify-email', function () {
        return Inertia::render('Auth/VerifyEmail');
    })->name('verification.notice');

    Route::get('two-steps', function () {
        return Inertia::render('Auth/TwoSteps');
    })->name('two-steps');
});

// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Card Module
    Route::resource('card', CardController::class);

    // Table Module
    Route::resource('table', TableController::class);

    // Academic Modules
    Route::resource('course', CourseController::class);
    Route::resource('class', ClassController::class);
    Route::resource('department', DepartmentController::class);
    Route::resource('subject', SubjectController::class);

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings');

    // Additional Routes
    Route::get('/billing', function () {
        return Inertia::render('Billing/Index');
    })->name('billing');

    Route::get('/pricing', function () {
        return Inertia::render('Pricing/Index');
    })->name('pricing');

    Route::get('/faq', function () {
        return Inertia::render('FAQ/Index');
    })->name('faq');
});

// Logout Route
Route::post('logout', [ProfileController::class, 'logout'])->middleware('auth')->name('logout');

// 404 Error Page
Route::fallback(function () {
    return Inertia::render('Errors/404');
});
