import React, { useState } from 'react';
import { learningPathsData } from '../data/learningPathsData';

export default function LearningPathsView({ onSelectTech }) {
  const [selectedPathId, setSelectedPathId] = useState(learningPathsData[0].id);
  const currentPath = learningPathsData.find((p) => p.id === selectedPathId) || learningPathsData[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
          <i className="fa-solid fa-graduation-cap"></i> Structured Career &amp; Learning Paths
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Choose Your Engineering Track
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Tailored step-by-step career trajectories to prepare for Backend Engineer, Lead Laravel Specialist, or Principal Software Architect roles.
        </p>

        {/* Path Selector Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          {learningPathsData.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                selectedPathId === path.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <i className={path.icon}></i>
              <span>{path.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Path Visualizer */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 text-2xl flex items-center justify-center border border-indigo-500/30">
            <i className={currentPath.icon}></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{currentPath.title}</h2>
            <span className="text-xs text-indigo-400 font-semibold">{currentPath.role}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {currentPath.description}
        </p>

        {/* Steps Flow */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Sequential Learning Milestones:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPath.steps.map((st) => (
              <div
                key={st.step}
                onClick={() => onSelectTech(st.techId)}
                className="bg-[#0f172a] hover:bg-[#172033] border border-slate-800 hover:border-indigo-500/40 p-4 rounded-xl cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Tech <i className="fa-solid fa-arrow-right text-[8px]"></i>
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
