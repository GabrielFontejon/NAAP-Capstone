import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Shield, Users, LogOut, Search, TrendingUp, Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getApplications } from '@/data/mockData';

export default function ApplicantsManagement({ auth }: { auth: any }) {
    const admin = auth?.user || { name: 'Admin' };
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [campusFilter, setCampusFilter] = useState('all');
    const [applications, setApplications] = useState(getApplications());

    useEffect(() => {
        setApplications(getApplications());

        const handleSync = (e: StorageEvent) => {
            if (e.key === 'mock_applications_custom') {
                setApplications(getApplications());
            }
        };
        window.addEventListener('storage', handleSync);

        return () => window.removeEventListener('storage', handleSync);
    }, []);

    const scoreToPercentage = (score: number) => {
        return Math.round((score / 45) * 100);
    };

    const getScoreRating = (score: number) => {
        const percentage = scoreToPercentage(score);
        if (percentage >= 90) return { label: 'Excellent', color: 'green' };
        if (percentage >= 80) return { label: 'Very Good', color: 'blue' };
        if (percentage >= 70) return { label: 'Good', color: 'cyan' };
        if (percentage >= 60) return { label: 'Satisfactory', color: 'yellow' };
        return { label: 'Needs Improvement', color: 'red' };
    };

    const getAiMatch = (score: number) => {
        const percentage = scoreToPercentage(score);
        if (percentage >= 80) return 'High Match';
        if (percentage >= 50) return 'Medium Match';
        return 'Low Match';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Hired': return 'bg-green-100 text-green-800';
            case 'Shortlisted': return 'bg-blue-100 text-blue-800';
            case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesCampus = campusFilter === 'all' || app.campus === campusFilter;
        return matchesSearch && matchesStatus && matchesCampus;
    });

    const campuses = ['All Campuses', 'Manila', 'Cebu', 'Davao', 'Clark'];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <nav className="bg-[#193153] text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/10 p-2 rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                                <img src="/images/PhilSCA_Logo.png" alt="NAAP Logo" className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <Link href="/admin/dashboard" className="hover:text-blue-200 transition-colors">
                                    <span className="font-bold text-lg block leading-none">NAAP HR Admin</span>
                                    <span className="text-[10px] text-blue-200 uppercase tracking-widest">Applicants Management</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                className="text-white hover:bg-white/10 hover:text-red-300"
                                onClick={() => router.post('/logout')}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 flex-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#193153]">
                            <Users className="inline-block w-6 h-6 mr-2" />
                            Applicants Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    placeholder="Search applicants..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Submitted">Submitted</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="Hired">Hired</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={campusFilter} onValueChange={setCampusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by campus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Campuses</SelectItem>
                                    {campuses.slice(1).map(campus => (
                                        <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Applicants Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Applicant</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Campus</TableHead>
                                        <TableHead>AI Score</TableHead>
                                        <TableHead>Breakdown</TableHead>
                                        <TableHead>Match</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplications.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                                                No applicants found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredApplications.map((app) => (
                                            <TableRow key={app.id}>
                                                <TableCell className="font-medium">{app.applicantName}</TableCell>
                                                <TableCell>{app.jobTitle}</TableCell>
                                                <TableCell>{app.campus}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${Math.min(scoreToPercentage(app.aiScore || 0), 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-semibold">{app.aiScore || 0}/45</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                                View
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle className="flex items-center gap-2">
                                                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                                                    Score Breakdown - {app.applicantName}
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <div className="space-y-4 pb-4">
                                                                {(() => {
                                                                    const breakdown = app.aiScoreBreakdown || {
                                                                        education: 0,
                                                                        experience: 0,
                                                                        accomplishments: 0,
                                                                        training: 0
                                                                    };
                                                                    const totalScore = app.aiScore || 0;

                                                                    return (
                                                                        <>
                                                                            {/* Overall Score */}
                                                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                                                                <div className="flex items-center justify-between mb-2">
                                                                                    <span className="text-sm font-medium text-gray-700">Total Score</span>
                                                                                    <span className="text-2xl font-bold text-[#193153]">
                                                                                        {totalScore} <span className="text-sm text-gray-500">/ 45</span>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                                                                    <div
                                                                                        className={`h-3 rounded-full ${scoreToPercentage(totalScore) >= 90 ? 'bg-green-500' :
                                                                                            scoreToPercentage(totalScore) >= 80 ? 'bg-blue-500' :
                                                                                                scoreToPercentage(totalScore) >= 70 ? 'bg-cyan-500' :
                                                                                                    scoreToPercentage(totalScore) >= 60 ? 'bg-yellow-500' :
                                                                                                        'bg-red-500'
                                                                                            }`}
                                                                                        style={{ width: `${Math.min(scoreToPercentage(totalScore), 100)}%` }}
                                                                                    />
                                                                                </div>
                                                                                <div className="flex items-center justify-between">
                                                                                    <span className="text-sm text-gray-600">{scoreToPercentage(totalScore)}% Match</span>
                                                                                    <Badge className={
                                                                                        getScoreRating(totalScore).color === 'green' ? 'bg-green-100 text-green-800' :
                                                                                            getScoreRating(totalScore).color === 'blue' ? 'bg-blue-100 text-blue-800' :
                                                                                                getScoreRating(totalScore).color === 'cyan' ? 'bg-cyan-100 text-cyan-800' :
                                                                                                    getScoreRating(totalScore).color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                                                                        'bg-red-100 text-red-800'
                                                                                    }>
                                                                                        {getScoreRating(totalScore).label}
                                                                                    </Badge>
                                                                                </div>
                                                                            </div>

                                                                            {/* Components Breakdown */}
                                                                            <div className="space-y-3">
                                                                                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Score Components</p>

                                                                                {/* Education */}
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                                                        <GraduationCap className="w-4 h-4 text-purple-600" />
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-1">
                                                                                            <span className="text-sm font-medium">Education</span>
                                                                                            <span className="text-sm font-bold">{breakdown.education}/5</span>
                                                                                        </div>
                                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                                                                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(breakdown.education / 5) * 100}%` }} />
                                                                                        </div>
                                                                                        {app.educationLevel ? (
                                                                                            <p className="text-xs text-gray-600 mt-1">
                                                                                                <span className="font-medium">Level:</span> {
                                                                                                    app.educationLevel === 'bachelor' ? "Bachelor's Degree" :
                                                                                                        app.educationLevel === 'masters' ? "Master's Degree" :
                                                                                                            app.educationLevel === 'doctoral_9-15' ? "Doctoral (9-15 units)" :
                                                                                                                app.educationLevel === 'doctoral_15-18' ? "Doctoral (15-18 units)" :
                                                                                                                    app.educationLevel === 'doctoral_18-24' ? "Doctoral (18-24 units)" :
                                                                                                                        app.educationLevel === 'doctoral_27+' ? "Doctoral (27+ units)" :
                                                                                                                            app.educationLevel === 'doctoral_graduate' ? "Doctoral Graduate" :
                                                                                                                                app.educationLevel
                                                                                                }
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className="text-xs text-gray-400 italic mt-1">Data not available</p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Experience */}
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                                                        <Briefcase className="w-4 h-4 text-blue-600" />
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-1">
                                                                                            <span className="text-sm font-medium">Work Experience</span>
                                                                                            <span className="text-sm font-bold">{breakdown.experience}/25</span>
                                                                                        </div>
                                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                                                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(breakdown.experience / 25) * 100}%` }} />
                                                                                        </div>
                                                                                        {app.yearsOfExperience !== undefined ? (
                                                                                            <p className="text-xs text-gray-600 mt-1">
                                                                                                <span className="font-medium">Years:</span> {app.yearsOfExperience} years
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className="text-xs text-gray-400 italic mt-1">Data not available</p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Awards */}
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                                                                        <Award className="w-4 h-4 text-yellow-600" />
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-1">
                                                                                            <span className="text-sm font-medium">Awards & Recognition</span>
                                                                                            <span className="text-sm font-bold">{breakdown.accomplishments}/5</span>
                                                                                        </div>
                                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                                                                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(breakdown.accomplishments / 5) * 100}%` }} />
                                                                                        </div>
                                                                                        {app.awards && app.awards.length > 0 ? (
                                                                                            <p className="text-xs text-gray-600 mt-1">
                                                                                                <span className="font-medium">Received:</span> {app.awards.map((award: string) =>
                                                                                                    award === 'national' ? 'National Award' :
                                                                                                        award === 'csc' ? 'CSC Award' :
                                                                                                            award === 'president' ? "President's Award" :
                                                                                                                award === 'ngo' ? 'NGO Award' : award
                                                                                                ).join(', ')}
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className="text-xs text-gray-500 mt-1">No awards listed</p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Training */}
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                                                        <BookOpen className="w-4 h-4 text-green-600" />
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-1">
                                                                                            <span className="text-sm font-medium">Training Hours</span>
                                                                                            <span className="text-sm font-bold">{breakdown.training}/10</span>
                                                                                        </div>
                                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                                                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(breakdown.training / 10) * 100}%` }} />
                                                                                        </div>
                                                                                        {app.trainingHours !== undefined ? (
                                                                                            <p className="text-xs text-gray-600 mt-1">
                                                                                                <span className="font-medium">Hours:</span> {app.trainingHours} hours
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className="text-xs text-gray-400 italic mt-1">Data not available</p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {getAiMatch(app.aiScore || 0)}
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
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            Showing {filteredApplications.length} of {applications.length} applicants
                        </div>
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
        </div>
    );
}
