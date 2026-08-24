import { 
  SliderItem, 
  MenuItem, 
  PageItem, 
  NewsItem, 
  EventItem, 
  GalleryItem, 
  FacilityItem, 
  ProgrammeItem, 
  AicteItem, 
  TickerItem, 
  WhyUsItem, 
  HomeSection,
  FooterConfig, 
  WebsiteSettings 
} from '../types';

export const initialSliders: SliderItem[] = [
  {
    id: 'slide-1',
    title: 'Excellence in Technical Education in Kodagu',
    subtitle: 'CAUVERY POLYTECHNIC, GONIKOPPAL',
    description: 'Empowering future engineers with hands-on technical skills, industry-ready curriculum, state-of-the-art laboratories, and dedicated placement support.',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'Explore Programmes',
    buttonUrl: '/programmes',
    secondaryButtonText: 'Apply for Admission',
    secondaryButtonUrl: '/admission',
    animationType: 'kenburns',
    animationDuration: 12,
    slideDuration: 7,
    overlayOpacity: 0.55,
    textPosition: 'left',
    displayOrder: 1,
    active: true,
  },
  {
    id: 'slide-2',
    title: 'Advanced Laboratories & Industrial Workshops',
    subtitle: 'INNOVATIVE LEARNING ENVIRONMENT',
    description: 'Equipped with modern CNC machines, computer clusters, electronics test benches, and survey instruments to bridge the gap between classroom and industry.',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1920&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'View Campus Facilities',
    buttonUrl: '/campus-facilities',
    secondaryButtonText: 'Watch Campus Tour',
    secondaryButtonUrl: '/gallery',
    animationType: 'zoom-in',
    animationDuration: 10,
    slideDuration: 7,
    overlayOpacity: 0.6,
    textPosition: 'left',
    displayOrder: 2,
    active: true,
  },
  {
    id: 'slide-3',
    title: 'Admissions Open for Academic Year 2026-27',
    subtitle: 'SECURE YOUR DIPLOMA SEAT TODAY',
    description: 'Join premier 3-Year Diploma courses in Computer Science, Mechanical, Civil, Electronics & Communication, and Automobile Engineering. Scholarships available.',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'Online Admission Portal',
    buttonUrl: '/admission',
    secondaryButtonText: 'Download Prospectus',
    secondaryButtonUrl: '/aicte',
    animationType: 'pan-left',
    animationDuration: 12,
    slideDuration: 7,
    overlayOpacity: 0.6,
    textPosition: 'center',
    displayOrder: 3,
    active: true,
  },
  {
    id: 'slide-4',
    title: '100% Placement & Career Mentorship Support',
    subtitle: 'SHAPING INDUSTRY LEADERS',
    description: 'Consistent recruitment drives from top engineering and IT companies across Bengaluru, Mysuru, and Mangaluru with active alumni mentorship.',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85',
    posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85',
    buttonText: 'Placement Records',
    buttonUrl: '/pages/placement-cell',
    secondaryButtonText: 'Contact Admissions',
    secondaryButtonUrl: '/contact',
    animationType: 'cinematic-scale',
    animationDuration: 10,
    slideDuration: 7,
    overlayOpacity: 0.6,
    textPosition: 'left',
    displayOrder: 4,
    active: true,
  }
];

export const initialMenus: MenuItem[] = [
  { id: 'm-home', title: 'Home', url: '/', order: 1, active: true },
  {
    id: 'm-about',
    title: 'About Us',
    url: '/pages/about-college',
    order: 2,
    active: true,
    children: [
      { id: 'm-about-college', title: 'About Cauvery Polytechnic', url: '/pages/about-college', pageId: 'about-college', order: 1, active: true, parentId: 'm-about' },
      { id: 'm-vision', title: 'Vision & Mission', url: '/pages/vision-mission', pageId: 'vision-mission', order: 2, active: true, parentId: 'm-about' },
      { id: 'm-principal', title: "Principal's Desk", url: '/pages/principals-desk', pageId: 'principals-desk', order: 3, active: true, parentId: 'm-about' },
      { id: 'm-governing', title: 'Governing Council', url: '/pages/governing-council', pageId: 'governing-council', order: 4, active: true, parentId: 'm-about' },
      { id: 'm-placement', title: 'Placement & Career Cell', url: '/pages/placement-cell', pageId: 'placement-cell', order: 5, active: true, parentId: 'm-about' }
    ]
  },
  {
    id: 'm-programmes',
    title: 'Programmes',
    url: '/programmes',
    order: 3,
    active: true,
    children: [
      { id: 'm-prog-cs', title: 'Computer Science & Engineering', url: '/programmes#cs', order: 1, active: true, parentId: 'm-programmes' },
      { id: 'm-prog-me', title: 'Mechanical Engineering', url: '/programmes#me', order: 2, active: true, parentId: 'm-programmes' },
      { id: 'm-prog-ce', title: 'Civil Engineering', url: '/programmes#ce', order: 3, active: true, parentId: 'm-programmes' },
      { id: 'm-prog-ec', title: 'Electronics & Communication', url: '/programmes#ec', order: 4, active: true, parentId: 'm-programmes' },
      { id: 'm-prog-ae', title: 'Automobile Engineering', url: '/programmes#ae', order: 5, active: true, parentId: 'm-programmes' }
    ]
  },
  {
    id: 'm-admission',
    title: 'Admissions',
    url: '/admission',
    order: 4,
    active: true,
    children: [
      { id: 'm-adm-online', title: 'Online Admission Application', url: '/admission', order: 1, active: true, parentId: 'm-admission' },
      { id: 'm-adm-fees', title: 'Fee Structure & Scholarships', url: '/pages/fee-structure', pageId: 'fee-structure', order: 2, active: true, parentId: 'm-admission' },
      { id: 'm-adm-eligibility', title: 'Eligibility Criteria', url: '/pages/eligibility-criteria', pageId: 'eligibility-criteria', order: 3, active: true, parentId: 'm-admission' }
    ]
  },
  { id: 'm-facilities', title: 'Campus & Facilities', url: '/campus-facilities', order: 5, active: true },
  {
    id: 'm-aicte',
    title: 'AICTE & Approvals',
    url: '/aicte',
    order: 6,
    active: true,
    children: [
      { id: 'm-aicte-eoa', title: 'AICTE EOA Approvals', url: '/aicte', order: 1, active: true, parentId: 'm-aicte' },
      { id: 'm-aicte-disclosure', title: 'Mandatory Disclosure', url: '/pages/mandatory-disclosure', pageId: 'mandatory-disclosure', order: 2, active: true, parentId: 'm-aicte' },
      { id: 'm-aicte-ragging', title: 'Anti-Ragging Committee', url: '/pages/anti-ragging', pageId: 'anti-ragging', order: 3, active: true, parentId: 'm-aicte' }
    ]
  },
  { id: 'm-gallery', title: 'Gallery', url: '/gallery', order: 7, active: true },
  { id: 'm-events', title: 'Events & News', url: '/events', order: 8, active: true },
  { id: 'm-contact', title: 'Contact Us', url: '/contact', order: 9, active: true }
];

