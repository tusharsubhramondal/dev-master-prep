import React, { useState } from 'react';
import { technologiesData } from '../data/technologiesData';
import { roadmapsData } from '../data/roadmapsData';
import { topicsData } from '../data/topicsData';

export default function TechOverview({ techId, onSelectTopic, onBackToCatalog, onSelectTech }) {
  const tech = technologiesData.find((t) => t.id === techId) || technologiesData[0];
  const roadmap = roadmapsData[tech.id];
  const [selectedVersion, setSelectedVersion] = useState(tech.versions ? tech.versions[0] : 'Latest');
  const [activeLevelTab, setActiveLevelTab] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Senior'

  const normalizeLevel = (levelStr, stepIdx = 1) => {
    if (!levelStr) return stepIdx <= 3 ? 'Beginner' : stepIdx <= 8 ? 'Intermediate' : 'Senior';
    const l = levelStr.toLowerCase();
    if (l.includes('beginner') || l.includes('junior')) return 'Beginner';
    if (l.includes('intermediate') || l.includes('mid')) return 'Intermediate';
    if (l.includes('senior') || l.includes('advanced') || l.includes('architect')) return 'Senior';
    return stepIdx <= 3 ? 'Beginner' : stepIdx <= 8 ? 'Intermediate' : 'Senior';
  };

  // Filter topics belonging to this technology from topicsData or roadmap
  let techTopics = Object.values(topicsData).filter((topic) => topic.techId === tech.id);
  if (techTopics.length === 0 && roadmap && roadmap.steps) {
    techTopics = roadmap.steps.map((st) => ({
      id: st.topicId || `${tech.id}-step-${st.step}`,
      title: st.title,
      category: st.desc,
      difficulty: normalizeLevel(st.level, st.step),
      readingTime: '8 min',
      isFullSchema: false,
    }));
  } else {
    techTopics = techTopics.map((t) => ({
      ...t,
      difficulty: normalizeLevel(t.difficulty),
      isFullSchema: true,
    }));
  }

  // Filter topics by active level tab
  const filteredTopics = activeLevelTab === 'all'
    ? techTopics
    : techTopics.filter((t) => t.difficulty === activeLevelTab);

  // Find related technology objects
  const relatedTechs = (tech.relatedTechIds || [])
    .map((id) => technologiesData.find((t) => t.id === id))
    .filter(Boolean);

  const getLevelBadgeColor = (lvl) => {
    switch (lvl) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Senior':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={onBackToCatalog} className="hover:text-white flex items-center gap-1">
          <i className="fa-solid fa-house"></i> Technologies
        </button>
        <i className="fa-solid fa-chevron-right text-[9px] text-slate-600"></i>
        <span className="text-indigo-400 font-semibold">{tech.name}</span>
      </div>

      {/* Main Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-lg border border-slate-700/60"
              style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
            >
              <i className={tech.icon}></i>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{tech.name}</h1>
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Beginner • Intermediate • Senior
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{tech.description}</p>
            </div>
          </div>

          {/* Version Switcher */}
          {tech.versions && tech.versions.length > 0 && (
            <div className="bg-[#0f172a] p-3 rounded-xl border border-slate-800 space-y-2 flex-shrink-0 w-full md:w-auto">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Version
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {tech.versions.map((ver) => (
                  <button
                    key={ver}
                    onClick={() => setSelectedVersion(ver)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedVersion === ver
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-[#172033] text-slate-400 hover:text-white'
                    }`}
                  >
                    {ver}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Level Badges Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-slate-400 uppercase text-[11px]">Structured Levels:</span>
          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold flex items-center gap-1.5">
            🟢 Beginner (Fundamentals)
          </div>
          <div className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold flex items-center gap-1.5">
            🟡 Intermediate (Architecture)
          </div>
          <div className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold flex items-center gap-1.5">
            🔴 Senior (Internals &amp; Scaling)
          </div>
        </div>
      </div>

      {/* Grid: Topics Checklist + Connected Technologies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Topics List & Roadmap */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Topics Available grouped into 3 Level Tabs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-list-check text-indigo-400"></i>
                <span>Core Topics by Level ({filteredTopics.length})</span>
              </h2>

              {/* Level Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#111726] border border-slate-800 p-1 rounded-xl">
                {['all', 'Beginner', 'Intermediate', 'Senior'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevelTab(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLevelTab === lvl
                        ? lvl === 'Beginner'
                          ? 'bg-emerald-600 text-white shadow'
                          : lvl === 'Intermediate'
                          ? 'bg-amber-600 text-white shadow'
                          : lvl === 'Senior'
                          ? 'bg-rose-600 text-white shadow'
                          : 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    className="glass-panel p-4 cursor-pointer hover:border-indigo-500/50 hover:bg-[#172033] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 truncate">
                        {topic.category}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${getLevelBadgeColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white mt-2 group-hover:text-indigo-300 transition-colors">
                      {topic.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
                      <span><i className="fa-solid fa-clock text-slate-500 mr-1"></i>{topic.readingTime}</span>
                      <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Topic <i className="fa-solid fa-arrow-right text-[9px]"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-6 text-center space-y-3">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-indigo-400"></i>
                <p className="text-sm text-slate-300">
                  No topics found for <strong>{activeLevelTab}</strong> level in <strong>{tech.name}</strong>.
                </p>
                <button
                  onClick={() => setActiveLevelTab('all')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs"
                >
                  View All Levels
                </button>
              </div>
            )}
          </div>

          {/* Technology Roadmap Flow Preview */}
          {roadmap && (
            <div className="glass-panel p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-route text-emerald-400"></i>
                <span>{tech.name} 3-Level Learning Roadmap</span>
              </h2>
              <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-500/30">
                {roadmap.steps.map((st) => {
                  const stepLevel = normalizeLevel(st.level, st.step);
                  return (
                    <div key={st.step} className="flex items-start gap-4 relative pl-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                        {st.step}
                      </div>
                      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-3 flex-1 hover:border-slate-700 transition-colors space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{st.title}</h4>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.2 rounded border ${getLevelBadgeColor(stepLevel)}`}>
                            {stepLevel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Cross-Technology Connections & Levels */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <i className="fa-solid fa-diagram-next text-purple-400"></i>
              <span>Related Technologies</span>
            </h3>
            <p className="text-xs text-slate-400">
              {tech.name} integrates with these technologies in modern software stacks:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {relatedTechs.map((rt) => (
                <button
                  key={rt.id}
                  onClick={() => onSelectTech(rt.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-200 flex items-center gap-2 transition-all group"
                >
                  <i className={`${rt.icon}`} style={{ color: rt.color }}></i>
                  <span className="font-semibold group-hover:text-indigo-300">{rt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Learning Level Definitions */}
          <div className="glass-panel p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <i className="fa-solid fa-graduation-cap text-indigo-400"></i>
              <span>3 Level Structure</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded bg-slate-900/80 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  🟢 Beginner Level
                </span>
                <p className="text-slate-400 text-[11px]">Core syntax, basic building blocks, environment setup, and fundamental concepts.</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  🟡 Intermediate Level
                </span>
                <p className="text-slate-400 text-[11px]">Applied patterns, ORMs, state management, security, and REST/GraphQL API integration.</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  🔴 Senior Level
                </span>
                <p className="text-slate-400 text-[11px]">Performance tuning, runtime internals, concurrency, event loop, memory leaks, and distributed architecture.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
