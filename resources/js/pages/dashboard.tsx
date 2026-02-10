import React, { useState, useEffect, useRef } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import {
    User,
    LogOut,
    Briefcase,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Mail,
    Phone,
    GraduationCap,
    Calendar,
    Search,
    MapPin,
    ArrowRight,
    Bell,
    Settings,
    Bookmark,
    MessageCircle,
    Send,
    X,
    MoreVertical,
    ChevronRight,
    AlertCircle,
    Ban,
    Camera
} from 'lucide-react';
import { toast } from 'sonner';
import { mockApplications, mockEvents, getApplications, getDynamicNotifications, getJobs } from '@/data/mockData';

// --- SHARED COMPONENTS ---

const Button = ({ className, variant = "default", size = "default", children, ...props }: any) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
        default: "bg-[#193153] text-white hover:bg-[#193153]/90 shadow-md",
        primaryAction: "bg-white text-[#193153] shadow-xl hover:bg-[#193153] hover:text-[#ffdd59] border border-[#193153]",
        outline: "border-2 border-white bg-transparent text-white hover:bg-white/10",
        outlineDark: "border border-[#193153] text-[#193153] hover:bg-[#193153] hover:text-[#ffdd59]",
        ghost: "hover:bg-gray-100 text-[#193153]",
        danger: "bg-red-600 text-white hover:bg-red-700",
        accent: "bg-[#ffdd59] text-[#193153] hover:bg-[#eac545]",
    };

    const sizes = {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
    };

    return (
        <button className={`${baseStyles} ${variants[variant as keyof typeof variants] || variants.default} ${sizes[size as keyof typeof sizes] || sizes.default} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Card = ({ className, children }: any) => (
    <div className={`rounded-xl border border-gray-100 bg-white text-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ className, children }: any) => (
    <div className={`p-6 pb-2 ${className}`}>
        {children}
    </div>
);

const CardContent = ({ className, children }: any) => (
    <div className={`p-6 pt-2 ${className}`}>
        {children}
    </div>
);

// --- INTERFACES ---

interface Application {
    id: number;
    jobTitle: string;
    jobId: number;
    department?: string;
    location?: string;
    status: 'Submitted' | 'Under Review' | 'Hired' | 'Rejected' | 'Interview' | 'Withdrawn';
    submittedDate: string;
    phone?: string;
    education?: string;
    email: string;
    // AI Scoring fields
    educationLevel?: 'bachelor' | 'masters' | 'doctoral_graduate' | 'doctoral_27+' | 'doctoral_18-24' | 'doctoral_15-18' | 'doctoral_9-15';
    yearsOfExperience?: number;
    awards?: ('national' | 'csc' | 'president' | 'ngo')[];
    trainingHours?: number;
    aiScore?: number;
    aiScoreBreakdown?: {
        education: number;
        experience: number;
        accomplishments: number;
        training: number;
    };
}

interface UserData {
    name: string;
    email: string;
}

interface DashboardProps {
    auth: {
        user: UserData;
    };
    applications: Application[];
}

