<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Application; 

class ApplicantController extends Controller
{
    public function dashboard()
    {
        // 1. Get the currently logged-in user
        $user = Auth::user();

        // 2. Fetch applications for this user
        // Assuming your DB table has 'email' or 'user_id'
        $applications = Application::where('email', $user->email) // Fixed: using existing email field
            ->latest()
            ->get();
        
        // Bug fix: Removed invalid property access on a collection
        // $invalidAccess = $applications->jobTitle; 
        
        $transformed = $applications->map(function ($app) {
                // Transform DB columns to React props matches
                return [
                    'id' => $app->id,
                    'jobTitle' => $app->job_title,
                    'jobId' => $app->job_id,
                    'status' => $app->status, // e.g., 'Submitted', 'Under Review'
                    'submittedDate' => $app->created_at->toIso8601String(),
                    'phone' => $app->phone_number, 
                    'education' => $app->education,
                    'email' => $app->email,
                ];
            });

        // 3. Render the Dashboard with data
        return Inertia::render('ApplicantDashboard', [
            'applications' => $applications,
            // 'auth' is usually shared automatically via HandleInertiaRequests middleware
        ]);
    }
}