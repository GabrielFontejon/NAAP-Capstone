import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Search, Filter, MapPin, Briefcase, Clock, ArrowLeft, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockJobs, getJobs, SALARY_GRADE_MAP } from '@/data/mockData';

interface JobIndexProps {
    auth: {
        user: any;
    };
}

export default function JobListings({ auth }: JobIndexProps) {
    const user = auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        setJobs(getJobs());

        const handleSync = (e: StorageEvent) => {
            if (e.key === 'mock_jobs_custom') {
                setJobs(getJobs());
            }
        };
        window.addEventListener('storage', handleSync);
        return () => window.removeEventListener('storage', handleSync);
    }, []);

    const departments = Array.from(new Set(jobs.map(j => j.department)));
    const employmentTypes = Array.from(new Set(jobs.map(j => j.employmentType)));

    const locations = Array.from(new Set(jobs.map(j => j.location).filter(Boolean)));


    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [employmentFilter, setEmploymentFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('all');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
        const matchesEmployment = employmentFilter === 'all' || job.employmentType === employmentFilter;
        const matchesLocation = locationFilter === 'all' || job.location === locationFilter;

        return matchesSearch && matchesDepartment && matchesEmployment && matchesLocation && job.status === 'Open';
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#193153] text-white py-8">
                <div className="container mx-auto px-4">
                    {/* Navigation Bar */}
                    <div className="flex justify-between items-center mb-6">
                        <Link href="/">
                            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">

                                <Link href="/dashboard" className="flex items-center gap-3 pl-4 border-l border-white/20 group hover:bg-white/10 rounded-full py-1 pr-4 transition-all">
                                    <div className="w-8 h-8 rounded-full bg-[#ffdd59] flex items-center justify-center text-[#193153] font-bold text-xs overflow-hidden border border-white group-hover:scale-105 transition-transform">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium hidden sm:block group-hover:text-[#ffdd59] transition-colors">{user.name}</span>
                                </Link>
                                <Button onClick={handleLogout} size="sm" variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59] p-2">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-white hover:text-[#ffdd59]">
                                        Login/Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold mb-2">Career Opportunities</h1>
                    <p className="text-blue-200">Explore open positions at NAAP</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search and Filters */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by job title, department, or keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={employmentFilter} onValueChange={setEmploymentFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    {employmentTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Updated Location Filter */}
                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    {locations.map(loc => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">{filteredJobs.length}</span> positions found
                    </p>
                    <div className="flex items-center text-gray-600">
                        <Filter className="h-4 w-4 mr-2" />
                        {(departmentFilter !== 'all' || employmentFilter !== 'all' || locationFilter !== 'all' || searchTerm) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm('');
                                    setDepartmentFilter('all');
                                    setEmploymentFilter('all');
                                    setLocationFilter('all'); // Clear location filter
                                }}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                    {filteredJobs.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <p className="text-gray-500 text-lg">No positions match your search criteria.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setDepartmentFilter('all');
                                        setEmploymentFilter('all');
                                        setLocationFilter('all'); // Clear all filters
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredJobs.map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-[#193153] mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-3 mb-3">
                                                <div className="flex items-center text-gray-600">
                                                    <Briefcase className="h-4 w-4 mr-1" />
                                                    {job.department}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    Posted {new Date(job.postedDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                {job.employmentType}
                                            </Badge>
                                            {job.salaryGrade && (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    SG {job.salaryGrade}: ₱{SALARY_GRADE_MAP[job.salaryGrade]?.toLocaleString()}
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge variant="outline" className="ml-4">
                                            {job.applicantCount} applicants
                                        </Badge>
                                    </div>
                                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            Deadline: {new Date(job.deadline).toLocaleDateString()}
                                        </p>
                                        <Link href={`/jobs/${job.id}`}>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}