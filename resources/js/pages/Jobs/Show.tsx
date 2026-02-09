import { Link, router } from '@inertiajs/react';
import { ArrowLeft, MapPin, Briefcase, Clock, Calendar, Users, CheckCircle, Upload, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockJobs, SALARY_GRADE_MAP, getJobs } from '@/data/mockData';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface JobDetailsProps {
    id: string;
    auth: { user: any };
}

export default function JobDetails({ id, auth }: JobDetailsProps) {
    const user = auth?.user;
    const [hasApplied, setHasApplied] = useState(false);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: user?.email || '',
        lastName: user?.name?.split(' ').pop() || '',
        firstName: user?.name?.split(' ')[0] || '',
        middleName: '',
        extensionName: '',
        age: '',
        sex: '',
        civilStatus: '',
        religion: '',
        isIP: 'No',
        isPWD: 'No',
        source: '',
        contactNumber: '',
        alternateContact: '',
        address: '',
        openToOthers: 'yes',
        // AI Scoring fields
        educationLevel: 'bachelor' as 'bachelor' | 'masters' | 'doctoral_graduate' | 'doctoral_27+' | 'doctoral_18-24' | 'doctoral_15-18' | 'doctoral_9-15',
        yearsOfExperience: '0',
        awards: [] as ('national' | 'csc' | 'president' | 'ngo')[],
        trainingHours: '0'
    });

    const [attachedDocs, setAttachedDocs] = useState<Record<string, boolean>>({});

    // Auto-fill from Profile
    // Update the useEffect hook to populate form data from local storage when the application form (isApplyOpen) is opened.
    // This ensures that users don't have to re-enter their information if they have already saved it in their dashboard.
    useEffect(() => {
        if (isApplyOpen && typeof window !== 'undefined') {
            const savedProfile = localStorage.getItem('user_profile_data');
            if (savedProfile) {
                const profile = JSON.parse(savedProfile);
                setFormData(prev => ({
                    ...prev,
                    lastName: profile.lastName || prev.lastName,
                    firstName: profile.firstName || prev.firstName,
                    middleName: profile.middleName || '',
                    extensionName: profile.extensionName || '',
                    age: profile.age || '',
                    sex: profile.sex ? profile.sex.toLowerCase() : '',
                    civilStatus: profile.civilStatus ? profile.civilStatus.toLowerCase() : '',
                    religion: profile.religion || '',
                    isIP: profile.ipGroup || 'No',
                    isPWD: profile.pwd || 'No',
                    contactNumber: profile.phone || '',
                    address: profile.address || '',
                    email: profile.email || prev.email
                }));
            }

            // Check for attached docs
            const docMap: Record<string, boolean> = {};
            [
                "Letter of Intent",
                "Personal Data Sheet (PDS)", // Mapped from Dashboard name
                "Work Experience Sheet",
                "Certificate of Eligibility",
                "Transcript of Records (TOR)",
                "Training Certificates", // Mapped from Dashboard
                "Performance Rating"
            ].forEach(doc => {
                const status = localStorage.getItem(`doc_${doc}`);
                if (status === 'uploaded') {
                    docMap[doc] = true;
                }
            });
            setAttachedDocs(docMap);
        }
    }, [isApplyOpen]);

    const handleApplyClick = () => {
        if (!user) {
            router.visit('/login');
            return;
        }
        setIsApplyOpen(true);
    };

    const handleSubmitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call and Upload
        setTimeout(() => {
            // Create a mock application object compatible with Admin Dashboard
            const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}${formData.extensionName ? ' ' + formData.extensionName : ''}`.trim();

            const newApplication = {
                id: Date.now(), // Simple unique ID
                applicantName: fullName,
                applicantEmail: user.email, // Use logged in user's email for filtering
                email: formData.email, // Email provided in the form
                phone: formData.contactNumber,
                jobTitle: job?.title || 'Unknown Position',
                location: job?.location || 'Unknown Location',
                status: 'Submitted',
                submittedDate: new Date().toISOString().split('T')[0],
                aiScore: Math.floor(Math.random() * 20) + 80, // Random high score for demo
                education: 'College Graduate', // Placeholder
                experience: 'See Resume',      // Placeholder
                skills: ['Communication', 'Teamwork', 'Aviation Knowledge'], // Placeholder skills
                resumeUrl: '#'
            };

            // Save to localStorage
            try {
                const existingApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');
                localStorage.setItem('mock_applications_custom', JSON.stringify([newApplication, ...existingApps]));
            } catch (error) {
                console.error("Failed to save application locally", error);
            }

            setIsSubmitting(false);
            setIsApplyOpen(false);
            setHasApplied(true);
            toast.success("Application submitted successfully!", {
                description: "We have received your documents and will review them shortly."
            });
        }, 2000);
    };

    // Find the job by ID from all jobs (mockJobs + localStorage)
    const allJobs = getJobs();
    const job = allJobs.find(j => j.id === id) || allJobs.find(j => j.id === String(id));

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-[#193153]">Job Not Found</h1>
                    <p className="text-gray-500 mb-6">The job posting you are looking for does not exist or has been removed.</p>
                    <Link href="/jobs">
                        <Button>Back to Job Listings</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-[#193153] text-white py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/jobs">
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10 hover:text-[#ffdd59] mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Listings
                        </Button>
                    </Link>

                    {user && (
                        <Link href="/dashboard" className="flex items-center gap-3 pl-4 border-l border-white/20 mb-4 text-white group hover:bg-white/10 rounded-full py-1 pr-4 transition-all">
                            <div className="w-8 h-8 rounded-full bg-[#ffdd59] flex items-center justify-center text-[#193153] font-bold text-xs group-hover:scale-105 transition-transform">
                                {user.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium group-hover:text-[#ffdd59] transition-colors">{user.name}</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-3xl text-[#193153] font-bold mb-3">{job.title}</CardTitle>
                                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                                            <div className="flex items-center">
                                                <Briefcase className="h-4 w-4 mr-2" />
                                                {job.department}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-2" />
                                                {job.applicantCount} applicants
                                            </div>
                                        </div>
                                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                            {job.employmentType}
                                        </Badge>
                                        <p className="mt-4 text-lg font-semibold text-[#193153] flex items-center">
                                            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                                            Salary Grade {job.salaryGrade || 'N/A'}
                                            {job.salaryGrade && SALARY_GRADE_MAP[job.salaryGrade] && (
                                                <span className="ml-2 text-sm font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                                    ₱{SALARY_GRADE_MAP[job.salaryGrade].toLocaleString()} / month
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-6">
                                <section className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                                </section>

                                <section className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                                    <ul className="space-y-2">
                                        {job.responsibilities.map((resp: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span className="text-gray-700">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                                    <ul className="space-y-2">
                                        {job.requirements?.map((req: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-blue-600 mr-2">✓</span>
                                                <span className="text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <Card className="sticky top-4 shadow-lg border-0">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-4 text-[#193153]">Application Details</h3>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex items-center text-gray-600 mb-1">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span className="text-sm">Posted</span>
                                        </div>
                                        <p className="font-semibold">
                                            {job.postedDate ? new Date(job.postedDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'Recently'}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center text-gray-600 mb-1">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span className="text-sm">Deadline</span>
                                        </div>
                                        <p className="font-semibold text-red-600">
                                            {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {user ? (
                                    hasApplied ? (
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700 text-white mb-3 font-bold transition-colors cursor-default"
                                            size="lg"
                                        >
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Applied
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleApplyClick}
                                            className="w-full bg-[#193153] hover:bg-[#ffdd59] hover:text-[#193153] mb-3 font-bold transition-colors"
                                            size="lg"
                                        >
                                            Apply Now
                                        </Button>
                                    )
                                ) : (
                                    <Link href={`/login`}>
                                        <Button
                                            className="w-full bg-[#193153] hover:bg-[#ffdd59] hover:text-[#193153] mb-3 font-bold transition-colors"
                                            size="lg"
                                        >
                                            Apply Now
                                        </Button>
                                    </Link>
                                )}

                                <Link href={user ? "/dashboard" : "/login"}>
                                    <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:text-[#193153] hover:border-[#193153]">
                                        Track Your Application
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="mt-4 shadow-md border-0">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-3 text-[#193153]">About NAAP</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    The National Aviation Academy of the Philippines is a premier institution
                                    dedicated to aviation education and training. We are committed to excellence
                                    in developing the next generation of aviation professionals.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#193153]">Application Form</DialogTitle>
                        <DialogDescription>
                            Applying for <span className="font-bold text-[#193153]">{job.title}</span>. Please complete all fields below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmitApplication} className="space-y-6 mt-4">

                        {/* 1. Personal Information */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={formData.email} readOnly className="bg-gray-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="middleName">Middle Name</Label>
                                    <Input id="middleName" value={formData.middleName} onChange={(e) => setFormData({ ...formData, middleName: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="extensionName">Extension Name</Label>
                                    <Input id="extensionName" placeholder="" value={formData.extensionName} onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sex">Sex</Label>
                                    <Select value={formData.sex} onValueChange={(val) => setFormData({ ...formData, sex: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="civilStatus">Civil Status</Label>
                                    <Select value={formData.civilStatus} onValueChange={(val) => setFormData({ ...formData, civilStatus: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="single">Single</SelectItem>
                                            <SelectItem value="married">Married</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                            <SelectItem value="separated">Separated</SelectItem>
                                            <SelectItem value="others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="religion">Religion</Label>
                                    <Input id="religion" value={formData.religion} onChange={(e) => setFormData({ ...formData, religion: e.target.value })} required />
                                </div>
                            </div>
                        </div>

                        {/* 2. Demographics */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2">Demographics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Are you a member of any Indigenous Group?</Label>
                                    <Select value={formData.isIP} onValueChange={(val) => setFormData({ ...formData, isIP: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Are you a Person with Disability (PWD)?</Label>
                                    <Select value={formData.isPWD} onValueChange={(val) => setFormData({ ...formData, isPWD: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* 3. Eligibilities */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2">Eligibilities</h3>
                            <p className="text-sm text-gray-500">Please tick all the eligibilities you have.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Career Service (CS) Professional",
                                    "Career Service (CS) Sub Professional",
                                    "Bar/Board Eligibility (RA1080)",
                                    "Barangay Health Worker (RA 7883)",
                                    "Barangay Nutrition Scholar Eligibility (PD 1569)",
                                    "Barangay Official Eligibility (RA 7160)",
                                    "Electronic Data Processing Specialist Eligibility (CSC Res. 90-083)",
                                    "Foreign School Honor Graduate Eligibility (CSC Res. 90-083)",
                                    "Honor Graduate Eligibility (PD 907)",
                                    "Sanggunian Member Eligibility (RA 10156)",
                                    "Scientific and Technological Specialist Eligibility (PD 997)",
                                    "Skills Eligibility Category II (CSC MC 11, s. 1996, as Amended)",
                                    "Veteran Preference Rating (EO 132/790)",
                                    "Other"
                                ].map((eligibility, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                        <Checkbox id={`civil-${i}`} className="mt-1" />
                                        <Label htmlFor={`civil-${i}`} className="leading-snug cursor-pointer font-normal text-gray-700">
                                            {eligibility}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Contact & Address */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2">Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input id="contactNumber" type="tel" value={formData.contactNumber} onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="alternateContact">Alternate Contact No. (Optional)</Label>
                                    <Input id="alternateContact" type="tel" value={formData.alternateContact} onChange={(e) => setFormData({ ...formData, alternateContact: e.target.value })} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Residential Address</Label>
                                    <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="House No., Street, Barangay, City, Province" required />
                                </div>
                            </div>
                        </div>

                        {/* 4. Additional Info */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>How did you find this position?</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, source: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="social_media">Social Media (Facebook, LinkedIn)</SelectItem>
                                            <SelectItem value="naap_website">NAAP Website</SelectItem>
                                            <SelectItem value="referral">Referral</SelectItem>
                                            <SelectItem value="job_fair">Job Fair</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Open to be considered for other positions?</Label>
                                    <div className="flex gap-4 pt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="openToOthers" className="accent-[#193153]" checked={formData.openToOthers === 'yes'} onChange={() => setFormData({ ...formData, openToOthers: 'yes' })} /> Yes
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="openToOthers" className="accent-[#193153]" checked={formData.openToOthers === 'no'} onChange={() => setFormData({ ...formData, openToOthers: 'no' })} /> No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Documents */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-[#193153] border-b pb-2 flex items-center gap-2">
                                <Upload className="w-5 h-5" /> Requirements
                            </h3>
                            <p className="text-sm text-gray-500">Please upload valid PDF or Image files.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Letter of Intent",
                                    "Personal Data Sheet (PDS) with Work Experience",
                                    "Work Experience Sheet (Separate)",
                                    "Certificate of Eligibility",
                                    "Transcript of Records (TOR)",
                                    "Relevant Training Certificates",
                                    "Performance Rating (IPCR/OPCR)"
                                ].map((doc, i) => {
                                    // Mapping document names for simple matching
                                    const mapName = (name: string) => {
                                        if (name.includes("PDS")) return "Personal Data Sheet (PDS)";
                                        if (name.includes("Work Experience") && name.includes("Separate")) return "Work Experience Sheet";
                                        if (name.includes("Training")) return "Training Certificates";
                                        if (name.includes("Performance")) return "Performance Rating";
                                        return name;
                                    }
                                    const simpleName = mapName(doc);
                                    const isAttached = attachedDocs[simpleName] || attachedDocs[doc];

                                    return (
                                        <div key={i} className={`space-y-2 border p-3 rounded-lg ${isAttached ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                                            <div className="flex justify-between items-center">
                                                <Label className="font-semibold text-gray-700">{doc} <span className="text-red-500">*</span></Label>
                                                {isAttached && (
                                                    <span className="text-[10px] font-bold text-green-700 bg-white px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" /> Attached from Profile
                                                    </span>
                                                )}
                                            </div>
                                            {!isAttached ? (
                                                <Input type="file" required className="bg-white" />
                                            ) : (
                                                <div className="text-xs text-gray-500 italic pl-1">
                                                    File ready from your dashboard profile.
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <DialogFooter className="sticky bottom-0 bg-white py-4 border-t mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsApplyOpen(false)} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#193153] hover:bg-[#ffdd59] hover:text-[#193153] font-bold" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting Application..." : "Submit Application"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
