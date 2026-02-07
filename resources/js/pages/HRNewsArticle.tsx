import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, User, Share2, Tag, Search, Menu } from 'lucide-react';

interface ArticleProps {
    id: string;
}

const HRNewsArticle = ({ id }: ArticleProps) => {
    // Mock Data for Articles
    const articles: Record<string, any> = {
        "1": {
            title: "NAAP Launches New Employee Wellness Program",
            date: "June 05, 2026",
            category: "Employee Welfare",
            author: "HR Department",
            content: (
                <>
                    <p className="mb-6">The National Aviation Academy of the Philippines (NAAP) is proud to announce the launch of its comprehensive <strong>Employee Wellness Program</strong>, designed to prioritize the physical, mental, and emotional well-being of its workforce.</p>
                    <p className="mb-6">Recognizing that a healthy team is a productive team, this initiative introduces a suite of benefits aimed at fostering a balanced work-life environment.</p>

                    <h3 className="text-xl font-bold text-[#193153] mb-4">Key Features of the Program:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Gym Memberships:</strong> Subsidized access to partner fitness centers.</li>
                        <li><strong>Mental Health Support:</strong> Free access to counseling services and mental health workshops.</li>
                        <li><strong>Flexible Work Arrangements:</strong> Options for remote work and flexible hours for eligible roles.</li>
                        <li><strong>Annual Health Screenings:</strong> Comprehensive executive check-ups covered by the academy.</li>
                    </ul>

                    <p className="mb-6">"Our employees are our greatest asset," said the HR Director. "This program is a testament to our commitment to creating a supportive and nurturing environment where everyone can thrive."</p>
                    <p>The program takes effect immediately, and employees are encouraged to visit the HR portal for enrollment details.</p>
                </>
            )
        },
        "2": {
            title: "Mass Recruitment for Senior Instructors Begins",
            date: "May 22, 2026",
            category: "Recruitment",
            author: "Talent Acquisition",
            content: (
                <>
                    <p className="mb-6">In response to the surge in student enrollment for the upcoming academic year, NAAP is kicking off a <strong>Mass Recruitment Drive</strong> for Senior Flight Instructors.</p>
                    <p className="mb-6">We are looking for experienced aviators with a passion for teaching to help shape the next generation of world-class pilots.</p>

                    <h3 className="text-xl font-bold text-[#193153] mb-4">Qualifications:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Valid Commercial Pilot License (CPL) with Instrument Rating.</li>
                        <li>Flight Instructor License (FI).</li>
                        <li>Minimum of 1,500 flight hours.</li>
                        <li>Strong communication and mentorship skills.</li>
                    </ul>

                    <p className="mb-6">Successful candidates will enjoy competitive compensation packages, opportunities for career advancement, and the chance to work with state-of-the-art flight simulation technology.</p>
                    <p>Interested applicants may submit their CVs through the NAAP Careers Portal or visit the HR office for walk-in interviews starting June 1st.</p>
                </>
            )
        },
        "3": {
            title: "Advanced Leadership Training for Admin Staff",
            date: "May 10, 2026",
            category: "Training & Dev",
            author: "Learning & Development",
            content: (
                <>
                    <p className="mb-6">NAAP invests in its future leaders with the rollout of the <strong>Advanced Leadership Training Workshop</strong> for selected administrative staff.</p>
                    <p className="mb-6">This 3-day intensive program, held in partnership with top management consultants, aims to equip our admin team with the strategic skills needed to navigate the evolving aviation education landscape.</p>

                    <h3 className="text-xl font-bold text-[#193153] mb-4">Workshop Modules:</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Strategic Decision Making</li>
                        <li>Conflict Resolution and Negotiation</li>
                        <li>Change Management</li>
                        <li>Innovation in Educational Administration</li>
                    </ul>

                    <p>Participants will engage in case studies, role-playing simulations, and peer coaching sessions. This initiative underscores NAAP's dedication to continuous professional development and internal promotion.</p>
                </>
            )
        }
    };

    const article = articles[id];

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
                    <Link href="/hr-news" className="text-blue-600 hover:underline">Return to HR News</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-slate-800">
            <Head title={`${article.title} - NAAP News`} />

            {/* --- TOP BAR (Dashboard Style) --- */}
            <header className="bg-[#193153] border-b border-[#193153] sticky top-0 z-50 shadow-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-[#ffdd59] transition-colors">
                                <img src="/images/PhilSCA_Logo.png" alt="NAAP Logo" className="h-8 w-8 object-contain" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">NAAP <span className="text-blue-200 font-light">Newsroom</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                className="pl-10 pr-4 py-2 rounded-full border border-transparent bg-white/10 text-white placeholder-blue-200 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffdd59] w-64 text-sm transition-all"
                            />
                        </div>

                        <div className="h-8 w-8 bg-[#ffdd59] rounded-full text-[#193153] flex items-center justify-center font-bold text-sm border-2 border-white/20">
                            G
                        </div>
                    </div>

                    <button className="md:hidden p-2 text-white">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-[#193153]">Home</Link>
                    <span>/</span>
                    <Link href="/hr-news" className="hover:text-[#193153]">HR News</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate max-w-md">{article.title}</span>
                </div>

                <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
                    {/* Header Banner */}
                    <div className="h-64 sm:h-80 bg-gradient-to-r from-[#193153] to-[#2a4a75] relative p-8 flex flex-col justify-end">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#ffdd59] text-[#193153] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                            {article.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center text-blue-100 text-sm gap-6">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {article.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {article.author}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 sm:p-12">
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            {article.content}
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href="/hr-news"
                                className="inline-flex items-center text-gray-500 hover:text-[#193153] font-medium transition-colors"
                            >
                                <ChevronLeft className="mr-1 h-5 w-5" />
                                Back to HR News
                            </Link>

                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <span className="text-xs text-gray-400 font-medium uppercase">Share this post</span>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">© 2026 National Aviation Academy of the Philippines. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HRNewsArticle;
