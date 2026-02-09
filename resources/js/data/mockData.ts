// --- SALARY GRADE MAPPING (Updated SSL) ---
export const SALARY_GRADE_MAP: Record<number, number> = {
    1: 13000, 2: 13819, 3: 14678, 4: 15586, 5: 16543,
    6: 17553, 7: 18620, 8: 19744, 9: 21211, 10: 23176,
    11: 27000, 12: 29165, 13: 31320, 14: 33843, 15: 36619,
    16: 39672, 17: 43030, 18: 46725, 19: 51357, 20: 57347,
    21: 63997, 22: 71511, 23: 80003, 24: 90078, 25: 102690,
    26: 116040, 27: 131124, 28: 148171, 29: 167432, 30: 189199,
    31: 273278, 32: 325307, 33: 411161
};

export const mockJobs = [
    {
        id: '1',
        title: 'Chief Flight Instructor',
        department: 'Flight Training',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Oversee all flight training operations and ensure compliance with CAAP regulations. Mentor senior instructors and manage the training syllabus.',
        responsibilities: [
            'Manage flight training department.',
        ],
        salaryGrade: 24,
    },
    {
        id: '2', // Fixed: changed duplicate ID from '1' to '2'
        title: 'Senior Flight Instructor',
        department: 'Flight Training',
        location: 'NAAP - Basa Air Base Campus',
        employmentType: 'Full-time',
        description: 'Experienced instructor needed to handle advanced flight phases and instrument ratings for cadets.',
        responsibilities: [
            'Conduct instrument flight training.',
            'Perform stage checks.',
            'Mentor student pilots.',
            'Assist Chief Flight Instructor.'
        ],
        requirements: [
            'CPL with Instrument Rating.',
            'Flight Instructor License.',
            'Minimum 1,500 flight hours.',
            'Class 1 Medical.'
        ],
        salaryGrade: 23,
        postedDate: '2026-01-20',
        deadline: '2026-03-01',
        applicantCount: 15,
        status: 'Open'
    },
    {
        id: '3',
        title: 'Flight Instructor (Basic)',
        department: 'Flight Training',
        location: 'NAAP - Fernando Air Base Campus',
        employmentType: 'Full-time',
        description: 'Provide primary flight instruction to new student pilots in Cessna 172 aircraft.',
        responsibilities: [
            'Teach basic flight maneuvers.',
            'Conduct pre-flight briefings.',
            'Ensure safe flight operations.',
            'Grade student performance.'
        ],
        requirements: [
            'CPL holder.',
            'Flight Instructor License.',
            'Minimum 500 flight hours.',
            'Passion for teaching.'
        ],
        salaryGrade: 21,
        postedDate: '2026-02-01',
        deadline: '2026-03-15',
        applicantCount: 22,
        status: 'Open'
    },
    {
        id: '4',
        title: 'Flight Instructor (Multi-Engine)',
        department: 'Flight Training',
        location: 'NAAP - Mactan Campus',
        employmentType: 'Full-time',
        description: 'Specialized instructor for Multi-Engine training modules on the Piper Seneca simulator and aircraft.',
        responsibilities: [
            'Conduct multi-engine training.',
            'Teach asymmetric flight procedures.',
            'Verify student proficiency.',
            'Safety management.'
        ],
        requirements: [
            'CPL with Multi-Engine Rating.',
            'Flight Instructor License.',
            'Minimum 1,000 flight hours.',
            'Multi-engine teaching experience.'
        ],
        salaryGrade: 24,
        postedDate: '2026-02-02',
        deadline: '2026-03-20',
        applicantCount: 10,
        status: 'Open'
    },
    {
        id: '5',
        title: 'Aircraft Mechanic (Airframe)',
        department: 'Maintenance',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Perform scheduled structural repairs and inspections on academy aircraft.',
        responsibilities: [
            'Riveting and sheet metal repair.',
            'Composite material repair.',
            'Corrosion control.',
            'Landing gear maintenance.'
        ],
        requirements: [
            'AMT License (Airframe rating).',
            '3 years aviation experience.',
            'Ability to read blueprints.',
            'Physical fitness.'
        ],
        salaryGrade: 15,
        postedDate: '2026-01-25',
        deadline: '2026-02-28',
        applicantCount: 18,
        status: 'Open'
    },
    {
        id: '6',
        title: 'Aircraft Mechanic (Powerplant)',
        department: 'Maintenance',
        location: 'NAAP - Basa-Palmayo Extension Campus',
        employmentType: 'Full-time',
        description: 'Maintain and overhaul piston engines for training aircraft.',
        responsibilities: [
            'Engine inspection and tuning.',
            'Propeller balancing.',
            'Oil system analysis.',
            'Troubleshooting engine issues.'
        ],
        requirements: [
            'AMT License (Powerplant rating).',
            'Experience with Lycoming engines.',
            'Safety conscious.',
            'Troubleshooting skills.'
        ],
        salaryGrade: 15,
        postedDate: '2026-01-28',
        deadline: '2026-03-05',
        applicantCount: 12,
        status: 'Open'
    },
    {
        id: '7',
        title: 'Avionics Technician',
        department: 'Maintenance',
        location: 'NAAP - Fernando Air Base Campus',
        employmentType: 'Full-time',
        description: 'Install, troubleshoot, and repair aircraft communication and navigation systems.',
        responsibilities: [
            'Test radio and navigation equipment.',
            'Repair wiring and electrical systems.',
            'Calibrate flight instruments.',
            'Software updates.'
        ],
        requirements: [
            'AMS License (Avionics).',
            'Electronics knowledge.',
            'Experience with Garmin G1000 is a plus.',
            'Detail oriented.'
        ],
        salaryGrade: 15,
        postedDate: '2026-02-03',
        deadline: '2026-03-10',
        applicantCount: 9,
        status: 'Open'
    },
    {
        id: '8',
        title: 'Maintenance Supervisor',
        department: 'Maintenance',
        location: 'NAAP - Mactan-Medellin Extension Campus',
        employmentType: 'Full-time',
        description: 'Lead the maintenance team at the extension campus and ensure aircraft availability.',
        responsibilities: [
            'Schedule maintenance shifts.',
            'Manage spare parts inventory.',
            'Sign off maintenance releases.',
            'Supervise mechanics.'
        ],
        requirements: [
            'AMT License with Airframe & Powerplant.',
            '5+ years experience.',
            'Leadership skills.',
            'Knowledge of CAAP airworthiness regs.'
        ],
        salary: '₱60,000 - ₱75,000 per month',
        postedDate: '2026-01-30',
        deadline: '2026-03-01',
        applicantCount: 6,
        status: 'Open'
    },
    {
        id: '9',
        title: 'Ground Instructor (Meteorology)',
        department: 'Academics',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Part-time',
        description: 'Teach aviation meteorology responsibilities to student pilots.',
        responsibilities: [
            'Lecture on performing weather analysis.',
            'Teach METAR/TAF decoding.',
            'Explain hazardous weather phenomena.',
            'Prepare exams.'
        ],
        requirements: [
            'Ground Instructor License.',
            'Meteorology background preferred.',
            'Teaching experience.',
            'Good presentation skills.'
        ],
        salary: '₱700 - ₱1,000 per hour',
        postedDate: '2026-02-04',
        deadline: '2026-03-15',
        applicantCount: 14,
        status: 'Open'
    },
    {
        id: '10',
        title: 'Ground Instructor (Air Law)',
        department: 'Academics',
        location: 'NAAP - Basa Air Base Campus',
        employmentType: 'Part-time',
        description: 'Instruct students on Civil Aviation Regulations and international aviation laws.',
        responsibilities: [
            'Teach PCARs and ICAO annexes.',
            'Discuss license privileges and limitations.',
            'Explain air traffic rules.',
            'Conduct assessments.'
        ],
        requirements: [
            'Ground Instructor License.',
            'Deep knowledge of aviation law.',
            'Attention to detail.',
            'Communication skills.'
        ],
        salary: '₱700 - ₱1,000 per hour',
        postedDate: '2026-02-05',
        deadline: '2026-03-20',
        applicantCount: 11,
        status: 'Open'
    },
    {
        id: '11',
        title: 'Flight Simulator Technician',
        department: 'Maintenance',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Maintain and repair flight training devices and full flight simulators.',
        responsibilities: [
            'Perform daily simulator qualification tests.',
            'Troubleshoot hardware and software issues.',
            'Replace faulty components.',
            'Assist instructors with sim setup.'
        ],
        requirements: [
            'Electronics or Computer Engineering degree.',
            'Experience with simulation systems.',
            'Networking skills.',
            'Shift work required.'
        ],
        salary: '₱45,000 - ₱60,000 per month',
        postedDate: '2026-01-18',
        deadline: '2026-02-28',
        applicantCount: 7,
        status: 'Open'
    },
    {
        id: '12',
        title: 'Aviation Safety Officer',
        department: 'Safety',
        location: 'NAAP - Mactan Campus',
        employmentType: 'Full-time',
        description: 'Monitor safety metrics and conduct risk assessments for flight operations.',
        responsibilities: [
            'Maintain Safety Management System.',
            'Investigate hazards and incidents.',
            'Promote safety awareness.',
            'Audit compliance.'
        ],
        requirements: [
            'Aviation Safety certification.',
            'Knowledge of SMS.',
            'Analytical mindset.',
            'Experience in flight ops.'
        ],
        salary: '₱50,000 - ₱70,000 per month',
        postedDate: '2026-02-01',
        deadline: '2026-03-10',
        applicantCount: 9,
        status: 'Open'
    },
    {
        id: '13',
        title: 'Flight Operations Officer',
        department: 'Flight Operations',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Support flight planning and dispatch duties.',
        responsibilities: [
            'File flight plans with ATS.',
            'Check NOTAMs and weather.',
            'Coordinate aircraft refueling.',
            'Track fleet movement.'
        ],
        requirements: [
            'Flight Dispatcher License or training.',
            'Radio Operator License.',
            'Computer literate.',
            'Ability to work under pressure.'
        ],
        salary: '₱25,000 - ₱35,000 per month',
        postedDate: '2026-01-22',
        deadline: '2026-02-25',
        applicantCount: 25,
        status: 'Open'
    },
    {
        id: '14',
        title: 'Admissions Officer',
        department: 'Administration',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Process student applications and conduct campus tours for prospective cadets.',
        responsibilities: [
            'Review application documents.',
            'Answer student inquiries.',
            'Organize orientation events.',
            'Maintain applicant database.'
        ],
        requirements: [
            'Bachelor’s degree.',
            'Customer service experience.',
            'Organized and friendly.',
            'Communication skills.'
        ],
        salary: '₱22,000 - ₱28,000 per month',
        postedDate: '2026-02-03',
        deadline: '2026-03-05',
        applicantCount: 35,
        status: 'Open'
    },
    {
        id: '15',
        title: 'School Registrar',
        department: 'Administration',
        location: 'NAAP - Basa Air Base Campus',
        employmentType: 'Full-time',
        description: 'Manage student records, grades, and licensing documentation for CAAP.',
        responsibilities: [
            'Maintain student 201 files.',
            'Process transcript requests.',
            'Liaise with CAAP Licensing department.',
            'Ensure data privacy.'
        ],
        requirements: [
            'Bachelor’s degree.',
            'Experience in records management.',
            'Strict attention to detail.',
            'Integrity.'
        ],
        salary: '₱30,000 - ₱40,000 per month',
        postedDate: '2026-01-15',
        deadline: '2026-02-28',
        applicantCount: 12,
        status: 'Open'
    },
    {
        id: '16',
        title: 'School Nurse',
        department: 'Medical',
        location: 'NAAP - Basa-Palmayo Extension Campus',
        employmentType: 'Full-time',
        description: 'Provide basic medical care and first aid to students and staff.',
        responsibilities: [
            'Manage campus clinic.',
            'Provide first aid.',
            'Monitor student health records.',
            'Assist in annual medical exams.'
        ],
        requirements: [
            'Registered Nurse (RN).',
            'BLS/ACLS certified.',
            'Experience in school setting preferred.',
            'Caring attitude.'
        ],
        salary: '₱25,000 - ₱35,000 per month',
        postedDate: '2026-02-01',
        deadline: '2026-03-10',
        applicantCount: 20,
        status: 'Open'
    },
    {
        id: '17',
        title: 'Guidance Counselor',
        department: 'Student Affairs',
        location: 'NAAP - Fernando Air Base Campus',
        employmentType: 'Full-time',
        description: 'Provide counseling and psychological support to student pilots.',
        responsibilities: [
            'Conduct individual counseling.',
            'Assess student mental fitness.',
            'Facilitate stress management workshops.',
            'Support student retention.'
        ],
        requirements: [
            'Registered Guidance Counselor (RGC).',
            'Experience with students.',
            'Empathy and confidentiality.',
            'Understanding of aviation stress factors.'
        ],
        salary: '₱30,000 - ₱45,000 per month',
        postedDate: '2026-01-30',
        deadline: '2026-03-15',
        applicantCount: 8,
        status: 'Open'
    },
    {
        id: '18',
        title: 'Librarian',
        department: 'Academics',
        location: 'NAAP - Mactan-Medellin Extension Campus',
        employmentType: 'Full-time',
        description: 'Manage the aviation library and technical publications.',
        responsibilities: [
            'Catalog books and manuals.',
            'Assist students with research.',
            'Update technical library subscriptions.',
            'Maintain quiet study environment.'
        ],
        requirements: [
            'Licensed Librarian.',
            'Organizational skills.',
            'Computer literate.',
            'Interest in aviation.'
        ],
        salary: '₱22,000 - ₱28,000 per month',
        postedDate: '2026-02-02',
        deadline: '2026-03-05',
        applicantCount: 10,
        status: 'Open'
    },
    {
        id: '19',
        title: 'IT Support Specialist',
        department: 'IT',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Provide technical support for campus computers, networks, and smart classrooms.',
        responsibilities: [
            'Troubleshoot PC and network issues.',
            'Maintain classroom AV equipment.',
            'Install software updates.',
            'Assist users with technical problems.'
        ],
        requirements: [
            'IT-related degree.',
            'Networking knowledge.',
            'Problem-solving skills.',
            'Customer service oriented.'
        ],
        salary: '₱25,000 - ₱35,000 per month',
        postedDate: '2026-01-20',
        deadline: '2026-02-28',
        applicantCount: 28,
        status: 'Open'
    },
    {
        id: '20',
        title: 'Marketing Specialist',
        department: 'Administration',
        location: 'NAAP - Villamor Campus',
        employmentType: 'Full-time',
        description: 'Develop marketing campaigns to attract new aspiring pilots.',
        responsibilities: [
            'Create social media content.',
            'Design brochures and flyers.',
            'Coordinate school visits.',
            'Analyze marketing metrics.'
        ],
        requirements: [
            'Marketing degree.',
            'Graphic design skills (Canva/Adobe).',
            'Social media savvy.',
            'Creativity.'
        ],
        salary: '₱30,000 - ₱40,000 per month',
        postedDate: '2026-02-05',
        deadline: '2026-03-20',
        applicantCount: 30,
        status: 'Open'
    },
    {
        id: '21',
        title: 'Dormitory Manager',
        department: 'Administration',
        location: 'NAAP - Basa Air Base Campus',
        employmentType: 'Full-time',
        description: 'Oversee the operation and maintenance of the student cadet dormitory.',
        responsibilities: [
            'Enforce dorm rules and regulations.',
            'Manage room assignments.',
            'Coordinate cleaning and repairs.',
            'Ensure resident safety.'
        ],
        requirements: [
            'Experience in property or hospitality management.',
            'Strong leadership.',
            'Ability to handle discipline.',
            'Live-in option available.'
        ],
        salary: '₱25,000 - ₱35,000 per month',
        postedDate: '2026-01-12',
        deadline: '2026-02-25',
        applicantCount: 15,
        status: 'Closed'
    },
    {
        id: '22',
        title: 'Utility Staff',
        department: 'Maintenance',
        location: 'NAAP - Fernando Air Base Campus',
        employmentType: 'Full-time',
        description: 'Ensure cleanliness and orderliness of the hangar and campus grounds.',
        responsibilities: [
            'Clean hangars and classrooms.',
            'Assist in moving equipment.',
            'Groundskeeping duties.',
            'Dispose of waste properly.'
        ],
        requirements: [
            'High school diploma.',
            'Hardworking and reliable.',
            'Physically fit.',
            'Honest.'
        ],
        salary: '₱16,000 - ₱20,000 per month',
        postedDate: '2026-02-01',
        deadline: '2026-03-30',
        applicantCount: 40,
        status: 'Closed'
    }
];

