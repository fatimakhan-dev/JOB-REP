/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from './LucideIcon';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  jobsCount: number;
}

export function Footer({ setActiveTab, jobsCount }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <LucideIcon name="Briefcase" className="h-5 w-5" />
              </div>
              <span className="text-md font-bold text-slate-900 dark:text-white">
                Job<span className="text-blue-600 dark:text-blue-400">Connect</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-450">
              A specialized community job board for Springfield, helping local businesses and talented residents build lasting professional ties right next door.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-450 dark:text-slate-500">
              <LucideIcon name="MapPin" size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Springfield, USA</span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Quick Access</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  id="foot-link-jobs"
                  onClick={() => setActiveTab('jobs')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Browse Job Listings
                </button>
              </li>
              <li>
                <button
                  id="foot-link-categories"
                  onClick={() => setActiveTab('categories')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Job Categories
                </button>
              </li>
              <li>
                <button
                  id="foot-link-post"
                  onClick={() => setActiveTab('post-job')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Post a Job (Employers)
                </button>
              </li>
              <li>
                <button
                  id="foot-link-auth"
                  onClick={() => setActiveTab('auth')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Candidate / Employer Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">Information</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  id="foot-link-about"
                  onClick={() => setActiveTab('about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Our Purpose & Mission
                </button>
              </li>
              <li>
                <button
                  id="foot-link-contact"
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Get Support & Contact Us
                </button>
              </li>
              <li className="text-slate-450">
                Helpline: <span className="font-semibold text-slate-700 dark:text-slate-400">1-800-SPRING-JOB</span>
              </li>
              <li className="text-slate-450">
                Email: <span className="font-semibold text-slate-700 dark:text-slate-400">support@jobconnect.example.com</span>
              </li>
            </ul>
          </div>

          {/* Platform Stats Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Active Board Analytics</h4>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs text-slate-500">Current active listings:</span>
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{jobsCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs text-slate-500">Local regions:</span>
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-300">5 Communities</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Employment impact:</span>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                  100% Local
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <p>© {currentYear} JobConnect. Certified Community Utility Project. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
