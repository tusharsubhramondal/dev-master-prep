import React from 'react';
import { technologiesData } from '../data/technologiesData';

export default function UserDashboard({ onSelectTech }) {
  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
          <i className="fa-solid fa-chart-pie"></i> Learning Dashboard &amp; Progress
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          My Engineering Mastery Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Track completed topics, interview practice scores, bookmarked concepts, and recommended next learning steps.
        </p>
      </div>

      {/* Progress Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Completed Topics</span>
          <div className="text-2xl font-extrabold text-white">18 / 24</div>
          <span className="text-[11px] text-emerald-400 font-semibold">↑ 75% Mastery</span>
        </div>

        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Interview Questions Solved</span>
          <div className="text-2xl font-extrabold text-white">42 Qs</div>
          <span className="text-[11px] text-purple-400 font-semibold">Senior &amp; Architect Band</span>
        </div>

        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Projects Completed</span>
          <div className="text-2xl font-extrabold text-white">3 Blueprints</div>
          <span className="text-[11px] text-indigo-400 font-semibold">CRUD, API &amp; Queues</span>
        </div>

        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Current Learning Path</span>
          <div className="text-sm font-extrabold text-white truncate">Backend Engineer</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Step 4 of 6 Active</span>
        </div>
      </div>

      {/* Progress Per Technology Bar List */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <i className="fa-solid fa-layer-group text-indigo-400"></i> Technology Mastery Breakdown
        </h2>

        <div className="space-y-4">
          {technologiesData.slice(0, 6).map((tech) => (
            <div
              key={tech.id}
              onClick={() => onSelectTech(tech.id)}
              className="bg-[#0f172a] hover:bg-[#172033] border border-slate-800 p-4 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className={`${tech.icon}`} style={{ color: tech.color }}></i>
                  <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">{tech.name}</span>
                </div>
                <span className="text-xs font-bold text-indigo-400">{tech.learningProgress}%</span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${tech.learningProgress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
