import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header({ setMobileOpen }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/technologies')) return 'Technologies';
    if (pathname.startsWith('/roadmaps')) return 'Learning Roadmaps';
    if (pathname.startsWith('/topics')) return 'Topic Documentation';
    if (pathname.startsWith('/integration')) return 'Integration Pipelines';
    if (pathname.startsWith('/qna')) return 'Interview Q&A Vault';
    return 'Technologies';
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0b0e14]/90 backdrop-blur-md border-b border-slate-800/60 px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
      
      {/* Left: Mobile Menu Toggle & Active Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen && setMobileOpen(true)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-[#121722] border border-slate-800 focus:outline-none transition-colors"
          aria-label="Open Navigation Menu"
        >
          <i className="fa-solid fa-bars text-sm text-indigo-400"></i>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Active Workspace
          </span>
        </div>
      </div>

      {/* Right: System Status Badges */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#121722] border border-slate-800 rounded-xl text-xs text-slate-400">
          <i className="fa-solid fa-bolt text-indigo-400 text-[11px]"></i>
          <span className="font-semibold text-slate-300">25 Stacks</span>
        </div>

        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#121722] border border-slate-800 rounded-xl text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 font-semibold">Online</span>
        </div>
      </div>

    </header>
  );
}
