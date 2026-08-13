import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { technologiesData } from '../data/technologiesData';
import { roadmapsData } from '../data/roadmapsData';

export default function RoadmapsPage() {
  const navigate = useNavigate();
  const { techId } = useParams();

  const [selectedTech, setSelectedTech] = useState(techId || 'javascript');
  const [activeLevelFilter, setActiveLevelFilter] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Senior'

  useEffect(() => {
    if (techId) {
      setSelectedTech(techId);
    }
  }, [techId]);

  const techObj = technologiesData.find((t) => t.id === selectedTech);

  // Helper to generate a default 3-level roadmap if a specific tech roadmap isn't custom defined
  const getRoadmapForTech = (id) => {
    if (!id) return null;
    if (roadmapsData[id]) {
      return roadmapsData[id];
    }
    const t = technologiesData.find((item) => item.id === id) || techObj;
    if (!t) return null;

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

  const beginnerLevel = roadmap?.steps.filter((step) => step.level === 'Beginner') || [];
  const intermediateLevel = roadmap?.steps.filter((step) => step.level === 'Intermediate') || [];
  const seniorLevel = roadmap?.steps.filter((step) => step.level === 'Senior') || [];

  const filteredSteps = roadmap?.steps.filter((step) => {
    if (activeLevelFilter === 'all') return true;
    return step.level?.toLowerCase() === activeLevelFilter.toLowerCase();
  }) || [];

  const handleTechChange = (tech) => {
    if (!tech || tech === 'Select' || tech === 'null') {
      setSelectedTech('');
      navigate('/roadmaps');
    } else {
      setSelectedTech(tech);
      navigate(`/roadmaps/${tech}`);
    }
  };

  const getLevelColorStyle = (lvl) => {
    const l = (lvl || '').toLowerCase();
    if (l.includes('beginner')) {
      return {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        nodeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-emerald-500/10',
        connector: 'from-emerald-500 to-amber-500',
        dot: 'bg-emerald-400'
      };
    }
    if (l.includes('senior') || l.includes('advanced')) {
      return {
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        nodeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-500/10',
        connector: 'from-rose-500 to-purple-500',
        dot: 'bg-rose-400'
      };
    }
    return {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      nodeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/10',
      connector: 'from-amber-500 to-rose-500',
      dot: 'bg-amber-400'
    };
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">

      {/* Header Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
              <i className="fa-solid fa-route"></i> Interactive Roadmap Visualizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              {techObj?.icon && <i className={techObj.icon} style={{ color: techObj.color }}></i>}
              {roadmap ? roadmap.title : 'Select a Technology Stack Roadmap'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {techObj
                ? `Structured step-by-step topics path for ${techObj.name} across Beginner, Intermediate, and Senior levels.`
                : 'Choose a technology stack below to view its visual step-by-step flowchart and learning path.'}
            </p>
          </div>

          {/* Technology Selector Dropdown & Switcher */}
          <div className="space-y-1 w-full md:w-auto">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Technology Stack:
            </label>
            <select
              value={selectedTech || ''}
              onChange={(e) => handleTechChange(e.target.value)}
              className="w-full md:w-64 bg-[#111726] border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-500 focus:outline-none shadow-inner cursor-pointer"
            >
              <option value="">-- Choose Technology --</option>
              {technologiesData?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Roadmap Stats summary */}
        {roadmap && (
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#0f172a] border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Steps</span>
              <span className="text-lg font-extrabold text-indigo-400">{roadmap.steps?.length || 0} Milestones</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0f172a] border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Beginner Phase</span>
              <span className="text-lg font-extrabold text-emerald-400">
                {beginnerLevel.length} Steps
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0f172a] border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Intermediate Phase</span>
              <span className="text-lg font-extrabold text-amber-400">
                {intermediateLevel.length} Steps
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0f172a] border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Senior Phase</span>
              <span className="text-lg font-extrabold text-rose-400">
                {seniorLevel.length} Steps
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Step-by-Step Flowchart Container */}
      {!roadmap ? (
        /* Empty State Quick Select */
        <div className="glass-panel p-8 sm:p-12 rounded-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-3xl mx-auto">
            <i className="fa-solid fa-diagram-project"></i>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-white">Select a Technology to View Flowchart</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore step-by-step developer learning paths tailored across 20+ technologies and 3 expertise levels.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-2xl mx-auto">
            {technologiesData.slice(0, 10).map((t) => (
              <button
                key={t.id}
                onClick={() => handleTechChange(t.id)}
                className="px-3.5 py-2 rounded-xl bg-[#111726] hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500/50 text-xs font-semibold text-slate-200 hover:text-indigo-300 flex items-center gap-2 transition-all"
              >
                <i className={t.icon} style={{ color: t.color }}></i>
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Flowchart Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-diagram-project text-indigo-400"></i>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Step-by-Step Flowchart Path
              </h2>
            </div>

            {/* Level Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Steps' },
                { id: 'Beginner', label: '🟢 Beginner' },
                { id: 'Intermediate', label: '🟡 Intermediate' },
                { id: 'Senior', label: '🔴 Senior' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevelFilter(lvl.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeLevelFilter === lvl.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                      : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* FLOWCHART CONTAINER */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-8 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Flowchart Start Node */}
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-indigo-600/20 border border-indigo-400/30 flex items-center gap-2">
                <i className="fa-solid fa-flag-checkered"></i> Start Learning Path
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 to-emerald-500"></div>
            </div>

            {/* Flowchart Steps List */}
            <div className="relative space-y-8">

              {filteredSteps.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No steps found matching the selected level filter.
                </div>
              ) : (
                filteredSteps.map((item, idx) => {
                  const style = getLevelColorStyle(item.level);
                  const isLast = idx === filteredSteps.length - 1;

                  return (
                    <div key={item.step} className="relative group">
                      
                      {/* Step Connector Line */}
                      {!isLast && (
                        <div className="absolute left-5 sm:left-6 top-12 bottom-0 w-0.5 bg-slate-800 group-hover:bg-gradient-to-b group-hover:from-indigo-500 group-hover:to-emerald-500 transition-colors z-0"></div>
                      )}

                      {/* Flowchart Node Card */}
                      <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                        
                        {/* Node Number Circle */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-extrabold text-sm sm:text-base border shadow-lg transition-transform group-hover:scale-110 ${style.nodeBg}`}>
                          {item.step}
                        </div>

                        {/* Node Content Container */}
                        <div className="flex-1 bg-[#0d121f]/90 hover:bg-[#111726] border border-slate-800/80 group-hover:border-indigo-500/40 p-5 rounded-2xl transition-all shadow-md group-hover:shadow-glow space-y-3">
                          
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                Milestone {item.step}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${style.badge}`}>
                                {item.level || 'Step'}
                              </span>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => navigate(`/topics/${item.topicId}`)}
                              className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
                            >
                              <span>Explore Topic</span>
                              <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                          </div>

                          <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Visual Flowchart Arrow Connector between nodes */}
                      {!isLast && (
                        <div className="flex justify-start pl-4 sm:pl-5 py-2">
                          <div className="w-2 h-2 border-r-2 border-b-2 border-slate-700 group-hover:border-indigo-400 rotate-45 transition-colors ml-0.5"></div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

            </div>

            {/* Flowchart End Node */}
            {filteredSteps.length > 0 && (
              <div className="flex flex-col items-center justify-center text-center space-y-2 pt-4">
                <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                <div className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-xl border border-emerald-400/30 flex items-center gap-2">
                  <i className="fa-solid fa-trophy text-amber-300"></i> {techObj?.name || 'Stack'} Mastery Complete!
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