export const initialPages: PageItem[] = [
  {
    id: 'about-college',
    title: 'About Cauvery Polytechnic, Gonikoppal',
    slug: 'about-college',
    featuredImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Welcome to Cauvery Polytechnic, Gonikoppal</h2>
<p class="lead">Established with the noble mission of delivering world-class technical diploma education in the picturesque district of Kodagu, Karnataka, Cauvery Polytechnic has been a cornerstone in shaping competent, socially conscious, and industry-ready engineering professionals.</p>
<p>Recognized by the <strong>All India Council for Technical Education (AICTE), New Delhi</strong> and approved by the <strong>Directorate of Technical Education (DTE), Government of Karnataka</strong>, our institution provides comprehensive 3-year Diploma programmes engineered to meet contemporary industry standards.</p>
<h3>Our Campus & Heritage</h3>
<p>Nestled in the lush greenery of Gonikoppal in South Kodagu, the campus provides a serene, pollution-free atmosphere conducive to focused academic rigor and holistic student development. Spread across expansive acres, our infrastructure comprises modern lecture halls, advanced computer and network laboratories, mechanical workshops, civil engineering testing labs, a rich central library, and spacious athletic grounds.</p>
<h3>Salient Institutional Strengths</h3>
<ul>
  <li><strong>AICTE Approved & DTE Karnataka Affiliated:</strong> Standardized curriculum with regular syllabus upgrades conforming to NEP & skill standards.</li>
  <li><strong>Distinguished Faculty:</strong> Passionate academicians and seasoned industry mentors providing personalized student guidance.</li>
  <li><strong>Hands-On Practical Training:</strong> Heavy emphasis on laboratory experiments, industrial visits, prototype building, and technical seminars.</li>
  <li><strong>Proactive Placement Cell:</strong> Robust recruitment network connecting students with major manufacturing and technology enterprises in Bengaluru, Mysuru, and Mangaluru.</li>
  <li><strong>Scholarship & Financial Assistance:</strong> Full facilitation of SSP, NSP, and merit-cum-means scholarships for deserving students.</li>
</ul>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'About Cauvery Polytechnic | Premier Diploma College in Gonikoppal, Kodagu',
    seoDescription: 'Discover the rich legacy, academic excellence, and world-class infrastructure of Cauvery Polytechnic, Gonikoppal in South Kodagu.',
    sidebarWidgets: ['news', 'events', 'contact', 'downloads'],
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-08-20T14:30:00.000Z'
  },
  {
    id: 'vision-mission',
    title: 'Vision, Mission & Quality Policy',
    slug: 'vision-mission',
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Institutional Vision</h2>
<blockquote class="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg my-4 text-lg italic text-slate-800">
"To emerge as a premier technical institution of academic excellence that nurtures skilled, innovative, and ethically grounded technicians capable of contributing meaningfully to sustainable technological and socio-economic progress."
</blockquote>
<h2>Institutional Mission</h2>
<ul class="space-y-3">
  <li><strong>M1 - Academic Excellence:</strong> Deliver high-quality diploma education through innovative teaching methodologies, practical learning, and state-of-the-art laboratory infrastructure.</li>
  <li><strong>M2 - Skill Development:</strong> Foster technical proficiency, problem-solving abilities, and lifelong learning attitudes aligned with modern industry dynamics.</li>
  <li><strong>M3 - Industry Collaboration:</strong> Forge strong partnerships with industrial sectors for internships, expert guest lectures, workshops, and placement opportunities.</li>
  <li><strong>M4 - Ethical & Social Responsibility:</strong> Cultivate ethical values, environmental sustainability, leadership qualities, and social accountability in all our graduates.</li>
</ul>
<h2>Core Values</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div class="p-4 bg-slate-50 border rounded-lg">
    <h4 class="font-bold text-blue-900">Integrity & Ethics</h4>
    <p class="text-sm text-slate-600">Fostering transparency, honesty, and professional ethics across all student and institutional endeavors.</p>
  </div>
  <div class="p-4 bg-slate-50 border rounded-lg">
    <h4 class="font-bold text-blue-900">Innovation</h4>
    <p class="text-sm text-slate-600">Encouraging curiosity, project-based engineering, and creative technological problem-solving.</p>
  </div>
  <div class="p-4 bg-slate-50 border rounded-lg">
    <h4 class="font-bold text-blue-900">Inclusivity</h4>
    <p class="text-sm text-slate-600">Providing equal opportunities and nurturing growth for students from all socio-economic backgrounds.</p>
  </div>
</div>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'Vision & Mission | Cauvery Polytechnic Gonikoppal',
    seoDescription: 'The core vision, mission statements, and pedagogical goals guiding Cauvery Polytechnic Gonikoppal.',
    sidebarWidgets: ['news', 'downloads'],
    createdAt: '2026-01-16T10:00:00.000Z',
    updatedAt: '2026-08-18T11:00:00.000Z'
  },
  {
    id: 'principals-desk',
    title: "From the Principal's Desk",
    slug: 'principals-desk',
    featuredImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Message from the Principal</h2>
<div class="my-4 flex flex-col md:flex-row gap-6 items-start">
  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Principal Photo" class="w-48 h-56 object-cover rounded-xl shadow-md border" />
  <div>
    <h3 class="text-xl font-bold text-blue-950">Prof. K. B. Pemmaiah, M.Tech, MISTE</h3>
    <p class="text-amber-700 font-semibold mb-3">Principal, Cauvery Polytechnic Gonikoppal</p>
    <p class="text-slate-700 leading-relaxed">"Welcome to Cauvery Polytechnic, Gonikoppal — an institution where young minds are transformed into competent technocrats, creative thinkers, and responsible global citizens."</p>
  </div>
</div>
<p>In today's rapidly transforming industrial landscape, technical diploma education plays a pivotal role in providing the hands-on expertise and practical foundation required by modern manufacturing, software, infrastructure, and automotive sectors. At Cauvery Polytechnic, we believe that education extends beyond theoretical textbooks; it thrives within laboratories, workshop machinery, live simulations, and real-world project challenges.</p>
<p>Our dedicated faculty members continuously adopt student-centric pedagogy, incorporating modern audio-visual learning aids, digital resources, and industry-oriented workshops. Our vibrant campus life also encourages active participation in sports, technical symposia, and cultural activities, ensuring well-rounded character building.</p>
<p>I warmly invite aspiring 10th standard and ITI pass-out students to embark on a fulfilling educational voyage with us. Let us build a promising future together!</p>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: "Principal's Desk | Cauvery Polytechnic Gonikoppal",
    seoDescription: "Read the inspiring message and leadership philosophy from the Principal of Cauvery Polytechnic, Gonikoppal.",
    sidebarWidgets: ['news', 'events', 'contact'],
    createdAt: '2026-01-16T11:00:00.000Z',
    updatedAt: '2026-08-19T09:15:00.000Z'
  },
  {
    id: 'placement-cell',
    title: 'Training & Placement Cell',
    slug: 'placement-cell',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Career Development & Campus Placements</h2>
<p class="lead">The Training and Placement Cell at Cauvery Polytechnic acts as an active interface between students and renowned corporate employers, ensuring students are well-prepared for competitive campus interviews and career paths.</p>
<h3>Our Placement Highlights</h3>
<ul>
  <li><strong>Pre-Placement Soft Skills Training:</strong> Regular sessions on aptitude, technical interviewing, resume writing, and interpersonal communication.</li>
  <li><strong>Industry Internship Opportunities:</strong> Mandatory industry internships for final-year diploma students to gain live industrial exposure.</li>
  <li><strong>On-Campus & Pool Drives:</strong> Annual recruitment drives hosted on campus with top recruiters from Bengaluru, Mysuru, and Hosur.</li>
  <li><strong>Alumni Mentorship Network:</strong> Active guidance from alumni thriving across prominent multinational enterprises and government departments.</li>
</ul>
<h3>Key Recruiting Partners</h3>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-center">
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">L&T Construction</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Toyota Kirloskar Auto</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Bosch Limited</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Infosys BPM</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">TVS Motors</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Schneider Electric</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Tata Advanced Systems</div>
  <div class="p-4 bg-slate-50 border rounded-lg font-semibold text-slate-800">Wipro Infrastructure</div>
</div>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'Placement & Career Cell | Cauvery Polytechnic Gonikoppal',
    seoDescription: 'Explore placement statistics, top recruiting companies, and career training programs at Cauvery Polytechnic.',
    sidebarWidgets: ['news', 'events', 'contact'],
    createdAt: '2026-01-17T12:00:00.000Z',
    updatedAt: '2026-08-21T10:00:00.000Z'
  },
  {
    id: 'fee-structure',
    title: 'Fee Structure & Scholarships',
    slug: 'fee-structure',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Fee Structure (Academic Year 2026-27)</h2>
<p>The fee structure for all 3-Year Diploma programmes at Cauvery Polytechnic is strictly regulated as per the norms prescribed by the Government of Karnataka and the Directorate of Technical Education (DTE).</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left border-collapse border border-slate-200">
    <thead>
      <tr class="bg-blue-900 text-white">
        <th class="p-3 border">Programme</th>
        <th class="p-3 border">Duration</th>
        <th class="p-3 border">Government Quota Fee (Annual)</th>
        <th class="p-3 border">Management Quota Fee (Annual)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200">
      <tr>
        <td class="p-3 border font-medium">Diploma in Computer Science & Engg</td>
        <td class="p-3 border">3 Years (6 Sems)</td>
        <td class="p-3 border">As per DTE Norms</td>
        <td class="p-3 border">Affordable / Subsidized</td>
      </tr>
      <tr>
        <td class="p-3 border font-medium">Diploma in Mechanical Engineering</td>
        <td class="p-3 border">3 Years (6 Sems)</td>
        <td class="p-3 border">As per DTE Norms</td>
        <td class="p-3 border">Affordable / Subsidized</td>
      </tr>
      <tr>
        <td class="p-3 border font-medium">Diploma in Civil Engineering</td>
        <td class="p-3 border">3 Years (6 Sems)</td>
        <td class="p-3 border">As per DTE Norms</td>
        <td class="p-3 border">Affordable / Subsidized</td>
      </tr>
      <tr>
        <td class="p-3 border font-medium">Diploma in Electronics & Communication</td>
        <td class="p-3 border">3 Years (6 Sems)</td>
        <td class="p-3 border">As per DTE Norms</td>
        <td class="p-3 border">Affordable / Subsidized</td>
      </tr>
      <tr>
        <td class="p-3 border font-medium">Diploma in Automobile Engineering</td>
        <td class="p-3 border">3 Years (6 Sems)</td>
        <td class="p-3 border">As per DTE Norms</td>
        <td class="p-3 border">Affordable / Subsidized</td>
      </tr>
    </tbody>
  </table>
</div>
<h2>Available Scholarships & Financial Aid</h2>
<ul class="list-disc pl-6 space-y-2 text-slate-700">
  <li><strong>State Scholarship Portal (SSP):</strong> Fee concession and post-matric scholarships for SC, ST, OBC, and Minorities provided by Karnataka State Government.</li>
  <li><strong>National Scholarship Portal (NSP):</strong> AICTE Pragati Scholarship for Girl Students, AICTE Saksham Scholarship for differently-abled students.</li>
  <li><strong>Kodagu District Merit Scholarships:</strong> Special fee waivers for meritorious local students from rural schools in Kodagu.</li>
</ul>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'Fee Structure & Scholarships | Cauvery Polytechnic Gonikoppal',
    seoDescription: 'Official fee structure, government quotas, and comprehensive scholarship details for Cauvery Polytechnic.',
    sidebarWidgets: ['downloads', 'contact'],
    createdAt: '2026-01-18T10:00:00.000Z',
    updatedAt: '2026-08-20T16:00:00.000Z'
  },
  {
    id: 'mandatory-disclosure',
    title: 'AICTE Mandatory Disclosure',
    slug: 'mandatory-disclosure',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>AICTE Mandatory Public Disclosure</h2>
<p>In accordance with AICTE regulations, the following information is made publicly available for the benefit of students, parents, and statutory authorities.</p>
<div class="space-y-4 my-6">
  <div class="p-4 border rounded-lg bg-slate-50">
    <h4 class="font-bold text-slate-900">1. Institution Name & Address</h4>
    <p class="text-slate-600 text-sm">Cauvery Polytechnic, Gonikoppal, Ponnampet Taluk, Kodagu District, Karnataka - 571213</p>
  </div>
  <div class="p-4 border rounded-lg bg-slate-50">
    <h4 class="font-bold text-slate-900">2. Approval & Affiliation Details</h4>
    <p class="text-slate-600 text-sm">AICTE Permanent Institute ID: 1-XXXXXXX | DTE Karnataka College Code: 494</p>
  </div>
  <div class="p-4 border rounded-lg bg-slate-50">
    <h4 class="font-bold text-slate-900">3. Grievance Redressal Mechanism</h4>
    <p class="text-slate-600 text-sm">Online and offline Grievance Redressal Committee active with dedicated ombudsman.</p>
  </div>
</div>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'AICTE Mandatory Disclosure | Cauvery Polytechnic',
    seoDescription: 'Official AICTE Mandatory Disclosure and statutory compliances for Cauvery Polytechnic Gonikoppal.',
    sidebarWidgets: ['downloads'],
    createdAt: '2026-01-19T09:00:00.000Z',
    updatedAt: '2026-08-19T09:00:00.000Z'
  },
  {
    id: 'anti-ragging',
    title: 'Anti-Ragging Committee & Discipline Policy',
    slug: 'anti-ragging',
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    content: `<h2>Zero Tolerance Anti-Ragging Policy</h2>
<p class="lead">Cauvery Polytechnic maintains a strict <strong>Zero Tolerance Policy</strong> towards ragging in any form within the campus premises, laboratories, hostels, and college transportation.</p>
<p>In compliance with the Hon'ble Supreme Court of India directives and AICTE regulations, our Anti-Ragging Squad and Committee remain on 24/7 vigil throughout the academic year.</p>
<div class="p-4 bg-red-50 border border-red-200 rounded-xl my-6 text-red-900">
  <h4 class="font-bold mb-2">24x7 Anti-Ragging Helpline</h4>
  <p class="text-sm">National Toll-Free Helpline: <strong>1800-180-5522</strong></p>
  <p class="text-sm">College Anti-Ragging Cell: <strong>+91 8274 247385 / 94481 23456</strong></p>
  <p class="text-sm">Email: <strong>antiragging@cauverypolytechnic.edu.in</strong></p>
</div>`,
    layout: 'sidebar',
    status: 'published',
    seoTitle: 'Anti-Ragging Policy & Committee | Cauvery Polytechnic',
    seoDescription: 'Zero tolerance anti-ragging measures and contact squad details at Cauvery Polytechnic Gonikoppal.',
    sidebarWidgets: ['contact', 'downloads'],
    createdAt: '2026-01-20T10:00:00.000Z',
    updatedAt: '2026-08-20T10:00:00.000Z'
  }
];

