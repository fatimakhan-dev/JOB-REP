/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'it',
    name: 'IT & Software',
    iconName: 'Code',
    count: 14,
    description: 'Software engineers, web developers, IT support, and systems administrators.',
    colorClass: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/50 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50',
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'GraduationCap',
    count: 8,
    description: 'Teachers, tutors, academic counselors, and childcare professionals.',
    colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    iconName: 'HeartPulse',
    count: 12,
    description: 'Nurses, medical assistants, caregivers, and administrative staff.',
    colorClass: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/50 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50',
  },
  {
    id: 'govt',
    name: 'Government',
    iconName: 'Building2',
    count: 6,
    description: 'Municipal, state, or federal positions, administration, and public services.',
    colorClass: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50',
  },
  {
    id: 'sales',
    name: 'Sales & Marketing',
    iconName: 'TrendingUp',
    count: 11,
    description: 'Retail associates, account executives, digital marketers, and brand managers.',
    colorClass: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/50 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/50',
  },
  {
    id: 'construction',
    name: 'Construction & Labor',
    iconName: 'HardHat',
    count: 9,
    description: 'Carpentry, electrical work, plumbing, landscaping, and logistics.',
    colorClass: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/50',
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    iconName: 'Coffee',
    count: 15,
    description: 'Baristas, chefs, hotel staff, event planners, and customer service.',
    colorClass: 'bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100/50 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-900/50',
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Junior Web Developer',
    company: 'Community Tech Solutions',
    companyColor: 'bg-blue-600 text-white',
    location: 'Downtown Springfield',
    category: 'IT & Software',
    type: 'Full-time',
    salary: '$45,000 - $55,000 / year',
    postedDate: '2026-05-24',
    description: 'We are seeking a junior front-end developer skilled in HTML, CSS, React, and basic JavaScript. You will work on building and maintaining websites for local small businesses in the Tri-County area under the guidance of senior developers.',
    requirements: [
      'Basic knowledge of React and modern JavaScript (ES6+)',
      'Familiarity with CSS frameworks like Tailwind CSS',
      'Understanding of git version control',
      'Strong communication skills and willingness to learn',
      'Portfolio or github links demonstrating project work'
    ],
    responsibilities: [
      'Implement responsive layouts based on design mockups',
      'Troubleshoot and fix website bugs and styling issues',
      'Cooperate with client success managers to update content',
      'Participate in code reviews and bi-weekly learning sprints'
    ],
    benefits: [
      'Flexible working hours with 1 day/week remote option',
      'Health, dental, and vision insurance',
      'Annual $1,000 professional development budget',
      'Mentorship from veteran full-stack engineers'
    ],
    contactEmail: 'careers@communitytech.example.com',
  },
  {
    id: 'job-2',
    title: 'Local High School Math Tutor',
    company: 'Springfield Academy of Learning',
    companyColor: 'bg-emerald-600 text-white',
    location: 'Westside Springfield',
    category: 'Education',
    type: 'Part-time',
    salary: '$22 - $28 / hour',
    postedDate: '2026-05-25',
    description: 'Help students make the grade! We are looking for passionate educators or university students to teach Algebra, Geometry, and Calculus to high school students in our friendly neighborhood learning center. Shift schedules are primarily afternoons and weekend mornings.',
    requirements: [
      'Strong grasp of high school level mathematics (up to Pre-Calculus or Calculus)',
      'Previous teaching or tutoring experience is highly preferred',
      'Patient, encouraging, and clear explanation style',
      'Must pass a standard background check for working with minors',
      'Availability for at least 8 hours per week'
    ],
    responsibilities: [
      'Deliver engaging 1-on-1 and small group math instruction',
      'Track student progress and communicate areas of improvement to parents',
      'Prepare students for standardized tests (SAT/ACT focus)',
      'Maintain a supportive and disciplined classroom environment'
    ],
    benefits: [
      'Highly flexible hourly scheduling',
      'Pre-written curriculum guidance and textbook resources',
      'Friendly and collaborative teaching staff',
      'Performance-based hourly rate reviews every semester'
    ],
    contactEmail: 'tutoring@spflda-academy.example.com',
  },
  {
    id: 'job-3',
    title: 'Certified Caregiver (CNA / HHA)',
    company: 'Golden Years Home Care Services',
    companyColor: 'bg-rose-600 text-white',
    location: 'North Springfield (In-Home)',
    category: 'Healthcare',
    type: 'Full-time',
    salary: '$18 - $24 / hour',
    postedDate: '2026-05-23',
    description: 'Provide meaningful support to our community elders. We have multiple daytime and nocturnal vacancies for certified nursing assistants and home health aides to assist local residents in their homes with daily living tasks, companionship, and medication reminders.',
    requirements: [
      'Active Certified Nursing Assistant (CNA) or Home Health Aide (HHA) registration',
      'Valid driver’s license and reliable personal vehicle',
      'Current CPR and First Aid certification',
      'Compassionate demeanor and reliable attendance habits',
      'Strong physical endurance (ability to assist with student/client transfers if needed)'
    ],
    responsibilities: [
      'Assist clients with personal hygiene, dressing, bathing, and grooming',
      'Track medication schedules and prepare basic highly nutritious meals',
      'Accompany senior clients to medical appointments and grocery shopping trips',
      'Submit daily care logs detailing client activity and wellness indicators'
    ],
    benefits: [
      'Generous fuel mileage reimbursement plan',
      'Flexible shifts (8-hour, 12-hour, weekend overlays)',
      'Comprehensive healthcare coverage and 401(k) matching',
      'Complimentary paid annual recertification training'
    ],
    contactEmail: 'recruitment@goldenyears.example.com',
  },
  {
    id: 'job-4',
    title: 'Administrative Assistant I',
    company: 'Springfield County Clerk Office',
    companyColor: 'bg-amber-600 text-white',
    location: 'Springfield Civic Center',
    category: 'Government',
    type: 'Full-time',
    salary: '$38,000 - $44,000 / year',
    postedDate: '2026-05-22',
    description: 'The Springfield County Government is hiring a detail-oriented Administrative Clerk. This critical public service role manages digital records, processes incoming citizen requests for records, issues licenses, and directs inbound office communications.',
    requirements: [
      'High School Diploma or GED; Associate Degree is a plus',
      'Experience with MS Office (Word, Excel) or Google Workspace equivalents',
      'Typing speed of at least 45 words per minute with accuracy',
      'Excellent verbal communication for customer inquiry servicing',
      'Strong organizational skills to maintain complex physical/digital filing structures'
    ],
    responsibilities: [
      'Welcome citizens at the front desk and resolve standard inquiries',
      'Input application details into municipal databases accurately',
      'Manage official mail, correspondence, and phone directories',
      'Coordinate calendar bookings and prepare conference locations'
    ],
    benefits: [
      'Outstanding state pension program (PERS)',
      'Extensive paid time off (include 12 state-recognized holidays)',
      '100% employer-sponsored health coverage',
      'Excellent job security and promotion pathways'
    ],
    contactEmail: 'hr@springfieldcounty.gov.example.com',
  },
  {
    id: 'job-5',
    title: 'Local Retail Store Front Lead',
    company: 'Evergreen Organic Grocery',
    companyColor: 'bg-teal-600 text-white',
    location: 'East Springfield Center',
    category: 'Hospitality',
    type: 'Full-time',
    salary: '$17 - $21 / hour',
    postedDate: '2026-05-26',
    description: 'Passionate about food, sustainability, and customer care? Join our staff as a Store Lead. You will overlook register transactions, handle morning fruit and vegetable stocking, organize artisanal merchant displays, and guide grocery baggers.',
    requirements: [
      '1+ years of prior retail, barista, or customer service experience',
      'Friendly, outgoing personality and positive approach to problem-solving',
      'Capable of lifting up to 35 lbs frequently during product restocking',
      'Availability to work opening shifts starting at 6:30 AM or closing shifts ending at 8:30 PM',
      'A baseline understanding of organic foods and local sourcing standard is helpful'
    ],
    responsibilities: [
      'Open/close cash registers and verify starting drawer audits',
      'Lead junior floor staff and handle customer inquiries/returns',
      'Direct inventory checks and record spoiled/shortdated commodities',
      'Assemble aesthetic, high-visibility promotional shelf arrays'
    ],
    benefits: [
      'Compulsory 25% storewide employee discount on all organic items',
      'Comprehensive healthcare plans for full-time workers',
      'Fun, high-energy team culture',
      'Accrued paid sick leave and mental wellness days off'
    ],
    contactEmail: 'jobs@evergreengrocery.example.com',
  },
  {
    id: 'job-6',
    title: 'Assistant Project Manager - Landscaping',
    company: 'Bloom & Stone Fine Landscaping',
    companyColor: 'bg-orange-600 text-white',
    location: 'Springfield Suburbs',
    category: 'Construction & Labor',
    type: 'Full-time',
    salary: '$48,000 - $58,000 / year',
    postedDate: '2026-05-21',
    description: 'Help shape local lawns and scenic gardens! We are seeking an Assistant PM to organize crew assignments, coordinate materials deliveries (sod, mulch, pavers), draft customer quotes, and aid in field site inspections. Ideal for experienced landscapers looking for career progression!',
    requirements: [
      'Minimum 2 years of field experience in commercial or residential landscaping',
      'Valid Drivers License with safe driving record for operating site trucks',
      'Basic computerized estimate math capabilities',
      'Excellent leadership and natural crew motivation skills',
      'Capable of working outdoors in various high/low weather environments'
    ],
    responsibilities: [
      'Coordinate site crews, ensuring execution according to architectural blueprints',
      'Track equipment inventory and schedule preventive mower/truck maintenance',
      'Liaison with premium residential owners to finalize project change-orders',
      'Conduct site safety briefings before daily operational kickoff'
    ],
    benefits: [
      'Take-home company crew truck access',
      'Winter off-season paid retention program',
      'Performance and project completion annual cash bonuses',
      'Free uniforms and premium weatherproof gear provided'
    ],
    contactEmail: 'office@bloomandstone.example.com',
  },
  {
    id: 'job-7',
    title: 'Sales & Event Coordinator',
    company: 'Downtown Vineyards & Event Space',
    companyColor: 'bg-purple-600 text-white',
    location: 'Downtown Springfield',
    category: 'Sales & Marketing',
    type: 'Contract',
    salary: '$20 - $25 / hour + Commission',
    postedDate: '2026-05-24',
    description: 'Downtown Vineyards is on the hunt for a bubbly, highly professional Sales and Coordinator. You will show wedding couples and corporate event planners our urban space, book bookings, run social channel updates, and oversee day-of hospitality coordination.',
    requirements: [
      'Prior experience in sales, hospitality, hotel desk, or events marketing',
      'Exceptional organization, checklist-first mindset, and timeline focus',
      'Active on social media (Instagram, TikTok) with content drafting comfort',
      'Availability for evening weekend events standard during peak summer months',
      'Minimum age 21+ due to close handling of licensed wine tasting events'
    ],
    responsibilities: [
      'Reply to online booking queries and conduct walkthrough private tours',
      'Draft event packages, contracts, and collect reservation deposit payments',
      'Direct catering and decorator setup vendors during event day-of run plans',
      'Post beautiful bi-weekly stories showcasing celebrations to digital channels'
    ],
    benefits: [
      'Highly rewarding commission bonus structure on every event booked',
      'Beautiful historic downtown loft work premises',
      'Complimentary admission to standard community wine/jazz nights',
      'Generous paid tips from wedding hosts'
    ],
    contactEmail: 'celebrate@downtownvineyards.example.com',
  }
];
