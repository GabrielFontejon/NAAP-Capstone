import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    Users, Briefcase, FileText, Award, LogOut, Shield,
    Search, Filter, MapPin, Plus, ArrowRight, CheckCircle,
    XCircle, AlertCircle, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getStaffingData } from '@/data/mockData';
import { toast } from 'sonner';

export default function StaffingMonitoring() {
    const staffingData = getStaffingData();
    const [searchTerm, setSearchTerm] = useState('');
    const [campusFilter, setCampusFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredData = staffingData.filter(item => {
        const matchesSearch = item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.office.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCampus = campusFilter === 'All' || item.campus === campusFilter;
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchesSearch && matchesCampus && matchesStatus;
    });

    const handleCreateJob = (item: any) => {
        // Redirect to Job Management with pre-filled state
        // In a real Inertia app, you might pass state or use query params
        toast.info(`Preparing job posting for ${item.position}...`);
        setTimeout(() => {
            router.get('/admin/jobs', {
                createFromStaffing: 'true',
                title: item.position,
                department: item.office,
                campus: item.campus
            });
        }, 1000);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const stats = {
        total: staffingData.length,
        filled: staffingData.filter(i => i.status === 'Filled').length,
        unfilled: staffingData.filter(i => i.status === 'Unfilled').length,
        onProcess: staffingData.filter(i => i.status === 'On-process').length,
    };

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
                                <Link href="/admin/dashboard" className="hover:text-blue-200 transition-colors">
                                    <span className="font-bold text-lg block leading-none">NAAP HR Admin</span>
                                    <span className="text-[10px] text-blue-200 uppercase tracking-widest">Portal</span>
                                </Link>
                            </div>
                        </div>

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
                                <Button variant="ghost" className="text-[#ffdd59] bg-white/10">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Staffing
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20"></div>
                            <Button variant="ghost" className="text-white hover:bg-red-500/20 hover:text-red-300" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#193153]">Staffing Monitoring</h1>
                        <p className="text-gray-600">REVISED ORGANIZATION STAFFING STANDARD - PHASE I (As of August 28, 2025)</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm py-1 px-3">
                            Last Sync: August 28, 2025
                        </Badge>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="border-l-4 border-l-blue-500 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Positions</p>
                                    <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Filled</p>
                                    <h3 className="text-2xl font-bold mt-1 text-green-600">{stats.filled}</h3>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-red-500 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Unfilled</p>
                                    <h3 className="text-2xl font-bold mt-1 text-red-600">{stats.unfilled}</h3>
                                </div>
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-yellow-500 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">On-Process</p>
                                    <h3 className="text-2xl font-bold mt-1 text-yellow-600">{stats.onProcess}</h3>
                                </div>
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Table */}
                <Card className="shadow-md border-0 overflow-hidden">
                    <CardHeader className="bg-white border-b px-6 py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search position or office..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <select
                                        className="text-sm border-gray-200 rounded-md py-1.5 focus:ring-blue-500"
                                        value={campusFilter}
                                        onChange={(e) => setCampusFilter(e.target.value)}
                                    >
                                        <option value="All">All Campuses</option>
                                        <option value="Villamor">Villamor Campus</option>
                                        <option value="BAB">BAB Campus</option>
                                        <option value="FAB">FAB Campus</option>
                                        <option value="MBEAB">MBEAB Campus</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    <select
                                        className="text-sm border-gray-200 rounded-md py-1.5 focus:ring-blue-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Filled">Filled</option>
                                        <option value="Unfilled">Unfilled</option>
                                        <option value="On-process">On-process</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold border-b">Campus</th>
                                        <th className="px-6 py-4 font-semibold border-b">Office</th>
                                        <th className="px-6 py-4 font-semibold border-b">Position</th>
                                        <th className="px-6 py-4 font-semibold border-b">SG</th>
                                        <th className="px-6 py-4 font-semibold border-b">Status</th>
                                        <th className="px-6 py-4 font-semibold border-b text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">
                                                        {item.campus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.office}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{item.position}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">SG {item.sg}</td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        className={`text-[10px] ${item.status === 'Filled' ? 'bg-green-100 text-green-700 hover:bg-green-100/80' :
                                                                item.status === 'Unfilled' ? 'bg-red-100 text-red-700 hover:bg-red-100/80' :
                                                                    'bg-yellow-100 text-yellow-700 hover:bg-yellow-100/80'
                                                            }`}
                                                        variant="outline"
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {item.status === 'Unfilled' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                                                            onClick={() => handleCreateJob(item)}
                                                        >
                                                            <Plus className="w-3 h-3 mr-1" /> Post Job
                                                        </Button>
                                                    )}
                                                    {item.status === 'Filled' && (
                                                        <span className="text-xs text-gray-400">---</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                No staffing items found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
