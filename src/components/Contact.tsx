/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { LucideIcon } from './LucideIcon';

export function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    // Simulate sending message
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setSubject('general');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div id="contact-viewport" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 transition-all">
      {/* Header */}
      <div className="border-b border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Get in Touch with Us</h1>
        <p className="mt-1 text-xs text-slate-500">Contact the Springfield municipal job support desk for assistance or verification inquiries.</p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {/* Support items Cards Side */}
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">
              Community Helpdesks
            </h3>

            {/* Helpline phone */}
            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <LucideIcon name="Phone" size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-slate-450 uppercase font-bold">Helpline</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">1-800-SPRING-JOB</span>
                <span className="block text-[10px] text-slate-400">Mon-Fri, 9AM - 5PM EST</span>
              </div>
            </div>

            {/* Support Email */}
            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <LucideIcon name="Mail" size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-slate-440 uppercase font-bold">Email Support</span>
                <span className="text-xs font-semibold text-blue-600 truncate max-w-[180px] block dark:text-blue-400">support@jobconnect.example.com</span>
                <span className="block text-[10px] text-slate-400">Replies within 24 Hours</span>
              </div>
            </div>

            {/* Physical location */}
            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <LucideIcon name="Building2" size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-slate-440 uppercase font-bold">In-Person Audit Office</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight block">Springfield civic Center</span>
                <span className="text-[10px] text-slate-450">Suite 405 (Fourth Floor), Springfield, USA</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/25 p-5 dark:border-emerald-950/80 dark:bg-emerald-950/5 text-xs">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={16} /> Employer Verifications
            </h4>
            <p className="mt-2 text-slate-550 leading-relaxed text-[11px] dark:text-slate-405">
              Are you a local business owner looking to batch-publish opening options? Request a premium verified business account. We will dispatch a regional board member to assist you.
            </p>
          </div>
        </div>

        {/* Dynamic Interactive Input Form Board */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {isSubmitted ? (
            /* Contact success screen */
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <LucideIcon name="CheckCircle" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Message Delivered Successfully!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. We have logged your request. A Springfield municipal helpdesk assistant will review and contact you within 1 business day.
              </p>
              <button
                id="btn-contact-submit-another"
                onClick={handleReset}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2.5 text-xs transition active:scale-98 cursor-pointer shadow"
              >
                Submit another request
              </button>
            </div>
          ) : (
            /* Input fields form */
            <form id="contact-support-form" onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                Send us a secured message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-input-name" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-input-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Amanda Higgins"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-755 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-250 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-input-email" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-input-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. amanda@springfield.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-755 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-250 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-select-subject" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                  Help Topic / Department
                </label>
                <select
                  id="contact-select-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition"
                >
                  <option value="general">General Support Inquiry</option>
                  <option value="verify">Verification Request (Employers & Brands)</option>
                  <option value="report">Report Fraudulent Posting / Issue Alert</option>
                  <option value="advert">Sponsorship & Partnership Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-textarea-msg" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                  Message Body *
                </label>
                <textarea
                  id="contact-textarea-msg"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide complete particulars about your inquiry..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-755 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  id="btn-contact-submit"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs px-6 py-2.5 transition active:scale-98 shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <LucideIcon name="Send" size={14} /> Send Secure Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
