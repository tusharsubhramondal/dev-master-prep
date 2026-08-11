import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab, onOpenSearch, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'catalog', label: 'Technologies', icon: 'fa-solid fa-layer-group' },
    { id: 'roadmaps', label: 'Roadmaps', icon: 'fa-solid fa-route' },
    { id: 'learn', label: 'Topic Page', icon: 'fa-solid fa-book-open' },
    { id: 'interview', label: 'Interview Prep', icon: 'fa-solid fa-comments' },
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-diagram-project' },
    { id: 'system-design', label: 'System Design', icon: 'fa-solid fa-cubes' },
    { id: 'compare', label: 'Compare Engine', icon: 'fa-solid fa-code-compare' }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 space-y-6">
      
      {/* Brand & Header */}
      <div className="space-y-5">
        <button 
          onClick={() => { setActiveTab('catalog'); setMobileOpen(false); }} 
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
        </button>

        {/* Quick Search Command Trigger */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 bg-[#0d1117] hover:bg-[#172033] border border-slate-800 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-indigo-400 group-hover:scale-110 transition-transform"></i>
            <span>Search...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Navigation Links */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 block mb-1">
            Navigation Menu
          </span>
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold border border-indigo-400/30' 
                      : 'text-slate-300 hover:text-white hover:bg-[#172033]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${link.icon} text-sm ${isActive ? 'text-white' : 'text-indigo-400'}`}></i>
                    <span>{link.label}</span>
                  </div>
                  {isActive && <i className="fa-solid fa-chevron-right text-[10px]"></i>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <button
          onClick={toggleTheme}
          className="w-full py-2.5 px-3 rounded-xl bg-[#0d1117] hover:bg-[#172033] border border-slate-800 flex items-center justify-between text-xs text-slate-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${theme === 'dark' ? 'fa-moon text-indigo-400' : 'fa-sun text-amber-400'}`}></i>
            <span>Theme Mode</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">{theme}</span>
        </button>

        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-slate-300 space-y-1">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <i className="fa-solid fa-bolt"></i> Progression Band
          </div>
          <p className="text-slate-400 text-[10px]">Beginner → Senior Architect</p>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">
            <i className="fa-solid fa-terminal"></i>
          </div>
          <span className="font-bold text-white text-base">DEV MASTER</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-300 hover:text-white text-lg"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 z-40 bg-[#111726] border-r border-slate-800/80 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)}>
          <div className="w-72 bg-[#111726] h-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
