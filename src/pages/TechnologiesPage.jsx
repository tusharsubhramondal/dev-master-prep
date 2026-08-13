import React, { useState } from 'react';
import { technologiesData } from '../data/technologiesData';
import TechGrid from '../components/TechGrid';

export default function TechnologiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Senior'
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered technologies
  const filteredTechs = technologiesData.filter((tech) => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'all' || (tech.levels && tech.levels.includes(selectedLevel));
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q || tech.name.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
    return matchesCategory && matchesLevel && matchesSearch;
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
            Master 20+ Tech Stacks Across 3 Levels
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From foundational syntax to senior architect trade-offs. Click any technology stack to explore structured topics categorized into <strong className="text-emerald-400">Beginner</strong>, <strong className="text-amber-400">Intermediate</strong>, and <strong className="text-rose-400">Senior</strong> levels.
          </p>

          {/* Controls: Search */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search technologies (e.g. Laravel, Node, React)..."
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

      {/* Filter Bar: Category & Level */}
      <div className="space-y-3">

        {/* Level Filter Pills */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Filter by Level:
          </span>
          {['all', 'Beginner', 'Intermediate', 'Senior'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedLevel === lvl
                ? lvl === 'Beginner'
                  ? 'bg-emerald-600 text-white shadow'
                  : lvl === 'Intermediate'
                    ? 'bg-amber-600 text-white shadow'
                    : lvl === 'Senior'
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-indigo-600 text-white shadow'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
                }`}
            >
              {lvl === 'all' ? 'All Levels' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* TECHNOLOGIES GRID */}
      <TechGrid filteredTechs={filteredTechs} />
    </div>
  );
}
