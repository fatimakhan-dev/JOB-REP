/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Job } from '../types';
import { CATEGORIES } from '../data/mockJobs';
import { LucideIcon } from './LucideIcon';

interface FindJobsProps {
  jobs: Job[];
  jobFilters: { query: string; location: string; category: string; type: string };
  setJobFilters: (filters: { query: string; location: string; category: string; type: string }) => void;
  setSelectedJobId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export function FindJobs({ jobs, jobFilters, setJobFilters, setSelectedJobId, setActiveTab }: FindJobsProps) {
  const [selectedType, setSelectedType] = useState<string>(jobFilters.type || '');
  const [selectedLocation, setSelectedLocation] = useState<string>(jobFilters.location || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(jobFilters.category || '');
  const [searchQuery, setSearchQuery] = useState<string>(jobFilters.query || '');

  // Extract static filter configurations
  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.location)));
  }, [jobs]);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  // FILTER LOGIC
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchQuery =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements.some((req) => req.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchLocation = selectedLocation === '' || job.location === selectedLocation;
      const matchCategory = selectedCategory === '' || job.category === selectedCategory;
      const matchType = selectedType === '' || job.type === selectedType;

      return matchQuery && matchLocation && matchCategory && matchType;
    });
  }, [jobs, searchQuery, selectedLocation, selectedCategory, selectedType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
    setSelectedType('');
    setJobFilters({ query: '', location: '', category: '', type: '' });
  };

  const handleJobCardClick = (id: string) => {
    setSelectedJobId(id);
    setActiveTab('job-details');
  };

  return (
    <div id="find-jobs-container" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 transition-all">
      {/* Page Header */}
      <div className="border-b border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Browse Local Jobs</h1>
        <p className="mt-1 text-xs text-slate-500">Discover employment options right inside your local Springfield neighborhood clusters.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 1. SIDEBAR FILTERS (Left on Large screens, absolute collapse possible if wanted but standard top grid or side placement is perfect) */}
        <aside id="filters-sidebar" className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LucideIcon name="Filter" size={16} /> Filter Results
            </h2>
            {(searchQuery || selectedLocation || selectedCategory || selectedType) && (
              <button
                id="btn-clear-filters"
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-red-500 hover:text-red-650 cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-5 shadow-sm">
            {/* Location filter */}
            <div className="space-y-2">
              <label htmlFor="filter-select-location" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Region / Location
              </label>
              <select
                id="filter-select-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              >
                <option value="">Anywhere in Springfield</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label htmlFor="filter-select-category" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                Discipline Category
              </label>
              <select
                id="filter-select-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
              >
                <option value="">All Job Fields</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Checkboxes / List */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-350">Job Type</span>
              <div className="space-y-1.5 pt-1">
                <button
                  id="filter-type-all"
                  onClick={() => setSelectedType('')}
                  className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-medium cursor-pointer transition ${
                    selectedType === ''
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-850'
                  }`}
                >
                  <span>All Employment Types</span>
                  {selectedType === '' && <LucideIcon name="Check" size={12} />}
                </button>
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    id={`filter-type-${type.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setSelectedType(type)}
                    className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-medium cursor-pointer transition ${
                      selectedType === type
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'text-slate-600 hover:bg-slate-105 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-850'
                    }`}
                  >
                    <span>{type}</span>
                    {selectedType === type && <LucideIcon name="Check" size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-4 dark:border-slate-800/65 dark:bg-slate-900/40 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1">
              <LucideIcon name="ShieldCheck" size={14} className="text-emerald-500" />
              Neighborhood Protection
            </h4>
            <p className="mt-1 text-slate-500 leading-relaxed">
              Employers must provide clear base hourly or salary targets. Zero unpaid commission-only baiting allowed.
            </p>
          </div>
        </aside>

        {/* 2. JOB SEARCH & LISTINGS GRID (Right Area on Large screens) */}
        <main id="search-results-area" className="lg:col-span-3 space-y-6">
          {/* Searching top input */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-sm">
              <LucideIcon name="Search" className="text-slate-400" size={18} />
              <input
                id="listings-search-text"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, description, or city..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm placeholder:text-slate-400 focus:ring-0 text-slate-800 dark:text-slate-250"
              />
              {searchQuery && (
                <button
                  id="btn-clear-search-text"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <LucideIcon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Matches Counter & Tags display */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-medium text-slate-500">
              Found <span className="font-bold text-slate-950 dark:text-white">{filteredJobs.length}</span> positions match
            </span>
          </div>

          {/* Actual Job Cards stack */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  id={`job-list-card-${job.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-750 transition flex flex-col md:flex-row gap-4 justify-between items-start md:items-center group"
                >
                  <div className="flex gap-4 items-start md:items-center">
                    {/* Logo/Avatar */}
                    <div className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm ${job.companyColor || 'bg-slate-400 text-white'}`}>
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors pointer-events-none">
                          {job.title}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span className="text-slate-900 dark:text-slate-300 font-semibold">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <LucideIcon name="MapPin" size={12} className="text-blue-500" /> {job.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <LucideIcon name="DollarSign" size={12} className="text-slate-400" /> {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto border-t border-slate-100 md:border-t-0 pt-3 md:pt-0 gap-4 dark:border-slate-850">
                    <span className="text-[10px] text-slate-400">Posted {job.postedDate}</span>
                    <button
                      id={`btn-open-detail-${job.id}`}
                      onClick={() => handleJobCardClick(job.id)}
                      className="inline-flex items-center gap-1 bg-blue-600 text-white font-semibold rounded-xl px-4 py-2 text-xs hover:bg-blue-700 shadow-sm active:scale-98 transition cursor-pointer"
                    >
                      View Job <LucideIcon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results fallback */
            <div className="text-center py-16 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900/20">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 mb-4">
                <LucideIcon name="Search" size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">No job listings found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                No active requirements found matching your search. Try broadening your keywords or resetting filters.
              </p>
              <button
                id="btn-reset-blank-state"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1 bg-blue-600 border border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-850 text-white dark:text-blue-400 font-semibold rounded-xl px-4 py-2 text-xs cursor-pointer transition shadow"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
