/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Job, UserAccount } from '../types';
import { CATEGORIES } from '../data/mockJobs';
import { LucideIcon } from './LucideIcon';

interface PostJobProps {
  currentUser: UserAccount | null;
  onCreateJob: (newJob: Omit<Job, 'id' | 'postedDate'>) => Job;
  setActiveTab: (tab: string) => void;
  setSelectedJobId: (id: string | null) => void;
}

export function PostJob({ currentUser, onCreateJob, setActiveTab, setSelectedJobId }: PostJobProps) {
  // Required standard form fields
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser?.companyName || currentUser?.fullName || '');
  const [location, setLocation] = useState('Downtown Springfield');
  const [category, setCategory] = useState('IT & Software');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship'>('Full-time');
  const [salary, setSalary] = useState('');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [description, setDescription] = useState('');

  // Dynamic lists fields
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);

  // Handle dynamic list operations
  const handleAddListItem = (type: 'req' | 'resp' | 'benefit') => {
    if (type === 'req') setRequirements([...requirements, '']);
    if (type === 'resp') setResponsibilities([...responsibilities, '']);
    if (type === 'benefit') setBenefits([...benefits, '']);
  };

  const handleRemoveListItem = (type: 'req' | 'resp' | 'benefit', index: number) => {
    if (type === 'req') {
      const copy = [...requirements];
      copy.splice(index, 1);
      setRequirements(copy.length ? copy : ['']);
    }
    if (type === 'resp') {
      const copy = [...responsibilities];
      copy.splice(index, 1);
      setResponsibilities(copy.length ? copy : ['']);
    }
    if (type === 'benefit') {
      const copy = [...benefits];
      copy.splice(index, 1);
      setBenefits(copy.length ? copy : ['']);
    }
  };

  const handleListItemChange = (type: 'req' | 'resp' | 'benefit', index: number, value: string) => {
    if (type === 'req') {
      const copy = [...requirements];
      copy[index] = value;
      setRequirements(copy);
    }
    if (type === 'resp') {
      const copy = [...responsibilities];
      copy[index] = value;
      setResponsibilities(copy);
    }
    if (type === 'benefit') {
      const copy = [...benefits];
      copy[index] = value;
      setBenefits(copy);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !company || !salary || !contactEmail || !description) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    // Clean empty listings from arrays
    const cleanRequirements = requirements.filter((item) => item.trim() !== '');
    const cleanResponsibilities = responsibilities.filter((item) => item.trim() !== '');
    const cleanBenefits = benefits.filter((item) => item.trim() !== '');

    // Random company color theme to look beautiful
    const colorClasses = [
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-rose-600 text-white',
      'bg-amber-600 text-white',
      'bg-purple-600 text-white',
      'bg-teal-600 text-white',
      'bg-orange-600 text-white',
    ];
    const companyColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const postedJob = onCreateJob({
      title,
      company,
      companyColor,
      location,
      category,
      type,
      salary,
      description,
      requirements: cleanRequirements.length ? cleanRequirements : ['Standard local experience and teamwork habits.'],
      responsibilities: cleanResponsibilities.length ? cleanResponsibilities : ['Coordinate task operations with the main floor manager.'],
      benefits: cleanBenefits.length ? cleanBenefits : ['Fair wage reviews and welcoming team environment.'],
      contactEmail,
    });

    // Automatically navigate to the newly created job
    setSelectedJobId(postedJob.id);
    setActiveTab('job-details');
  };

  return (
    <div id="post-job-viewport" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 transition-all">
      {/* Form Card Header */}
      <div className="border-b border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Post a Job Opening</h1>
        <p className="mt-1 text-xs text-slate-500">Reach motivated Springfield local workers. Fill out the form fields with clean particulars.</p>
      </div>

      <form id="create-posting-form" onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Warning if not logged in or seeker */}
        {(!currentUser || currentUser.role === 'seeker') && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-850 dark:bg-amber-950/20 dark:border-amber-900/60 dark:text-amber-400">
            <h4 className="font-bold flex items-center gap-1.5 mb-1 text-amber-900 dark:text-amber-300">
              <LucideIcon name="Info" size={16} /> Demographics Access
            </h4>
            <p className="leading-relaxed">
              You are currently submitting this posting as a guest. Logging in with an <strong>Employer Profile</strong> allows you to track applicants and manage applicant status revisions in real-time.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('auth')}
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Sign up as Employer instead
            </button>
          </div>
        )}

        {/* Section 1: Business Profile & Contact */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            1. Business Information & Position Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="post-input-title" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Job Title *
              </label>
              <input
                id="post-input-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lead Barista or Daycare Tutor"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="post-input-company" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Business & Company Name *
              </label>
              <input
                id="post-input-company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Springfield Roast Coffee Co."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="post-select-category" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Service Domain *
              </label>
              <select
                id="post-select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="post-select-type" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Employment Type *
              </label>
              <select
                id="post-select-type"
                value={type}
                onChange={(e) => setType(e.target.value as typeof type)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract (Temporary)</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="post-select-location" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Springfield Neighborhood Location *
              </label>
              <select
                id="post-select-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              >
                <option value="Downtown Springfield">Downtown Springfield</option>
                <option value="Westside Springfield">Westside Springfield</option>
                <option value="North Springfield">North Springfield</option>
                <option value="East Springfield Center">East Springfield Center</option>
                <option value="Springfield Civic Center">Springfield Civic Center</option>
                <option value="Springfield Suburbs">Springfield Suburbs</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="post-input-salary" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Hourly Wage or Yearly Salary *
              </label>
              <input
                id="post-input-salary"
                type="text"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. $19 - $23 / hour or $45,000 / year"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-755 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="post-input-email" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Applicant Routing Contact Email Address *
              </label>
              <input
                id="post-input-email"
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="e.g. applications@springfieldroasters.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-755 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Summary Description */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            2. Detailed Job Description
          </h2>
          <div className="space-y-1.5">
            <label htmlFor="post-input-desc" className="block text-xs font-medium text-slate-500">
              Provide an engaging summary outlining daily operations and shift timings *
            </label>
            <textarea
              id="post-input-desc"
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your local business, opening shifts, weekend schedule expectations, and team workflows..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition"
            />
          </div>
        </div>

        {/* Section 3: Dynamic Requirement Lists */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            3. Dynamic Bulleted Information Setup
          </h2>

          {/* Requirements list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">Requirements & Qualifications</label>
              <button
                type="button"
                onClick={() => handleAddListItem('req')}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 cursor-pointer"
              >
                <LucideIcon name="PlusCircle" size={14} /> Add Requirement
              </button>
            </div>
            <div className="space-y-2">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    id={`req-input-${idx}`}
                    type="text"
                    value={req}
                    onChange={(e) => handleListItemChange('req', idx, e.target.value)}
                    placeholder={`e.g. ${idx === 0 ? 'Minimum 1 year barista customer experience' : 'Active Food Handlers Certification'}`}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
                  />
                  {requirements.length > 1 && (
                    <button
                      id={`req-remove-${idx}`}
                      type="button"
                      onClick={() => handleRemoveListItem('req', idx)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                    >
                      <LucideIcon name="X" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Responsibilities list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">Essential Responsibilities & Tasks</label>
              <button
                type="button"
                onClick={() => handleAddListItem('resp')}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 cursor-pointer"
              >
                <LucideIcon name="PlusCircle" size={14} /> Add Tasks
              </button>
            </div>
            <div className="space-y-2">
              {responsibilities.map((resp, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    id={`resp-input-${idx}`}
                    type="text"
                    value={resp}
                    onChange={(e) => handleListItemChange('resp', idx, e.target.value)}
                    placeholder={`e.g. ${idx === 0 ? 'Greet incoming guests and record hot beverage orders' : 'Perform cash drawer opening audits'}`}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
                  />
                  {responsibilities.length > 1 && (
                    <button
                      id={`resp-remove-${idx}`}
                      type="button"
                      onClick={() => handleRemoveListItem('resp', idx)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                    >
                      <LucideIcon name="X" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Benefits list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">Offered Benefits & Perks</label>
              <button
                type="button"
                onClick={() => handleAddListItem('benefit')}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 cursor-pointer"
              >
                <LucideIcon name="PlusCircle" size={14} /> Add Perk
              </button>
            </div>
            <div className="space-y-2">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    id={`benefit-input-${idx}`}
                    type="text"
                    value={benefit}
                    onChange={(e) => handleListItemChange('benefit', idx, e.target.value)}
                    placeholder={`e.g. ${idx === 0 ? 'Compulsory 25% grocery staff discounts on entire menu' : 'Flexible scheduling overlays'}`}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
                  />
                  {benefits.length > 1 && (
                    <button
                      id={`benefit-remove-${idx}`}
                      type="button"
                      onClick={() => handleRemoveListItem('benefit', idx)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                    >
                      <LucideIcon name="X" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions Button block */}
        <div className="border-t border-slate-200 pt-6 flex gap-3 justify-end dark:border-slate-800">
          <button
            id="btn-post-cancel"
            type="button"
            onClick={() => setActiveTab('jobs')}
            className="border border-slate-200 dark:border-slate-805 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs px-5 py-2.5 hover:bg-slate-55 dark:hover:bg-slate-900 transition cursor-pointer"
          >
            Cancel Post
          </button>
          <button
            id="btn-post-submit"
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-xl text-xs px-7 py-2.5 hover:bg-blue-700 shadow-md active:scale-98 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LucideIcon name="PlusCircle" size={14} /> Publish Job Listing
          </button>
        </div>
      </form>
    </div>
  );
}
