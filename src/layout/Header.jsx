import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/technologies')) return 'Technologies';
    if (pathname.startsWith('/roadmaps')) return 'Roadmaps';
    if (pathname.startsWith('/topics')) return 'Topic Documentation';
    return 'Technologies';
  };

  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
      {/* Left: Mobile Menu Toggle & Active Page Title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/50"
        >
          <i className={`fa-solid`}></i>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Active Route
          </span>
        </div>
      </div>

      {/* Right: Search, Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Quick Search Button */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-[#111726] hover:bg-[#172033] border border-slate-800 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-all shadow-inner group"
        >
          <i className="fa-solid fa-magnifying-glass text-indigo-400 group-hover:scale-110 transition-transform"></i>
          <span className="hidden sm:inline">Search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle Button */}
        <button
          title="Toggle Theme"
          className="p-2 rounded-xl bg-[#111726] hover:bg-[#172033] border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <i className={`fa-solid fa-moon text-indigo-400`}></i>
        </button>
      </div>
    </header>
  );
}
