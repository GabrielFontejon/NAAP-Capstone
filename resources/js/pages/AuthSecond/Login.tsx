import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Mail, Lock, User, CheckCircle, Eye, EyeOff } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ApplicantLogin() {
    // State for UI controls
    const [activeTab, setActiveTab] = useState('login');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

    // 1. Setup Form Handling for LOGIN
    const {
        data: loginData,
        setData: setLoginData,
        post: postLogin,
        processing: loginProcessing,
        errors: loginErrors,
        reset: resetLogin
    } = useForm({
        email: '',
        password: '',
        remember: false // This state is already here, now we connect it to UI
    });

    // 2. Setup Form Handling for REGISTER
    const {
        data: regData,
        setData: setRegData,
        post: postRegister,
        processing: regProcessing,
        errors: regErrors,
        setError: setRegError,
        clearErrors: clearRegErrors,
        reset: resetReg
    } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            resetLogin('password');
            resetReg('password', 'password_confirmation');
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Check for Admin Credentials
        if (loginData.email === 'admin@naap.edu.ph' && loginData.password === 'password') {
            // Manually redirect to Admin Dashboard
            router.visit('/admin/dashboard');
            return;
        }

        postLogin('/login');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        clearRegErrors();

        const { password, password_confirmation } = regData;

        // --- VALIDATION LOGIC ---
        const isAlphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);
        const isLongEnough = password.length >= 8;

        if (!isLongEnough || !isAlphanumeric) {
            setRegError('password', 'Password must be at least 8 characters and contain both letters and numbers.');
            return;
        }

        if (password !== password_confirmation) {
            setRegError('password_confirmation', 'Passwords do not match.');
            return;
        }

        // --- SUBMIT & REDIRECT LOGIC ---
        postRegister('/register', {
            onSuccess: () => {
                resetReg();
                setActiveTab('login');
            }
        });
    };

    // Button Style: Dark Blue Base -> Yellow Hover with Dark Blue Text
    const primaryButtonClass = "w-full h-10 bg-[#193153] text-white font-bold text-sm shadow-md transition-all rounded-md mt-4 hover:bg-[#ffdd59] hover:text-[#193153]";

    // Tab Style: Text only, underline effect
    const tabTriggerClass = "flex-1 pb-2 text-base font-bold text-gray-400 transition-all border-b-2 border-transparent hover:text-[#ffdd59] data-[state=active]:text-[#193153] data-[state=active]:border-[#193153] rounded-none bg-transparent shadow-none";

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 font-sans relative"
            style={{
                backgroundImage: "url('/images/NAAP.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Head title="Applicant Portal - NAAP" />

            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-[#193153]/80 backdrop-blur-[2px]"></div>

            <div className="w-full max-w-md relative z-10">
                <Card className="border-0 shadow-2xl bg-white/95 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-8">
                        {/* Logo Centered Inside Card */}
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/PhilSCA_Logo.png"
                                alt="NAAP Logo"
                                className="h-20 w-20 object-contain drop-shadow-md"
                            />
                        </div>

                        {/* Controlled Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="flex w-full mb-6 bg-transparent p-0 h-auto gap-4">
                                <TabsTrigger value="login" className={tabTriggerClass}>
                                    Login
                                </TabsTrigger>
                                <TabsTrigger value="register" className={tabTriggerClass}>
                                    Register
                                </TabsTrigger>
                            </TabsList>

                            {/* --- LOGIN FORM --- */}
                            <TabsContent value="login" className="mt-0 focus-visible:outline-none">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Email Address"
                                                className="pl-10 h-10 border-gray-300 focus-visible:ring-[#193153] focus-visible:border-[#193153]"
                                                value={loginData.email}
                                                onChange={(e) => setLoginData('email', e.target.value)}
                                            />
                                        </div>
                                        {loginErrors.email && <p className="text-[10px] text-red-600 font-bold">{loginErrors.email}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="password"
                                                type={showLoginPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="pl-10 pr-10 h-10 border-gray-300 focus-visible:ring-[#193153] focus-visible:border-[#193153]"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData('password', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#193153] transition-colors"
                                            >
                                                {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {loginErrors.password && <p className="text-[10px] text-red-600 font-bold">{loginErrors.password}</p>}
                                    </div>

                                    {/* --- REMEMBER ME & FORGOT PASSWORD ROW --- */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                className="rounded border-gray-300 text-[#193153] focus:ring-[#193153] h-4 w-4 cursor-pointer"
                                                checked={loginData.remember}
                                                onChange={(e) => setLoginData('remember', e.target.checked)}
                                            />
                                            <label htmlFor="remember" className="text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-[#193153] transition-colors">
                                                Remember me
                                            </label>
                                        </div>

                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-medium text-gray-500 hover:text-[#ffdd59] transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <Button type="submit" className={primaryButtonClass} disabled={loginProcessing}>
                                        {loginProcessing ? 'Signing In...' : 'Sign In'}
                                    </Button>

                                    {/* DEMO CREDENTIALS */}
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                                        <p className="text-xs text-[#193153] font-bold uppercase tracking-wider mb-2">Admin Access (Demo)</p>
                                        <div className="flex flex-col gap-1 text-xs text-gray-600">
                                            <div className="flex justify-center gap-2">
                                                <span className="font-semibold">Email:</span>
                                                <code className="bg-white px-1 rounded border border-gray-200">admin@naap.edu.ph</code>
                                            </div>
                                            <div className="flex justify-center gap-2">
                                                <span className="font-semibold">Password:</span>
                                                <code className="bg-white px-1 rounded border border-gray-200">password</code>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>

                            {/* --- REGISTER FORM --- */}
                            <TabsContent value="register" className="mt-0 focus-visible:outline-none">
                                <form onSubmit={handleRegister} className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="reg-name"
                                                placeholder="Full Name"
                                                className="pl-10 h-10 border-gray-300 focus-visible:ring-[#193153]"
                                                value={regData.name}
                                                onChange={(e) => setRegData('name', e.target.value)}
                                            />
                                        </div>
                                        {regErrors.name && <p className="text-[10px] text-red-600 font-bold">{regErrors.name}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="reg-email"
                                                type="email"
                                                placeholder="Email Address"
                                                className="pl-10 h-10 border-gray-300 focus-visible:ring-[#193153]"
                                                value={regData.email}
                                                onChange={(e) => setRegData('email', e.target.value)}
                                            />
                                        </div>
                                        {regErrors.email && <p className="text-[10px] text-red-600 font-bold">{regErrors.email}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="reg-password"
                                                type={showRegPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="pl-10 pr-10 h-10 border-gray-300 focus-visible:ring-[#193153]"
                                                value={regData.password}
                                                onChange={(e) => setRegData('password', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowRegPassword(!showRegPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#193153] transition-colors"
                                            >
                                                {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {regErrors.password && <p className="text-[10px] text-red-600 font-bold">{regErrors.password}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative group">
                                            <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                            <Input
                                                id="reg-confirm"
                                                type={showRegConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                className="pl-10 pr-10 h-10 border-gray-300 focus-visible:ring-[#193153]"
                                                value={regData.password_confirmation}
                                                onChange={(e) => setRegData('password_confirmation', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#193153] transition-colors"
                                            >
                                                {showRegConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {regErrors.password_confirmation && <p className="text-[10px] text-red-600 font-bold">{regErrors.password_confirmation}</p>}
                                    </div>

                                    <Button type="submit" className={primaryButtonClass} disabled={regProcessing}>
                                        {regProcessing ? 'Creating Account...' : 'Create Account'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-xs font-medium text-gray-400 hover:text-[#193153] transition-colors">
                                Back to Home
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}