import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Shield, Users, LogOut, Search, Download, Star, Calendar, Eye, Edit, Trash, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockApplications, mockInterviews, getApplications } from '@/data/mockData';

export default function Applicants({ auth }: { auth: any }) {
    const admin = auth?.user || { name: 'Admin' };
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [aiMatchFilter, setAiMatchFilter] = useState('all');
    const [campusFilter, setCampusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [applications, setApplications] = useState(getApplications()); // Use dynamic data

    useEffect(() => {
        setApplications(getApplications());

        const handleSync = (e: StorageEvent) => {
            if (e.key === 'mock_applications_custom') {
                setApplications(getApplications());
            }
        };
        window.addEventListener('storage', handleSync);

        const params = new URLSearchParams(window.location.search);
        const statusParam = params.get('status');
        if (statusParam) {
            setStatusFilter(statusParam);
        }

        const campusParam = params.get('campus');
        if (campusParam) {
            setCampusFilter(campusParam);
        }

        return () => window.removeEventListener('storage', handleSync);
    }, []);

    // Interview Booking State
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewTime, setInterviewTime] = useState('');
    const [panelMembers, setPanelMembers] = useState('');
    const [venue, setVenue] = useState('');
    const [notifyApplicant, setNotifyApplicant] = useState(false);
    const [resultNotes, setResultNotes] = useState('');

    // State to hold scheduled interviews - Initialize with Mock Data
    const [scheduledInterviews, setScheduledInterviews] = useState<any[]>(mockInterviews.map(m => ({
        ...m,
        venue: m.type,
        panelMembers: 'HR Panel',
        notifyApplicant: true
    })));
    const [editingInterviewIndex, setEditingInterviewIndex] = useState<number | null>(null);
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

    // View Interview State
    const [viewingInterview, setViewingInterview] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Collapsible State
    const [showInterviews, setShowInterviews] = useState(true);

    const handleLogout = () => {
        router.post('/logout');
    };

    const getAiMatch = (score: number) => {
        if (score >= 80) return 'High Match';
        if (score >= 50) return 'Medium Match';
        return 'Low Match';
    };

    const getMatchIcon = (match: string) => {
        if (match === 'High Match') return <span className="text-green-600">↑</span>;
        if (match === 'Medium Match') return <span className="text-yellow-600">→</span>;
        return <span className="text-red-600">↓</span>;
    };

    const getMatchColor = (match: string) => {
        if (match === 'High Match') return 'bg-green-100 text-green-800';
        if (match === 'Medium Match') return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-100 text-blue-800';
            case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'Shortlisted': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Hired': return 'bg-green-200 text-green-900';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const statuses = ['Submitted', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'];
    const campuses = Array.from(new Set(applications.map(app => app.campus).filter(Boolean)));

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesAiMatch = aiMatchFilter === 'all' || getAiMatch(app.aiScore) === aiMatchFilter;
        const matchesCampus = campusFilter === 'all' || app.campus === campusFilter;

        return matchesSearch && matchesStatus && matchesAiMatch && matchesCampus;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        } else if (sortBy === 'score') {
            return b.aiScore - a.aiScore;
        }
        return 0;
    });

    const handleScheduleInterview = () => {
        if (!interviewDate || !interviewTime || !venue) {
            toast.error("Please fill in Date, Time, and Venue.");
            return;
        }

        const interviewData = {
            date: interviewDate,
            time: interviewTime,
            panelMembers,
            venue,
            notifyApplicant,
            resultNotes
        };

        if (editingInterviewIndex !== null) {
            // Update existing
            const updated = [...scheduledInterviews];
            updated[editingInterviewIndex] = interviewData;
            setScheduledInterviews(updated);
            toast.success("Interview updated!");
        } else {
            // Create new
            setScheduledInterviews([...scheduledInterviews, interviewData]);
            toast.success("Interview scheduled successfully!");
        }

        // Reset and Close
        resetInterviewForm();
        setIsInterviewModalOpen(false);
    };

    const resetInterviewForm = () => {
        setInterviewDate('');
        setInterviewTime('');
        setPanelMembers('');
        setVenue('');
        setNotifyApplicant(false);
        setResultNotes('');
        setEditingInterviewIndex(null);
    };

    const handleEditInterview = (index: number) => {
        const interview = scheduledInterviews[index];
        setInterviewDate(interview.date);
        setInterviewTime(interview.time);
        setPanelMembers(interview.panelMembers);
        setVenue(interview.venue);
        setNotifyApplicant(interview.notifyApplicant);
        setResultNotes(interview.resultNotes);
        setEditingInterviewIndex(index);
        setIsInterviewModalOpen(true);
    };

    const handleStatusUpdate = (id: number, newStatus: string) => {
        const updatedApps = applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApps);

        // Persist status change to localStorage
        const localApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');
        const exists = localApps.some((app: any) => app.id === id);

        let updatedLocalApps;
        if (exists) {
            updatedLocalApps = localApps.map((app: any) =>
                app.id === id ? { ...app, status: newStatus } : app
            );
        } else {
            // Find the original app and add it to local storage with new status
            const originalApp = applications.find(app => app.id === id);
            updatedLocalApps = [...localApps, { ...originalApp, status: newStatus }];
        }

        localStorage.setItem('mock_applications_custom', JSON.stringify(updatedLocalApps));
        toast.success(`Applicant status updated to: ${newStatus}`);
    };

    const handleDeleteInterview = (index: number) => {
        const updatedInterviews = scheduledInterviews.filter((_, i) => i !== index);
        setScheduledInterviews(updatedInterviews);
    };

    const handleViewInterview = (index: number) => {
        const interview = scheduledInterviews[index];
        setViewingInterview(interview);
        setIsViewModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <nav className="bg-[#193153] text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/10 p-2 rounded-full h-10 w-10 flex items-center justify-center overflow-hidden">
                                <img src="/images/PhilSCA_Logo.png" alt="NAAP Logo" className="h-full w-full object-contain" />
                            </div>
                            <span className="font-bold text-lg">NAAP HR Admin</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/admin/jobs">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    Jobs
                                </Button>
                            </Link>
                            <Link href="/admin/staffing">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    Staffing
                                </Button>
                            </Link>

                            <div className="h-6 w-px bg-white/20 hidden md:block"></div>

                            {/* Admin User Info */}
                            <div className="hidden md:flex items-center gap-2 px-2 border-l border-white/10 ml-2">
                                <div className="w-8 h-8 rounded-full bg-[#ffdd59] flex items-center justify-center text-[#193153] font-bold text-xs ring-2 ring-white/10">
                                    {admin.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-blue-100">{admin.name}</span>
                            </div>

                            <Button
                                variant="ghost"
                                className="text-white hover:bg-red-500/20 hover:text-red-300"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicants Overview</h1>
                    <p className="text-gray-600">Reviewing applicants as <span className="text-[#193153] font-bold">{admin.name}</span></p>
                </div>
                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by name or position..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="Submitted">Submitted</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                    <SelectItem value="Hired">Hired</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={campusFilter} onValueChange={setCampusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Campuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Campuses</SelectItem>
                                    {campuses.map(campus => (
                                        <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={aiMatchFilter} onValueChange={setAiMatchFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="AI Match" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Matches</SelectItem>
                                    <SelectItem value="High Match">High Match</SelectItem>
                                    <SelectItem value="Medium Match">Medium Match</SelectItem>
                                    <SelectItem value="Low Match">Low Match</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Latest First</SelectItem>
                                    <SelectItem value="score">Highest Score</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="mb-6 bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-center mb-2">
                            <Star className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="font-semibold text-blue-900">AI-Powered Insights</h3>
                        </div>
                        <p className="text-sm text-blue-800 mb-4">
                            Applications are automatically ranked based on job requirements, skills match, and experience.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {filteredApplications.filter(a => getAiMatch(a.aiScore) === 'High Match').length}
                                </p>
                                <p className="text-sm text-gray-600">High Match</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {filteredApplications.filter(a => getAiMatch(a.aiScore) === 'Medium Match').length}
                                </p>
                                <p className="text-sm text-gray-600">Medium Match</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-red-600">
                                    {filteredApplications.filter(a => getAiMatch(a.aiScore) === 'Low Match').length}
                                </p>
                                <p className="text-sm text-gray-600">Low Match</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applicants Table */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">{filteredApplications.length}</span> applicants found
                            </p>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export to CSV
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Applicant</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Campus</TableHead>
                                        <TableHead>AI Score</TableHead>
                                        <TableHead>Match</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplications.map((app) => (
                                        <TableRow key={app.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{app.applicantName}</p>
                                                    <p className="text-sm text-gray-500">{app.email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{app.jobTitle}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[10px] font-semibold bg-gray-50 border-gray-200">
                                                    {app.campus ? app.campus.replace('NAAP - ', '') : 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div
                                                            className={`h-2 rounded-full ${app.aiScore >= 80 ? 'bg-green-500' :
                                                                app.aiScore >= 50 ? 'bg-yellow-500' :
                                                                    'bg-red-500'
                                                                }`}
                                                            style={{ width: `${app.aiScore}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold">{app.aiScore}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={getMatchColor(getAiMatch(app.aiScore))}>
                                                    <span className="flex items-center">
                                                        {getMatchIcon(getAiMatch(app.aiScore))}
                                                        <span className="ml-1">{getAiMatch(app.aiScore)}</span>
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(app.status)}>
                                                    {app.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(app.submittedDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">View</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Applicant Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Application Information</h4>
                                                                <p><strong>Position:</strong> {app.jobTitle}</p>
                                                                <p><strong>Campus:</strong> {app.campus}</p>
                                                                <p><strong>Date Applied:</strong> {new Date(app.submittedDate).toLocaleDateString()}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Personal Information</h4>
                                                                <p><strong>Name:</strong> {app.applicantName}</p>
                                                                <p><strong>Email:</strong> {app.email}</p>
                                                                <p><strong>Phone:</strong> {app.phone}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Education</h4>
                                                                <p>{app.education}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Experience</h4>
                                                                <p>{app.experience}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Skills</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {app.skills.map((skill: string, i: number) => (
                                                                        <Badge key={i} variant="secondary">{skill}</Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">AI Analysis</h4>
                                                                <div className="bg-blue-50 p-4 rounded">
                                                                    <p className="text-sm mb-2">Match Score: <strong>{app.aiScore}%</strong></p>
                                                                    <p className="text-sm mb-2">Classification: <strong>{getAiMatch(app.aiScore)}</strong></p>
                                                                    <p className="text-sm text-gray-600">
                                                                        This candidate has been automatically evaluated based on job requirements,
                                                                        skills alignment, and experience level.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                                                                    onClick={() => {
                                                                        handleStatusUpdate(app.id, 'Shortlisted');
                                                                        // Optionally open interview modal here too
                                                                    }}
                                                                >
                                                                    Shortlist
                                                                </Button>
                                                                <Button
                                                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                                                    onClick={() => handleStatusUpdate(app.id, 'Hired')}
                                                                >
                                                                    Hire
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    className="flex-1"
                                                                    onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Interview Scheduling Module */}
                <Dialog open={isInterviewModalOpen} onOpenChange={setIsInterviewModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mt-4" onClick={() => resetInterviewForm()}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{editingInterviewIndex !== null ? "Edit Interview" : "Schedule Interview"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                type="date"
                                placeholder="Interview Date"
                                value={interviewDate}
                                onChange={(e) => setInterviewDate(e.target.value)}
                            />
                            <Input
                                type="time"
                                placeholder="Interview Time"
                                value={interviewTime}
                                onChange={(e) => setInterviewTime(e.target.value)}
                            />
                            <Input
                                placeholder="Panel Members"
                                value={panelMembers}
                                onChange={(e) => setPanelMembers(e.target.value)}
                            />
                            <Input
                                placeholder="Venue / Online Link"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={notifyApplicant}
                                        onChange={() => setNotifyApplicant(!notifyApplicant)}
                                        className="mr-2"
                                    />
                                    Notify Applicant
                                </label>
                            </div>
                            <Input
                                placeholder="Interview Result Notes"
                                value={resultNotes}
                                onChange={(e) => setResultNotes(e.target.value)}
                            />

                            <div className="flex justify-end">
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={handleScheduleInterview}
                                >
                                    {editingInterviewIndex !== null ? "Update Schedule" : "Schedule"}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>

                </Dialog>

                {/* View Interview Details Dialog */}
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Interview Details</DialogTitle>
                        </DialogHeader>
                        {viewingInterview && (
                            <div className="space-y-4">
                                <div className="border-b pb-3">
                                    <p className="text-sm text-gray-500 uppercase tracking-wide">Candidate</p>
                                    <p className="text-lg font-bold text-[#193153]">{viewingInterview.candidateName || 'N/A'}</p>
                                    <p className="text-sm text-gray-600">{viewingInterview.position || 'N/A'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{new Date(viewingInterview.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{viewingInterview.time}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Venue / Platform</p>
                                    <p className="font-medium">{viewingInterview.venue}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Panel Members</p>
                                    <p className="font-medium">{viewingInterview.panelMembers || 'Not assigned'}</p>
                                </div>
                                {viewingInterview.resultNotes && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <p className="text-sm text-gray-500 mb-1">Notes</p>
                                        <p className="text-sm text-gray-700">{viewingInterview.resultNotes}</p>
                                    </div>
                                )}
                                <div className="flex justify-end pt-2">
                                    <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
                {/* Scheduled Interviews Section */}
                <Card className="mt-6">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowInterviews(!showInterviews)}>
                            <h2 className="text-xl font-bold">Scheduled Interviews</h2>
                            <Button variant="ghost" size="sm">
                                {showInterviews ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </Button>
                        </div>

                        {showInterviews && (
                            <ul className="divide-y divide-gray-200">
                                {scheduledInterviews.length === 0 ? (
                                    <li className="py-4 text-gray-500 text-center italic">No scheduled interviews.</li>
                                ) : (
                                    scheduledInterviews.map((interview, index) => (
                                        <li key={index} className="py-4 flex justify-between items-start">
                                            <div>
                                                {interview.candidateName && (
                                                    <p className="text-lg font-semibold text-[#193153]">{interview.candidateName}</p>
                                                )}
                                                {interview.position && (
                                                    <p className="text-sm text-gray-600 mb-2">{interview.position}</p>
                                                )}
                                                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                                                    <p><strong className="font-medium">Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                                                    <p><strong className="font-medium">Time:</strong> {interview.time}</p>
                                                    <p><strong className="font-medium">Panel:</strong> {interview.panelMembers}</p>
                                                    <p><strong className="font-medium">Venue:</strong> {interview.venue}</p>
                                                </div>
                                                {interview.notifyApplicant && <span className="text-green-600 text-xs font-bold mt-1 block">✓ Applicant notified</span>}
                                                {interview.resultNotes && <p className="mt-2 text-sm bg-gray-50 p-2 rounded"><strong>Notes:</strong> {interview.resultNotes}</p>}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditInterview(index)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteInterview(index)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewInterview(index)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                    </CardContent>
                </Card>
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
        </div >
    );
}
