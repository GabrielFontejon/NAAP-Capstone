import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Shield, LogOut, Plus, Edit, Archive, Eye, Users, Briefcase, Layout, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockJobs, getJobs, SALARY_GRADE_MAP } from '@/data/mockData';

export default function JobManagement({ auth }: { auth: any }) {
  const admin = auth?.user || { name: 'Admin' };
  const [jobs, setJobs] = useState<any[]>([]);

  // Initial load
  useEffect(() => {
    setJobs(getJobs());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mock_jobs_custom') {
        setJobs(getJobs());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('create') === 'true' || params.get('createFromStaffing') === 'true') {
      if (params.get('createFromStaffing') === 'true') {
        const title = params.get('title') || '';
        const dept = params.get('department') || '';
        const campus = params.get('campus') || '';

        setNewJob(prev => ({
          ...prev,
          title,
          department: dept,
          location: campus === 'Villamor' ? 'NAAP - Villamor Campus' :
            campus === 'BAB' ? 'NAAP - Basa Air Base Campus' :
              campus === 'FAB' ? 'NAAP - Fernando Air Base Campus' :
                campus === 'MBEAB' ? 'NAAP - Basa-Palmayo Extension Campus' : prev.location
        }));
      }
      setIsCreating(true);
      // Clean up URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }

    const editId = params.get('edit');
    if (editId) {
      const allJobs = getJobs();
      const jobToEdit = allJobs.find((j: any) => String(j.id) === String(editId));
      if (jobToEdit) {
        // We need to wait a tick or call handleEdit directly, but handleEdit relies on state defined below?
        // Actually, handleEdit is defined below this useEffect. We should move this logic or duplicated it.
        // It is safer to duplicate the setting logic here to avoid hoisting issues dependent on definition order 
        // or simply move the useEffect to after handleEdit definition.
        // However, React function components hoist standard function definitions but consts are not hoisted.
        // Let's just set the state directly here mirroring handleEdit.
        setNewJob({
          title: jobToEdit.title,
          department: jobToEdit.department,
          employmentType: jobToEdit.employmentType,
          location: jobToEdit.location,
          description: jobToEdit.description || '',
          requirements: Array.isArray(jobToEdit.requirements) ? jobToEdit.requirements : [],
          responsibilities: Array.isArray(jobToEdit.responsibilities) ? jobToEdit.responsibilities.join('\n') : (jobToEdit.responsibilities || ''),
          salaryGrade: jobToEdit.salaryGrade || 1,
          deadline: jobToEdit.deadline || '',
          uploads: {
            license: null,
            certificates: null,
            prc: null,
            coe: null,
          }
        });
        setEditingId(jobToEdit.id);
        setIsCreating(true);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    employmentType: 'Full-time',
    location: 'NAAP - Villamor Campus',
    description: '',
    requirements: [] as string[],
    responsibilities: '',
    salaryGrade: 1,
    deadline: '',
    uploads: {
      license: null as File | null,
      certificates: null as File | null,
      prc: null as File | null,
      coe: null as File | null,
    }
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [campusFilter, setCampusFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('all');

  const handleLogout = () => {
    router.post('/logout');
  };

  const handleCreateJob = () => {
    // Basic Validation
    if (!newJob.title || !newJob.department || !newJob.description) {
      toast.error("Please fill in all required fields (Title, Department, Description).");
      return;
    }

    if (editingId) {
      // Update Existing Job
      const updatedJob = {
        ...jobs.find(j => j.id === editingId),
        title: newJob.title,
        department: newJob.department,
        employmentType: newJob.employmentType,
        location: newJob.location,
        description: newJob.description,
        responsibilities: typeof newJob.responsibilities === 'string' ? newJob.responsibilities.split('\n').filter(r => r.trim()) : newJob.responsibilities,
        requirements: newJob.requirements,
        salaryGrade: newJob.salaryGrade,
        deadline: newJob.deadline,
      };

      const localJobs = JSON.parse(localStorage.getItem('mock_jobs_custom') || '[]');
      const exists = localJobs.some((j: any) => j.id === editingId);

      let updatedLocalJobs;
      if (exists) {
        updatedLocalJobs = localJobs.map((j: any) => j.id === editingId ? updatedJob : j);
      } else {
        updatedLocalJobs = [...localJobs, updatedJob];
      }

      localStorage.setItem('mock_jobs_custom', JSON.stringify(updatedLocalJobs));
      setJobs(getJobs());
      toast.success("Job updated successfully!");
    } else {
      // Create New Job
      const job = {
        id: String(Date.now()), // More robust ID generation
        title: newJob.title,
        department: newJob.department,
        employmentType: newJob.employmentType,
        location: newJob.location,
        description: newJob.description,
        responsibilities: typeof newJob.responsibilities === 'string' ? newJob.responsibilities.split('\n').filter(r => r.trim()) : newJob.responsibilities,
        requirements: newJob.requirements,
        salaryGrade: newJob.salaryGrade,
        postedDate: new Date().toISOString().split('T')[0],
        deadline: newJob.deadline,
        applicantCount: 0,
        status: 'Open'
      };

      const localJobs = JSON.parse(localStorage.getItem('mock_jobs_custom') || '[]');
      const updatedLocalJobs = [...localJobs, job];
      localStorage.setItem('mock_jobs_custom', JSON.stringify(updatedLocalJobs));

      // NEW: Update staffing monitoring status if created from there
      const params = new URLSearchParams(window.location.search);
      const sid = params.get('staffingId');
      if (sid) {
        const localStaffing = JSON.parse(localStorage.getItem('mock_staffing_custom') || '[]');
        const updatedLocalStaffing = [
          ...localStaffing.filter((s: any) => s.id !== Number(sid)),
          { id: Number(sid), status: 'On-process' }
        ];
        localStorage.setItem('mock_staffing_custom', JSON.stringify(updatedLocalStaffing));
      }

      setJobs(getJobs());
      toast.success("Job posted successfully!");
    }

    setIsCreating(false);
    resetForm();
  };

  const handleEdit = (job: any) => {
    setNewJob({
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      location: job.location,
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
      salaryGrade: job.salaryGrade || 1,
      deadline: job.deadline || '',
      uploads: {
        license: null,
        certificates: null,
        prc: null,
        coe: null,
      }
    });
    setEditingId(job.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to archive this job posting?")) {
      // 1. Remove from custom jobs if it exists there
      const localJobs = JSON.parse(localStorage.getItem('mock_jobs_custom') || '[]');
      const filteredLocalJobs = localJobs.filter((j: any) => j.id !== id);
      localStorage.setItem('mock_jobs_custom', JSON.stringify(filteredLocalJobs));

      // 2. Add to archived list to hide static mock jobs
      const archivedIds = JSON.parse(localStorage.getItem('mock_jobs_archived') || '[]');
      if (!archivedIds.includes(id)) {
        localStorage.setItem('mock_jobs_archived', JSON.stringify([...archivedIds, id]));
      }

      setJobs(getJobs());
      toast.success("Job archived successfully.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewJob({
      title: '',
      department: '',
      employmentType: 'Full-time',
      location: 'NAAP - Villamor Campus',
      description: '',
      requirements: [],
      responsibilities: '',
      salaryGrade: 1,
      deadline: '',
      uploads: {
        license: null,
        certificates: null,
        prc: null,
        coe: null,
      }
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof newJob.uploads) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewJob({ ...newJob, uploads: { ...newJob.uploads, [field]: file } });
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = campusFilter === 'all' || job.location.includes(campusFilter);
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesEmploymentType = employmentTypeFilter === 'all' || job.employmentType === employmentTypeFilter;
    return matchesSearch && matchesCampus && matchesStatus && matchesEmploymentType;
  });

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
                  <span className="text-[10px] text-blue-200 uppercase tracking-widest">Portal</span>
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
              <Link href="/admin/jobs">
                <Button variant="ghost" className="text-[#ffdd59] bg-white/10">
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
                  <Users className="h-4 w-4 mr-2" />
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings Management</h1>
            <p className="text-gray-600">Managing career opportunities as <span className="text-[#193153] font-bold">{admin.name}</span></p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Job Posting" : "Create New Job Posting"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      placeholder="e.g., Flight Instructor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={newJob.department}
                      onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                      placeholder="e.g., Flight Training"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaryGrade">Salary Grade *</Label>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={String(newJob.salaryGrade)}
                        onValueChange={(value) => setNewJob({ ...newJob, salaryGrade: Number(value) })}
                      >
                        <SelectTrigger id="salaryGrade">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(SALARY_GRADE_MAP).map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              SG {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-2 rounded border border-blue-100 whitespace-nowrap">
                        ₱{SALARY_GRADE_MAP[newJob.salaryGrade]?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>

                    <Select value={newJob.employmentType} onValueChange={(value) => setNewJob({ ...newJob, employmentType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={newJob.location} onValueChange={(value) => setNewJob({ ...newJob, location: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Campus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NAAP - Villamor Campus">NAAP - Villamor Campus</SelectItem>
                        <SelectItem value="NAAP - Basa Air Base Campus">NAAP - Basa Air Base Campus</SelectItem>
                        <SelectItem value="NAAP - Basa-Palmayo Extension Campus">NAAP - Basa-Palmayo Extension Campus</SelectItem>
                        <SelectItem value="NAAP - Fernando Air Base Campus">NAAP - Fernando Air Base Campus</SelectItem>
                        <SelectItem value="NAAP - Mactan Campus">NAAP - Mactan Campus</SelectItem>
                        <SelectItem value="NAAP - Mactan-Medellin Extension Campus">NAAP - Mactan-Medellin Extension Campus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Describe the position..."
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    rows={6}
                    value={newJob.requirements.join('\n')}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value.split('\n').filter(r => r.trim()) })}
                    placeholder="List any other requirements..."
                  />
                </div>

                {/* Upload Boxes */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="license">Upload License</Label>
                    <Input
                      type="file"
                      id="license"
                      onChange={(e) => handleFileChange(e, 'license')}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="certificates">Upload Certificates</Label>
                    <Input
                      type="file"
                      id="certificates"
                      onChange={(e) => handleFileChange(e, 'certificates')}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prc">Upload PRC License</Label>
                    <Input
                      type="file"
                      id="prc"
                      onChange={(e) => handleFileChange(e, 'prc')}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coe">Upload COE</Label>
                    <Input
                      type="file"
                      id="coe"
                      onChange={(e) => handleFileChange(e, 'coe')}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="responsibilities">Responsibilities (one per line) *</Label>
                  <Textarea
                    id="responsibilities"
                    rows={6}
                    value={newJob.responsibilities}
                    onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                    placeholder="Conduct training sessions&#10;Assess performance&#10;etc..."
                  />
                </div>

                <div>
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleCreateJob}
                    disabled={!newJob.title || !newJob.department || !newJob.description}
                  >
                    {editingId ? "Update Job Posting" : "Create Job Posting"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Jobs</p>
                  <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Open Positions</p>
                  <p className="text-3xl font-bold text-green-600">
                    {jobs.filter(j => j.status === 'Open').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Applicants</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {jobs.reduce((sum, job) => sum + job.applicantCount, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by job title or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={campusFilter} onValueChange={setCampusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  <SelectItem value="Villamor">Villamor Campus</SelectItem>
                  <SelectItem value="Basa Air Base">Basa Air Base Campus</SelectItem>
                  <SelectItem value="Fernando Air Base">Fernando Air Base Campus</SelectItem>
                  <SelectItem value="Basa-Palmayo">Basa-Palmayo Extension</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary Grade</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-gray-500 py-8">
                        No jobs found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell className="text-gray-600">{job.location}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700">SG {job.salaryGrade}</span>
                            <span className="text-[10px] text-blue-600 font-medium">₱{SALARY_GRADE_MAP[job.salaryGrade]?.toLocaleString()}/mo</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.employmentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {job.applicantCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`
                          ${job.status === 'Open' ? 'bg-green-100 text-green-800' : ''}
                          ${job.status === 'Closed' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(job.deadline).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link href={`/jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                              <Archive className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
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