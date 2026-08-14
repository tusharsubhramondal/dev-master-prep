import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { technologiesData } from '../data/technologiesData';
import { roadmapsData } from '../data/roadmapsData';
import { topicsData } from '../data/topicsData';
import SEO from '../components/SEO';

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
  const techTitle = techObj ? techObj.name : 'Developer';

  // Helper to generate dynamic roadmap directly from topicsData as single source of truth
  const getRoadmapForTech = (id) => {
    if (!id) return null;
    const t = technologiesData.find((item) => item.id === id) || techObj;

    // 1. Primary Source: Generate steps dynamically from topicsData
    const matchingTopics = Object.values(topicsData).filter(
      (topic) => topic && topic.techId === id
    );

    if (matchingTopics.length > 0) {
      return {
        techId: t ? t.id : id,
        title: `${t ? t.name : id} Master Learning Roadmap`,
        steps: matchingTopics.map((topic, index) => {
          let level = 'Intermediate';
          const diff = (topic.difficulty || '').toLowerCase();
          const exp = (topic.experienceBand || '').toLowerCase();

          if (diff.includes('beginner') || exp.includes('0–1') || exp.includes('0-1')) {
            level = 'Beginner';
          } else if (diff.includes('senior') || diff.includes('advanced') || exp.includes('8+')) {
            level = 'Senior';
          }

          return {
            step: index + 1,
            title: topic.title,
            desc: topic.simpleExplanation || topic.definition || topic.category || `Master ${topic.title}.`,
            topicId: topic.id,
            level: level
          };
        })
      };
    }

    // 2. Secondary Fallback: Use custom roadmapsData if present
    if (roadmapsData[id]) {
      return roadmapsData[id];
    }

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
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        nodeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        connector: 'from-emerald-500 to-amber-500',
        dot: 'bg-emerald-400'
      };
    }
    if (l.includes('senior') || l.includes('advanced')) {
      return {
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        nodeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
        connector: 'from-rose-500 to-purple-500',
        dot: 'bg-rose-400'
      };
    }
    return {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      nodeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      connector: 'from-amber-500 to-rose-500',
      dot: 'bg-amber-400'
    };
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 w-full max-w-full overflow-hidden">
      <SEO 
        title={`${techTitle} Developer Roadmap | DEV MASTER`}
        description={`Interactive step-by-step career progression roadmap for ${techTitle} from Junior to Principal Architect.`}
      />

      {/* Header Panel */}
      <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-5 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <i className="fa-solid fa-route"></i> Interactive Learning Roadmap Visualizer
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
              {techObj?.icon && <i className={techObj.icon} style={{ color: techObj.color }}></i>}
              {roadmap ? roadmap.title : 'Select a Technology Stack Roadmap'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
              className="w-full md:w-64 bg-[#0b0e14] border border-slate-700 text-white font-bold rounded-xl px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none shadow-inner cursor-pointer"
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

        {/* Roadmap Stats Summary */}
        {roadmap && (
          <div className="pt-4 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#0b0e14] border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Milestones</span>
              <span className="text-base sm:text-lg font-extrabold text-indigo-400">{roadmap.steps?.length || 0} Steps</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0e14] border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Beginner Phase</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-400">
                {beginnerLevel.length} Steps
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0e14] border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Intermediate Phase</span>
              <span className="text-base sm:text-lg font-extrabold text-amber-400">
                {intermediateLevel.length} Steps
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0e14] border border-slate-800/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Senior Phase</span>
              <span className="text-base sm:text-lg font-extrabold text-rose-400">
                {seniorLevel.length} Steps
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Step-by-Step Flowchart Container */}
      {!roadmap ? (
        /* Empty State Quick Select */
        <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-2xl mx-auto">
            <i className="fa-solid fa-diagram-project"></i>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">Select a Technology to View Flowchart</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore step-by-step developer learning paths tailored across 25 technologies and 3 expertise levels.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-2xl mx-auto">
            {technologiesData.slice(0, 10).map((t) => (
              <button
                key={t.id}
                onClick={() => handleTechChange(t.id)}
                className="px-3 py-1.5 rounded-xl bg-[#0b0e14] hover:bg-indigo-600/30 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-all"
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#121722] p-4 rounded-xl border border-slate-800/80 shadow-lg">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-diagram-project text-indigo-400 text-sm"></i>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
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
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                    activeLevelFilter === lvl.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* FLOWCHART CONTAINER */}
          <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-4 sm:p-7 space-y-6 relative overflow-hidden shadow-xl">

            {/* Flowchart Start Node */}
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-indigo-400/30 flex items-center gap-2">
                <i className="fa-solid fa-flag-checkered"></i> Start Learning Path
              </div>
              <div className="w-0.5 h-5 bg-indigo-500/60"></div>
            </div>

            {/* Flowchart Steps List */}
            <div className="relative space-y-6">

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
                        <div className="absolute left-4 sm:left-5 top-10 bottom-0 w-0.5 bg-slate-800 group-hover:bg-indigo-500/50 transition-colors z-0"></div>
                      )}

                      {/* Flowchart Node Card */}
                      <div className="relative z-10 flex items-start gap-3 sm:gap-5">
                        
                        {/* Node Number Circle */}
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-extrabold text-xs sm:text-sm border shadow-sm transition-transform group-hover:scale-105 ${style.nodeBg}`}>
                          {item.step}
                        </div>

                        {/* Node Content Container */}
                        <div className="flex-1 bg-[#0b0e14] border border-slate-800/80 group-hover:border-indigo-500/30 p-4 sm:p-5 rounded-xl transition-all shadow-md space-y-2.5">
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono font-bold text-slate-500">
                                Milestone #{item.step}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${style.badge}`}>
                                {item.level || 'Step'}
                              </span>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => navigate(`/topics/${item.topicId}`)}
                              className="px-3 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                            >
                              <span>Explore Topic</span>
                              <i className="fa-solid fa-arrow-right text-[9px]"></i>
                            </button>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors tracking-tight">
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Visual Flowchart Arrow Connector between nodes */}
                      {!isLast && (
                        <div className="flex justify-start pl-3.5 sm:pl-4 py-1.5">
                          <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-slate-700 group-hover:border-indigo-400 rotate-45 transition-colors"></div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

            </div>

            {/* Flowchart End Node */}
            {filteredSteps.length > 0 && (
              <div className="flex flex-col items-center justify-center text-center space-y-2 pt-2">
                <div className="w-0.5 h-5 bg-indigo-500/60"></div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-emerald-400/30 flex items-center gap-2">
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
