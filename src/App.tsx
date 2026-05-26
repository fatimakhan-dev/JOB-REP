/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useJobState } from './hooks/useJobState';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { FindJobs } from './components/FindJobs';
import { JobDetails } from './components/JobDetails';
import { PostJob } from './components/PostJob';
import { Categories } from './components/Categories';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Auth } from './components/Auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // Custom job board filters state
  const [jobFilters, setJobFilters] = useState<{ query: string; location: string; category: string; type: string }>({
    query: '',
    location: '',
    category: '',
    type: '',
  });

  const {
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
  } = useJobState();

  const handleApplyForJob = (applicationData: any) => {
    applyForJob(applicationData);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            jobs={jobs}
            setActiveTab={setActiveTab}
            setSelectedJobId={setSelectedJobId}
            setJobFilters={setJobFilters}
          />
        );
      case 'jobs':
        return (
          <FindJobs
            jobs={jobs}
            jobFilters={jobFilters}
            setJobFilters={setJobFilters}
            setSelectedJobId={setSelectedJobId}
            setActiveTab={setActiveTab}
          />
        );
      case 'job-details':
        return (
          <JobDetails
            jobId={selectedJobId}
            jobs={jobs}
            currentUser={currentUser}
            onApply={handleApplyForJob}
            setActiveTab={setActiveTab}
          />
        );
      case 'post-job':
        return (
          <PostJob
            currentUser={currentUser}
            onCreateJob={createJob}
            setActiveTab={setActiveTab}
            setSelectedJobId={setSelectedJobId}
          />
        );
      case 'categories':
        return (
          <Categories
            jobs={jobs}
            setActiveTab={setActiveTab}
            setJobFilters={setJobFilters}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return (
          <Auth
            currentUser={currentUser}
            jobs={jobs}
            applications={applications}
            onRegister={registerUser}
            onLogin={loginUser}
            onLogout={logoutUser}
            onUpdateProfile={updateProfile}
            onUpdateAppStatus={updateApplicationStatus}
            setActiveTab={setActiveTab}
            setSelectedJobId={setSelectedJobId}
          />
        );
      default:
        return (
          <Home
            jobs={jobs}
            setActiveTab={setActiveTab}
            setSelectedJobId={setSelectedJobId}
            setJobFilters={setJobFilters}
          />
        );
    }
  };

  return (
    <div id="root-viewport" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <div className="flex flex-col flex-1">
        {/* Navigation Navbar Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onLogout={logoutUser}
        />

        {/* Hero Banner Accent or spacing offset */}
        <main id="main-content-fluid" className="flex-1 w-full max-w-7xl mx-auto py-8">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Shared Footer block */}
      <Footer
        setActiveTab={setActiveTab}
        jobsCount={jobs.length}
      />
    </div>
  );
}