// Helper to generate mock applicants
const generateMockApplications = (count: number) => {
    const firstNames = ['Juan', 'Maria', 'Pedro', 'Ana', 'Carlos', 'John', 'Sarah', 'Michael', 'Emma', 'David', 'James', 'Emily', 'Robert', 'Linda', 'William', 'Elizabeth', 'Joseph', 'Jennifer', 'Thomas', 'Susan', 'Daniel', 'Margaret', 'Matthew', 'Lisa', 'Anthony', 'Nancy', 'Mark', 'Karen', 'Donald', 'Betty'];
    const lastNames = ['Dela Cruz', 'Santos', 'Penduko', 'Reyes', 'Garcia', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White'];
    const positions = ['Flight Instructor', 'Aircraft Mechanic', 'Ground Instructor', 'Administrative Assistant', 'HR Specialist', 'Maintenance Technician', 'Safety Officer', 'Operations Manager', 'student Pilot'];
    const statuses = ['Submitted', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'];
    const educationList = ['BS Aviation Major in Flying', 'BS Aircraft Maintenance Technology', 'BS Business Administration', 'BS Tourism', 'BS Psychology', 'BS Education', 'Vocational Diploma'];
    const skillsList = ['CPL', 'Instrument', 'Safety Management', 'AMT License', 'Troubleshooting', 'Logbook', 'MS Office', 'Organization', 'Communication', 'Customer Service', 'Public Speaking', 'Aviation Law', 'Project Management', 'Team Leadership'];

    const apps = [];

    // Status weights for realistic distribution
    const getWeightedStatus = () => {
        const rand = Math.random();
        if (rand < 0.30) return 'Submitted';
        if (rand < 0.55) return 'Under Review';
        if (rand < 0.80) return 'Rejected';
        if (rand < 0.92) return 'Shortlisted';
        return 'Hired';
    };

    for (let i = 1; i <= count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        // Pick a real job from mockJobs to get accurate location/campus
        const randomJob = mockJobs[Math.floor(Math.random() * mockJobs.length)];
        const jobTitle = randomJob.title;
        const campus = randomJob.location;

        const status = getWeightedStatus();

        // Correlate score somewhat with status
        let baseScore = Math.floor(Math.random() * 60) + 40; // 40-99
        if (status === 'Hired') baseScore = Math.floor(Math.random() * 10) + 90;
        if (status === 'Shortlisted') baseScore = Math.floor(Math.random() * 15) + 80;
        if (status === 'Rejected') baseScore = Math.floor(Math.random() * 50) + 30;

        // Date within last 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const dateStr = date.toISOString().split('T')[0];

        apps.push({
            id: i,
            applicantName: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(' ', '')}@example.com`,
            phone: `09${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
            jobTitle: jobTitle,
            campus: campus,
            status: status,
            submittedDate: dateStr,
            aiScore: baseScore,
            education: educationList[Math.floor(Math.random() * educationList.length)],
            experience: `${Math.floor(Math.random() * 10)} years experience`,
            skills: [
                skillsList[Math.floor(Math.random() * skillsList.length)],
                skillsList[Math.floor(Math.random() * skillsList.length)],
                skillsList[Math.floor(Math.random() * skillsList.length)]
            ],
            resumeUrl: '#'
        });
    }
    return apps.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
};

export const mockApplications = generateMockApplications(150);

export const mockInterviews = [
    {
        id: 1,
        candidateName: 'Juan Dela Cruz',
        position: 'Flight Instructor',
        date: '2026-02-05',
        time: '10:00 AM',
        type: 'In-person'
    },
    {
        id: 2,
        candidateName: 'Maria Santos',
        position: 'Admin Assistant',
        date: '2026-02-06',
        time: '2:00 PM',
        type: 'Online'
    },
    {
        id: 3,
        candidateName: 'Pedro Penduko',
        position: 'Aircraft Mechanic',
        date: '2026-02-07',
        time: '9:30 AM',
        type: 'In-person'
    }
];

export const mockEvents = [
    {
        id: 1,
        title: 'Initial Interview - Flight Instructor',
        date: 'Feb 12, 2026',
        time: '10:00 AM',
        type: 'Interview'
    },
    {
        id: 2,
        title: 'Technical Assessment Deadline',
        date: 'Feb 15, 2026',
        time: '11:59 PM',
        type: 'Deadline'
    },
    {
        id: 3,
        title: 'NAAP Career Fair Webinar',
        date: 'Feb 20, 2026',
        time: '2:00 PM',
        type: 'Webinar'
    }
];

export const mockActivities = [
    {
        id: 1,
        action: 'New Application',
        details: 'Juan Dela Cruz applied for Flight Instructor',
        time: '2 hours ago',
        date: '2026-02-09',
        icon: 'UserPlus',
        color: 'text-blue-500 bg-blue-100',
        campus: 'NAAP - Villamor Campus'
    },
    {
        id: 2,
        action: 'Job Posted',
        details: 'New position: Ground Instructor (Part-time)',
        time: '5 hours ago',
        date: '2026-02-09',
        icon: 'Briefcase',
        color: 'text-green-500 bg-green-100',
        campus: 'NAAP - Villamor Campus'
    },
    {
        id: 3,
        action: 'Interview Scheduled',
        details: 'Interview with Maria Santos confirmed',
        time: '1 day ago',
        date: '2026-02-08',
        icon: 'Calendar',
        color: 'text-purple-500 bg-purple-100',
        campus: 'NAAP - Basa Air Base Campus'
    },
    {
        id: 4,
        action: 'Application Rejected',
        details: 'Ana Reyes - Flight Instructor',
        time: '1 day ago',
        date: '2026-02-08',
        icon: 'XCircle',
        color: 'text-red-500 bg-red-100',
        campus: 'NAAP - Basa Air Base Campus'
    },
    {
        id: 5,
        action: 'Candidate Hired',
        details: 'Michael Chen has been officially hired as Senior Pilot',
        time: '2 days ago',
        date: '2026-02-07',
        icon: 'UserCheck',
        color: 'text-green-600 bg-green-50',
        campus: 'NAAP - Villamor Campus'
    },
    {
        id: 6,
        action: 'Report Generated',
        details: 'Monthly Staffing Efficiency Report generated by Admin',
        time: '3 days ago',
        date: '2026-02-06',
        icon: 'FileText',
        color: 'text-amber-500 bg-amber-50',
        campus: 'All Campuses'
    },
    {
        id: 7,
        action: 'System Maintenance',
        details: 'Applicant database indexing completed',
        time: '4 days ago',
        date: '2026-02-05',
        icon: 'Shield',
        color: 'text-slate-500 bg-slate-100',
        campus: 'System'
    },
    {
        id: 8,
        action: 'Role Updated',
        details: 'Sarah Williams promoted to Lead HR Specialist',
        time: '5 days ago',
        date: '2026-02-04',
        icon: 'Users',
        color: 'text-indigo-500 bg-indigo-50',
        campus: 'NAAP - Fernando Air Base Campus'
    },
    {
        id: 9,
        action: 'New Job Opening',
        details: 'Aviation Safety Officer (Permanent) posted for FAB',
        time: '1 week ago',
        date: '2026-02-02',
        icon: 'Briefcase',
        color: 'text-green-500 bg-green-100',
        campus: 'NAAP - Fernando Air Base Campus'
    },
    {
        id: 10,
        action: 'Bulk Status Update',
        details: 'Moved 12 applicants to "Shortlisted" for Pilot positions',
        time: '1 week ago',
        date: '2026-02-01',
        icon: 'Users',
        color: 'text-blue-600 bg-blue-50',
        campus: 'All Campuses'
    },
    {
        id: 11,
        action: 'Account Security',
        details: 'Admin password successfully changed',
        time: '2 weeks ago',
        date: '2026-01-26',
        icon: 'Shield',
        color: 'text-red-600 bg-red-50',
        campus: 'System'
    }
];

// Helper to get merged jobs (Mock + LocalStorage)
export const getJobs = () => {
    if (typeof window === 'undefined') return mockJobs;
    try {
        const localJobs = JSON.parse(localStorage.getItem('mock_jobs_custom') || '[]');
        const archivedIds = JSON.parse(localStorage.getItem('mock_jobs_archived') || '[]');

        // Filter out mock jobs that are either archived or have a local override
        const activeMockJobs = mockJobs.filter(job =>
            !archivedIds.includes(job.id) &&
            !localJobs.some((lj: any) => lj.id === job.id)
        );

        return [...localJobs, ...activeMockJobs];
    } catch (e) {
        console.error("Error reading jobs from localStorage", e);
        return mockJobs;
    }
};

// Helper to get merged applications (Mock + LocalStorage)
export const getApplications = () => {
    if (typeof window === 'undefined') return mockApplications;

    try {
        const localApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');

        // Filter out mock applications that have local overrides
        const activeMockApps = mockApplications.filter(app =>
            !localApps.some((la: any) => la.id === app.id)
        );

        return [...localApps, ...activeMockApps];
    } catch (e) {
        console.error("Error reading from localStorage", e);
        return mockApplications;
    }
};

// Helper for dynamic notifications
export const getDynamicNotifications = (userEmail?: string) => {
    if (typeof window === 'undefined' || !userEmail) return [];

    const notifications: any[] = [];
    const allApps = getApplications().filter((app: any) => app.applicantEmail === userEmail);
    const allJobs = getJobs();
    const readNotifications = JSON.parse(localStorage.getItem('read_notifications') || '[]');

    // 1. Application-based notifications
    allApps.forEach((app: any) => {
        // Application Submitted
        notifications.push({
            id: `sub_${app.id}`,
            text: `Your application for ${app.jobTitle} was successfully submitted.`,
            time: app.submittedDate,
            isRead: readNotifications.includes(`sub_${app.id}`),
            type: 'success'
        });

        // Application Status Changes
        if (app.status !== 'Submitted') {
            notifications.push({
                id: `status_${app.id}_${app.status}`,
                text: `Update: Your application for ${app.jobTitle} is now "${app.status}".`,
                time: new Date().toISOString().split('T')[0], // Simulate recent update
                isRead: readNotifications.includes(`status_${app.id}_${app.status}`),
                type: 'info'
            });
        }
    });

    // 2. New Job Openings (Mocking recent ones)
    allJobs.slice(0, 2).forEach((job: any) => {
        notifications.push({
            id: `job_${job.id}`,
            text: `New career opportunity: ${job.title} in ${job.department}.`,
            time: job.postedDate,
            isRead: readNotifications.includes(`job_${job.id}`),
            type: 'new'
        });
    });

    // Sort by id (newer first usually for this demo)
    return notifications.sort((a, b) => b.id.localeCompare(a.id));
};

export const getAnalyticsData = (campus?: string) => {
    const allApplications = getApplications();
    const allJobs = getJobs();

    // Filter by campus if provided
    const filteredApplications = campus
        ? allApplications.filter(app => app.campus === campus)
        : allApplications;

    const filteredJobs = campus
        ? allJobs.filter(job => job.location === campus)
        : allJobs;

    // Dynamic calculations based on filtered data
    const totalApplicants = filteredApplications.length;
    const openPositions = filteredJobs.filter(job => job.status === 'Open').length;
    const pendingApplications = filteredApplications.filter(app => ['Submitted', 'Under Review'].includes(app.status)).length;
    const shortlistedCandidates = filteredApplications.filter(app => app.status === 'Shortlisted').length;
    const rejectedApplications = filteredApplications.filter(app => app.status === 'Rejected').length;

    // Calculate trends based on the current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const hiredThisMonth = filteredApplications.filter(app => {
        const date = new Date(app.submittedDate);
        return app.status === 'Hired' && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const rejectedThisMonth = filteredApplications.filter(app => {
        const date = new Date(app.submittedDate);
        return app.status === 'Rejected' && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const staffingData = getStaffingData();
    const unfilledPositions = campus
        ? staffingData.filter(i => {
            const mapping: Record<string, string[]> = {
                'NAAP - Villamor Campus': ['Villamor'],
                'NAAP - Basa Air Base Campus': ['BAB', 'Basa'],
                'NAAP - Basa-Palmayo Extension Campus': ['Basa-Palmayo'],
                'NAAP - Fernando Air Base Campus': ['FAB', 'Fernando'],
                'NAAP - Mactan Campus': ['MBEAB', 'Mactan'],
                'NAAP - Mactan-Medellin Extension Campus': ['Mactan-Medellin']
            };
            const aliases = mapping[campus] || [campus];
            return i.status === 'Unfilled' && (aliases.includes(i.campus) || i.campus === campus);
        }).length
        : staffingData.filter(i => i.status === 'Unfilled').length;

    // Calculate distribution dynamically
    const statusCounts = filteredApplications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const applicationsByStatus = [
        { name: 'Submitted', value: statusCounts['Submitted'] || 0 },
        { name: 'Under Review', value: statusCounts['Under Review'] || 0 },
        { name: 'Shortlisted', value: statusCounts['Shortlisted'] || 0 },
        { name: 'Rejected', value: statusCounts['Rejected'] || 0 },
        { name: 'Hired', value: statusCounts['Hired'] || 0 },
    ];

    return {
        totalApplicants,
        openPositions,
        pendingApplications,
        shortlistedCandidates,
        rejectedApplications,
        hiredThisMonth: -1, // BUG: Return negative number
        rejectedThisMonth,
        unfilledPositions,

        // Data for "Applicants per Position" Bar Chart (Now dynamic)
        applicantsPerPosition: filteredJobs.map(job => ({
            position: job.title,
            applicants: job.applicantCount || 0
        })).sort((a, b) => b.applicants - a.applicants).slice(0, 5),

        // Data for "Hiring Timeline" Line Chart (Static)
        hiringTimeline: [
            { month: 'Jan', daysToHire: 45 },
            { month: 'Feb', daysToHire: 42 },
            { month: 'Mar', daysToHire: 38 },
            { month: 'Apr', daysToHire: 35 },
            { month: 'May', daysToHire: 30 },
            { month: 'Jun', daysToHire: 28 },
        ],

        // Data for "Application Status Distribution" Pie Chart
        applicationsByStatus,

        // Data for "Monthly / Annual Hiring Summary" Line Chart (Dynamic from apps)
        hiringSummary: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => {
            const monthApps = filteredApplications.filter(app => {
                const date = new Date(app.submittedDate);
                return date.getMonth() === i;
            });
            return {
                month: m,
                hired: monthApps.filter(a => a.status === 'Hired').length,
                rejected: monthApps.filter(a => a.status === 'Rejected').length
            };
        }),

        // Data for "Monthly Application Trends" Line Chart (Dynamic from apps)
        monthlyTrends: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => ({
            month: m,
            applications: filteredApplications.filter(app => {
                const date = new Date(app.submittedDate);
                return date.getMonth() === i;
            }).length
        })),
        jobs: filteredJobs
    };
};

// Staffing Monitoring Data from Google Sheet
export const mockStaffingData = [
    // --- VILLAMOR CAMPUS ---
    { id: 1, campus: 'Villamor', office: 'Legal Unit', position: 'Attorney IV', sg: 23, status: 'Unfilled' },
    { id: 2, campus: 'Villamor', office: 'Administrative and Finance', position: 'Supervising Administrative Officer', sg: 22, status: 'Filled' },
    { id: 3, campus: 'Villamor', office: 'ICT Unit', position: 'Information Technology Officer I', sg: 19, status: 'Unfilled' },
    { id: 4, campus: 'Villamor', office: 'Procurement Unit', position: 'Administrative Officer V', sg: 18, status: 'Filled' },
    { id: 5, campus: 'Villamor', office: 'Information Unit', position: 'Information Officer III', sg: 18, status: 'Unfilled' },
    { id: 6, campus: 'Villamor', office: 'Internal Audit Unit', position: 'Internal Auditor III', sg: 18, status: 'Unfilled' },
    { id: 7, campus: 'Villamor', office: 'Planning Unit', position: 'Planning Officer III', sg: 18, status: 'Unfilled' },
    { id: 8, campus: 'Villamor', office: 'Project Management Unit', position: 'Project Development Officer III', sg: 18, status: 'Filled' },
    { id: 9, campus: 'Villamor', office: 'Accounting Unit', position: 'Accountant II', sg: 16, status: 'Filled' },
    { id: 10, campus: 'Villamor', office: 'ICT Unit', position: 'Information Systems Analyst II', sg: 16, status: 'Unfilled' },
    { id: 11, campus: 'Villamor', office: 'Budget Unit', position: 'Administrative Officer IV', sg: 15, status: 'Filled' },
    { id: 12, campus: 'Villamor', office: 'HR Management Unit', position: 'Administrative Officer IV', sg: 15, status: 'Filled' },
    { id: 13, campus: 'Villamor', office: 'Records Unit', position: 'Administrative Officer III', sg: 14, status: 'Filled' },
    { id: 14, campus: 'Villamor', office: 'Supply Management Unit', position: 'Administrative Officer III', sg: 14, status: 'Filled' },
    { id: 15, campus: 'Villamor', office: 'Board Secretary', position: 'Board Secretary I', sg: 14, status: 'Unfilled' },
    { id: 16, campus: 'Villamor', office: 'Legal Unit', position: 'Legal Assistant III', sg: 14, status: 'Unfilled' },
    { id: 17, campus: 'Villamor', office: 'ICT Unit', position: 'Information Systems Analyst I', sg: 12, status: 'Filled' },
    { id: 18, campus: 'Villamor', office: 'Legal Unit', position: 'Legal Assistant II', sg: 12, status: 'Unfilled' },
    { id: 19, campus: 'Villamor', office: 'HR Management Unit', position: 'Administrative Officer II', sg: 11, status: 'Filled' },
    { id: 20, campus: 'Villamor', office: 'Information Unit', position: 'Information Officer I', sg: 11, status: 'Filled' },
    { id: 32, campus: 'Villamor', office: 'SUC Vice President', position: 'Administrative Aide VI', sg: 6, status: 'Unfilled' },

    // --- BAB CAMPUS ---
    { id: 101, campus: 'BAB', office: 'Campus Director', position: 'Administrative Officer V', sg: 18, status: 'Filled' },
    { id: 102, campus: 'BAB', office: 'Accounting Unit', position: 'Accountant II', sg: 16, status: 'Unfilled' },
    { id: 103, campus: 'BAB', office: 'Budget Unit', position: 'Administrative Officer IV', sg: 15, status: 'Filled' },
    { id: 104, campus: 'BAB', office: 'Procurement Unit', position: 'Administrative Officer III', sg: 14, status: 'Unfilled' },

    // --- FAB CAMPUS ---
    { id: 201, campus: 'FAB', office: 'Campus Director', position: 'Administrative Officer V', sg: 18, status: 'Filled' },
    { id: 202, campus: 'FAB', office: 'Accounting Unit', position: 'Accountant II', sg: 16, status: 'Unfilled' },

    // --- MBEAB CAMPUS ---
    { id: 301, campus: 'MBEAB', office: 'Campus Director', position: 'Administrative Officer V', sg: 18, status: 'Unfilled' },
    { id: 303, campus: 'MBEAB', office: 'Budget Unit', position: 'Administrative Officer IV', sg: 15, status: 'Unfilled' },
    { id: 304, campus: 'MBEAB', office: 'Procurement Unit', position: 'Administrative Officer III', sg: 14, status: 'Unfilled' },
    { id: 305, campus: 'MBEAB', office: 'Supply Unit', position: 'Administrative Officer I', sg: 10, status: 'Unfilled' },
    { id: 306, campus: 'MBEAB', office: 'Supply Unit', position: 'Administrative Assistant II', sg: 8, status: 'Unfilled' },
    { id: 308, campus: 'MBEAB', office: 'Records Unit', position: 'Administrative Aide VI', sg: 6, status: 'Unfilled' },
];

export const getStaffingData = () => {
    if (typeof window === 'undefined') return mockStaffingData;
    try {
        const localStaffing = JSON.parse(localStorage.getItem('mock_staffing_custom') || '[]');
        return mockStaffingData.map(item => {
            const override = localStaffing.find((l: any) => l.id === item.id);
            return override ? { ...item, ...override } : item;
        });
    } catch (e) {
        return mockStaffingData;
    }
};
};

// --- LANDING PAGE CMS DATA ---
export interface CMSPost {
    id: string;
    title: string;
    description: string;
    date?: string;
}

export interface CMSSection {
    title: string;
    subtitle: string;
    posts: CMSPost[];
}

export interface LandingPageContent {
    hired: CMSSection;
    perks: CMSSection;
    achievements: CMSSection;
}

const defaultCMSContent: LandingPageContent = {
    hired: {
        title: "Professionals Hired",
        subtitle: "Successful placements in the aviation industry",
        posts: [
            { id: '1', title: 'Top Gun Pilot', description: 'Joined as Chief Flight Instructor last month.', date: '2026-01-15' },
            { id: '2', title: 'Aviation Tech', description: 'Now leading the maintenance crew at Mactan.', date: '2026-02-01' }
        ]
    },
    perks: {
        title: "Perks",
        subtitle: "Employee Benefits & Rewards",
        posts: [
            { id: '1', title: 'Health & Wellness', description: 'Competitive health insurance for you and your family.' },
            { id: '2', title: 'Continuous Training', description: 'Regular workshops and certifications to keep you sharp.' }
        ]
    },
    achievements: {
        title: "Level 2",
        subtitle: "CSC PRIME-HRM Recognition",
        posts: [
            { id: '1', title: 'Maturity Level 2', description: 'Recognized for excellent HR management systems.', date: '2025-11-20' }
        ]
    }
};

export const getLandingPageContent = (): LandingPageContent => {
    if (typeof window === 'undefined') return defaultCMSContent;
    try {
        const localContent = localStorage.getItem('mock_cms_content');
        return localContent ? JSON.parse(localContent) : defaultCMSContent;
    } catch (e) {
        return defaultCMSContent;
    }
};

export const updateLandingPageContent = (newContent: LandingPageContent) => {
    if (typeof window === 'undefined') return;
    // localStorage.setItem('mock_cms_content', JSON.stringify(newContent)); // BUG: Persistence disabled
    window.dispatchEvent(new Event('storage'));
};
