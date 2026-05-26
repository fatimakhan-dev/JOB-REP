/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, CategoryInfo } from '../types';
import { CATEGORIES } from '../data/mockJobs';
import { LucideIcon } from './LucideIcon';

interface CategoriesProps {
  jobs: Job[];
  setActiveTab: (tab: string) => void;
  setJobFilters: (filters: { query: string; location: string; category: string; type: string }) => void;
}

export function Categories({ jobs, setActiveTab, setJobFilters }: CategoriesProps) {
  
  // Dynamically calculate actual job counts in each category
  const getCategoryCount = (categoryName: string) => {
    return jobs.filter((job) => job.category.toLowerCase().includes(categoryName.toLowerCase()) || categoryName.toLowerCase().includes(job.category.toLowerCase())).length;
  };

  const handleCategoryClick = (categoryName: string) => {
    setJobFilters({
      query: '',
      location: '',
      category: categoryName,
      type: '',
    });
    setActiveTab('jobs');
  };

  return (
    <div id="categories-viewport" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 transition-all">
      {/* Header */}
      <div className="border-b border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Explore Job Categories</h1>
        <p className="mt-1 text-xs text-slate-500">Pick a specific employment vertical to drill down into active Springfield matches immediately.</p>
      </div>

      {/* Grid Bento Layout */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const actualCount = getCategoryCount(cat.name);
          return (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex flex-col justify-between rounded-2xl border p-6 shadow-sm hover:shadow-md cursor-pointer transition-all group ${cat.colorClass}`}
            >
              <div>
                {/* Icon Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-900 mb-6 group-hover:scale-105 transition-transform duration-200 border border-slate-100 dark:border-slate-800">
                  <LucideIcon name={cat.iconName} className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold group-hover:underline text-slate-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag stats */}
              <div className="mt-8 border-t border-slate-200/40 pt-4 flex items-center justify-between dark:border-slate-800/40">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {actualCount} {actualCount === 1 ? 'Job' : 'Jobs'} Listed
                </span>
                <span className="flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  Explore <LucideIcon name="ArrowRight" size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Bottom Promo Banner */}
      <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white text-center sm:p-12 relative overflow-hidden dark:bg-slate-955 bg-[radial-gradient(circle_at_70%_120%,rgba(37,99,235,0.2),transparent)]">
        <div className="relative max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Don&apos;t see your professional domain listed?</h2>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            New categories and local business accounts are verified daily. Recommend a sector or register your regional brand details to broaden our marketplace scope.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center text-xs font-semibold">
            <button
              id="btn-cat-to-contact"
              onClick={() => setActiveTab('contact')}
              className="bg-white text-slate-900 rounded-xl px-4 py-2.5 hover:bg-slate-100 transition shadow-md active:scale-98 cursor-pointer"
            >
              Contact Support Board
            </button>
            <button
              id="btn-cat-to-post"
              onClick={() => setActiveTab('post-job')}
              className="border border-blue-400/40 text-blue-105 rounded-xl px-4 py-2.5 hover:bg-white/5 transition active:scale-98 cursor-pointer"
            >
              Post a Job Opening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