export const initialProgrammes: ProgrammeItem[] = [
  {
    id: 'prog-cs',
    name: 'Computer Science & Engineering',
    code: 'CSE-494',
    duration: '3 Years (6 Semesters)',
    intake: 60,
    eligibility: 'Pass in 10th Standard (SSLC) or equivalent with minimum 35% marks in Mathematics and Science.',
    description: 'A comprehensive curriculum covering software development, web & cloud engineering, artificial intelligence fundamentals, database management, Python, Java, and cyber security.',
    highlights: [
      'Dedicated High-Speed Computing Center with Gigabit Fiber',
      'Hands-on Web, Full-Stack & Python Programming Labs',
      'Training on Cloud Computing, Linux, and Modern Databases',
      'Regular Hackathons & Tech Project Mentorship'
    ],
    careers: ['Software Developer', 'Web Application Engineer', 'System Administrator', 'Database Executive', 'Cloud Support Specialist', 'Higher Studies (B.E / B.Tech Direct 2nd Year Entry)'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    active: true,
    displayOrder: 1,
    hodName: 'Prof. Ramesh K. S., M.Tech (CSE)',
    hodMessage: 'Our students develop real-world problem-solving abilities that enable them to compete confidently with university graduates.'
  },
  {
    id: 'prog-me',
    name: 'Mechanical Engineering',
    code: 'ME-494',
    duration: '3 Years (6 Semesters)',
    intake: 60,
    eligibility: 'Pass in 10th Standard (SSLC) or equivalent with minimum 35% marks.',
    description: 'Focuses on design, manufacturing, thermodynamics, CAD/CAM modelling, CNC machine operations, hydraulics, and modern robotics.',
    highlights: [
      'Comprehensive Machine Shop with Lathes, Millers & Shapers',
      'Modern CNC Simulator and CAD Design Workstations',
      'Thermal & Fluid Mechanics Experimental Laboratory',
      'Heavy Foundry and Welding Technology Workshops'
    ],
    careers: ['Junior Mechanical Engineer', 'CAD/CAM Designer', 'Quality Assurance Inspector', 'Production Supervisor', 'CNC Programmer', 'Lateral Entry to B.E Mechanical'],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    active: true,
    displayOrder: 2,
    hodName: 'Prof. Suresh Kumar, M.E (Machine Design)',
    hodMessage: 'Mechanical Engineering is the bedrock of industry. We ensure every student gains deep tactile expertise in metalworking and modern fabrication.'
  },
  {
    id: 'prog-ce',
    name: 'Civil Engineering',
    code: 'CE-494',
    duration: '3 Years (6 Semesters)',
    intake: 60,
    eligibility: 'Pass in 10th Standard (SSLC) or equivalent with minimum 35% marks.',
    description: 'Imparts theoretical knowledge and field practices in structural engineering, total station surveying, environmental engineering, soil mechanics, and construction management.',
    highlights: [
      'Advanced Surveying Lab with Electronic Total Stations and GPS',
      'Material Testing Lab for Concrete, Steel & Bitumen',
      'AutoCAD & Civil 3D Structural Modelling Center',
      'Extensive Field Survey Camps in scenic Kodagu topography'
    ],
    careers: ['Site Engineer', 'Structural Draftsman', 'Surveyor & GIS Assistant', 'Government PWD / Irrigation Executive', 'Quality Control Inspector'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    active: true,
    displayOrder: 3,
    hodName: 'Prof. Anitha B. C., M.Tech (Structural Engg)',
    hodMessage: 'Civil Engineers build the infrastructure of our nation. We combine rigorous survey field work with software design skills.'
  },
  {
    id: 'prog-ec',
    name: 'Electronics & Communication Engineering',
    code: 'ECE-494',
    duration: '3 Years (6 Semesters)',
    intake: 60,
    eligibility: 'Pass in 10th Standard (SSLC) or equivalent with minimum 35% marks.',
    description: 'Explores microcontrollers, embedded systems, Internet of Things (IoT), VLSI, wireless telecommunications, and digital signal processing.',
    highlights: [
      'Dedicated Microcontroller, Arduino & Raspberry Pi IoT Lab',
      'Digital Communication & Fiber Optics Test Equipment',
      'PCB Design and Soldering Prototyping Workbenches',
      'Industrial Automation & Sensor Interfacing'
    ],
    careers: ['Embedded Systems Technician', 'Telecom Network Engineer', 'PCB Layout Designer', 'Hardware Test Associate', 'Consumer Electronics Specialist'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    active: true,
    displayOrder: 4,
    hodName: 'Prof. Divya M. P., M.Tech (VLSI & Embedded)',
    hodMessage: 'From smart IoT sensors to 5G communication, our students master the circuitry powering today’s connected planet.'
  },
  {
    id: 'prog-ae',
    name: 'Automobile Engineering',
    code: 'AUTO-494',
    duration: '3 Years (6 Semesters)',
    intake: 60,
    eligibility: 'Pass in 10th Standard (SSLC) or equivalent with minimum 35% marks.',
    description: 'Specialized programme covering internal combustion engines, electric vehicle (EV) technologies, transmission systems, automotive electronics, and vehicular diagnostics.',
    highlights: [
      'Full Vehicle Cut-Section Engine & Transmission Models',
      'Modern Electric Vehicle (EV) Powertrain Demonstration Rig',
      'Computerized Engine Diagnostic Scan Tools & Wheel Balancer',
      'Collaborations with Regional Automotive Dealerships & Service Hubs'
    ],
    careers: ['Automotive Service Engineer', 'EV Maintenance Technician', 'Vehicle Diagnostic Specialist', 'Fleet Maintenance Manager', 'Automobile Insurance Surveyor'],
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    active: true,
    displayOrder: 5,
    hodName: 'Prof. Manjunath N., M.Tech (Automotive Engg)',
    hodMessage: 'With the revolutionary transition to Electric Vehicles, our graduates are equipped with both traditional ICE and modern EV technologies.'
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Admissions Open for Diploma Batch 2026-27 with Special Scholarships',
    slug: 'admissions-open-2026-27',
    shortDescription: 'Cauvery Polytechnic invites online applications from SSLC/10th and ITI passed candidates for all 5 major diploma engineering disciplines.',
    fullContent: `<p>Cauvery Polytechnic, Gonikoppal has officially commenced admissions for the upcoming academic year 2026-27. Candidates who have passed 10th standard (SSLC), CBSE/ICSE, or 2-year ITI are eligible for admission to the first and direct second year (lateral entry) respectively.</p>
<p>Key Highlights for 2026-27 Admission Aspirants:</p>
<ul>
  <li>Special Merit Fee concessions for students scoring above 85% in SSLC.</li>
  <li>Full facilitation of Karnataka State Government SSP Scholarships for eligible SC/ST/OBC/Minority students.</li>
  <li>Free bus transportation passes facilitated through KSRTC.</li>
  <li>Direct counseling support and spot admission at the college administrative office.</li>
</ul>
<p>Interested candidates can fill the online application form on our website or visit the campus admission desk directly from Monday to Saturday between 9:00 AM and 4:30 PM.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    category: 'Admissions',
    author: 'Admission Cell',
    publishedDate: '2026-08-20',
    priority: true,
    status: 'published',
    isTickerItem: true,
    createdAt: '2026-08-20T08:00:00.000Z'
  },
  {
    id: 'news-2',
    title: 'Annual State-Level Polytechnic Technical Symposium & Project Expo 2026',
    slug: 'tech-symposium-project-expo-2026',
    shortDescription: 'Over 40 engineering colleges to participate in the grand project exhibition and paper presentation hosted at our campus.',
    fullContent: `<p>The Department of Technical Education and Cauvery Polytechnic are proud to host 'Kodagu TechExpo 2026', a prestigious state-level technical symposium bringing together over 500 budding diploma engineers from across Karnataka.</p>
<p>Event categories include Working Project Prototypes, CAD Modelling Competition, Circuit Debugging, Coding Hackathon, and Poster Presentations with attractive cash awards and certificates.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    category: 'Events',
    author: 'Principal Office',
    publishedDate: '2026-08-15',
    priority: true,
    status: 'published',
    isTickerItem: true,
    createdAt: '2026-08-15T09:30:00.000Z'
  },
  {
    id: 'news-3',
    title: 'Major Campus Placement Drive: 85+ Students Secure Job Offers',
    slug: 'campus-placement-drive-success-2026',
    shortDescription: 'Leading engineering conglomerates conduct joint pool campus interviews with attractive salary packages for final-year students.',
    fullContent: `<p>Cauvery Polytechnic witnessed an outstanding placement season with over 85 students from Computer Science, Mechanical, Civil, and Electronics securing pre-graduation employment letters from top firms including Toyota, TVS, Bosch, and L&T.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Placements',
    author: 'Placement Officer',
    publishedDate: '2026-08-10',
    priority: false,
    status: 'published',
    isTickerItem: true,
    createdAt: '2026-08-10T11:00:00.000Z'
  },
  {
    id: 'news-4',
    title: 'AICTE Extension of Approval (EOA) Successfully Renewed for 2026-27',
    slug: 'aicte-approval-renewed-2026-27',
    shortDescription: 'AICTE New Delhi grants seamless Extension of Approval praising institutional infrastructure, faculty credentials, and laboratory standards.',
    fullContent: `<p>The All India Council for Technical Education (AICTE), New Delhi has officially renewed the Extension of Approval (EOA) for Cauvery Polytechnic Gonikoppal for all existing engineering streams for the academic year 2026-27.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    category: 'AICTE',
    author: 'Academic Council',
    publishedDate: '2026-08-05',
    priority: false,
    status: 'published',
    isTickerItem: false,
    createdAt: '2026-08-05T10:00:00.000Z'
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'State-Level Polytechnic Technical Symposium & Hackathon',
    description: 'A vibrant 2-day technical festival featuring project exhibitions, code jams, Robo-Race, and industry keynote lectures.',
    date: '2026-09-18',
    time: '09:30 AM - 05:00 PM',
    venue: 'Cauvery Auditorium & Campus Workshop Arena',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    registrationUrl: '/contact',
    status: 'published',
    order: 1,
    category: 'Technical',
    createdAt: '2026-08-15T10:00:00.000Z'
  },
  {
    id: 'event-2',
    title: 'Mega Campus Placement & Career Fair 2026',
    description: 'Open to all final-year diploma students and recent graduates. Over 20 manufacturing and software companies participating.',
    date: '2026-10-08',
    time: '09:00 AM - 04:30 PM',
    venue: 'Main Seminar Hall & Placement Wing',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    registrationUrl: '/pages/placement-cell',
    status: 'published',
    order: 2,
    category: 'Placement',
    createdAt: '2026-08-16T11:00:00.000Z'
  },
  {
    id: 'event-3',
    title: 'Annual Sports Meet & Athletic Championship',
    description: 'Inter-departmental track and field events, cricket tournament, volleyball, shuttle badminton, and tug-of-war championship.',
    date: '2026-11-14',
    time: '08:30 AM - 05:30 PM',
    venue: 'College Athletic Stadium Ground',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    order: 3,
    category: 'Sports',
    createdAt: '2026-08-17T12:00:00.000Z'
  },
  {
    id: 'event-4',
    title: 'National Engineers Day Celebration & Guest Lecture',
    description: 'Commemorating Sir M. Visvesvaraya with distinguished guest lectures by chief engineers and student technical presentations.',
    date: '2026-09-15',
    time: '10:00 AM - 01:00 PM',
    venue: 'Sir M.V. Seminar Complex',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    order: 4,
    category: 'Celebration',
    createdAt: '2026-08-18T10:00:00.000Z'
  }
];

export const initialFacilities: FacilityItem[] = [
  {
    id: 'fac-1',
    title: 'Advanced Computing & AI Center',
    shortDesc: 'Modern computing infrastructure with high-performance desktop machines, high-speed fiber internet, and developer software suites.',
    fullDesc: 'The Computer Center houses 180+ modern systems configured with multi-core processors, SSD storage, licensed software for CAD, Python, Java, Database servers, and dedicated gigabit fiber backbone for seamless research and coding.',
    icon: 'Laptop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Academic',
    displayOrder: 1,
    active: true,
    features: ['180+ High Performance Workstations', 'Gigabit Leased Line Fiber Connection', 'Linux & Windows Dual Boot Environments', 'UPS Power Backup & Air Conditioned']
  },
  {
    id: 'fac-2',
    title: 'Mechanical Workshop & CNC Complex',
    shortDesc: 'Fully equipped machine shops, CNC milling, welding booths, and carpentry units for tactile manufacturing training.',
    fullDesc: 'Spread across 8,000 sq.ft., the workshop includes heavy-duty precision lathes, radial drilling machines, universal milling machines, CNC simulator stations, arc/TIG welding bays, and foundry testing rigs.',
    icon: 'Wrench',
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Laboratories',
    displayOrder: 2,
    active: true,
    features: ['Precision Lathes & Universal Milling Machines', 'Computerized CNC Simulator', 'Arc, Gas & TIG Welding Section', 'Material Testing & Hardness Testing Apparatus']
  },
  {
    id: 'fac-3',
    title: 'Central Digital Library & Resource Center',
    shortDesc: 'A rich repository of over 15,000 technical volumes, national journals, e-books, and quiet reading halls.',
    fullDesc: 'The library features an automated barcode cataloging system, DELNET access, competitive exam preparation section, and a dedicated digital library wing with high-speed terminals for accessing IEEE, NPTEL, and e-learning resources.',
    icon: 'BookOpen',
    images: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Academic',
    displayOrder: 3,
    active: true,
    features: ['15,000+ Physical Engineering Volumes', 'Subscription to 30+ National Technical Journals', 'E-Library with NPTEL Video Lectures', 'Spacious 120-Seat Reading Hall']
  },
  {
    id: 'fac-4',
    title: 'Smart Interactive Classrooms',
    shortDesc: 'Ergonomic lecture halls equipped with ceiling mounted projectors, smart displays, and acoustic design.',
    fullDesc: 'All lecture halls are spacious, well-ventilated, and equipped with modern multimedia projectors, interactive whiteboards, and high-quality sound systems to enable dynamic visual pedagogy.',
    icon: 'Presentation',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Academic',
    displayOrder: 4,
    active: true,
    features: ['Multimedia Projectors & Audio Systems', 'Comfortable Ergonomic Seating', 'Wi-Fi Enabled Digital Learning', 'Natural Daylight and Ventilation']
  },
  {
    id: 'fac-5',
    title: 'Sports Arena & Athletic Ground',
    shortDesc: 'Expansive outdoor playground for cricket, football, volleyball and well-equipped indoor recreation room.',
    fullDesc: 'Our students regularly represent the college at DTE State-Level athletic championships. We provide dedicated cricket pitch, volleyball court, badminton arena, table tennis, chess, and carrom facilities.',
    icon: 'Trophy',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Sports',
    displayOrder: 5,
    active: true,
    features: ['Standard 400m Running Track Ground', 'Dedicated Volleyball & Badminton Courts', 'Indoor Table Tennis & Chess Hall', 'Annual Inter-College Sports Sponsorship']
  },
  {
    id: 'fac-6',
    title: 'College Transportation & Hostel Support',
    shortDesc: 'Dedicated bus fleet connecting major towns in Kodagu and student hostel advisory services.',
    fullDesc: 'Fleet of well-maintained college buses operates across Gonikoppal, Virajpet, Ponnampet, Kushalnagar, and neighboring localities, ensuring safe and punctual commuting for students and faculty.',
    icon: 'Bus',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Campus',
    displayOrder: 6,
    active: true,
    features: ['Dedicated Bus Routes across South Kodagu', 'Assisted Clean Hostel Facilities for Boys & Girls', 'Hygienic Campus Cafeteria', 'First-Aid Medical Room with Visiting Doctor']
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Academic Block & Lush Green Campus',
    description: 'Serene view of Cauvery Polytechnic surrounded by the greenery of Gonikoppal, Kodagu.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    category: 'Campus',
    displayOrder: 1,
    active: true,
    uploadedAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'gal-2',
    title: 'Advanced Computer Science Laboratory',
    description: 'Students engaged in coding and software development practical sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    category: 'Labs',
    displayOrder: 2,
    active: true,
    uploadedAt: '2026-08-02T11:00:00.000Z'
  },
  {
    id: 'gal-3',
    title: 'Mechanical Workshop & Lathe Operations',
    description: 'Hands-on metal fabrication and turning practicals under faculty supervision.',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    category: 'Labs',
    displayOrder: 3,
    active: true,
    uploadedAt: '2026-08-03T12:00:00.000Z'
  },
  {
    id: 'gal-4',
    title: 'Annual Technical Project Expo & Exhibition',
    description: 'Student prototype demonstrations for industry judges and visitors.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech Fest',
    displayOrder: 4,
    active: true,
    uploadedAt: '2026-08-04T13:00:00.000Z'
  },
  {
    id: 'gal-5',
    title: 'Graduation Day & Diploma Award Ceremony',
    description: 'Proud graduating batch receiving diploma completion certificates.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    category: 'Convocation',
    displayOrder: 5,
    active: true,
    uploadedAt: '2026-08-05T14:00:00.000Z'
  },
  {
    id: 'gal-6',
    title: 'Inter-Departmental Cricket & Sports Championship',
    description: 'Students competing in the annual sports tournament on college grounds.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    category: 'Sports',
    displayOrder: 6,
    active: true,
    uploadedAt: '2026-08-06T15:00:00.000Z'
  },
  {
    id: 'gal-7',
    title: 'Electronics & Microcontroller Practical Lab',
    description: 'Circuit testing and IoT sensor calibration sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    category: 'Labs',
    displayOrder: 7,
    active: true,
    uploadedAt: '2026-08-07T16:00:00.000Z'
  },
  {
    id: 'gal-8',
    title: 'Kodava Cultural Heritage Day Celebrations',
    description: 'Vibrant cultural performances showcasing the rich heritage of Kodagu.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    category: 'Cultural',
    displayOrder: 8,
    active: true,
    uploadedAt: '2026-08-08T17:00:00.000Z'
  }
];

export const initialWhyUs: WhyUsItem[] = [
  {
    id: 'why-1',
    iconName: 'Award',
    title: 'AICTE & DTE Recognized',
    description: 'Fully accredited 3-year technical diploma curriculum aligned with National Skill Qualification Framework (NSQF) standards.',
    displayOrder: 1,
    active: true
  },
  {
    id: 'why-2',
    iconName: 'Briefcase',
    title: '100% Placement Support',
    description: 'Dedicated recruitment drives with top conglomerates across Bengaluru, Mysuru, and Mangaluru ensuring early career starts.',
    displayOrder: 2,
    active: true
  },
  {
    id: 'why-3',
    iconName: 'Cpu',
    title: 'State-of-the-Art Laboratories',
    description: 'Cutting-edge computer labs, modern CNC machinery, civil testing equipment, and automobile diagnostic bays.',
    displayOrder: 3,
    active: true
  },
  {
    id: 'why-4',
    iconName: 'GraduationCap',
    title: 'Experienced Faculty Mentors',
    description: 'Seasoned academicians and engineering mentors offering personalized attention and practical project guidance.',
    displayOrder: 4,
    active: true
  },
  {
    id: 'why-5',
    iconName: 'Trees',
    title: "Kodagu's Serene Green Campus",
    description: 'Pollution-free, peaceful learning atmosphere in Gonikoppal surrounded by scenic nature that fosters deep concentration.',
    displayOrder: 5,
    active: true
  },
  {
    id: 'why-6',
    iconName: 'BadgeIndianRupee',
    title: 'Affordable Fee & Scholarships',
    description: 'Government-subsidized fee structures with complete facilitation of Karnataka SSP and NSP financial aid scholarships.',
    displayOrder: 6,
    active: true
  }
];

export const initialAicte: AicteItem[] = [
  {
    id: 'aicte-1',
    title: 'AICTE Extension of Approval (EOA) Letter for 2026-27',
    category: 'EOA Letter',
    academicYear: '2026-2027',
    documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'AICTE_EOA_Approval_2026-27.pdf',
    fileSize: '1.4 MB',
    description: 'Official grant of Extension of Approval by AICTE New Delhi for all 5 diploma engineering programmes.',
    active: true,
    displayOrder: 1,
    date: '2026-06-15'
  },
  {
    id: 'aicte-2',
    title: 'Mandatory Public Disclosure Report (AICTE Norms)',
    category: 'Mandatory Disclosure',
    academicYear: '2026-2027',
    documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Mandatory_Disclosure_Cauvery_Polytechnic_2026.pdf',
    fileSize: '2.8 MB',
    description: 'Complete comprehensive public disclosure including land, building, faculty, and laboratory records.',
    active: true,
    displayOrder: 2,
    date: '2026-05-20'
  },
  {
    id: 'aicte-3',
    title: 'Anti-Ragging Committee & Squad Constitution 2026',
    category: 'Committee',
    academicYear: '2026-2027',
    documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Anti_Ragging_Squad_Constitution_2026.pdf',
    fileSize: '820 KB',
    description: 'List of committee members, contact numbers, and guidelines in compliance with Supreme Court orders.',
    active: true,
    displayOrder: 3,
    date: '2026-07-01'
  },
  {
    id: 'aicte-4',
    title: 'Internal Complaints & Gender Sensitization Committee',
    category: 'Committee',
    academicYear: '2026-2027',
    documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'ICC_Committee_Order_2026.pdf',
    fileSize: '650 KB',
    description: 'Constitution of Internal Complaints Committee (ICC) as per AICTE and Government mandates.',
    active: true,
    displayOrder: 4,
    date: '2026-07-05'
  }
];

export const initialTicker: TickerItem[] = [
  { id: 't-1', text: 'Admissions Open for 2026-27 | 3-Year Diploma in CSE, ME, Civil, ECE & Automobile', link: '/admission', active: true, order: 1, badge: 'ADMISSION' },
  { id: 't-2', text: 'State-Level Polytechnic Technical Symposium "Kodagu TechExpo 2026" - Registrations Active', link: '/events', active: true, order: 2, badge: 'EVENT' },
  { id: 't-3', text: 'Special Fee Concession & Karnataka State SSP Scholarships Available for Eligible Students', link: '/pages/fee-structure', active: true, order: 3, badge: 'SCHOLARSHIP' },
  { id: 't-4', text: 'Campus Placement Success: 85+ Offers from Toyota, Bosch, TVS & L&T', link: '/pages/placement-cell', active: true, order: 4, badge: 'PLACEMENT' }
];

export const initialFooter: FooterConfig = {
  aboutText: 'Cauvery Polytechnic, Gonikoppal is a premier technical institution in South Kodagu, Karnataka. Approved by AICTE, New Delhi & Affiliated to DTE, Bengaluru, delivering world-class diploma engineering education since inception.',
  quickLinks: [
    { label: 'About College', url: '/pages/about-college' },
    { label: 'Academic Programmes', url: '/programmes' },
    { label: 'Online Admissions', url: '/admission' },
    { label: 'Campus Facilities', url: '/campus-facilities' },
    { label: 'Photo Gallery', url: '/gallery' }
  ],
  importantLinks: [
    { label: 'AICTE Approvals', url: '/aicte' },
    { label: 'Mandatory Disclosure', url: '/pages/mandatory-disclosure' },
    { label: 'Anti-Ragging Cell', url: '/pages/anti-ragging' },
    { label: 'Training & Placements', url: '/pages/placement-cell' },
    { label: 'Admin CMS Portal', url: '/admin/login' }
  ],
  address: 'Cauvery Polytechnic, Main Road, Gonikoppal, Ponnampet Taluk, Kodagu District, Karnataka - 571213',
  phone: '+91 8274 247385',
  mobile: '+91 94481 23456',
  email: 'principal@cauverypolytechnic.edu.in',
  officeHours: 'Monday - Saturday: 9:00 AM - 4:30 PM',
  copyrightText: '© 2026 Cauvery Polytechnic, Gonikoppal. All Rights Reserved. Approved by AICTE, New Delhi.',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
};

export const initialSettings: WebsiteSettings = {
  collegeName: 'Cauvery Polytechnic',
  tagline: 'Excellence in Technical Diploma Education • Gonikoppal, Kodagu',
  shortCode: 'CPG',
  logo: '',
  affiliation: 'Affiliated to Directorate of Technical Education (DTE), Bengaluru',
  dsaApproved: true,
  aicteApproved: true,
  dsaCode: '494',
  address: 'Main Road, Gonikoppal, Ponnampet Taluk, Kodagu (Coorg), Karnataka',
  district: 'Kodagu',
  state: 'Karnataka',
  pincode: '571213',
  phone: '+91 8274 247385',
  mobile: '+91 94481 23456',
  email: 'info@cauverypolytechnic.edu.in',
  admissionEmail: 'admissions@cauverypolytechnic.edu.in',
  website: 'https://cauverypolytechnic.edu.in',
  principalName: 'Prof. K. B. Pemmaiah',
  principalQualification: 'M.Tech, MISTE',
  principalMessage: 'Transforming enthusiastic youth into technically competent and socially responsible engineering professionals.',
  principalPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15604.83856554795!2d75.8872583871582!3d12.138760000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5b5505e60807b%3A0x6b4fb66904d9c733!2sGonikoppal%2C%20Karnataka%20571213!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  socialMedia: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  stats: {
    students: '1200+',
    faculty: '45+',
    placementPercent: '95%',
    labsCount: '22+',
    yearsOfExcellence: '25+'
  },
  tickerSpeed: 30
};

export const initialHomeSections: HomeSection[] = [
  {
    id: 'hero_slider',
    sectionType: 'hero_slider',
    title: 'Hero Sliders',
    subtitle: 'Cinematic Visual Hero Carousel',
    badge: 'Hero Section',
    enabled: true,
    displayOrder: 1,
    backgroundStyle: 'dark'
  },
  {
    id: 'principal_welcome',
    sectionType: 'principal_welcome',
    title: "Principal's Welcome Desk",
    subtitle: 'Nurturing Technical Excellence in Kodagu',
    badge: "Principal's Message",
    content: 'Welcome to Cauvery Polytechnic, Gonikoppal. Our institution is dedicated to imparting quality technical education that bridges the gap between academic theory and modern industrial engineering practices. With experienced faculty, cutting-edge labs, and vibrant campus life, we guide every student toward career success.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    buttonText: "Read Full Principal's Desk",
    buttonUrl: '/pages/principals-desk',
    enabled: true,
    displayOrder: 2,
    backgroundStyle: 'white',
    customData: {
      principalName: 'Prof. K. B. Pemmaiah',
      principalQualification: 'M.Tech, MISTE (Principal)',
      quote: '"Empowering youth with tactile engineering knowledge, ethical values, and boundless career horizons."',
      highlights: [
        'AICTE Approved Diploma Programs',
        'Affiliated to DTE Karnataka (Code: 494)',
        'Pre-Placement Soft Skills & Interviews',
        'SSP & NSP Scholarships Facilitated'
      ]
    }
  },
  {
    id: 'why_us',
    sectionType: 'why_us',
    title: 'Why Choose Cauvery Polytechnic?',
    subtitle: 'Combining academic rigor, practical industry skills, modern laboratories, and dedicated placement support in the peaceful green heart of South Kodagu.',
    badge: 'Institution Strengths',
    enabled: true,
    displayOrder: 3,
    backgroundStyle: 'light'
  },
  {
    id: 'programmes',
    sectionType: 'programmes',
    title: 'Explore Engineering Programmes',
    subtitle: 'AICTE Approved 3-Year Diploma Courses designed with hands-on practical skills and industry curriculum for high-growth tech careers.',
    badge: 'Academic Offerings',
    enabled: true,
    displayOrder: 4,
    backgroundStyle: 'white'
  },
  {
    id: 'admission_cta',
    sectionType: 'admission_cta',
    title: 'Begin Your Journey as an Engineering Professional',
    subtitle: 'Direct spot admission and online seat reservation available for SSLC and ITI passouts. Merit concessions & hostel facility available.',
    badge: 'Admissions 2026-27 Open',
    content: 'Join top diploma courses with hands-on workshops, state scholarships, and 100% placement mentorship.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Apply Online Now',
    buttonUrl: '/admission',
    secondaryButtonText: 'Fee Structure',
    secondaryButtonUrl: '/pages/fee-structure',
    enabled: true,
    displayOrder: 5,
    backgroundStyle: 'gradient'
  },
  {
    id: 'events',
    sectionType: 'events',
    title: 'Campus Events & Workshops',
    subtitle: 'Stay updated with upcoming technical symposiums, sports meets, cultural fests, and expert guest lecture series.',
    badge: 'What\'s Happening',
    enabled: true,
    displayOrder: 6,
    backgroundStyle: 'light'
  },
  {
    id: 'news',
    sectionType: 'news',
    title: 'Latest News & Announcements',
    subtitle: 'Official circulars, academic notifications, examination timetables, and campus achievement press releases.',
    badge: 'Campus Bulletin',
    enabled: true,
    displayOrder: 7,
    backgroundStyle: 'white'
  },
  {
    id: 'facilities',
    sectionType: 'facilities',
    title: 'Campus Facilities & Infrastructure',
    subtitle: 'Explore our modern digital classrooms, high-tech engineering laboratories, central library, and green sports campus.',
    badge: 'World-Class Infrastructure',
    enabled: true,
    displayOrder: 8,
    backgroundStyle: 'light'
  },
  {
    id: 'gallery',
    sectionType: 'gallery',
    title: 'Campus Life & Visual Tour',
    subtitle: 'Glimpses of active student life, annual sports day, state-level competitions, robotics labs, and graduation ceremonies.',
    badge: 'Photo Gallery',
    enabled: true,
    displayOrder: 9,
    backgroundStyle: 'white'
  },
  {
    id: 'contact_map',
    sectionType: 'contact_map',
    title: 'Visit Cauvery Polytechnic Campus',
    subtitle: 'Conveniently situated in Gonikoppal, South Kodagu, accessible via regular bus connectivity from Mysuru, Madikeri, Virajpet, and Kerala borders.',
    badge: 'Campus Location',
    buttonText: 'Send Enquiry',
    buttonUrl: '/contact',
    secondaryButtonText: 'Admissions Desk',
    secondaryButtonUrl: '/admission',
    enabled: true,
    displayOrder: 10,
    backgroundStyle: 'white'
  }
];

