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
            'Ensure regulatory compliance.',
            'Develop training curricula.',
            'Conduct instructor standardizations.'
        ],
        requirements: [
            'ATPL Holder.',
            'Minimum 2,500 flight hours.',
            '5+ years of instructional experience.',
            'Management experience is a plus.'
        ],
        salary: '₱120,000 - ₱150,000 per month',
        postedDate: '2026-01-15',
        deadline: '2026-02-28',
        applicantCount: 8,
        status: 'Open'
    },
    {
        id: '2',
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
        salary: '₱80,000 - ₱100,000 per month',
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
        salary: '₱60,000 - ₱80,000 per month',
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
        salary: '₱90,000 - ₱110,000 per month',
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
        salary: '₱35,000 - ₱45,000 per month',
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
        salary: '₱35,000 - ₱45,000 per month',
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
        salary: '₱40,000 - ₱55,000 per month',
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
        status: 'Open'
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
        if (rand < 0.35) return 'Submitted';
        if (rand < 0.65) return 'Under Review';
        if (rand < 0.85) return 'Rejected';
        if (rand < 0.95) return 'Shortlisted';
        return 'Hired';
    };

    for (let i = 1; i <= count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const jobTitle = positions[Math.floor(Math.random() * positions.length)];
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

export const mockApplications = generateMockApplications(124);

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
        icon: 'UserPlus',
        color: 'text-blue-500 bg-blue-100'
    },
    {
        id: 2,
        action: 'Job Posted',
        details: 'New position: Ground Instructor (Part-time)',
        time: '5 hours ago',
        icon: 'Briefcase',
        color: 'text-green-500 bg-green-100'
    },
    {
        id: 3,
        action: 'Interview Scheduled',
        details: 'Interview with Maria Santos confirmed',
        time: '1 day ago',
        icon: 'Calendar',
        color: 'text-purple-500 bg-purple-100'
    },
    {
        id: 4,
        action: 'Application Rejected',
        details: 'Ana Reyes - Flight Instructor',
        time: '1 day ago',
        icon: 'XCircle',
        color: 'text-red-500 bg-red-100'
    }
];

// Helper to get merged jobs (Mock + LocalStorage)
export const getJobs = () => {
    if (typeof window === 'undefined') return mockJobs;
    try {
        const localJobs = JSON.parse(localStorage.getItem('mock_jobs_custom') || '[]');
        // Combine local jobs with mock jobs, ensuring IDs don't collide or local overrides exist
        return [...localJobs, ...mockJobs];
    } catch (e) {
        console.error("Error reading jobs from localStorage", e);
        return mockJobs;
    }
};

// Helper to get merged applications (Mock + LocalStorage)
export const getApplications = () => {
    // Check if running in browser environment
    if (typeof window === 'undefined') return mockApplications;

    try {
        const localApps = JSON.parse(localStorage.getItem('mock_applications_custom') || '[]');
        return [...localApps, ...mockApplications];
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

export const getAnalyticsData = () => {
    const allApplications = getApplications();

    // Dynamic calculations based on mockApplications and mockJobs
    const totalApplicants = allApplications.length;
    const openPositions = mockJobs.filter(job => job.status === 'Open').length;
    const pendingApplications = allApplications.filter(app => ['Submitted', 'Under Review'].includes(app.status)).length;
    const shortlistedCandidates = allApplications.filter(app => app.status === 'Shortlisted').length;
    const rejectedApplications = allApplications.filter(app => app.status === 'Rejected').length;

    // Calculate distribution dynamically
    const statusCounts = allApplications.reduce((acc, app) => {
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

        // Data for "Applicants per Position" Bar Chart (Static for now, but could be dynamic)
        applicantsPerPosition: [
            { position: 'Flight Instructor', applicants: 45 },
            { position: 'Aircraft Mechanic', applicants: 30 },
            { position: 'Ground Instructor', applicants: 25 },
            { position: 'Admin Assistant', applicants: 15 },
            { position: 'HR Specialist', applicants: 9 },
        ],

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

        // Data for "Monthly / Annual Hiring Summary" Line Chart (Static)
        hiringSummary: [
            { month: 'Jan', hired: 2, rejected: 5 },
            { month: 'Feb', hired: 3, rejected: 8 },
            { month: 'Mar', hired: 5, rejected: 10 },
            { month: 'Apr', hired: 4, rejected: 7 },
            { month: 'May', hired: 6, rejected: 4 },
            { month: 'Jun', hired: 8, rejected: 6 },
        ],

        // Data for "Monthly Application Trends" Line Chart (Static)
        monthlyTrends: [
            { month: 'Jan', applications: 65 },
            { month: 'Feb', applications: 59 },
            { month: 'Mar', applications: 80 },
            { month: 'Apr', applications: 81 },
            { month: 'May', applications: 56 },
            { month: 'Jun', applications: 55 },
            { month: 'Jul', applications: 40 },
        ]
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

export const getStaffingData = () => mockStaffingData;
