import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowLeft } from 'lucide-react';

// UI Components (Assuming these exist based on your previous code)
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ForgotPassword() {
    // Setup Form Handling (UI only for now)
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This won't work yet without a controller, but it sets up the UI logic
        post('/forgot-password');
    };

    // Reusing your exact Button styles
    const primaryButtonClass = "w-full h-10 bg-[#193153] text-white font-bold text-sm shadow-md transition-all rounded-md mt-4 hover:bg-[#ffdd59] hover:text-[#193153]";

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
            <Head title="Reset Password - NAAP" />

            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-[#193153]/80 backdrop-blur-[2px]"></div>

            <div className="w-full max-w-md relative z-10">
                <Card className="border-0 shadow-2xl bg-white/95 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <img 
                                src="/images/PhilSCA_Logo.png" 
                                alt="NAAP Logo" 
                                className="h-20 w-20 object-contain drop-shadow-md"
                            />
                        </div>

                        {/* Header Text */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#193153]">Forgot Password?</h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="pl-10 h-10 border-gray-300 focus-visible:ring-[#193153] focus-visible:border-[#193153]"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-red-600 font-bold">{errors.email}</p>}
                            </div>

                            <Button type="submit" className={primaryButtonClass} disabled={processing}>
                                {processing ? 'Sending Link...' : 'Send Reset Link'}
                            </Button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="mt-6 text-center">
                            <Link 
                                href="/login" 
                                className="inline-flex items-center text-xs font-medium text-gray-400 hover:text-[#193153] transition-colors"
                            >
                                <ArrowLeft className="h-3 w-3 mr-1" />
                                Back to Login
                            </Link>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}