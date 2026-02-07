import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    Users,
    TrendingUp,
    ArrowRight,
    Briefcase,
    Star,
    CheckCircle,
    Megaphone,
    Plane,
    FileText,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// --- SHARED UI COMPONENTS ---
const Button = ({ className, variant = "default", size = "default", children, ...props }: any) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    const variants = {
        default: "bg-[#193153] text-white hover:bg-[#193153]/90 shadow-md",
        outline: "border-2 border-[#193153] bg-transparent text-[#193153] hover:bg-[#193153] hover:text-[#ffdd59]",
        outlineWhite: "border-2 border-white bg-transparent text-white hover:bg-white/10",
        accent: "bg-[#ffdd59] text-[#193153] hover:bg-[#eac545] shadow-lg",
    };
    const sizes = { default: "h-10 px-4 py-2 text-sm", lg: "h-12 rounded-md px-8 text-base" };
    return <button className={`${baseStyles} ${variants[variant as keyof typeof variants] || variants.default} ${sizes[size as keyof typeof sizes] || sizes.default} ${className}`} {...props}>{children}</button>;
};

// Card Component (Used for Employees/Alumni - Has Hover Effect)
const Card = ({ className, children }: any) => (
    <div className={`rounded-xl border border-gray-100 bg-white text-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}>{children}</div>
);

// --- CONFIGURATION: HERO IMAGES (Using Public Paths) ---
const heroImages = [
    '/images/profhired.jpg',
    '/images/profhired2.jpg',
    '/images/profhired3.jpg'
];

// --- NEW CONFIGURATION: HERO SLIDE TEXT CONTENT ---
const heroSlideContent = [
    {
        badge: "Top Employer in Aviation Education",
        title: <>The Premier Workplace <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdd59] to-yellow-200">For Aviation Leaders</span></>,
        description: "Recognized as the industry's employer of choice. At NAAP, we offer more than a job—we offer a legacy. Join the team that defines excellence in aviation schooling."
    },
    {
        badge: "Join Our Growing Team",
        title: <>Shape the Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdd59] to-yellow-200">Of Philippine Aviation</span></>,
        description: "We are actively hiring passionate instructors, administrators, and support staff. Be part of an institution that values innovation and dedication."
    },
    {
        badge: "Competitive Benefits",
        title: <>A Rewarding Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdd59] to-yellow-200">Beyond the Hangar</span></>,
        description: "Experience a supportive work environment with competitive compensation, professional development opportunities, and excellent benefits."
    }
];

// --- MOCK DATA ---
const ALUMNI_STORIES = [
    { id: 1, name: "Capt. Sarah Mendoza", role: "Senior Pilot, PAL", quote: "NAAP provided the foundation for my discipline and technical skills.", image: "/images/pilot-female.jpg" },
    { id: 2, name: "Engr. John Reyes", role: "Aircraft Mechanic, Lufthansa Technik", quote: "The training facilities prepared me for the real-world MRO environment.", image: "/images/mechanic-male.jpg" },
    { id: 3, name: "Ms. Elena Cruz", role: "HR Director, Cebu Pacific", quote: "We actively look for NAAP graduates because of their work ethic.", image: "/images/hr-female.jpg" },
];

// UPDATED MOCK DATA FOR ANNOUNCEMENTS (Focused on NAAP as an Employer)
const ANNOUNCEMENTS = [
    { id: 1, title: "CSC Grants NAAP PRIME-HRM Level 2 Maturity", date: "Jan 28, 2026", type: "Award" },
    { id: 2, title: "NAAP Launches Nationwide Hiring Drive for Senior Flight Instructors", date: "Feb 2, 2026", type: "Hiring Alert" },
    { id: 3, title: "New Employee Wellness and Professional Development Program Unveiled", date: "Jan 20, 2026", type: "Internal News" },
];

// --- PRIME-HRM PILLARS DATA ---
const PRIME_PILLARS = [
    { title: "Recruitment, Selection & Placement", desc: "Merit-based hiring ensuring only the most qualified aviation professionals join our ranks." },
    { title: "Learning & Development", desc: "Continuous capacity building through scholarships, trainings, and industry partnerships." },
    { title: "Performance Management", desc: "Data-driven performance reviews that align individual goals with the Academy's mission." },
    { title: "Rewards & Recognition", desc: "Recognizing excellence and service through a structured and transparent awards system." },
];

export default function ProfessionalsHired() {
    // --- CAROUSEL LOGIC ---
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    };

    return (
        <>
            <Head title="Our Impact - NAAP Careers" />

            <div className="min-h-screen bg-gray-50 font-sans text-[#1b1b18]">

                {/* --- NAVIGATION --- */}
                <nav className="bg-[#193153] text-white sticky top-0 z-50 shadow-lg">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <img src="/images/PhilSCA_Logo.png" alt="NAAP Logo" className="h-10 w-auto bg-white/10 rounded-full p-1" />
                            <span className="font-bold text-xl tracking-tight">NAAP Careers</span>
                        </Link>

                        <div className="flex gap-8 items-center">
                            <Link href="/">
                                <span className="hover:text-[#ffdd59] transition-colors cursor-pointer font-medium text-white/90">Home</span>
                            </Link>

                            <Link href="/jobs">
                                <span className="hover:text-[#ffdd59] transition-colors cursor-pointer font-medium text-white/90">Browse Jobs</span>
                            </Link>

                            <Link href="/login">
                                <span className="hover:text-[#ffdd59] transition-colors cursor-pointer font-medium text-white/90">Login/Register</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* --- DYNAMIC HERO SECTION --- */}
                <div className="relative h-[550px] flex items-center justify-center overflow-hidden bg-[#193153]">

                    {/* Background Images Carousel Layer */}
                    {heroImages.map((imgSrc, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={imgSrc}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#193153]/95 via-[#193153]/70 to-[#193153]/30" />
                        </div>
                    ))}

                    {/* Carousel Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 z-20 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-[#ffdd59] transition-all hidden md:block backdrop-blur-sm border border-white/10"
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 z-20 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-[#ffdd59] transition-all hidden md:block backdrop-blur-sm border border-white/10"
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>

                    {/* Hero Text Content (Dynamic) */}
                    <div className="container relative z-10 px-4 text-center h-full flex flex-col justify-center">
                        <div className="max-w-4xl mx-auto relative">

                            {/* Content Container */}
                            <div className="relative min-h-[220px] flex items-center justify-center">
                                {heroSlideContent.map((content, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-x-0 flex flex-col items-center transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 -z-10 translate-y-4'}`}
                                    >
                                        {/* BADGE */}
                                        <div className="inline-flex items-center gap-2 bg-[#ffdd59] text-[#193153] px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                                            <Award className="w-4 h-4" /> {content.badge}
                                        </div>

                                        {/* TITLE */}
                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight leading-tight text-white drop-shadow-xl whitespace-nowrap">
                                            {content.title}
                                        </h1>

                                        {/* DESCRIPTION */}
                                        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-2 leading-normal drop-shadow-md text-justify px-4">
                                            {content.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Static Buttons */}
                            <div className="flex justify-center gap-4 relative z-20 mt-32">
                                {/* UPDATE: Changed 'href' to '/login' and removed the nested <Button> component.
                           The styles are now applied directly to the Link to ensure navigation works.
                        */}
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 bg-[#ffdd59] text-[#193153] hover:bg-[#eac545] shadow-lg h-12 px-8 text-base"
                                >
                                    Join Our Team <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>

                                <Link href="/employee-benefits">
                                    <Button variant="outlineWhite" size="lg">View Employee Benefits</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-[#ffdd59]' : 'w-3 bg-white/50 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* --- STATS STRIP --- */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                            <div>
                                <div className="text-4xl font-bold text-[#193153] mb-1">500+</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">Hired Graduates</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#193153] mb-1">98%</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">Employment Rate</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#193153] mb-1">50+</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">Industry Partners</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#193153] mb-1">Lvl 2</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">CSC PRIME-HRM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CSC ANNOUNCEMENT --- */}
                <section className="py-16 px-6 container mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* LEFT: MAIN AWARD ANNOUNCEMENT */}
                        <div className="w-full md:w-1/2">
                            <div className="bg-blue-50 border-l-4 border-[#193153] p-8 rounded-r-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Megaphone className="w-6 h-6 text-[#193153]" />
                                    <span className="font-bold text-[#193153] uppercase tracking-wider">Official Announcement</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">NAAP Achieves CSC PRIME-HRM Level 2 Maturity</h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    The National Aviation Academy of the Philippines has been officially recognized by the Civil Service Commission (CSC) for achieving Level 2 Maturity in the Program to Institutionalize Meritocracy and Excellence in Human Resource Management (PRIME-HRM).
                                </p>

                                {/* --- STATIC GRID SECTION (No Hover Effects) --- */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {PRIME_PILLARS.map((item, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm cursor-default">
                                            <div className="text-xs font-bold text-[#ffdd59] bg-[#193153] inline-block px-2 py-0.5 rounded mb-2">
                                                Level 2 Maturity
                                            </div>
                                            <h4 className="font-bold text-[#193153] text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-gray-600 leading-snug">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/news/csc-prime-hrm-level-2">
                                    <Button variant="outline" className="mt-2 text-[#193153] border-[#193153] hover:bg-[#193153] hover:text-[#ffdd59]">Read Full Memorandum</Button>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT: NEWS LIST */}
                        <div className="w-full md:w-1/2 grid gap-4">
                            <h3 className="font-bold text-xl text-[#193153] mb-2">Latest News & Updates</h3>
                            {ANNOUNCEMENTS.map((news) => (
                                <div key={news.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:border-[#ffdd59] transition-all cursor-pointer group">
                                    <div className="bg-blue-50 p-3 rounded-lg text-[#193153] group-hover:bg-[#193153] group-hover:text-[#ffdd59] transition-colors">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-[#193153] transition-colors">{news.title}</h4>
                                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                            <span>{news.date}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="text-[#193153] font-medium">{news.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- OUR EMPLOYEES AT NAAP --- */}
                <section className="bg-gray-100 py-20 px-6">
                    <div className="container mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#193153] mb-4">Our Employees at NAAP</h2>
                            <p className="text-gray-600">Meet the dedicated team members driving excellence in aviation education.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {ALUMNI_STORIES.map((story) => (
                                <Card key={story.id} className="relative overflow-visible mt-10">
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-300 overflow-hidden">
                                            {/* Placeholder for image */}
                                            <div className="w-full h-full bg-[#193153] flex items-center justify-center text-white font-bold text-2xl">
                                                {story.name.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-14 pb-8 px-8 text-center">
                                        <h3 className="font-bold text-lg text-gray-900">{story.name}</h3>
                                        <p className="text-[#193153] text-sm font-semibold mb-4">{story.role}</p>
                                        <div className="flex justify-center mb-4 text-[#ffdd59]">
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                        <p className="text-gray-600 italic">"{story.quote}"</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="bg-[#193153] text-white py-6 border-t border-white/10">
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