/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Job, UserAccount, JobApplication } from '../types';
import { LucideIcon } from './LucideIcon';

interface AuthProps {
  currentUser: UserAccount | null;
  jobs: Job[];
  applications: JobApplication[];
  onRegister: (userData: Omit<UserAccount, 'id'>) => void;
  onLogin: (email: string, role: 'seeker' | 'employer') => void;
  onLogout: () => void;
  onUpdateProfile: (updated: Partial<UserAccount>) => void;
  onUpdateAppStatus: (appId: string, status: JobApplication['status']) => void;
  setActiveTab: (tab: string) => void;
  setSelectedJobId: (id: string | null) => void;
}

export function Auth({
  currentUser,
  jobs,
  applications,
  onRegister,
  onLogin,
  onLogout,
  onUpdateProfile,
  onUpdateAppStatus,
  setActiveTab,
  setSelectedJobId,
}: AuthProps) {
  // Authentication tab/fields
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState(''); // dummy

  // Profile Edit fields
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editSkillsText, setEditSkillsText] = useState(currentUser?.skills?.join(', ') || '');
  const [editCompanyName, setEditCompanyName] = useState(currentUser?.companyName || '');

  // Track expanded applicant item
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (authMode === 'login') {
      onLogin(email, role);
    } else {
      onRegister({
        email,
        fullName: fullName || email.split('@')[0],
        role,
        companyName: role === 'employer' ? companyName || `${fullName} Industries` : undefined,
        bio: role === 'seeker' 
          ? 'Enthusiastic candidate searching for regional matches.' 
          : 'Verified local Springfield brand creating job opportunities.',
        skills: role === 'seeker' ? ['Communication', 'Teamwork', 'React'] : undefined,
        resumeSubmitted: role === 'seeker' ? true : undefined,
      });
    }

    // Reset fields
    setEmail('');
    setFullName('');
    setCompanyName('');
    setPassword('');
  };

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: Partial<UserAccount> = {
      bio: editBio,
      companyName: currentUser.role === 'employer' ? editCompanyName : undefined,
      skills: currentUser.role === 'seeker' 
        ? editSkillsText.split(',').map((s) => s.trim()).filter(Boolean) 
        : undefined,
    };

    onUpdateProfile(updated);
    setIsEditingProfile(false);
  };

  const handleStartEditing = () => {
    setEditBio(currentUser?.bio || '');
    setEditCompanyName(currentUser?.companyName || '');
    setEditSkillsText(currentUser?.skills?.join(', ') || '');
    setIsEditingProfile(true);
  };

  // FILTER APPLICATIONS FOR SEEKER
  const seekerApplications = applications.filter((app) => app.userId === currentUser?.id || app.seekerEmail === currentUser?.email);

  // FILTER JOBS / APPLICATIONS FOR EMPLOYER
  const employerJobs = jobs.filter((job) => job.employerId === currentUser?.id || job.contactEmail === currentUser?.email);
  const employerJobsIds = employerJobs.map((j) => j.id);
  
  // Applications matching employer's jobs
  const employerIncomingApps = applications.filter((app) => employerJobsIds.includes(app.jobId));

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'Accepted':
        return <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">Accepted</span>;
      case 'Declined':
        return <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700 dark:bg-red-955/20 dark:text-red-400">Declined</span>;
      case 'Interviewing':
        return <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-sans">Interviewing</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-400">Pending Review</span>;
    }
  };

  const handleJobLinkClick = (id: string) => {
    setSelectedJobId(id);
    setActiveTab('job-details');
  };

  // ==================== RENDER HUB FOR GUESTS (LOGIN/SIGNUP) ====================
  if (!currentUser) {
    return (
      <div id="unauthenticated-auth-view" className="mx-auto max-w-md px-4 py-12 sm:px-6 transition-all">
        <div id="auth-panel-card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
          
          {/* Tabs header */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 pb-3 justify-center gap-6">
            <button
              id="tab-auth-mode-login"
              onClick={() => setAuthMode('login')}
              className={`text-sm font-bold pb-2 transition-colors cursor-pointer relative ${
                authMode === 'login' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
              }`}
            >
              Log In to Portal
              {authMode === 'login' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded" />}
            </button>
            <button
              id="tab-auth-mode-signup"
              onClick={() => setAuthMode('signup')}
              className={`text-sm font-bold pb-2 transition-colors cursor-pointer relative ${
                authMode === 'signup' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
              }`}
            >
              Create Account
              {authMode === 'signup' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded" />}
            </button>
          </div>

          <form id="cred-auth-form" onSubmit={handleAuthSubmit} className="space-y-4">
            
            {/* Conditional Full Name for signup */}
            {authMode === 'signup' && (
              <div className="space-y-1.5">
                <label htmlFor="auth-input-fullname" className="block text-xs font-bold text-slate-750 dark:text-slate-355">
                  Full Name *
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                  <LucideIcon name="User" className="text-slate-405" size={16} />
                  <input
                    id="auth-input-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Amanda Higgins"
                    className="w-full bg-transparent border-none outline-none text-xs font-semibold focus:ring-0 text-slate-805 dark:text-slate-205"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-input-email" className="block text-xs font-bold text-slate-750 dark:text-slate-355">
                Email Address *
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                <LucideIcon name="Mail" className="text-slate-405" size={16} />
                <input
                  id="auth-input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amanda@springfield.com"
                  className="w-full bg-transparent border-none outline-none text-xs font-semibold focus:ring-0 text-slate-805 dark:text-slate-205"
                />
              </div>
            </div>

            {/* Conditional Company Name field for employer signup */}
            {authMode === 'signup' && role === 'employer' && (
              <div className="space-y-1.5">
                <label htmlFor="auth-input-companyname" className="block text-xs font-bold text-slate-750 dark:text-slate-355">
                  Business / Brand Name *
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                  <LucideIcon name="Building2" className="text-slate-405" size={16} />
                  <input
                    id="auth-input-companyname"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Evergreen Grocery Store"
                    className="w-full bg-transparent border-none outline-none text-xs font-semibold focus:ring-0 text-slate-805 dark:text-slate-205"
                  />
                </div>
              </div>
            )}

            {/* Secured Password field (Dummy) */}
            <div className="space-y-1.5">
              <label htmlFor="auth-input-pass" className="block text-xs font-bold text-slate-755 dark:text-slate-355">
                Secured Password *
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                <LucideIcon name="Lock" className="text-slate-405" size={16} />
                <input
                  id="auth-input-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none outline-none text-xs font-semibold focus:ring-0 text-slate-805 dark:text-slate-205"
                />
              </div>
            </div>

            {/* Role Radio Select buttons */}
            <div className="space-y-2 pt-1.5">
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-350">My Professional Target</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="role-btn-seeker"
                  onClick={() => setRole('seeker')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                    role === 'seeker'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-600 dark:bg-blue-950/30'
                      : 'border-slate-205 hover:bg-slate-55'
                  }`}
                >
                  <LucideIcon name="User" size={20} className="mb-1" />
                  <span className="text-[11px] font-bold">Job Seeker</span>
                  <span className="text-[8.5px] text-slate-405 block mt-0.5">I want local work</span>
                </button>
                <button
                  type="button"
                  id="role-btn-employer"
                  onClick={() => setRole('employer')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                    role === 'employer'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-600 dark:bg-blue-950/30'
                      : 'border-slate-205 hover:bg-slate-55'
                  }`}
                >
                  <LucideIcon name="Building2" size={20} className="mb-1" />
                  <span className="text-[11px] font-bold">Employer</span>
                  <span className="text-[8.5px] text-slate-405 block mt-0.5">I want neighborhood staffing</span>
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              id="btn-auth-submit"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-705-blue-700 text-white font-bold rounded-xl py-2.5 text-xs shadow-md active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <LucideIcon name="Lock" size={14} />
              {authMode === 'login' ? 'Authenticate Session' : 'Register Community Profile'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ==================== RENDER HUB FOR AUTHENTICATED USERS ====================
  return (
    <div id="authenticated-hub-view" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-all space-y-8">
      
      {/* Upper Hub Greeting banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-600 font-extrabold text-white text-md">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans">
              Welcome Back, {currentUser.fullName}!
            </h1>
            <p className="text-xs text-slate-500">
              Logged in as <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">{currentUser.role === 'employer' ? 'Employer' : 'Job Seeker'}</span>. Connected to Springfield servers.
            </p>
          </div>
        </div>

        <button
          id="btn-logout-hub"
          onClick={onLogout}
          className="flex items-center gap-1.5 border border-red-200 text-red-650 hover:bg-red-50 dark:border-red-950 dark:text-red-400 dark:hover:bg-red-950/20 font-bold rounded-xl px-4 py-2 text-xs transition cursor-pointer"
        >
          <LucideIcon name="LogOut" size={14} /> Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: EDITABLE PROFILE BLOCK */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <LucideIcon name="User" size={16} /> Contact Profile card
              </h3>
              {!isEditingProfile && (
                <button
                  id="btn-edit-profile-trigger"
                  onClick={handleStartEditing}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer underline decoration-dotted"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditingProfile ? (
              /* Profile edit form fields */
              <form id="profile-edit-form" onSubmit={handleProfileSave} className="space-y-4 text-xs font-semibold">
                
                {currentUser.role === 'employer' ? (
                  <div className="space-y-1.5">
                    <label htmlFor="pf-edit-company" className="block text-slate-700">Company Brand Name</label>
                    <input
                      id="pf-edit-company"
                      type="text"
                      className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 text-xs font-semibold"
                      value={editCompanyName}
                      onChange={(e) => setEditCompanyName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label htmlFor="pf-edit-skills" className="block text-slate-705">Core Professional Skills (Comma Separated)</label>
                    <input
                      id="pf-edit-skills"
                      type="text"
                      className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 text-xs font-semibold"
                      value={editSkillsText}
                      placeholder="e.g. Cooking, ServSafe, Cash Registry"
                      onChange={(e) => setEditSkillsText(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="pf-edit-bio" className="block text-slate-705">Bio Summary</label>
                  <textarea
                    id="pf-edit-bio"
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-105 text-xs font-semibold"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    id="pf-edit-cancel"
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer hover:bg-slate-55"
                  >
                    Cancel
                  </button>
                  <button
                    id="pf-edit-save"
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow hover:bg-blue-700 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Display Panel */
              <div className="space-y-4 text-xs font-medium">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Summary bio</span>
                  <p className="mt-1 text-slate-650 leading-relaxed dark:text-slate-350 italic">
                    &ldquo;{currentUser.bio || 'No bio entered yet. Complete your credentials!'}&rdquo;
                  </p>
                </div>

                {currentUser.role === 'seeker' ? (
                  <>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Skills & Tag Credentials</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {currentUser.skills && currentUser.skills.length > 0 ? (
                          currentUser.skills.map((skill) => (
                            <span key={skill} className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400">None declared</span>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Mock Resume Node</span>
                      <span className="text-xs font-semibold text-slate-700 block flex items-center gap-1 dark:text-slate-300">
                        <LucideIcon name="FileText" className="text-slate-400" size={14} /> application_profile_resume.pdf
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Registered Enterprise</span>
                    <span className="text-xs font-bold text-slate-700 block flex items-center gap-1 dark:text-slate-300">
                      <LucideIcon name="Building2" className="text-slate-400" size={14} /> {currentUser.companyName || 'Boutique Springfield Brand'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT TWO COLUMNS: DYNAMIC REAL-TIME ACTION SECTOR */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* A. JOB SEEKER SUBMISSION SUMMARY BOARD */}
          {currentUser.role === 'seeker' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-105 pb-3 flex items-center gap-2">
                <LucideIcon name="Briefcase" className="text-blue-600" size={18} /> My Employment Applications ({seekerApplications.length})
              </h3>

              {seekerApplications.length > 0 ? (
                <div className="space-y-4">
                  {seekerApplications.map((app) => (
                    <div key={app.id} id={`seeker-app-row-${app.id}`} className="flex justify-between items-center rounded-xl p-4 border border-slate-105 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-950/20">
                      <div className="space-y-1 text-xs">
                        <h4 className="font-bold text-slate-905 dark:text-white hover:underline cursor-pointer" onClick={() => handleJobLinkClick(app.jobId)}>
                          {app.jobTitle}
                        </h4>
                        <span className="font-semibold text-slate-500 block">{app.company}</span>
                        <div className="text-[10px] text-slate-405 flex items-center gap-2 pt-1">
                          <span>Applied on {app.appliedDate}</span>
                          <span>•</span>
                          <span>Resume: {app.resumeName}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(app.status)}
                        <span className="text-[9px] text-slate-455 font-mono">ID: {app.id.split('-')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400">
                    <LucideIcon name="Briefcase" size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">No Applications Handled</h4>
                  <p className="text-slate-500 text-[11px] max-w-xs mx-auto">You have not submitted applications to any local jobs yet. Open the matching options to kickstart!</p>
                  <button
                    id="btn-seeker-go-match"
                    onClick={() => setActiveTab('jobs')}
                    className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Match Available Jobs
                  </button>
                </div>
              )}
            </div>
          )}

          {/* B. EMPLOYER CANDIDATE APPLICANTS PANEL */}
          {currentUser.role === 'employer' && (
            <div className="space-y-6">
              
              {/* Employers list of posted jobs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <LucideIcon name="Briefcase" size={18} className="text-blue-500" /> Active Job Postings ({employerJobs.length})
                  </h3>
                  <button
                    id="btn-emp-to-post"
                    onClick={() => setActiveTab('post-job')}
                    className="text-xs font-bold text-blue-600 flex items-center gap-1"
                  >
                    <LucideIcon name="PlusCircle" size={14} /> Post Another
                  </button>
                </div>

                {employerJobs.length > 0 ? (
                  <div className="space-y-3">
                    {employerJobs.map((pJob) => {
                      const appsForThisJob = applications.filter((a) => a.jobId === pJob.id);
                      return (
                        <div key={pJob.id} className="flex justify-between items-center rounded-xl p-3 bg-slate-50 border border-slate-105 dark:bg-slate-950/20 dark:border-slate-800 text-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block hover:underline cursor-pointer" onClick={() => handleJobLinkClick(pJob.id)}>{pJob.title}</span>
                            <span className="text-[10px] text-slate-403 block mt-0.5">{pJob.location} • {pJob.salary}</span>
                          </div>
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded px-1.5 py-0.5">
                            {appsForThisJob.length} {appsForThisJob.length === 1 ? 'applicant' : 'applicants'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No job openings listed by your employer segment yet.</p>
                )}
              </div>

              {/* Dynamic Incoming candidates Applications audit */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 flex items-center gap-2">
                  <LucideIcon name="User" className="text-blue-500" size={18} /> Candidate Management Panel ({employerIncomingApps.length})
                </h3>

                {employerIncomingApps.length > 0 ? (
                  <div className="space-y-4">
                    {employerIncomingApps.map((app) => {
                      const isExpanded = expandedAppId === app.id;
                      return (
                        <div key={app.id} className="rounded-xl border border-slate-100 dark:border-slate-805 bg-slate-50/20 dark:bg-slate-950/10 hover:border-slate-250 dark:hover:border-slate-705 p-4 space-y-3 transition">
                          
                          {/* Row Header */}
                          <div className="flex justify-between items-start text-xs">
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block dark:text-white">{app.seekerName}</span>
                              <span className="text-[10px] text-slate-500 block">Applied for: <strong className="text-slate-800 dark:text-slate-300">{app.jobTitle}</strong></span>
                              <span className="text-[10.5px] font-mono text-slate-400">Date: {app.appliedDate}</span>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(app.status)}
                              <button
                                id={`btn-toggle-candidate-${app.id}`}
                                onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                                className="text-[10px] underline text-blue-600 cursor-pointer font-semibold flex items-center gap-0.5"
                              >
                                {isExpanded ? 'Hide particulars' : 'Review details'}
                              </button>
                            </div>
                          </div>

                          {/* Expanded interactive fields */}
                          {isExpanded && (
                            <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-3 text-xs animate-in slide-in-from-top-2 duration-200">
                              
                              <div className="grid grid-cols-2 gap-4 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 dark:bg-slate-950 dark:border-slate-900">
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-mono">Email node:</span>
                                  <span className="font-semibold">{app.seekerEmail}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-405 block font-mono">Phone node:</span>
                                  <span className="font-semibold">{app.seekerPhone}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-405 font-mono block">Pitch & Cover message:</span>
                                <p className="italic text-slate-650 whitespace-pre-line leading-relaxed border-l-2 border-blue-500 pl-2.5 dark:text-slate-350 bg-blue-50/10 p-2 rounded">
                                  {app.coverLetter}
                                </p>
                              </div>

                              <div className="flex items-center justify-between border-t border-slate-105 pt-2.5">
                                <span className="text-[10px] text-slate-450 flex items-center gap-1">
                                  <LucideIcon name="FileText" size={12} /> {app.resumeName}
                                </span>

                                {/* Quick state revision dials */}
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-403">Revise status:</span>
                                  <button
                                    id={`btn-status-interview-${app.id}`}
                                    onClick={() => onUpdateAppStatus(app.id, 'Interviewing')}
                                    className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                                      app.status === 'Interviewing'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                                    }`}
                                  >
                                    Interview
                                  </button>
                                  <button
                                    id={`btn-status-accept-${app.id}`}
                                    onClick={() => onUpdateAppStatus(app.id, 'Accepted')}
                                    className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                                      app.status === 'Accepted'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                                    }`}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    id={`btn-status-decline-${app.id}`}
                                    onClick={() => onUpdateAppStatus(app.id, 'Declined')}
                                    className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                                      app.status === 'Declined'
                                        ? 'bg-red-650 text-white'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                                    }`}
                                  >
                                    Decline
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400">
                      <LucideIcon name="User" size={20} />
                    </div>
                    <p className="text-xs text-slate-500 italic">No incoming applications found for your listed positions.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
