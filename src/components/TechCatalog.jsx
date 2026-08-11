import React, { useState } from 'react';
import { technologiesData, techCategories } from '../data/technologiesData';

export default function TechCatalog({ onSelectTech, onSelectRoadmap }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = technologiesData.filter((tech) => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || tech.name.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-8 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
            <i className="fa-solid fa-compass"></i> Technology Explorer
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master 20+ Modern Tech Stacks & System Design
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From Junior syntax fundamentals to Senior Architect trade-offs. Structured roadmaps, deep-dive topic documentation, and real-world interview prep across JavaScript, Node.js, Laravel, React, Docker, AWS, System Design, and beyond.
          </p>

          {/* Search & Filter bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search technologies (e.g. Laravel, Node, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111726]/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 transition-colors shadow-inner"
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-indigo-400">{filteredTechs.length}</strong> technologies
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {techCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                : 'bg-[#111726] text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <i className={cat.icon}></i>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTechs.map((tech) => {
          return (
            <div
              key={tech.id}
              className="glass-panel p-6 flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-glow transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-700/50"
                      style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                    >
                      <i className={tech.icon}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-xs text-slate-400 capitalize font-medium">
                        {tech.category}
                      </span>
                    </div>
                  </div>

                  <span className={`badge badge-${tech.difficulty.toLowerCase()}`}>
                    {tech.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {tech.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-300">
                    <i className="fa-solid fa-book text-indigo-400"></i>
                    <span><strong>{tech.topicsCount}</strong> Topics</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <i className="fa-solid fa-clipboard-question text-purple-400"></i>
                    <span><strong>{tech.interviewCount}</strong> Q&amp;As</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-slate-400">Mastery Progress</span>
                    <span className="text-indigo-400">{tech.learningProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${tech.learningProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center gap-2">
                <button
                  onClick={() => onSelectTech(tech.id)}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
                >
                  <span>Start Learning</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  onClick={() => onSelectRoadmap(tech.id)}
                  title="View Technology Roadmap"
                  className="py-2 px-3 bg-[#172033] hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs flex items-center justify-center transition-colors border border-slate-700"
                >
                  <i className="fa-solid fa-route"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