// --- CHATBOT COMPONENT ---

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm the NAAP Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulated AI Logic
        setTimeout(() => {
            let botResponse = "I'm not sure about that. For specific inquiries, you may contact the HR department directly at hr@naap.edu.ph.";
            const lowerInput = userMsg.text.toLowerCase();

            // Greeting
            if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
                botResponse = "Hello! I'm here to help you navigate your career journey with NAAP. Ask me about applications, interviews, or benefits!";
            }
            // Application Status
            else if (lowerInput.includes('status') || lowerInput.includes('application') || lowerInput.includes('track')) {
                botResponse = "You can track your application status directly on your dashboard under 'My Applications'. Use the 'Check Status' button above for a quick view!";
            }
            // Interviews
            else if (lowerInput.includes('interview') || lowerInput.includes('schedule')) {
                botResponse = "If shortlisted, you'll receive an email with your interview schedule. Confirmed interviews will also appear in the 'Upcoming Events' section on your dashboard.";
            }
            // Documents/Resume
            else if (lowerInput.includes('document') || lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('file')) {
                botResponse = "You can update your resume, transcript, and other documents in the 'My Profile' tab. Please ensure all uploads are in PDF format.";
            }
            // Salary/Benefits
            else if (lowerInput.includes('salary') || lowerInput.includes('benefits') || lowerInput.includes('compensation') || lowerInput.includes('pay')) {
                botResponse = "We offer competitive compensation packages! You can view our general benefits on the 'Employee Benefits' page. Specific salary details are discussed during the job offer stage.";
            }
            // Requirements/Qualifications
            else if (lowerInput.includes('requirement') || lowerInput.includes('qualification') || lowerInput.includes('skill')) {
                botResponse = "Each job posting has specific requirements listed in its description. Go to 'Browse Jobs' and click 'View Details' on any position to see what's needed.";
            }
            // Withdrawal
            else if (lowerInput.includes('withdraw') || lowerInput.includes('cancel')) {
                botResponse = "If you wish to withdraw an application, go to your Dashboard history list and click the 'Withdraw' (Icon with X or Log Out symbol) button next to the specific application.";
            }
            // Location
            else if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('place')) {
                botResponse = "NAAP has multiple campuses including Villamor, Basa Air Base, and Mactan. The specific location for a role is listed on the job card.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 800);
    };


    const suggestedQuestions = [
        "Check my application status",
        "When is my interview?",
        "What are the benefits?",
        "Where are the campuses?",
        "How do I withdraw?"
    ];

    const handleSuggestionClick = (question: string) => {
        const userMsg = { id: Date.now(), text: question, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            let botResponse = "I'm not sure about that. Please contact HR.";
            const lowerInput = question.toLowerCase();
            // Reuse same logic block
            if (lowerInput.includes('status') || lowerInput.includes('application') || lowerInput.includes('track')) {
                botResponse = "You can track your application status directly on your dashboard under 'My Applications'. Use the 'Check Status' button above for a quick view!";
            } else if (lowerInput.includes('interview') || lowerInput.includes('schedule')) {
                botResponse = "If shortlisted, you'll receive an email with your interview schedule. Confirmed interviews will also appear in the 'Upcoming Events' section on your dashboard.";
            } else if (lowerInput.includes('benefits') || lowerInput.includes('salary')) {
                botResponse = "We offer competitive compensation packages! You can view our general benefits on the 'Employee Benefits' page.";
            } else if (lowerInput.includes('withdraw') || lowerInput.includes('cancel')) {
                botResponse = "If you wish to withdraw an application, go to your Dashboard history list and click the 'Withdraw' (Icon with X or Log Out symbol) button next to the specific application.";
            } else if (lowerInput.includes('campus') || lowerInput.includes('location') || lowerInput.includes('where')) {
                botResponse = "NAAP has multiple campuses including Villamor, Basa Air Base, and Mactan.";
            }
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-[#193153] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="font-bold text-sm">NAAP Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-[#193153] text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar pb-3">
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSuggestionClick(q)}
                                className="whitespace-nowrap px-3 py-1 bg-white border border-blue-100 text-[#193153] text-xs rounded-full hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a question..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#193153]/20"
                        />
                        <button onClick={handleSend} className="bg-[#ffdd59] text-[#193153] p-2 rounded-full hover:bg-[#eac545] transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-[#ffdd59] text-[#193153] shadow-lg hover:bg-[#eac545] hover:scale-105 transition-all flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </button>
        </div>
    );
};

// --- MAIN COMPONENT ---

