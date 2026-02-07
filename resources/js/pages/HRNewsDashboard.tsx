import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';

export default function HRNewsDashboard() {
    const hrNews = [
        {
            id: 1,
            title: "NAAP Launches New Employee Wellness Program",
            date: "June 05, 2026",
            category: "Employee Welfare",
            summary: "A comprehensive wellness initiative designed to support the physical and mental health of all NAAP employees. Features include gym memberships, mental health workshops, and flexible work arrangements."
        },
        {
            id: 2,
            title: "Mass Recruitment for Senior Instructors Begins",
            date: "May 22, 2026",
            category: "Recruitment",
            summary: "In response to growing student enrollment, NAAP is opening positions for Senior Flight Instructors. We are looking for experienced pilots with a passion for teaching the next generation of aviators."
        },
        {
            id: 3,
            title: "Advanced Leadership Training for Admin Staff",
            date: "May 10, 2026",
            category: "Training & Dev",
            summary: "Selected administrative staff will undergo a 3-day intensive leadership workshop. This program aims to enhance management skills and foster a culture of continuous improvement within the academy."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
            <Head title="HR News Dashboard" />

            {/* Header */}
            <header className="bg-[#193153] text-white shadow-lg">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">HR Updates & Announcements</h1>
                            <p className="text-blue-200">Keeping the NAAP community informed about Human Resources initiatives.</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/news/csc-prime-hrm-level-2" className="flex items-center text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back to Newsroom
                            </Link>
                            <Link href="/" className="flex items-center text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hrNews.map((news) => (
                        <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="h-2 bg-[#ffdd59]"></div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {news.category}
                                    </span>
                                    <div className="flex items-center text-gray-400 text-xs">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {news.date}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-[#193153] mb-3 leading-snug">
                                    {news.title}
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {news.summary}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <Link href={`/hr-news/${news.id}`} className="text-sm font-bold text-[#193153] hover:text-[#ffdd59] transition-colors flex items-center">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
