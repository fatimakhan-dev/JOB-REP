/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Job, UserAccount, JobApplication } from '../types';
import { INITIAL_JOBS } from '../data/mockJobs';

export function useJobState() {
  // Initialize jobs from localStorage or fallback to defaults
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('local_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse jobs from localStorage', e);
      }
    }
    return INITIAL_JOBS;
  });

  // Keep track of active application state
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('local_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse applications from localStorage', e);
      }
    }
    return [];
  });

  // Track active user account. Standard default can be null, but we can have mock accounts
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('local_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    return null;
  });

  // Persist jobs to localStorage
  useEffect(() => {
    localStorage.setItem('local_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Persist applications to localStorage
  useEffect(() => {
    localStorage.setItem('local_applications', JSON.stringify(applications));
  }, [applications]);

  // Persist current segment user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('local_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('local_current_user');
    }
  }, [currentUser]);

  // POST A JOB
  const createJob = (newJobData: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      employerId: currentUser?.id || 'anonymous-employer',
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
    return newJob;
  };

  // APPLY FOR JOB
  const applyForJob = (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApplication: JobApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setApplications((prev) => [newApplication, ...prev]);
    return newApplication;
  };

  // CHANGE APPLICATION PROGRESSION (FOR EMPLOYER PORTAL)
  const updateApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  // AUTH HOOK HANDLERS
  const registerUser = (userData: Omit<UserAccount, 'id'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: `user-${Date.now()}`,
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const loginUser = (email: string, role: 'seeker' | 'employer') => {
    // If user is logging in, see if we have their credentials in a list, or just log them in
    // This maintains lightweight passwordless validation for simple demo completeness
    const existingUser: UserAccount = {
      id: `user-${email.replace(/[^a-zA-Z0-9]/g, '') || 'seeker-default'}`,
      email,
      fullName: email.split('@')[0].toUpperCase(),
      role,
      companyName: role === 'employer' ? `${email.split('@')[0].toUpperCase()} Enterprises` : undefined,
      skills: role === 'seeker' ? ['React', 'Communication', 'Customer Relations'] : undefined,
      bio: role === 'seeker' 
        ? 'Enthusiastic local professional looking for new local opportunities.'
        : 'Dedicated local small business creating neighborhood employments.',
    };
    setCurrentUser(existingUser);
    return existingUser;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<UserAccount>) => {
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updatedData } : null));
    }
  };

  return {
    jobs,
    applications,
    currentUser,
    createJob,
    applyForJob,
    updateApplicationStatus,
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
  };
}
