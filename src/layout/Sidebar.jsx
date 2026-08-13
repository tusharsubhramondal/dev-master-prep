import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const mainNavLinks = [
    { path: '/technologies', label: 'Technologies', icon: 'fa-solid fa-layer-group', badge: '25 Techs' },
    { path: '/roadmaps', label: 'Roadmaps', icon: 'fa-solid fa-route', badge: 'Paths' },
    { path: '/topics', label: 'Topic Documentation', icon: 'fa-solid fa-book-open', badge: 'Docs' }
  ];

  const advancedNavLinks = [
    { path: '/integration', label: 'Integration Workflows', icon: 'fa-solid fa-diagram-project', badge: 'Pipelines' },
    { path: '/qna', label: 'Interview Q&A Vault', icon: 'fa-solid fa-clipboard-question', badge: '2,500 Qs' }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 space-y-6 overflow-y-auto">

      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/technologies"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-left group focus:outline-none p-1.5 rounded-xl hover:bg-slate-800/20 transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center text-white text-base shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <i className="fa-solid fa-terminal"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  DEV MASTER
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Interview Architecture
              </p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Section 1: CORE NAVIGATION */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 block mb-2">
            Core Navigation
          </span>
          <nav className="space-y-1">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `relative w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-white font-bold border border-indigo-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full"></span>
                    )}
                    <div className="flex items-center gap-3">
                      <i className={`${link.icon} text-sm ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}></i>
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800/60 text-slate-400'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Section 2: ADVANCED & PRACTICE */}
        <div className="space-y-1 pt-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 block mb-2">
            Advanced & Practice
          </span>
          <nav className="space-y-1">
            {advancedNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `relative w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-white font-bold border border-indigo-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full"></span>
                    )}
                    <div className="flex items-center gap-3">
                      <i className={`${link.icon} text-sm ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}></i>
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800/60 text-slate-400'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer System Widget */}
      <div className="pt-4 border-t border-slate-800/60 space-y-3">
        <div className="p-3 rounded-xl bg-[#0b0e14] border border-slate-800/60 text-[11px] text-slate-300 space-y-1.5">
          <div className="font-bold text-indigo-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Platform Active
            </span>
            <span className="text-[9px] text-slate-400 font-mono">v2.5</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-tight">
            25 Stacks • 2,500 Interview Q&As
          </p>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 z-40 bg-[#0e121b] border-r border-slate-800/60 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 bg-[#0e121b] h-full shadow-2xl border-r border-slate-800/80"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
