import React, { useState } from 'react';
import { systemDesignData } from '../data/systemDesignData';

export default function SystemDesignView() {
  const [selectedTopicId, setSelectedTopicId] = useState(systemDesignData[0].id);
  const currentTopic = systemDesignData.find((t) => t.id === selectedTopicId) || systemDesignData[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold">
          <i className="fa-solid fa-cubes"></i> System Design Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Tech-Agnostic Distributed System Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Deep-dive into load balancing, caching strategies, rate limiting, message queues, database sharding, and microservices reliability.
        </p>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {systemDesignData.map((sd) => (
            <button
              key={sd.id}
              onClick={() => setSelectedTopicId(sd.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedTopicId === sd.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sd.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Active System Design Topic */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className={`badge badge-${currentTopic.difficulty.toLowerCase()} mb-2`}>
              {currentTopic.difficulty} Level
            </span>
            <h2 className="text-2xl font-bold text-white">{currentTopic.title}</h2>
          </div>
          <span className="text-xs text-slate-400">Reading time: {currentTopic.readingTime}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-300 leading-relaxed bg-[#0f172a] p-4 rounded-xl border border-slate-800">
          {currentTopic.summary}
        </p>

        {/* Interactive Architecture Diagram */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
            <i className="fa-solid fa-sitemap"></i> System Architecture Flowchart
          </h3>
          <div 
            className="overflow-x-auto rounded-xl border border-slate-800 p-2"
            dangerouslySetInnerHTML={{ __html: currentTopic.diagram }}
          />
        </div>

        {/* Strategies / Algorithms */}
        {currentTopic.strategies && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <i className="fa-solid fa-gears"></i> Core Strategies &amp; Algorithms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentTopic.strategies.map((st, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 text-slate-200 font-mono">
                  ✓ {st}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Architectural Concepts */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
            <i className="fa-solid fa-star"></i> Production Engineering Concepts
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {currentTopic.keyConcepts.map((kc, i) => (
              <li key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                <i className="fa-solid fa-circle-notch text-purple-400 mt-0.5"></i>
                <span>{kc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
