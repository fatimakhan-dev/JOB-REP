/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UserAccount } from '../types';
import { LucideIcon } from './LucideIcon';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
}

export function Navbar({ activeTab, setActiveTab, currentUser, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'jobs', label: 'Find Jobs', icon: 'Briefcase' },
    { id: 'categories', label: 'Categories', icon: 'Grid' },
    { id: 'about', label: 'About', icon: 'Info' },
    { id: 'contact', label: 'Contact', icon: 'Mail' },
  ];

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/85 dark:bg-slate-950/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          id="btn-logo"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none group-hover:bg-blue-700 transition-colors">
            <LucideIcon name="Briefcase" className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Job<span className="text-blue-600 dark:text-blue-400">Connect</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Springfield</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-1 py-1.5 text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                id="btn-user-hub"
                onClick={() => handleLinkClick('auth')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer transition-colors"
                title="Go to Your Dashboard"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  currentUser.role === 'employer' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="max-w-[100px] truncate text-xs font-semibold">{currentUser.fullName}</span>
                  <span className="text-[9px] uppercase tracking-wide text-slate-400">
                    {currentUser.role === 'employer' ? 'Employer' : 'Seeker'}
                  </span>
                </div>
              </button>
              <button
                id="btn-logout"
                onClick={onLogout}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LucideIcon name="LogOut" size={18} />
              </button>
            </div>
          ) : (
            <button
              id="btn-login-desktop"
              onClick={() => handleLinkClick('auth')}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              Log In / Sign Up
            </button>
          )}

          <button
            id="btn-post-job-nav"
            onClick={() => {
              if (currentUser && currentUser.role === 'employer') {
                handleLinkClick('post-job');
              } else {
                // Route to Auth but request post-job after
                handleLinkClick('auth');
              }
            }}
            className="flex items-center gap-1.5 bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-98 transition-all cursor-pointer"
          >
            <LucideIcon name="PlusCircle" size={16} />
            Post a Job
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden gap-2">
          {currentUser && (
            <button
              id="mobile-user-avatar"
              onClick={() => handleLinkClick('auth')}
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-500 cursor-pointer"
            >
              {currentUser.fullName.charAt(0)}
            </button>
          )}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-dropdown" className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/55 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <LucideIcon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{currentUser.fullName}</span>
                      <span className="text-[10px] uppercase text-slate-400">{currentUser.role === 'employer' ? 'Employer' : 'Seeker'}</span>
                    </div>
                  </div>
                  <button
                    id="mobile-btn-logout"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    title="Log Out"
                  >
                    <LucideIcon name="LogOut" size={16} />
                  </button>
                </div>
                <button
                  id="mobile-btn-dashboard"
                  onClick={() => handleLinkClick('auth')}
                  className="flex w-full items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <LucideIcon name="User" size={16} />
                  My Dashboard
                </button>
              </>
            ) : (
              <button
                id="mobile-btn-login"
                onClick={() => handleLinkClick('auth')}
                className="flex w-full items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <LucideIcon name="Lock" size={16} />
                Log In or Sign Up
              </button>
            )}

            <button
              id="mobile-btn-post-job"
              onClick={() => {
                if (currentUser && currentUser.role === 'employer') {
                  handleLinkClick('post-job');
                } else {
                  handleLinkClick('auth');
                }
              }}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2.5 shadow-sm transition-colors"
            >
              <LucideIcon name="PlusCircle" size={18} />
              Post a Job Listing
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
