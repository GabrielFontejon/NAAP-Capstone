<?php

namespace App\Http\Controllers\AuthSecond;

use App\Http\Controllers\Controller;
use App\Models\User;                          // Fixed capitalization (App vs app)
use Illuminate\Auth\Events\Registered;        // Added for event(new Registered)
use Illuminate\Http\RedirectResponse;         // Added for return type
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;          // Added for Hash::make
use Illuminate\Validation\Rules;              // Added for Password rules

class RegisterUserController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            // strict password validation
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Redirect to login with a success message
        return redirect()->route('login')->with('message', 'Account created! Please log in.');
    }
}