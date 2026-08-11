import React, { useState, useEffect } from 'react';
import { roadmapsData } from '../data/roadmapsData';
import { technologiesData } from '../data/technologiesData';

export default function RoadmapView({ activeTechId, onSelectTopic }) {
  const [selectedTech, setSelectedTech] = useState(activeTechId || 'javascript');

  useEffect(() => {
    if (activeTechId) {
      setSelectedTech(activeTechId);
    }
  }, [activeTechId]);

  const techObj = technologiesData.find((t) => t.id === selectedTech) || technologiesData[0];

  // Helper to generate a default 3-level roadmap if a specific tech roadmap isn't custom defined
  const getRoadmapForTech = (techId) => {
    if (roadmapsData[techId]) {
      return roadmapsData[techId];
    }
    const t = technologiesData.find((item) => item.id === techId) || techObj;
    return {
      techId: t.id,
      title: `${t.name} Developer Learning Roadmap`,
      steps: [
        { step: 1, title: `${t.name} Fundamentals & Environment Setup`, desc: `Core syntax, basic building blocks, environment setup, and CLI conventions for ${t.name}.`, topicId: `${t.id}-basics`, level: 'Beginner' },
        { step: 2, title: `Core Data Types & Standard Operations`, desc: `Variables, structures, control flow, and foundational APIs in ${t.name}.`, topicId: `${t.id}-core`, level: 'Beginner' },
        { step: 3, title: `Functions & Modular Architecture`, desc: `Structuring modular code, scope, reusable functions, and package management.`, topicId: `${t.id}-modules`, level: 'Beginner' },
        { step: 4, title: `Intermediate Framework & Data Access`, desc: `Working with ORMs, database drivers, state management, and async operations.`, topicId: `${t.id}-data`, level: 'Intermediate' },
        { step: 5, title: `REST / GraphQL APIs & Routing`, desc: `Building robust APIs, handling request/response lifecycle, middleware, and validation.`, topicId: `${t.id}-apis`, level: 'Intermediate' },
        { step: 6, title: `Security & Authentication Standards`, desc: `Implementing auth tokens, CORS, data sanitization, and security best practices.`, topicId: `${t.id}-security`, level: 'Intermediate' },
        { step: 7, title: `Testing & Refactoring Patterns`, desc: `Unit testing, integration testing, and clean architecture code refactoring.`, topicId: `${t.id}-testing`, level: 'Intermediate' },
        { step: 8, title: `Runtime Internals & Concurrency`, desc: `Understanding execution context, event loops, memory allocation, and multi-threading.`, topicId: `${t.id}-internals`, level: 'Senior' },
        { step: 9, title: `Performance Tuning & Memory Profiling`, desc: `Caching strategies, eliminating bottlenecks, heap snapshots, and query optimization.`, topicId: `${t.id}-performance`, level: 'Senior' },
        { step: 10, title: `Distributed System Architecture & Scaling`, desc: `Containerization, high-availability deployment, load balancing, and microservices trade-offs.`, topicId: `${t.id}-architecture`, level: 'Senior' }
      ]
    };
  };

  const roadmap = getRoadmapForTech(selectedTech);

  const getLevelBadgeColor = (lvl) => {
    const l = (lvl || '').toLowerCase();
    if (l.includes('beginner')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (l.includes('senior') || l.includes('advanced')) return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  };

  const getStepLevel = (step, levelStr) => {
    if (levelStr) return levelStr;
    if (step <= 3) return 'Beginner';
    if (step <= 7) return 'Intermediate';
    return 'Senior';
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
              <i className="fa-solid fa-route"></i> Interactive Roadmap Visualizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {roadmap.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Structured step-by-step topics path for {techObj.name} across Beginner, Intermediate, and Senior levels.
            </p>
          </div>

          {/* Technology Selector Dropdown & Switcher */}
          <div className="space-y-1 w-full md:w-auto">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Technology Stack:
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full md:w-64 bg-[#111726] border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-500 focus:outline-none shadow-inner"
            >
              {technologiesData.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Flowchart Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner border border-slate-700/50"
              style={{ backgroundColor: `${techObj.color}20`, color: techObj.color }}
            >
              <i className={techObj.icon}></i>
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{techObj.name} Roadmap Topics</h2>
              <span className="text-xs text-slate-400">
                {roadmap.steps.length} Sequential Topic Modules
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Beginner</span>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Intermediate</span>
            <span className="px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">Senior</span>
          </div>
        </div>

        {/* Steps Flow */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500">
          {roadmap.steps.map((st) => {
            const level = getStepLevel(st.step, st.level);
            return (
              <div key={st.step} className="relative flex items-start gap-5 group">
                
                {/* Step Circle Badge */}
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500 text-indigo-300 font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all z-10">
                  {st.step}
                </div>

                {/* Step Card */}
                <div 
                  onClick={() => onSelectTopic(st.topicId || "javascript-closure")}
                  className="flex-1 bg-[#0f172a] hover:bg-[#172033] border border-slate-800 hover:border-indigo-500/40 p-4 rounded-xl cursor-pointer transition-all space-y-1 shadow-md group-hover:translate-x-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {st.title}
                      </h3>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.2 rounded border ${getLevelBadgeColor(level)}`}>
                        {level}
                      </span>
                    </div>

                    <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                      Study Module <i className="fa-solid fa-arrow-right text-[8px]"></i>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