export default function ApplicantDashboard({ auth }: DashboardProps) {
    // Profile Image State
    const [profileImage, setProfileImage] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('user_profile_image');
        }
        return null;
    });


    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Data State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user_profile_data');
            if (saved) return JSON.parse(saved);
        }
        return {
            lastName: auth.user.name.split(' ').slice(-1)[0] || '',
            firstName: auth.user.name.split(' ').slice(0, -1).join(' ') || '',
            middleName: '',
            extensionName: '',
            age: '',
            sex: '',
            civilStatus: '',
            religion: '',
            ipGroup: '',
            pwd: '',
            phone: '',
            address: 'Pasay City, Philippines',
            email: auth.user.email,
            // Computed full name for display
            get fullName() {
                return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}${this.extensionName ? ' ' + this.extensionName : ''}`.trim() || auth.user.name;
            }
        };
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData((prev: any) => ({ ...prev, [name]: value }));
    };

    const saveProfile = () => {
        localStorage.setItem('user_profile_data', JSON.stringify(profileData));
        setIsEditingProfile(false);
        toast.success("Profile updated successfully!");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setProfileData((prev: any) => {
                    // Update auth user name reference if needed, but mainly tracking image here
                    return prev;
                });
                setProfileImage(base64);
                localStorage.setItem('user_profile_image', base64);
                toast.success("Profile photo updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    // Use mock data for prototype, merged with local submissions
    const [myApplications, setMyApplications] = useState<Application[]>(() => {
        let localApps: any[] = [];
        try {
            if (typeof window !== 'undefined') {
                const rawApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');
                // Filter only apps submitted by THIS user
                localApps = rawApps.filter((app: any) => app.applicantEmail === auth.user.email);
            }
        } catch (e) {
            console.error(e);
        }

        // Add display fields to local apps
        const formattedLocalApps = localApps.map((app: any) => ({
            ...app,
            jobId: app.jobId || 1,
            department: app.department || 'Aviation',
            location: app.location || 'Pasay City'
        }));

        // We only show what the user has applied for, so we omit arbitrary mock apps
        return formattedLocalApps as unknown as Application[];
    });

    const [filterStatus, setFilterStatus] = useState('Total');

    const filteredApplications = myApplications.filter(app => {
        if (filterStatus === 'Total') return true;
        if (filterStatus === 'Submitted') return app.status === 'Submitted';
        if (filterStatus === 'In Review') return app.status === 'Under Review';
        if (filterStatus === 'Interview') return app.status === 'Interview' || app.status === 'Hired'; // Adjust mapping as needed
        return false;
    });

    const [activeTab, setActiveTab] = useState<'applications' | 'profile'>('applications');
    const user = auth.user;

    const [notifications, setNotifications] = useState(() => getDynamicNotifications(user.email));

    const handleMarkAsRead = (id: string) => {
        const readNotifications = JSON.parse(localStorage.getItem('read_notifications') || '[]');
        if (!readNotifications.includes(id)) {
            const updated = [...readNotifications, id];
            localStorage.setItem('read_notifications', JSON.stringify(updated));
            setNotifications(getDynamicNotifications(user.email));
        }
    };

    const [savedJobDetails, setSavedJobDetails] = useState<any[]>([]);

    useEffect(() => {
        const loadSavedJobs = () => {
            const savedIds = JSON.parse(localStorage.getItem('saved_jobs') || '[]');
            const allJobs = getJobs();
            const details = allJobs.filter(job => savedIds.includes(job.id));
            setSavedJobDetails(details);
        };

        loadSavedJobs();

        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'saved_jobs' || e.key === 'mock_jobs_custom') {
                loadSavedJobs();
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const removeSavedJob = (id: number) => {
        const savedIds = JSON.parse(localStorage.getItem('saved_jobs') || '[]');
        const newIds = savedIds.filter((sid: number) => sid !== id);
        localStorage.setItem('saved_jobs', JSON.stringify(newIds));
        setSavedJobDetails(prev => prev.filter(job => job.id !== id));
        toast.success("Job removed from bookmarks");
        window.dispatchEvent(new StorageEvent('storage', { key: 'saved_jobs' }));
    };

    // Stats Logic
    const statusCounts = {
        total: myApplications.length,
        submitted: myApplications.filter(a => a.status === 'Submitted').length,
        underReview: myApplications.filter(a => a.status === 'Under Review').length,
        rejected: myApplications.filter(a => a.status === 'Rejected').length,
        hired: myApplications.filter(a => a.status === 'Hired').length,
    };

    const handleWithdraw = (id: number) => {
        if (confirm("Are you sure you want to withdraw this application?")) {
            const updatedApps = myApplications.map(app =>
                app.id === id ? { ...app, status: 'Withdrawn' as any } : app
            );
            setMyApplications(updatedApps);

            // Persist to localStorage if it's a custom application
            const localApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');
            const updatedLocalApps = localApps.map((app: any) =>
                app.id === id ? { ...app, status: 'Withdrawn' } : app
            );
            localStorage.setItem('mock_applications_custom', JSON.stringify(updatedLocalApps));

            toast.success("Application withdrawn.");
        }
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    // Status Badge Helper
    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            'Submitted': 'bg-blue-100 text-blue-700 border-blue-200',
            'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Hired': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'Rejected': 'bg-red-100 text-red-700 border-red-200',
        };
        const icons: Record<string, any> = {
            'Submitted': Clock,
            'Under Review': FileText,
            'Hired': CheckCircle,
            'Rejected': XCircle,
            'Withdrawn': Ban,
        };

        const Icon = icons[status] || Clock;
        const style = styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style}`}>
                <Icon className="w-3.5 h-3.5" />
                {status}
            </span>
        );
    };

    const timelineRef = useRef<HTMLDivElement>(null);

    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleViewNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        if (!notificationsOpen && notifications.some(n => !n.isRead)) {
            const allIds = notifications.map(n => n.id);
            const currentRead = JSON.parse(localStorage.getItem('read_notifications') || '[]');
            const newRead = [...new Set([...currentRead, ...allIds])];
            localStorage.setItem('read_notifications', JSON.stringify(newRead));
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            window.dispatchEvent(new StorageEvent('storage', { key: 'read_notifications' }));
        }
    };

    // Sync across tabs
    useEffect(() => {
        const handleSync = (e: StorageEvent) => {
            if (e.key === 'mock_applications_custom' || e.key === 'mock_jobs_custom') {
                const refreshedApps = getApplications().filter((app: any) => app.applicantEmail === auth.user.email);
                setMyApplications(refreshedApps as any);
                setNotifications(getDynamicNotifications(user.email));
            }
            if (e.key === 'read_notifications') {
                setNotifications(getDynamicNotifications(user.email));
            }
        };
        window.addEventListener('storage', handleSync);
        return () => window.removeEventListener('storage', handleSync);
    }, []);

    const handleCheckStatus = () => {
        if (myApplications.length === 0) {
            toast.info("You haven't submitted any applications yet.");
            return;
        }

        // If we are on profile tab, switch back to applications tab first
        setActiveTab('applications');

        // Use a small timeout to allow the tab to switch and the component to mount/render
        setTimeout(() => {
            timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return (
        <>
            <Head title="Dashboard - NAAP Careers" />

            <div className="min-h-screen bg-gray-50 font-sans text-[#1b1b18]">

                {/* --- NAVIGATION --- */}
                <nav className="bg-[#193153] text-white sticky top-0 z-40 shadow-lg">
                    <div className="container mx-auto px-6 py-3">
                        <div className="flex justify-between items-center">
                            {/* Logo Area */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src="/images/PhilSCA_Logo.png"
                                    alt="NAAP Logo"
                                    className="h-10 w-auto object-contain bg-white/10 rounded-full p-1"
                                />
                                <div className="hidden md:block">
                                    <span className="font-bold text-lg tracking-tight block leading-none">NAAP Careers</span>
                                    <span className="text-[10px] text-blue-200 uppercase tracking-widest">Applicant Portal</span>
                                </div>
                            </div>

                            {/* Right Menu */}
                            <div className="flex items-center space-x-4">
                                <Link href="/jobs" className="hidden md:block text-sm font-medium text-blue-100 hover:text-[#ffdd59] transition-colors">
                                    Browse Jobs
                                </Link>
                                <div className="h-6 w-px bg-white/20 hidden md:block"></div>

                                {/* Notification Bell */}
                                <div className="relative">
                                    <button
                                        onClick={handleViewNotifications}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                                    >
                                        <Bell className="w-5 h-5 text-white" />
                                        {notifications.some(n => !n.isRead) && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#193153]"></span>
                                        )}
                                    </button>

                                    {notificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-200">
                                            {notifications.length === 0 ? (
                                                <div className="px-4 py-8 text-center text-gray-400 text-sm">No notifications yet</div>
                                            ) : (
                                                notifications.map(n => (
                                                    <div
                                                        key={n.id}
                                                        onClick={() => handleMarkAsRead(n.id)}
                                                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                                                    >
                                                        <div className="flex gap-3">
                                                            {!n.isRead && <div className="mt-1.5 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>}
                                                            <div>
                                                                <p className={`text-sm ${n.isRead ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>{n.text}</p>
                                                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" /> {new Date(n.time).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* User Dropdown / Logout Area */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className="flex items-center gap-3 hover:bg-white/10 rounded-full pl-1 pr-4 py-1 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#ffdd59] flex items-center justify-center text-[#193153] font-bold text-xs overflow-hidden border border-white group-hover:scale-105 transition-transform">
                                            {profileImage ? (
                                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0)
                                            )}
                                        </div>
                                        <span className="text-sm font-medium hidden sm:block text-white group-hover:text-[#ffdd59] transition-colors">
                                            {user.name}
                                        </span>
                                    </button>
                                    <Button onClick={handleLogout} size="sm" variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                        <LogOut className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* --- WELCOME BANNER --- */}
                <div className="bg-gradient-to-r from-[#193153] to-blue-900 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

                    <div className="container mx-auto px-6 py-10 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h1 className="text-3xl font-bold">Good Morning, {user.name}!</h1>
                                <p className="text-blue-200 mt-2 max-w-xl">You have <span className="text-[#ffdd59] font-bold">{statusCounts.underReview} applications</span> under review. Keep your profile updated to increase your chances.</p>
                            </div>

                            <div className="flex gap-3">
                                <Link href="/jobs">
                                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">Find Jobs</Button>
                                </Link>
                                <Button onClick={handleCheckStatus} variant="accent" className="font-bold shadow-lg">
                                    Check Status
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="container mx-auto px-6 py-8 -mt-6 relative z-20">

                    {/* TABS */}
                    <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 pt-2 flex space-x-8 shadow-sm">
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`pb-4 pt-4 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${activeTab === 'applications'
                                ? 'border-[#193153] text-[#193153]'
                                : 'border-transparent text-gray-500 hover:text-[#193153] hover:border-gray-300'
                                }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`pb-4 pt-4 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${activeTab === 'profile'
                                ? 'border-[#193153] text-[#193153]'
                                : 'border-transparent text-gray-500 hover:text-[#193153] hover:border-gray-300'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            My Profile
                        </button>
                    </div>

                    <div className="bg-white rounded-b-xl shadow-sm min-h-[500px] p-6 border border-t-0 border-gray-100">

                        {activeTab === 'applications' ? (
                            <div className="flex flex-col lg:flex-row gap-8">

                                {/* LEFT COLUMN: Stats & List (70%) */}
                                <div className="w-full lg:w-3/4 space-y-8">

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Total', value: statusCounts.total, color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200' },
                                            { label: 'Submitted', value: statusCounts.submitted, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                                            { label: 'In Review', value: statusCounts.underReview, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
                                            { label: 'Interview', value: 0, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                                        ].map((stat, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setFilterStatus(stat.label)}
                                                className={`p-4 rounded-xl border flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer ${filterStatus === stat.label
                                                    ? `${stat.bg} ${stat.border.replace('border-', 'border-2 border-')}` // Highlight active
                                                    : 'bg-white border-gray-100 hover:shadow-md'
                                                    }`}
                                            >
                                                <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Application Timeline Feature */}
                                    {myApplications.length > 0 && (
                                        <div ref={timelineRef} className="bg-white border border-gray-200 rounded-xl p-6">
                                            <h3 className="font-bold text-[#193153] flex items-center gap-2 mb-6">
                                                <Clock className="w-5 h-5 text-[#ffdd59]" />
                                                Latest Application Timeline
                                            </h3>
                                            <div className="relative">
                                                <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                                                <div className="relative flex justify-between">
                                                    {/* Step 1 */}
                                                    <div className="flex flex-col items-center gap-2 bg-white px-2">
                                                        <div className="w-8 h-8 rounded-full bg-[#193153] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">1</div>
                                                        <span className="text-xs font-bold text-[#193153]">Applied</span>
                                                    </div>
                                                    {/* Step 2 */}
                                                    <div className="flex flex-col items-center gap-2 bg-white px-2">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white ${myApplications[0].status !== 'Submitted' ? 'bg-[#193153] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                                                        <span className="text-xs font-semibold text-gray-500">Review</span>
                                                    </div>
                                                    {/* Step 3 */}
                                                    <div className="flex flex-col items-center gap-2 bg-white px-2">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold ring-4 ring-white">3</div>
                                                        <span className="text-xs font-semibold text-gray-500">Interview</span>
                                                    </div>
                                                    {/* Step 4 */}
                                                    <div className="flex flex-col items-center gap-2 bg-white px-2">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white ${myApplications[0].status === 'Hired' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
                                                        <span className="text-xs font-semibold text-gray-500">Result</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 shrink-0" />
                                                <p>Your application for <strong>{myApplications[0].jobTitle}</strong> is currently <strong>{myApplications[0].status}</strong>. We will notify you via email for the next steps.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Application List */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-bold text-[#193153]">History</h2>
                                        </div>

                                        {filteredApplications.length === 0 ? (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                                <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
                                                    <Briefcase className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
                                                <p className="text-gray-500 mb-6">Try selecting a different status filter or browse open roles.</p>
                                                <Link href="/jobs">
                                                    <Button variant="default">Browse Open Positions</Button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {filteredApplications.map(app => (
                                                    <div key={app.id} className="group border border-gray-200 rounded-xl p-5 hover:border-[#193153] hover:shadow-md transition-all bg-white flex flex-col md:flex-row items-center gap-4">

                                                        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#193153] group-hover:text-[#ffdd59] transition-colors text-[#193153]">
                                                            <Briefcase className="w-6 h-6" />
                                                        </div>

                                                        <div className="flex-1 text-center md:text-left">
                                                            <h3 className="font-bold text-gray-900">{app.jobTitle}</h3>
                                                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mt-1">
                                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location || 'Pasay City'}</span>
                                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(app.submittedDate).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            {getStatusBadge(app.status)}
                                                            <Link href={`/jobs/${app.jobId}`}>
                                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                                                    <ChevronRight className="w-5 h-5" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => handleWithdraw(app.id)}
                                                            >
                                                                <LogOut className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Sidebar (30%) */}
                                <div className="w-full lg:w-1/4 space-y-6">

                                    {/* Upcoming Events Card */}
                                    <Card className="bg-white border-none shadow-lg overflow-hidden">
                                        <div className="bg-[#193153] p-4 text-white">
                                            <h3 className="font-bold flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#ffdd59]" />
                                                Upcoming Events
                                            </h3>
                                        </div>
                                        <div className="p-4 bg-gray-50 min-h-[150px] flex flex-col gap-3">
                                            {mockEvents.length > 0 ? (
                                                mockEvents.map(event => (
                                                    <div key={event.id} className="bg-white p-3 rounded-lg border border-gray-100 flex items-start gap-3 shadow-sm hover:border-[#193153] transition-colors">
                                                        <div className="bg-blue-50 text-[#193153] p-2 rounded text-center min-w-[50px]">
                                                            <span className="block text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                                                            <span className="block text-lg font-bold leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 leading-tight">{event.title}</h4>
                                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" /> {event.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-sm text-gray-500 mb-3">No upcoming events.</p>
                                                </div>
                                            )}
                                            <Link href="/calendar" className="w-full">
                                                <Button variant="outlineDark" size="sm" className="text-xs bg-white w-full mt-2">View Full Calendar</Button>
                                            </Link>
                                        </div>
                                    </Card>

                                    {/* Saved Jobs Card */}
                                    <Card className="bg-white border-none shadow-lg overflow-hidden mb-6">
                                        <div className="bg-[#193153] p-4 text-white flex justify-between items-center">
                                            <h3 className="font-bold flex items-center gap-2">
                                                <Bookmark className="w-4 h-4 text-[#ffdd59] fill-[#ffdd59]" />
                                                Saved Jobs
                                            </h3>
                                            <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                                                {savedJobDetails.length}
                                            </span>
                                        </div>
                                        <div className="p-4 bg-gray-50 max-h-[300px] overflow-y-auto space-y-3">
                                            {savedJobDetails.length === 0 ? (
                                                <div className="text-center py-6 text-gray-500">
                                                    <Bookmark className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                                                    <p className="text-sm">No saved jobs yet.</p>
                                                    <Link href="/jobs" className="text-xs text-blue-600 hover:underline mt-1 block">
                                                        Browse available positions
                                                    </Link>
                                                </div>
                                            ) : (
                                                savedJobDetails.map(job => (
                                                    <div key={job.id} className="relative bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-[#193153] transition-colors group">
                                                        <Link href={`/jobs/${job.id}`} className="block pr-6">
                                                            <h4 className="font-bold text-sm text-[#193153] line-clamp-1 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                    <Briefcase className="w-3 h-3" /> {job.department}
                                                                </span>
                                                            </div>
                                                            <div className="mt-2 flex items-center justify-between">
                                                                <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">
                                                                    {job.employmentType}
                                                                </span>
                                                                <span className="text-[10px] text-green-600 font-bold hover:underline">
                                                                    View
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                removeSavedJob(job.id);
                                                            }}
                                                            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                                                            title="Remove bookmark"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {savedJobDetails.length > 0 && (
                                            <div className="p-3 bg-white border-t border-gray-100 text-center">
                                                <Link href="/jobs" className="text-xs font-bold text-[#193153] hover:underline">
                                                    Browse More Jobs
                                                </Link>
                                            </div>
                                        )}
                                    </Card>

                                    {/* Job Recommendations */}
                                    <Card>
                                        <CardHeader>
                                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                                <Bell className="w-4 h-4 text-[#193153]" />
                                                Recommended Jobs
                                            </h3>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                                                <h4 className="font-bold text-sm text-gray-800 group-hover:text-[#193153]">Aviation Mechanic</h4>
                                                <p className="text-xs text-gray-500 mt-1">Engineering • Full-time</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                                                <h4 className="font-bold text-sm text-gray-800 group-hover:text-[#193153]">Ground Instructor</h4>
                                                <p className="text-xs text-gray-500 mt-1">Academics • Contract</p>
                                            </div>
                                            <Link href="/jobs" className="block text-center text-xs font-bold text-[#193153] hover:underline mt-2">
                                                See All
                                            </Link>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>
                        ) : (
                            // --- PROFILE TAB ---
                            <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="w-24 h-24 bg-[#193153] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-gray-100 overflow-hidden">
                                            {profileImage ? (
                                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                                        <p className="text-gray-500 flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4" /> {profileData.email}
                                        </p>
                                        <div className="flex gap-2 mt-3">
                                            {// Toggle between Edit and Save/Cancel
                                                isEditingProfile ? (
                                                    <>
                                                        <Button size="sm" onClick={saveProfile} className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                                                        <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)} className="text-red-500 border-red-200 hover:bg-red-50">Cancel</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button size="sm" variant="outlineDark" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                                                        <Button size="sm" variant="ghost">Change Password</Button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card className="md:col-span-2">
                                        <CardHeader>
                                            <h3 className="font-bold text-[#193153] flex items-center gap-2">
                                                <User className="w-5 h-5" /> Personal Info
                                            </h3>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Name Fields */}
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
                                                    {isEditingProfile ? (
                                                        <input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.lastName}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">First Name</label>
                                                    {isEditingProfile ? (
                                                        <input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.firstName}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Middle Name</label>
                                                    {isEditingProfile ? (
                                                        <input type="text" name="middleName" value={profileData.middleName} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.middleName || '-'}</p>}
                                                </div>

                                                {/* Demographics Row 1 */}
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Extension Name</label>
                                                    {isEditingProfile ? (
                                                        <input type="text" name="extensionName" placeholder="e.g. Jr., III" value={profileData.extensionName} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.extensionName || '-'}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Age</label>
                                                    {isEditingProfile ? (
                                                        <input type="number" name="age" value={profileData.age} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.age || '-'}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Sex</label>
                                                    {isEditingProfile ? (
                                                        <select name="sex" value={profileData.sex} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    ) : <p className="font-medium text-gray-900">{profileData.sex || '-'}</p>}
                                                </div>

                                                {/* Demographics Row 2 */}
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Civil Status</label>
                                                    {isEditingProfile ? (
                                                        <select name="civilStatus" value={profileData.civilStatus} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                                                            <option value="">Select</option>
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Widowed">Widowed</option>
                                                            <option value="Separated">Separated</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    ) : <p className="font-medium text-gray-900">{profileData.civilStatus || '-'}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Religion</label>
                                                    {isEditingProfile ? (
                                                        <input type="text" name="religion" value={profileData.religion} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.religion || '-'}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
                                                    {isEditingProfile ? (
                                                        <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.phone || '-'}</p>}
                                                </div>

                                                {/* Address */}
                                                <div className="md:col-span-3">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Residential Address</label>
                                                    {isEditingProfile ? (
                                                        <textarea name="address" value={profileData.address} onChange={handleProfileChange} rows={2} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" />
                                                    ) : <p className="font-medium text-gray-900">{profileData.address}</p>}
                                                </div>

                                                {/* Additional Demographics */}
                                                <div className="md:col-span-3 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs font-bold text-gray-400 uppercase">IP Group?</label>
                                                        {isEditingProfile ? (
                                                            <select name="ipGroup" value={profileData.ipGroup} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        ) : <p className="font-medium text-gray-900">{profileData.ipGroup || '-'}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-gray-400 uppercase">PWD?</label>
                                                        {isEditingProfile ? (
                                                            <select name="pwd" value={profileData.pwd} onChange={handleProfileChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        ) : <p className="font-medium text-gray-900">{profileData.pwd || '-'}</p>}
                                                    </div>
                                                </div>

                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <h3 className="font-bold text-[#193153] flex items-center gap-2">
                                                <FileText className="w-5 h-5" /> Documents
                                            </h3>
                                        </CardHeader>
                                        <CardContent className="space-y-3 pt-0">
                                            {[
                                                { name: "Letter of Intent", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
                                                { name: "Personal Data Sheet (PDS)", icon: User, color: "text-green-600", bg: "bg-green-100" },
                                                { name: "Work Experience Sheet", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-100" },
                                                { name: "Certificate of Eligibility", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-100" },
                                                { name: "Transcript of Records (TOR)", icon: GraduationCap, color: "text-red-600", bg: "bg-red-100" },
                                                { name: "Training Certificates", icon: FileText, color: "text-teal-600", bg: "bg-teal-100" },
                                                { name: "Performance Rating", icon: FileText, color: "text-yellow-600", bg: "bg-yellow-100" },
                                            ].map((doc, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`${doc.bg} p-2 rounded ${doc.color}`}>
                                                            <doc.icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium">{doc.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* Simulated Upload Logic */}
                                                        {localStorage.getItem(`doc_${doc.name}`) === 'uploaded' ? (
                                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">Uploaded</span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Missing</span>
                                                        )}
                                                        <input
                                                            type="file"
                                                            id={`file-${i}`}
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files?.[0]) {
                                                                    localStorage.setItem(`doc_${doc.name}`, 'uploaded');
                                                                    toast.success(`${doc.name} uploaded successfully!`);
                                                                    // Force re-render trick (in real app, use state)
                                                                    setProfileData({ ...profileData });
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 text-xs hover:bg-blue-50 hover:text-blue-600"
                                                            onClick={() => document.getElementById(`file-${i}`)?.click()}
                                                        >
                                                            Upload
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- CHATBOT --- */}
                <ChatBot />

                {/* --- FOOTER --- */}
                <footer className="bg-[#193153] text-white py-6 border-t border-white/10 mt-12">
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