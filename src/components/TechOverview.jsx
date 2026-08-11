import React, { useState } from 'react';
import { technologiesData } from '../data/technologiesData';
import { roadmapsData } from '../data/roadmapsData';
import { topicsData } from '../data/topicsData';

export default function TechOverview({ techId, onSelectTopic, onBackToCatalog, onSelectTech }) {
  const tech = technologiesData.find((t) => t.id === techId) || technologiesData[0];
  const roadmap = roadmapsData[tech.id];
  const [selectedVersion, setSelectedVersion] = useState(tech.versions ? tech.versions[0] : 'Latest');

  // Filter topics belonging to this technology
  const techTopics = Object.values(topicsData).filter((topic) => topic.techId === tech.id);

  // Find related technology objects
  const relatedTechs = (tech.relatedTechIds || [])
    .map((id) => technologiesData.find((t) => t.id === id))
    .filter(Boolean);

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
                <span className={`badge badge-${tech.difficulty.toLowerCase()}`}>{tech.difficulty}</span>
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

        {/* Version Difference Banner if older version selected */}
        {selectedVersion && tech.versions && selectedVersion !== tech.versions[0] && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-base"></i>
            <span>
              <strong>Version Notice:</strong> You are viewing content tuned for <strong>{selectedVersion}</strong>. Behavioral differences from {tech.versions[0]} are highlighted inside topic pages.
            </span>
          </div>
        )}
      </div>

      {/* Grid: Topics Checklist + Connected Technologies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Topics List & Roadmap */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Topics Available */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-list-check text-indigo-400"></i>
                <span>Core Topics ({techTopics.length > 0 ? techTopics.length : tech.topicsCount})</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">17-Part Comprehensive Schema</span>
            </div>

            {techTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    className="glass-panel p-4 cursor-pointer hover:border-indigo-500/50 hover:bg-[#172033] transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {topic.category}
                      </span>
                      <span className={`badge badge-${topic.difficulty.toLowerCase()}`}>
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
                  Dynamic Topic modules for <strong>{tech.name}</strong> are generated automatically from content system data.
                </p>
                <button
                  onClick={() => onSelectTopic("javascript-closure")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs"
                >
                  View Demo Topic (17-Part Schema)
                </button>
              </div>
            )}
          </div>

          {/* Technology Roadmap Flow Preview */}
          {roadmap && (
            <div className="glass-panel p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-route text-emerald-400"></i>
                <span>{tech.name} Structured Roadmap</span>
              </h2>
              <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-500/30">
                {roadmap.steps.map((st) => (
                  <div key={st.step} className="flex items-start gap-4 relative pl-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                      {st.step}
                    </div>
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-3 flex-1 hover:border-slate-700 transition-colors">
                      <h4 className="text-sm font-bold text-white">{st.title}</h4>
                      <p className="text-xs text-slate-400">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Cross-Technology Connections */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <i className="fa-solid fa-diagram-next text-purple-400"></i>
              <span>Related Technologies</span>
            </h3>
            <p className="text-xs text-slate-400">
              {tech.name} seamlessly integrates with these technologies in modern enterprise software stacks:
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

          {/* Learning Band Info */}
          <div className="glass-panel p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <i className="fa-solid fa-graduation-cap text-indigo-400"></i>
              <span>Learning Bands</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-emerald-400">Beginner</span>
                <span className="text-slate-400">0–1 year</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-cyan-400">Junior</span>
                <span className="text-slate-400">1–2 years</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-amber-400">Intermediate</span>
                <span className="text-slate-400">2–4 years</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-rose-400">Advanced</span>
                <span className="text-slate-400">4–6 years</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-purple-400">Senior</span>
                <span className="text-slate-400">6–10 years</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/60">
                <span className="font-semibold text-pink-400">Architect</span>
                <span className="text-slate-400">10+ years</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
