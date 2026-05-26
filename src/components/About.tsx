/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LucideIcon } from './LucideIcon';

export function About() {
  const [selectedRegion, setSelectedRegion] = useState<string>('downtown');

  const regionsData: Record<string, { title: string; jobs: number; keySector: string; description: string }> = {
    downtown: {
      title: 'Springfield Downtown (Metropolitan Hub)',
      jobs: 14,
      keySector: 'IT, Professional Services, Hospitality',
      description: 'The heartbeat of local commerce, filled with boutique consulting firms, community tech outlets, and premium coffee venues.',
    },
    westside: {
      title: 'Springfield West (Aesthetic Suburbs)',
      jobs: 9,
      keySector: 'Education, In-Home Services, Retail',
      description: 'Quiet, residential neighbourhoods with strong tutoring academies, local gardens, and high-quality preschool organizations.',
    },
    northside: {
      title: 'Springfield North (Industrial & Care)',
      jobs: 11,
      keySector: 'Healthcare, General Labor, Logistics',
      description: 'A growing residential sector requiring active certified caregivers, nurse practitioners, and home health services.',
    },
    civic: {
      title: 'Springfield Civic Center (Municipal Corridor)',
      jobs: 7,
      keySector: 'Government, Public Service, Arts & Rec',
      description: 'Centred around Springfield Civic town hall. Position openings usually require clerical record-keeping, recreational planning, or event organizing.'
    }
  };

  return (
    <div id="about-viewport" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 transition-all">
      {/* 1. Header Banner */}
      <div className="border-b border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Our Purpose & Mission</h1>
        <p className="mt-1 text-xs text-slate-500">Learn about our commitment to creating sustainable, rewarding local employment inside Springfield.</p>
      </div>

      {/* 2. Core Editorial Text and Vision grid */}
      <div className="mt-10 grid gap-12 lg:grid-cols-2 items-start">
        <div className="space-y-6">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Bridging Local Gaps</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans leading-tight">
            Why focus on regional Springfield jobs?
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed">
            Every day, thousands of highly qualified Springfield residents spend over two hours sitting in gridlocked highway traffic to reach distant metro centers. This long-distance commuting drains valuable family time, generates tons of avoidable carbon emissions, and shifts capital away from local neighborhood outlets.
          </p>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
            <strong>JobConnect</strong> is a municipal development project launched to solve this exact problem. By collecting and validating positions located exclusively within a 15-mile threshold of Springfield Civic Center, we make it practical to find a rewarding, fair career right next door.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
              <span className="block text-xl font-bold text-blue-600 dark:text-blue-400">15 Miles</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Max Radius Target</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
              <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-400">2,000+ Lbs</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold text-center">Carbon Saved/Yr</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
              <span className="block text-xl font-bold text-amber-500">100% Direct</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Recruiting Nodes</span>
            </div>
          </div>
        </div>

        {/* Brand Mission Values Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <h3 className="text-sm font-bold text-slate-950 dark:text-slate-250">Our Fundamental Guarantees</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <LucideIcon name="ShieldCheck" size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Active Anti-Scam Verification</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We manually call and verify every registered employer brand. No ghosts or multi-level marketing traps allowed on this board.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <LucideIcon name="DollarSign" size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">Mandatory Salary Transparency</h4>
                <p className="text-xs text-slate-500 leading-relaxed">No &ldquo;unspecified or competitive&rdquo; wage placeholders. Standard minimum wages are audited for compliance continuously.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-600 dark:bg-pink-955/20 dark:text-pink-400">
                <LucideIcon name="Heart" size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Carbon Footprint Preservation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">By reducing average commutes from 50 miles to under 8 miles, each hired resident reduces global warming impacts by 20% on average.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE INFOGRAPHIC STATE MAP */}
      <div className="mt-16 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white dark:from-slate-955 dark:to-blue-900">
        <div className="grid gap-8 lg:grid-cols-5 items-center">
          
          {/* Legend and interactive buttons */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block font-mono">Territorial Impact Grid</span>
              <h3 className="text-xl font-bold text-white mt-1">Explore Springfield Quadrants</h3>
              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                Click on any sector quadrant on the adjacent interactive infographic to analyze active hiring volumes and cluster industries.
              </p>
            </div>

            <div className="space-y-2">
              {Object.keys(regionsData).map((key) => (
                <button
                  key={key}
                  id={`btn-map-tab-${key}`}
                  onClick={() => setSelectedRegion(key)}
                  className={`flex w-full items-center justify-between px-4 py-3 rounded-xl border text-left text-xs transition duration-200 cursor-pointer ${
                    selectedRegion === key
                      ? 'bg-white text-slate-950 border-white font-semibold'
                      : 'border-white/10 text-blue-200 hover:bg-white/5'
                  }`}
                >
                  <span className="capitalize">{key} Cluster</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded">
                      {regionsData[key].jobs} Posts
                    </span>
                    <LucideIcon name="ChevronRight" size={12} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Infographic map visualizer */}
          <div className="lg:col-span-3 rounded-2xl bg-white/5 p-6 border border-white/10 space-y-6">
            <div className="relative h-64 bg-slate-950/60 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Abs grid bg */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Graphic nodes representing Springfield map */}
              <div className="relative w-72 h-44 flex flex-wrap gap-2 justify-center items-center">
                {/* 1. North */}
                <button
                  id="graph-node-north"
                  onClick={() => setSelectedRegion('northside')}
                  className={`absolute top-0 left-12 w-28 h-18 rounded-xl flex flex-col justify-center items-center font-bold text-xs shadow transition-all cursor-pointer ${
                    selectedRegion === 'northside'
                      ? 'bg-rose-600 scale-105 ring-4 ring-rose-350 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <LucideIcon name="HardHat" size={16} />
                  <span className="mt-1">Northside</span>
                </button>

                {/* 2. Downtown (Center) */}
                <button
                  id="graph-node-downtown"
                  onClick={() => setSelectedRegion('downtown')}
                  className={`absolute top-12 left-28 w-28 h-20 rounded-xl flex flex-col justify-center items-center font-bold text-xs shadow transition-all cursor-pointer ${
                    selectedRegion === 'downtown'
                      ? 'bg-blue-600 scale-105 ring-4 ring-blue-500/50 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <LucideIcon name="Code" size={16} />
                  <span className="mt-1">Downtown</span>
                </button>

                {/* 3. Westside */}
                <button
                  id="graph-node-westside"
                  onClick={() => setSelectedRegion('westside')}
                  className={`absolute bottom-0 left-6 w-28 h-18 rounded-xl flex flex-col justify-center items-center font-bold text-xs shadow transition-all cursor-pointer ${
                    selectedRegion === 'westside'
                      ? 'bg-emerald-600 scale-105 ring-4 ring-emerald-350 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <LucideIcon name="GraduationCap" size={16} />
                  <span className="mt-1">Westside Suburbs</span>
                </button>

                {/* 4. Civic */}
                <button
                  id="graph-node-civic"
                  onClick={() => setSelectedRegion('civic')}
                  className={`absolute bottom-0 right-6 w-28 h-18 rounded-xl flex flex-col justify-center items-center font-bold text-xs shadow transition-all cursor-pointer ${
                    selectedRegion === 'civic'
                      ? 'bg-amber-500 scale-105 ring-4 ring-amber-305 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <LucideIcon name="Building2" size={16} />
                  <span className="mt-1">Civic Corridor</span>
                </button>
              </div>
            </div>

            {/* Display detailed metrics card for active region */}
            <div className="rounded-xl bg-white/5 p-4 border border-white/10 space-y-2 animate-in fade-in duration-300">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <LucideIcon name="MapPin" size={14} className="text-blue-400" />
                {regionsData[selectedRegion].title}
              </h4>
              <p className="text-[11px] text-blue-200 leading-relaxed">
                {regionsData[selectedRegion].description}
              </p>
              <div className="flex gap-4 pt-2 text-[11px] font-mono font-semibold text-slate-400 border-t border-white/10 mt-2">
                <div>
                  Key Domain Type: <span className="text-white font-sans">{regionsData[selectedRegion].keySector}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
