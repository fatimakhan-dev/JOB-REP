/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Job, UserAccount, JobApplication } from '../types';
import { LucideIcon } from './LucideIcon';

interface JobDetailsProps {
  jobId: string | null;
  jobs: Job[];
  currentUser: UserAccount | null;
  onApply: (application: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => void;
  setActiveTab: (tab: string) => void;
}

export function JobDetails({ jobId, jobs, currentUser, onApply, setActiveTab }: JobDetailsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [seekerName, setSeekerName] = useState(currentUser?.fullName || '');
  const [seekerEmail, setSeekerEmail] = useState(currentUser?.email || '');
  const [seekerPhone, setSeekerPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isDoneApplying, setIsDoneApplying] = useState(false);

  // Retrieve selected job details
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mx-auto mb-4">
          <LucideIcon name="Briefcase" size={24} />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">No Job Selected</h2>
        <p className="mt-2 text-xs text-slate-500 hover:text-blue-600">Please select an available job from the listings.</p>
        <button
          onClick={() => setActiveTab('jobs')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2.5 text-xs transition active:scale-98 cursor-pointer"
        >
          Go to Job Board
        </button>
      </div>
    );
  }

  const handleApplyClick = () => {
    // Fill up profile details if user is available
    if (currentUser) {
      setSeekerName(currentUser.fullName);
      setSeekerEmail(currentUser.email);
    }
    setModalOpen(true);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!seekerName || !seekerEmail || !seekerPhone) return;

    onApply({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: currentUser?.id || 'anonymous-seeker',
      seekerName,
      seekerEmail,
      seekerPhone,
      coverLetter,
      resumeName: resumeName || 'applicant_resume.pdf',
    });

    setIsDoneApplying(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsDoneApplying(false);
    // Reset form states
    setSeekerPhone('');
    setCoverLetter('');
    setResumeName('');
  };

