import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const navLinks = [
    { path: '/technologies', label: 'Technologies', icon: 'fa-solid fa-layer-group' },
    { path: '/roadmaps', label: 'Roadmaps', icon: 'fa-solid fa-route' },
    { path: '/topics', label: 'Topic Page', icon: 'fa-solid fa-book-open' },
    { path: '/integration', label: 'Integration', icon: 'fa-solid fa-diagram-project' }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 space-y-6">

      {/* Brand Logo & Header */}
      <div className="space-y-6">
        <Link
          to="/technologies"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 text-left w-full group focus:outline-none"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
            <i className="fa-solid fa-terminal"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                DEV MASTER
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-indigo-300 font-semibold">
              by AppZone
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 block mb-2">
            Main Menu
          </span>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold border border-indigo-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#172033]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <i className={`${link.icon} text-sm ${isActive ? 'text-white' : 'text-indigo-400'}`}></i>
                      <span>{link.label}</span>
                    </div>
                    {isActive && <i className="fa-solid fa-chevron-right text-[10px]"></i>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-slate-300 space-y-1">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <i className="fa-solid fa-bolt"></i> 3-Level Progression
          </div>
          <p className="text-slate-400 text-[10px]">Beginner → Intermediate → Senior</p>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 z-40 bg-[#111726] border-r border-slate-800/80 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 bg-[#111726] h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
