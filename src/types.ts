/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  companyColor?: string; // Tailwind bg color class for mock logos
  location: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  contactEmail: string;
  employerId?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  count: number;
  description: string;
  colorClass: string;
}

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  role: 'seeker' | 'employer';
  companyName?: string;
  bio?: string;
  skills?: string[];
  resumeSubmitted?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  userId: string;
  seekerName: string;
  seekerEmail: string;
  seekerPhone: string;
  coverLetter: string;
  resumeName: string;
  appliedDate: string;
  status: 'Pending' | 'Reviewed' | 'Interviewing' | 'Accepted' | 'Declined';
}
