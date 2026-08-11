import React, { useState } from 'react';
import { comparisonsData } from '../data/comparisonsData';

export default function ComparisonView() {
  if (!comparisonsData || comparisonsData.length === 0) {
    return (
      <div className="glass-panel p-12 text-center space-y-4 max-w-2xl mx-auto my-12 rounded-2xl">
        <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-purple-500/30">
          <i className="fa-solid fa-code-compare"></i>
        </div>
        <h2 className="text-xl font-bold text-white">Compare Engine Data Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          As configured, only the <strong>Technologies Tab</strong> has active content right now. Remaining feature datasets have been cleared.
        </p>
      </div>
    );
  }

  const [selectedCompId, setSelectedCompId] = useState(comparisonsData[0]?.id);
  const currentComp = comparisonsData.find((c) => c.id === selectedCompId) || comparisonsData[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold">
          <i className="fa-solid fa-code-compare"></i> Technical Comparison Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Compare Technologies &amp; Architecture Trade-offs
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          In-depth architectural side-by-side analysis, spec matrices, code comparisons, and senior engineering trade-offs.
        </p>

        {/* Comparison Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {comparisonsData.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedCompId(comp.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCompId === comp.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {comp.title}
            </button>
          ))}
        </div>
      </div>

      {currentComp && (
        <div className="space-y-8">
          <div className="glass-panel p-6 space-y-3 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {currentComp.category}
              </span>
              <span className="text-xs text-slate-400">Side-by-Side Matrix</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              {currentComp.tech1} <span className="text-purple-400 font-normal">vs</span> {currentComp.tech2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentComp.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
