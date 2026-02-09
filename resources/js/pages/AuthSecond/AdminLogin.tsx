import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  // Button Style: Dark Blue Base -> Yellow Hover with Dark Blue Text
  const primaryButtonClass = "w-full h-10 bg-[#193153] text-white font-bold text-sm shadow-md transition-all rounded-md mt-6 hover:bg-[#ffdd59] hover:text-[#193153]";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 font-sans relative"
      style={{
        backgroundImage: "url('/images/NAAP_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Head title="Admin Login - NAAP" />

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-[#193153]/80 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 shadow-2xl bg-white/95 rounded-2xl overflow-hidden backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Logo Centered Inside Card */}
            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/images/PhilSCA_Logo.png"
                alt="NAAP Logo"
                className="h-20 w-20 object-contain drop-shadow-md mb-4"
              />
              <h1 className="text-2xl font-bold text-[#193153]">Admin Portal</h1>
              <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-blue-50 rounded-full">
                <ShieldCheck className="w-3 h-3 text-[#193153]" />
                <span className="text-xs font-semibold text-[#193153] uppercase tracking-wider">Authorized Access Only</span>
              </div>
            </div>

            {/* --- LOGIN FORM --- */}
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@naap.edu.ph"
                    className="pl-10 h-10 border-gray-300 focus-visible:ring-[#193153] focus-visible:border-[#193153]"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-600 font-bold">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#193153] transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-10 border-gray-300 focus-visible:ring-[#193153] focus-visible:border-[#193153]"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#193153] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-600 font-bold">{errors.password}</p>}
              </div>

              {/* --- REMEMBER ME --- */}
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-[#193153] focus:ring-[#193153] h-4 w-4 cursor-pointer"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <label htmlFor="remember" className="text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-[#193153] transition-colors">
                  Remember me
                </label>
              </div>

              <Button type="submit" className={primaryButtonClass} disabled={processing}>
                {processing ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
              </Button>
            </form>

            {/* --- DEMO CREDENTIALS (FOR DEVELOPMENT) --- */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
              <p className="text-xs text-[#193153] font-bold uppercase tracking-wider mb-2">Demo Access</p>
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

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 mb-2">Not an administrator?</p>
              <div className="flex justify-center gap-4 text-xs font-bold">
                <Link href="/" className="text-gray-500 hover:text-[#193153] transition-colors">
                  Return to Home
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/login" className="text-gray-500 hover:text-[#193153] transition-colors">
                  Login/Register
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-white/40">
          &copy; 2026 National Aviation Academy of the Philippines. <br /> All rights reserved.
        </div>
      </div>
    </div>
  );
}