  return (
    <div id="job-detail-viewport" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 transition-all">
      {/* Back to jobs breadcrumb */}
      <button
        id="btn-back-to-jobs"
        onClick={() => setActiveTab('jobs')}
        className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 cursor-pointer mb-6"
      >
        <LucideIcon name="ChevronRight" size={14} className="rotate-180" /> Back to Job Listings
      </button>

      {/* Hero card detailing position */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl font-bold text-lg shadow-sm ${job.companyColor || 'bg-slate-400 text-white'}`}>
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-550 dark:text-slate-400">
                <span className="text-slate-900 dark:text-slate-250 font-semibold">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <LucideIcon name="MapPin" size={12} className="text-blue-500" /> {job.location}
                </span>
                <span>•</span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              id="btn-trigger-apply-modal"
              onClick={handleApplyClick}
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-xl px-6 py-3 shadow-md hover:bg-blue-700 active:scale-98 transition text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <LucideIcon name="CheckCircle" size={16} /> Apply for this Job
            </button>
            <span className="block text-center text-[10px] text-slate-400 mt-1">Posted on {job.postedDate}</span>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900 text-center">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Compensation</span>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{job.salary}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Broad Category</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{job.category}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Contact Node</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate max-w-[120px] block mx-auto">{job.contactEmail}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Safety Audit</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded inline-block">Verified Option</span>
          </div>
        </div>
      </div>

      {/* Main Descriptions and bulleted Lists */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left main content columns */}
        <div className="md:col-span-2 space-y-8">
          {/* 1. Job Description */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
              <LucideIcon name="Briefcase" className="text-blue-500" size={18} /> Position Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {job.description}
            </p>
          </section>

          {/* 2. Key Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
                <LucideIcon name="ShieldCheck" className="text-blue-500" size={18} /> Candidate Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-350">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 3. Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
                <LucideIcon name="Clock" className="text-blue-500" size={18} /> Responsibilities & Tasks
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-350">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-2.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 4. Benefits Package */}
          {job.benefits && job.benefits.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
                <LucideIcon name="Check" className="text-emerald-500" size={18} /> Benefits & Compensations
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-350">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <LucideIcon name="Check" size={12} />
                    </span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right side helper info column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300">Employer Profile</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-920 text-xs dark:bg-slate-800 dark:text-slate-100">
                {job.company.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-semibold text-xs text-slate-900 dark:text-white block">{job.company}</span>
                <span className="text-[10px] text-slate-400 block">Verified Local Enterprise</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3 dark:border-slate-800">
              An active participant in our Local Springfield Jobs Initiative program. Backed by community review boards to guarantee fair labour practices.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-blue-200/80 bg-blue-50/20 p-5 dark:border-blue-950 dark:bg-slate-900/30 text-xs text-slate-650 dark:text-slate-400">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={14} className="text-blue-600 dark:text-blue-400" />
              Direct-Seeker Guarantee
            </h4>
            <p className="mt-2 leading-relaxed text-[11px]">
              No recruiters or third-party agencies will obstruct this. Apply to this posting and get direct routing straight to {job.company}&apos;s internal manager.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== ACTIVE APPLICATION MODAL ==================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm shadow-2xl overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-250">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Direct Local Application</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Applying for {job.title}</h3>
                <p className="text-[11px] text-slate-500">at {job.company}</p>
              </div>
              <button
                id="btn-close-apply-modal"
                onClick={handleCloseModal}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-400 transition"
              >
                <LucideIcon name="X" size={18} />
              </button>
            </div>

            {isDoneApplying ? (
              /* Success panel */
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450">
                  <LucideIcon name="CheckCircle" size={32} />
                </div>
                <h4 className="text-md font-bold text-slate-900 dark:text-white">Application Sent Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your details and message have been delivered directly to {job.company}&apos;s recruiting contacts. Your application state can be tracked under your candidate dashboard tab.
                </p>
                <div className="pt-4 flex gap-3 justify-center">
                  <button
                    id="btn-modal-to-hub"
                    onClick={() => {
                      handleCloseModal();
                      setActiveTab('auth');
                    }}
                    className="bg-blue-600 text-white font-semibold rounded-xl text-xs px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
                  >
                    View Application Dashboard
                  </button>
                  <button
                    id="btn-modal-continue-jobs"
                    onClick={handleCloseModal}
                    className="border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
                  >
                    Continue Browsing Jobs
                  </button>
                </div>
              </div>
            ) : (
              /* Application Interactive Form */
              <form id="apply-job-form" onSubmit={handleFormSubmit} className="space-y-4 pt-1">
                {currentUser?.role === 'employer' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-xs flex gap-2">
                    <LucideIcon name="Info" size={16} className="shrink-0 mt-0.5" />
                    <span>
                      <strong>Role Alert:</strong> You are currently logged in with an Employer profile. Standard application state will be tracked under this current profile or can be submitted anonymously.
                    </span>
                  </div>
                )}

                {/* Grid name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="apply-input-name" className="block text-xs font-bold text-slate-700 dark:text-slate-330">
                      Full Name *
                    </label>
                    <input
                      id="apply-input-name"
                      type="text"
                      required
                      value={seekerName}
                      onChange={(e) => setSeekerName(e.target.value)}
                      placeholder="e.g. Amanda Higgins"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="apply-input-email" className="block text-xs font-bold text-slate-700 dark:text-slate-330">
                      Email Address *
                    </label>
                    <input
                      id="apply-input-email"
                      type="email"
                      required
                      value={seekerEmail}
                      onChange={(e) => setSeekerEmail(e.target.value)}
                      placeholder="e.g. amanda@springfield.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 transition"
                    />
                  </div>
                </div>

                {/* Phone & Resume Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="apply-input-phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Phone Number *
                    </label>
                    <input
                      id="apply-input-phone"
                      type="tel"
                      required
                      value={seekerPhone}
                      onChange={(e) => setSeekerPhone(e.target.value)}
                      placeholder="e.g. (555) 234-5678"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="apply-input-resume" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Mock Resume Upload (Text representation) *
                    </label>
                    <input
                      id="apply-input-resume"
                      type="text"
                      required
                      placeholder="e.g. resume_amanda_higgins_2026.pdf"
                      value={resumeName}
                      onChange={(e) => setResumeName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 transition"
                    />
                  </div>
                </div>

                {/* Cover letter */}
                <div className="space-y-1.5">
                  <label htmlFor="apply-input-covertext" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Brief Cover Letter & Pitch *
                  </label>
                  <textarea
                    id="apply-input-covertext"
                    required
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Describe your schedule availability, local credentials, and why you are interested in working here..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-750 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 transition"
                  />
                </div>

                {/* Submit button */}
                <div className="border-t border-slate-100 pt-4 flex gap-3 justify-end dark:border-slate-805">
                  <button
                    id="btn-modal-cancel"
                    type="button"
                    onClick={handleCloseModal}
                    className="border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs px-4 py-2.5 hover:bg-slate-55 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-modal-submit-apply"
                    type="submit"
                    className="bg-blue-600 text-white font-semibold rounded-xl text-xs px-6 py-2.5 hover:bg-blue-700 shadow-md active:scale-98 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <LucideIcon name="Send" size={14} /> Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
