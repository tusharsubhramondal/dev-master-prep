import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';

export default function ProjectsView() {
  const [activeTier, setActiveTier] = useState('all');
  const [selectedProjectId, setSelectedProjectId] = useState(projectsData[0].id);

  const filteredProjects = projectsData.filter((p) => {
    return activeTier === 'all' || p.tier.toLowerCase() === activeTier.toLowerCase();
  });

  const selectedProj = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
          <i className="fa-solid fa-diagram-project"></i> Real-World Engineering Projects
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Build Production-Grade Projects Across Tiers
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Complete project blueprints featuring architecture diagrams, database schemas, API specs, caching, queues, and senior design interview questions.
        </p>

        {/* Tier Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {['all', 'Beginner', 'Intermediate', 'Senior'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTier(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeTier === t
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/30'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t === 'all' ? 'All Tiers' : `${t} Tier`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Project Selector List + Active Blueprint Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Projects List */}
        <div className="space-y-4">
          {filteredProjects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`glass-panel p-5 cursor-pointer transition-all space-y-2 group ${
                  isSelected ? 'border-emerald-500 bg-[#172033]' : 'hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`badge badge-${proj.tier.toLowerCase()}`}>{proj.tier}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{proj.experienceBand}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right 2 Cols: Active Project Blueprint Detail */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className={`badge badge-${selectedProj.tier.toLowerCase()} mb-2`}>
                {selectedProj.tier} Tier Blueprint
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedProj.title}</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">{selectedProj.category}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedProj.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recommended Tech Stack:</span>
            <div className="flex flex-wrap gap-2">
              {selectedProj.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Core Requirements */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Engineering Requirements:</span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedProj.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Flow */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">System Architecture Flow:</span>
            <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
              {selectedProj.architecture}
            </div>
          </div>

          {/* Database Schema */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Database Schema Blueprint:</span>
            <pre className="bg-[#0d1117] p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
              <code>{selectedProj.dbSchema}</code>
            </pre>
          </div>

          {/* API Endpoints */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key API Endpoints:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {selectedProj.apiEndpoints.map((ep, i) => (
                <div key={i} className="bg-[#0f172a] p-2 rounded border border-slate-800 text-sky-300">
                  {ep}
                </div>
              ))}
            </div>
          </div>

          {/* Project Interview Questions */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Project Interview Questions:</span>
            <div className="space-y-2 text-xs text-slate-200">
              {selectedProj.interviewQuestions.map((q, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">Q{i + 1}:</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
