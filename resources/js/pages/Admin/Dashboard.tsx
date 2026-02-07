import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Users, Briefcase, FileText, Award, LogOut, Shield, TrendingUp, UserCheck, UserX, MapPin, Menu, Calendar, Clock, ChevronRight, Download, XCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/broken-card-path';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    Legend,
    CartesianGrid,
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getAnalyticsData, mockInterviews, mockActivities, getStaffingData } from '@/data/mockData';

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState(getAnalyticsData());
    // Runtime Error: calling a method that doesn't exist on analytics
    analytics.calculateEverything();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // Initial load and sync
    React.useEffect(() => {
        const handleSync = () => setAnalytics(getAnalyticsData());
        window.addEventListener('storage', handleSync);
        // Also refresh on mount in case things changed
        handleSync();
        return () => window.removeEventListener('storage', handleSync);
    }, []);

    const [reportType, setReportType] = useState('applicants');
    const [dateRange, setDateRange] = useState('month');

    const handleGenerateReport = () => {
        // Simulate report generation
        setIsReportModalOpen(false);
        // You would typically trigger a download here
        console.log(`Generating ${reportType} report for ${dateRange}`);
        // Maybe show a toast notification here in a real app
    };

    const handleLogout = () => {
        router.post('/logout')
    };

    const COLORS = ['#3b82f6', '#eab308', '#22c55e', '#ef4444', '#10b981'];

    // List of NAAP campuses
    const campuses = [
        "NAAP - Villamor Campus",
        "NAAP - Basa Air Base Campus",
        "NAAP - Basa-Palmayo Extension Campus",
        "NAAP - Fernando Air Base Campus",
        "NAAP - Mactan Campus",
        "NAAP - Mactan-Medellin Extension Campus"
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <nav className="bg-[#193153] text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/10 p-2 rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                                <img src="/images/logo.png" alt="NAAP Logo" className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <span className="font-bold text-lg block leading-none">NAAP HR Admin</span>
                                <span className="text-[10px] text-blue-200 uppercase tracking-widest">Portal</span>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/admin/jobs">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Jobs
                                </Button>
                            </Link>
                            <Link href="/admin/applicants">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Users className="h-4 w-4 mr-2" />
                                    Applicants
                                </Button>
                            </Link>
                            <Link href="/admin/staffing">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Staffing
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20"></div>
                            <Button
                                variant="ghost"
                                className="text-white hover:bg-red-500/20 hover:text-red-300"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Title */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-bold text-[#193153] mb-2">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back, Admin. Here is the latest summary of recruitment activities.</p>
                </div>

                {/* Overview Cards Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Total Applicants Card */}
                    <Link href="/admin/applicants">
                        <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sky-100 mb-1 text-sm font-medium uppercase tracking-wider">Total Applicants</p>
                                        <p className="text-3xl font-bold">{analytics.totalApplicants}</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <Users className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Open Positions Card */}
                    <Link href="/admin/jobs">
                        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-emerald-100 mb-1 text-sm font-medium uppercase tracking-wider">Open Positions</p>
                                        <p className="text-3xl font-bold">{analytics.openPositions}</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <Briefcase className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Pending Applications Card */}
                    <Link href="/admin/applicants?status=Under Review">
                        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-amber-100 mb-1 text-sm font-medium uppercase tracking-wider">Pending Review</p>
                                        <p className="text-3xl font-bold">{analytics.pendingApplications}</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <FileText className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Shortlisted Candidates Card */}
                    <Link href="/admin/applicants?status=Shortlisted">
                        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-indigo-100 mb-1 text-sm font-medium uppercase tracking-wider">Shortlisted</p>
                                        <p className="text-3xl font-bold">{analytics.shortlistedCandidates}</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <Award className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Overview Cards Row 2 (Smaller) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {/* Hired Candidates Card */}
                    <Card className="bg-white border-l-4 border-green-500 shadow-sm">
                        <CardContent className="p-4 flex items-center justify-between h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <UserCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase">Hired Candidates</p>
                                    <p className="text-2xl font-bold text-gray-800">{analytics.applicationsByStatus.find(status => status.name === 'Hired')?.value || 0}</p>
                                </div>
                            </div>
                            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-bold">+2 this month</div>
                        </CardContent>
                    </Card>

                    {/* Rejected Candidates Card */}
                    <Card className="bg-white border-l-4 border-red-500 shadow-sm">
                        <CardContent className="p-4 flex items-center justify-between h-full">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                    <UserX className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase">Rejected Applications</p>
                                    <p className="text-2xl font-bold text-gray-800">{analytics.rejectedApplications || 0}</p>
                                </div>
                            </div>
                            <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded font-bold">+5 this month</div>
                        </CardContent>
                    </Card>

                    {/* Staffing Summary Card */}
                    <Link href="/admin/staffing">
                        <Card className="bg-white border-l-4 border-amber-400 shadow-sm cursor-pointer hover:bg-amber-50/30 transition-colors">
                            <CardContent className="p-4 flex items-center justify-between h-full">
                                <div className="flex items-center gap-4">
                                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs font-bold uppercase">Unfilled Positions</p>
                                        <p className="text-2xl font-bold text-gray-800">{getStaffingData().filter((i: any) => i.status === 'Unfilled').length}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded font-bold tracking-tight">Staffing Gap</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN: Charts (3/4 width) */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Monthly Trends Chart */}
                        <Card className="shadow-md">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                                <CardTitle className="flex items-center text-[#193153]">
                                    <TrendingUp className="h-5 w-5 mr-2 text-[#ffdd59]" />
                                    Monthly Application Trends
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={analytics.monthlyTrends}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="applications"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                            activeDot={{ r: 6 }}
                                            name="Applications"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Applicants per Position Bar Chart */}
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base text-gray-700">Applicants per Position</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={analytics.applicantsPerPosition} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="position" type="category" width={120} tick={{ fontSize: 12 }} interval={0} />
                                            <Tooltip cursor={{ fill: 'transparent' }} />
                                            <Bar dataKey="applicants" fill="#193153" radius={[0, 4, 4, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Hiring Timeline Line Chart */}
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base text-gray-700">Time to Hire (Days)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={analytics.hiringTimeline}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="daysToHire" stroke="#eab308" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Application Status Distribution Pie Chart */}
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base text-gray-700">Application Status Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={analytics.applicationsByStatus}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                                label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : '0%'}
                                            >
                                                {analytics.applicationsByStatus.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend
                                                layout="vertical"
                                                verticalAlign="middle"
                                                align="left"
                                                formatter={(value) => {
                                                    return <span className="text-sm font-medium text-gray-700 ml-2">{value}</span>;
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Monthly / Annual Hiring Summary Line Chart */}
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base text-gray-700">Hired vs Rejected</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={analytics.hiringSummary}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="hired" stroke="#22c55e" strokeWidth={2} dot={false} name="Hired" />
                                            <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={false} name="Rejected" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (1/4 width) */}
                    <div className="space-y-6">

                        {/* Recent Activity Feed */}
                        <Card className="shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-gray-700 flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {mockActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className={`p-2 rounded-full ${activity.color} bg-opacity-20 mt-1`}>
                                            {activity.icon === 'UserPlus' && <UserPlus className="w-3 h-3" />}
                                            {activity.icon === 'Briefcase' && <Briefcase className="w-3 h-3" />}
                                            {activity.icon === 'Calendar' && <Calendar className="w-3 h-3" />}
                                            {activity.icon === 'XCircle' && <XCircle className="w-3 h-3" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                            <p className="text-xs text-gray-500 line-clamp-2">{activity.details}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Upcoming Interviews */}
                        <Card className="shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-gray-700 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                    Upcoming Interviews
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {mockInterviews.map((interview) => (
                                    <div key={interview.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{interview.candidateName}</p>
                                            <p className="text-xs text-gray-500 truncate">{interview.position}</p>
                                        </div>
                                        <div className="text-right ml-2">
                                            <p className="text-xs font-bold text-gray-700">{new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                            <p className="text-[10px] text-gray-400">{interview.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Link href="/admin/applicants" className="block pt-2">
                                    <Button variant="outline" size="sm" className="w-full text-xs h-8">
                                        View All Interviews <ChevronRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-gray-700">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/admin/jobs?create=true" className="block">
                                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                        <Briefcase className="w-4 h-4 mr-2" /> Post New Job
                                    </Button>
                                </Link>
                                <Link href="/admin/applicants" className="block">
                                    <Button variant="outline" className="w-full justify-start border-[#193153] text-[#193153] hover:bg-[#193153] hover:text-[#ffdd59]">
                                        <UserCheck className="w-4 h-4 mr-2" /> Review Applicants
                                    </Button>
                                </Link>

                                <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-600"
                                        >
                                            <FileText className="w-4 h-4 mr-2" /> Generate Reports
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Generate Analytics Report</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="report-type" className="text-right">
                                                    Type
                                                </Label>
                                                <Select value={reportType} onValueChange={setReportType}>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select report type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="applicants">Applicant Summary</SelectItem>
                                                        <SelectItem value="hiring">Hiring Velocity</SelectItem>
                                                        <SelectItem value="performance">Recruitment Performance</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="date-range" className="text-right">
                                                    Range
                                                </Label>
                                                <Select value={dateRange} onValueChange={setDateRange}>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select date range" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="week">Last 7 Days</SelectItem>
                                                        <SelectItem value="month">Last 30 Days</SelectItem>
                                                        <SelectItem value="quarter">Last Quarter</SelectItem>
                                                        <SelectItem value="year">Year to Date</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="button" onClick={handleGenerateReport} className="bg-[#193153] text-white">
                                                <Download className="mr-2 h-4 w-4" /> Download Report
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>

                        {/* Campus Locations */}
                        <Card className="bg-white shadow-md border-0">
                            <CardHeader className="bg-[#193153] text-white rounded-t-xl py-4">
                                <CardTitle className="text-sm font-bold flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-[#ffdd59]" />
                                    NAAP Campuses
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="flex flex-col divide-y divide-gray-100">
                                    {campuses.map((campus, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600 p-3 hover:bg-gray-50 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                                            <span>{campus}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>

            {/* Footer */}
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
    );
}
