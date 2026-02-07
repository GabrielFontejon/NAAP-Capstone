<?php

use App\Http\Controllers\Admin\JobController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\AuthSecond\RegisterUserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- 1. Public Routes ---

// Landing Page (The Welcome.tsx we created)
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('welcome'); 
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->middleware(['auth', 'verified'])->name('calendar');

Route::get('/login', function () {
    // Points to resources/js/Pages/Auth/Login.tsx
    return Inertia::render('AuthSecond/Login'); 
})->name('login'); // Name must be 'login' for route('login') to work

// resources/js/Pages/AuthSecond/ForgotPassword.tsx
// resources/js/Pages/AuthSecond/Forgotpassword.tsx
Route::get('/forgot-password', function () {
    return Inertia::render('AuthSecond/Forgotpassword'); 
})->name('password.request');

// Handle the Registration Form Submission (POST)
// We use the RegisterUserController you created
Route::post('/register', [RegisterUserController::class, 'store'])->name('register.store');

// Register Page (GET)
Route::get('/register', function () {
    // If you are using the tabbed view in 'login.tsx', you can point this to 'AuthSecond/login' too
    // Otherwise, ensure 'AuthSecond/Register.tsx' exists
    return Inertia::render('AuthSecond/Register'); 
})->name('register');

// Public Job Board
Route::get('/jobs', function () {
    return Inertia::render('Jobs/Index');
})->name('public.jobs');

// Public Job Details
Route::get('/jobs/{id}', function ($id) {
    return Inertia::render('Jobs/Show', ['id' => $id]);
})->name('jobs.show');

Route::get('/employee-benefits', function () {
    return Inertia::render('EmployeeBenefits');
})->name('employee-benefits');

Route::get('/news/csc-prime-hrm-level-2', function () {
    return Inertia::render('news');
})->name('news.csc-level-2');

Route::get('/hr-news', function () {
    return Inertia::render('HRNewsDashboard');
})->name('hr.news');

Route::get('/hr-news/{id}', function ($id) {
    return Inertia::render('HRNewsArticle', ['id' => $id]);
})->name('hr.news.show');

// routes/web.php

// Route para sa Admin Login Page
Route::get('/admin-login', function () {
    return Inertia::render('AuthSecond/AdminLogin'); // Siguraduhing tama ang filename (AdminLogin.tsx)
})->name('admin.login');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard'); 
})->name('admin.dashboard');


// --- 2. Authentication Routes ---

// Custom Logout (Fixes the React router issue)
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::get('/professionals-hired', function () {
    return Inertia::render('ProfessionalsHired');
})->name('professionals-hired');




// --- 3. Admin / Authenticated Routes ---

// --- 3. Admin / Authenticated Routes ---

// Moved these out of the 'auth' middleware for demo purposes so they work like the Dashboard
Route::get('/admin/jobs', function () {
    return Inertia::render('Admin/JobManagement');
})->name('admin.jobs');

Route::get('/admin/applicants', function () {
    return Inertia::render('Admin/Applicants');
})->name('admin.applicants');

Route::get('/admin/staffing', function () {
    return Inertia::render('Admin/StaffingMonitoring');
})->name('admin.staffing');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Protected admin routes can go here
});

require __DIR__.'/settings.php';