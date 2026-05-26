/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Job, CategoryInfo } from '../types';
import { CATEGORIES } from '../data/mockJobs';
import { LucideIcon } from './LucideIcon';

interface HomeProps {
  jobs: Job[];
  setActiveTab: (tab: string) => void;
  setSelectedJobId: (id: string | null) => void;
  setJobFilters: (filters: { query: string; location: string; category: string; type: string }) => void;
}

export function Home({ jobs, setActiveTab, setSelectedJobId, setJobFilters }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  // Extract unique locations for the dropdown
  const uniqueLocations = Array.from(new Set(jobs.map((job) => {
    // Standardize to first part if it's "Downtown Springfield" etc, or keep full
    return job.location;
  })));

  // Pick top 3 jobs as featured
  const featuredJobs = jobs.slice(0, 3);

  const handleHeroSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setJobFilters({
      query: searchQuery,
      location: searchLocation,
      category: searchCategory,
      type: '',
    });
    setActiveTab('jobs');
  };

  const handleQuickAction = (action: string) => {
    if (action === 'post') {
      setActiveTab('post-job');
    } else if (action === 'categories') {
      setActiveTab('categories');
    } else if (action === 'about') {
      setActiveTab('about');
    }
  };

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('job-details');
  };

  return (
    <div id="home-container" className="space-y-16 pb-16 transition-all">
      {/* 1. HERO HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-slate-900 px-4 pt-16 pb-20 text-white sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/20">
              <LucideIcon name="ShieldCheck" size={12} /> Supporting Springfield Community Resilience
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Your next career step is closer than you think.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Skip the long commute. Connect directly with verified employers looking for local skills and talents in Springfield.
            </p>
          </div>

          {/* Search Box Form */}
          <form
            id="hero-search-form"
            onSubmit={handleHeroSearchSubmit}
            className="mx-auto mt-10 max-w-4xl p-2 bg-white rounded-2xl shadow-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-850 flex flex-col md:flex-row items-stretch gap-2"
          >
            {/* Search Query Input */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-800 dark:text-slate-200">
              <LucideIcon name="Search" className="text-slate-400" size={20} />
              <input
                id="search-input-query"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or skills..."
                className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-0"
              />
            </div>

            <div className="h-px bg-slate-200 md:h-10 md:w-px md:bg-slate-250 self-center" />

            {/* Location Select */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-850 dark:text-slate-200">
              <LucideIcon name="MapPin" className="text-slate-400" size={20} />
              <select
                id="search-input-location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer"
              >
                <option value="" className="text-slate-900 dark:text-slate-900">Any Springfield Location</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc} className="text-slate-900 dark:text-slate-900">{loc}</option>
                ))}
              </select>
            </div>

            <div className="h-px bg-slate-200 md:h-10 md:w-px md:bg-slate-250 self-center" />

            {/* Category Select */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-850 dark:text-slate-100">
              <LucideIcon name="Briefcase" className="text-slate-400" size={20} />
              <select
                id="search-input-category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer"
              >
                <option value="" className="text-slate-900 dark:text-slate-900">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name} className="text-slate-900 dark:text-slate-900">{cat.name}</option>
                ))}
              </select>
            </div>

            <button
              id="btn-hero-search-submit"
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors shadow-md active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LucideIcon name="Search" size={16} /> Search Jobs
            </button>
          </form>

          {/* Quick Stats Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-white">{jobs.length}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Jobs Available</span>
            </div>
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-blue-300">100%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Verified Local</span>
            </div>
            <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400">48h</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Average Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENT / FEATURED JOBS SECTION */}
      <section id="featured-jobs-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Job Opportunities</h2>
            <p className="mt-1 text-sm text-slate-500">Handpicked jobs in Springfield with competitive salaries and great benefits.</p>
          </div>
          <button
            id="btn-view-all-jobs"
            onClick={() => {
              setJobFilters({ query: '', location: '', category: '', type: '' });
              setActiveTab('jobs');
            }}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors"
          >
            View All Jobs <LucideIcon name="ArrowRight" size={16} />
          </button>
        </div>

        {/* Featured Card Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              id={`featured-card-${job.id}`}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${job.companyColor || 'bg-slate-500 text-white'}`}>
                    {job.company.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-inset ring-slate-200/50">
                    {job.type}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 cursor-pointer" onClick={() => handleJobClick(job.id)}>
                    {job.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2 text-xs text-slate-500 dark:text-slate-450">
                    <span className="flex items-center gap-1">
                      <LucideIcon name="MapPin" size={13} className="text-blue-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <LucideIcon name="DollarSign" size={13} className="text-slate-400" />
                      {job.salary.includes('/ hour') ? job.salary.split('(')[0] : job.salary.split(' / ')[0]}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between dark:border-slate-850">
                <span className="text-[10px] text-slate-400">Posted {job.postedDate}</span>
                <button
                  id={`btn-view-${job.id}`}
                  onClick={() => handleJobClick(job.id)}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 transition cursor-pointer"
                >
                  View Details <LucideIcon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. QUICK ACTIONS BENTO GRID */}
      <section id="quick-actions-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Post a Job Box */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/30 p-8 border border-blue-100 dark:from-slate-900 dark:to-slate-950 dark:border-blue-950 flex flex-col justify-between h-64">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm mb-4">
                <LucideIcon name="PlusCircle" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Are you hiring?</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your business with certified math tutors, web devs, home healthcare providers, or office staff in Springfield.
              </p>
            </div>
            <div>
              <button
                id="btn-home-quick-post"
                onClick={() => handleQuickAction('post')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
              >
                Post your job listing <LucideIcon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Categories Box */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 p-8 border border-emerald-100 dark:from-slate-900 dark:to-slate-950 dark:border-emerald-950 flex flex-col justify-between h-64">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm mb-4">
                <LucideIcon name="GraduationCap" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Categories</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Browse positions across IT, Education, Construction, Government, and Healthcare segments to find exactly your niche.
              </p>
            </div>
            <div>
              <button
                id="btn-home-quick-categories"
                onClick={() => handleQuickAction('categories')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
              >
                Browse Job Categories <LucideIcon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Mission Box */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/30 p-8 border border-amber-100 dark:from-slate-900 dark:to-slate-950 dark:border-amber-950/80 flex flex-col justify-between h-64">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm mb-4">
                <LucideIcon name="Info" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Local Mission</h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We are building the digital bridge that connects neighbors, helping reduce emissions from long commutes and keeping capital inside local stores.
              </p>
            </div>
            <div>
              <button
                id="btn-home-quick-about"
                onClick={() => handleQuickAction('about')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 cursor-pointer"
              >
                Read our core purpose <LucideIcon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW / TRUST PORTION */}
      <section id="trust-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-slate-50 rounded-3xl py-12 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">How JobConnect Empowers Your Community</h2>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Unlike generic international recruitment agencies, we exclusively process Springfield listings. Every single posting is verified individually by our municipal development board to eliminate spam, hidden agency structures, and bait-and-switch salary offers.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <LucideIcon name="Check" size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Commute Strains</h4>
                  <p className="text-[11px] text-slate-500">All opportunities are located within a 15-mile radius of Springfield Civic Center.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <LucideIcon name="Check" size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Direct Employer Chat</h4>
                  <p className="text-[11px] text-slate-500">Contact detail transparency means direct connection with the decision-makers.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between relative shadow-sm h-64">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Candidate Success Story</span>
              <p className="italic text-xs text-slate-600 dark:text-slate-400">
                &ldquo;I was commuting 90 minutes each way every day. Thanks to local connections, I found a rewarding administrative and events desk role at golden years care home right around the corner. I save 3 hours daily and can walk my kids to high school now!&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold rounded-full text-xs">
                AH
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-900 dark:text-white">Amanda Higgins</span>
                <span className="text-[10px] text-slate-400">Springfield West Resident</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
