import React, { useState } from 'react';
import { comparisonsData } from '../data/comparisonsData';

export default function ComparisonView() {
  const [selectedCompId, setSelectedCompId] = useState(comparisonsData[0].id);
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

      {/* Main Active Comparison View */}
      <div className="space-y-8">
        
        {/* Title & Summary Banner */}
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

        {/* Spec Comparison Table */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-table text-indigo-400"></i> Specification Grid
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-[#0f172a] text-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3 border-b border-slate-800">Architectural Feature</th>
                  <th className="p-3 border-b border-slate-800 text-indigo-400">{currentComp.tech1}</th>
                  <th className="p-3 border-b border-slate-800 text-purple-400">{currentComp.tech2}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {currentComp.specGrid.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-200">{row.feature}</td>
                    <td className="p-3 font-mono text-indigo-300">{row.tech1}</td>
                    <td className="p-3 font-mono text-purple-300">{row.tech2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trade-offs Analysis */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-scale-balanced text-amber-400"></i> Trade-offs &amp; Architectural Verdicts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentComp.tradeoffs.map((to, i) => (
              <div key={i} className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">{to.aspect}</span>
                <div className="font-extrabold text-sm text-emerald-400">{to.verdict}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{to.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Comparison Diffs */}
        {currentComp.codeComparison && (
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-code-compare text-emerald-400"></i> Side-by-Side Code Implementation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400">{currentComp.tech1}</span>
                <pre className="text-xs font-mono bg-[#0d1117] p-3 rounded-xl border border-slate-800 overflow-x-auto">
                  <code>{currentComp.codeComparison.tech1Code}</code>
                </pre>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-400">{currentComp.tech2}</span>
                <pre className="text-xs font-mono bg-[#0d1117] p-3 rounded-xl border border-slate-800 overflow-x-auto">
                  <code>{currentComp.codeComparison.tech2Code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Interview Questions */}
        <div className="glass-panel p-6 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-clipboard-question text-purple-400"></i> Comparison Interview Questions
          </h3>
          <div className="space-y-2">
            {currentComp.interviewQuestions.map((q, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                <span className="font-bold text-purple-400">Q{i + 1}:</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
