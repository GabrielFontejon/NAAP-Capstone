<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display the Job Management view.
     */
    public function index()
    {
        // In the future, you will fetch real jobs from the database here.
        // For now, we just render the React page.
        return Inertia::render('Admin/JobManagement');
    }
}