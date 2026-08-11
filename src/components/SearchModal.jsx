import React, { useState, useEffect } from 'react';
import { technologiesData } from '../data/technologiesData';
import { topicsData } from '../data/topicsData';
import { comparisonsData } from '../data/comparisonsData';
import { projectsData } from '../data/projectsData';

export default function SearchModal({ isOpen, onClose, onSelectTopic, onSelectTech, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const techMatches = !q ? [] : technologiesData.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  const topicMatches = !q ? [] : Object.values(topicsData).filter(t => t.title.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.techId.toLowerCase().includes(q));
  const compMatches = !q ? [] : comparisonsData.filter(c => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q));
  const projMatches = !q ? [] : projectsData.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));

  const totalResults = techMatches.length + topicMatches.length + compMatches.length + projMatches.length;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[#090d16] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden space-y-4 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-base"></i>
          <input
            type="text"
            autoFocus
            placeholder="Search technologies, topics, closures, queues, rate limit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#111726] border border-slate-700 rounded-xl pl-12 pr-10 py-3 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
          {!q ? (
            <div className="text-center py-8 text-slate-400 space-y-2 text-xs">
              <i className="fa-solid fa-keyboard text-2xl text-slate-600"></i>
              <p>Type keywords to search across 20+ technologies, topics, comparisons, and projects.</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No results found for "<strong className="text-white">{query}</strong>"
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Technologies */}
              {techMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technologies</span>
                  {techMatches.map(t => (
                    <div
                      key={t.id}
                      onClick={() => { onSelectTech(t.id); onClose(); }}
                      className="p-3 rounded-xl bg-[#111726] hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${t.icon}`} style={{ color: t.color }}></i>
                        <div>
                          <h4 className="font-bold text-xs text-white">{t.name}</h4>
                          <p className="text-[11px] text-slate-400">{t.description}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-bold">Tech Overview →</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Topics */}
              {topicMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Topics &amp; Documentation</span>
                  {topicMatches.map(t => (
                    <div
                      key={t.id}
                      onClick={() => { onSelectTopic(t.id); onClose(); }}
                      className="p-3 rounded-xl bg-[#111726] hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-white">{t.title}</h4>
                        <span className="text-[10px] text-slate-400 capitalize">{t.techId} • {t.category}</span>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-bold">Read 17-Part Topic →</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparisons */}
              {compMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Comparisons</span>
                  {compMatches.map(c => (
                    <div
                      key={c.id}
                      onClick={() => { onNavigate('compare'); onClose(); }}
                      className="p-3 rounded-xl bg-[#111726] hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-white">{c.title}</h4>
                        <p className="text-[11px] text-slate-400">{c.summary}</p>
                      </div>
                      <span className="text-[10px] text-purple-400 font-bold">Compare →</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
