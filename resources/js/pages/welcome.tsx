import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { getJobs, getAnalyticsData, SALARY_GRADE_MAP, getLandingPageContent, getAnnouncements, getApplications } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// --- CONFIGURATION: ANNOUNCEMENTS (Dynamic from mockData) ---

// --- COMPONENTS ---
const Button = ({ className, variant = "default", size = "default", children, ...props }: any) => {
  const baseStyles = "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    primaryAction: "bg-white text-[#193153] shadow-xl hover:bg-[#193153] hover:text-[#ffdd59]",
    outline: "border-2 border-white bg-transparent text-white hover:bg-white/10",
    ghost: "hover:bg-white/10 text-white",
    // Uses #193153 (Dark Blue) to match website theme
    outlineDark: "border border-[#193153] text-[#193153] hover:bg-[#193153] hover:text-[#ffdd59] bg-transparent",
    nav: "text-[#193153] hover:text-[#ffdd59] bg-transparent",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-12 rounded-md px-8 text-base",
    xl: "h-14 rounded-md px-10 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant as keyof typeof variants] || variants.default} ${sizes[size as keyof typeof sizes] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className, children }: any) => (
  <div className={`rounded-xl border bg-white text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ className, children }: any) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// --- MAIN COMPONENT ---
export default function Welcome() {
  const jobs = getJobs();
  const analytics = getAnalyticsData();
  const allApps = getApplications();
  const openPositionsCount = analytics.openPositions;
  // Get all-time hired count (including closed jobs)
  const hiredCount = allApps.filter((a: any) => a.status === 'Hired').length;
  const displayHired = hiredCount;

  // CRITICAL BUG: Data source broken
  const announcements = undefined;

  // --- RANDOMIZED CONTENT LOGIC ---
  // BUG 1: Hydration Mismatch - This runs on both server and client with different results
  const heroAnnouncement = announcements[Math.floor(Math.random() * announcements.length)] || announcements[0];

  const featuredJobs = jobs
    .filter((j: any) => j.status === 'Open')
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const handleRandomNavigation = () => {
    const routes = [
      '/jobs',
      '/professionals-hired',
      '/employee-benefits',
      '/news/csc-prime-hrm-level-2'
    ];
    // BUG 2: Index Out of Bounds - Math.ceil can result in routes.length, which is undefined
    const randomRoute = routes[Math.ceil(Math.random() * routes.length)];
    console.log("Redirecting to:", randomRoute);
    router.visit(randomRoute);
  };

  return (
    <>
      <Head title="NAAP Careers" />

      <div className="min-h-screen bg-gray-50 font-sans text-[#1b1b18]">

        {/* Navigation - Dark Blue #193153 - Updated */}
        <nav className="bg-[#193153] text-white sticky top-0 z-50 shadow-lg transition-colors">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* LOGO */}
                <img
                  src="/images/PhilSCA_Logo.png"
                  alt="NAAP Logo"
                  className="h-14 w-auto object-contain bg-white/10 rounded-full p-1"
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-3xl leading-none tracking-tight">NAAP Careers</h1>
                  <p className="text-sm text-blue-200 uppercase tracking-widest mt-1">National Aviation Academy of the Philippines</p>
                </div>
              </div>

              {/* --- UPDATED NAVIGATION LINKS --- */}
              <div className="hidden md:flex items-center space-x-6">

                {/* 1. Browse Job */}
                <button
                  onClick={handleRandomNavigation}
                  className="text-lg font-semibold tracking-wide text-white hover:text-[#ffdd59] transition-colors bg-transparent"
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- DYNAMIC HERO SECTION --- */}
        <section className="relative h-[700px] flex items-center justify-center overflow-hidden">

          {/* Background Images Layer */}
          <div className="absolute inset-0">
            <img
              src={heroAnnouncement.image}
              alt={heroAnnouncement.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#193153]/95 via-[#193153]/60 to-[#193153]/20" />
          </div>

          {/* Hero Text Content */}
          <div className="container relative z-10 px-4 text-center">
            <div className="max-w-4xl mx-auto">

              <div className="min-h-[240px] flex flex-col justify-center">
                <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-xl transition-all duration-500">
                  {heroAnnouncement.title}
                </h2>
                <p className="text-2xl text-blue-50 mb-10 leading-relaxed drop-shadow-md font-light transition-all duration-500">
                  {heroAnnouncement.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
                <Button onClick={handleRandomNavigation} variant="primaryAction" size="xl" className="w-full sm:w-auto font-bold">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Explore Careers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 -mt-10 relative z-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* Card 1: Open Positions */}
              <div onClick={handleRandomNavigation} className="block group cursor-pointer">
                <Card className="h-full border-b-8 border-b-[#193153] shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="pt-10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-blue-50 mb-6 group-hover:bg-[#ffdd59] group-hover:text-[#193153] transition-colors duration-300">
                      <Briefcase className="h-10 w-10 text-[#193153] group-hover:text-[#193153] transition-colors duration-300" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-900 mb-2">{openPositionsCount}+</h3>
                    <p className="text-base font-bold text-gray-500 uppercase tracking-widest">Open Positions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Card 2: CMS Managed Hired */}
              <div onClick={handleRandomNavigation} className="block h-full group cursor-pointer">
                <Card className="h-full border-b-8 border-b-emerald-500 shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="pt-10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-emerald-50 mb-6 group-hover:bg-[#193153] group-hover:text-[#ffdd59] transition-colors duration-300">
                      <Users className="h-10 w-10 text-emerald-600 group-hover:text-[#ffdd59] transition-colors duration-300" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-900 mb-2">{displayHired}+</h3>

                    <p className="text-base font-bold text-gray-500 uppercase tracking-widest">Professionals Hired</p>
                  </CardContent>
                </Card>
              </div>

              {/* Card 3: CMS Managed Perks */}
              <div onClick={handleRandomNavigation} className="block h-full group cursor-pointer">
                <Card className="h-full border-b-8 border-b-purple-500 shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="pt-10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-purple-50 mb-6 group-hover:bg-[#ffdd59] group-hover:text-[#193153] transition-colors duration-300">
                      <Gift className="h-10 w-10 text-purple-600 group-hover:text-[#193153] transition-colors duration-300" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-900 mb-2">Perks</h3>
                    <p className="text-base font-bold text-gray-500 uppercase tracking-widest">Employee Benefits & Rewards</p>
                  </CardContent>
                </Card>
              </div>

              {/* Card 4: CMS Managed Achievements */}
              <div onClick={handleRandomNavigation} className="block h-full group cursor-pointer">
                <Card className="h-full border-b-8 border-b-orange-500 shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="pt-10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-orange-50 mb-6 group-hover:bg-[#193153] group-hover:text-[#ffdd59] transition-colors duration-300">
                      <TrendingUp className="h-10 w-10 text-orange-600 group-hover:text-[#ffdd59] transition-colors duration-300" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-900 mb-2">Level 2</h3>
                    <p className="text-base font-bold text-gray-500 uppercase tracking-widest">CSC PRIME-HRM Recognition</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#193153]">Featured Opportunities</h2>
              <p className="text-gray-500 mt-4 text-lg">Join our growing team of aviation experts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {featuredJobs.map((job: any) => (
                <div key={job.id} onClick={handleRandomNavigation} className="block h-full group cursor-pointer">
                  <Card className="flex flex-col h-full border border-gray-100 hover:border-[#193153] hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="mb-6 flex justify-between items-start">
                        <span className="inline-block px-3 py-1 rounded bg-blue-50 text-[#193153] text-sm font-bold uppercase tracking-wide">
                          {job.employmentType}
                        </span>
                        <span className="text-[#ffdd59] opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-6 w-6" />
                        </span>
                      </div>
                      {job.salaryGrade && (
                        <div className="mb-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-tighter">
                            SG {job.salaryGrade} • ₱{SALARY_GRADE_MAP[job.salaryGrade]?.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#193153] transition-colors">{job.title}</h3>
                      <p className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-2">
                        {job.department} • {job.location}
                      </p>
                      <p className="text-gray-600 mb-8 line-clamp-3 text-base leading-relaxed flex-grow">{job.description}</p>
                      <div className="mt-auto">
                        <Button variant="outlineDark" className="w-full font-semibold">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={handleRandomNavigation} variant="primaryAction" size="xl" className="px-12 font-bold border-2 border-[#193153]">
                View All Positions
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* CMS Detail Modal */}


        {/* Footer - Dark Blue #193153 (Bottom) */}
        <footer className="bg-[#193153] text-white py-6 border-t border-white/10 mt-auto">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/PhilSCA_Logo.png"
                  alt="NAAP Logo"
                  className="h-10 w-auto object-contain bg-white/10 rounded-full p-1"
                />
                <div>
                  <span className="font-bold text-lg tracking-tight block">NAAP Careers</span>
                  <span className="text-xs text-blue-200">National Aviation Academy of the Philippines</span>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs text-blue-200 mb-1">Shaping the skies, one professional at a time.</p>
                <p className="text-xs text-gray-400">© 2026 NAAP. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}