import React, { useState } from 'react';
import { roadmapsData } from '../data/roadmapsData';
import { technologiesData } from '../data/technologiesData';

export default function RoadmapView({ activeTechId, onSelectTopic }) {
  const [selectedTech, setSelectedTech] = useState(activeTechId || 'laravel');
  const roadmap = roadmapsData[selectedTech] || roadmapsData['laravel'];
  const techObj = technologiesData.find((t) => t.id === selectedTech) || technologiesData[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
              <i className="fa-solid fa-route"></i> Interactive Roadmap Visualizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {roadmap.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Follow this step-by-step path to advance from Beginner to Senior Architect.
            </p>
          </div>

          {/* Tech Switcher */}
          <div className="flex items-center gap-2">
            {Object.keys(roadmapsData).map((key) => {
              const itemTech = technologiesData.find((t) => t.id === key);
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTech(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    selectedTech === key
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <i className={`${itemTech?.icon}`}></i>
                  <span className="capitalize">{key}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Flowchart Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${techObj.color}20`, color: techObj.color }}>
              <i className={techObj.icon}></i>
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{techObj.name} Mastery Flow</h2>
              <span className="text-xs text-slate-400">{roadmap.steps.length} sequential learning milestones</span>
            </div>
          </div>
        </div>

        {/* Steps Flow */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500">
          {roadmap.steps.map((st) => (
            <div key={st.step} className="relative flex items-start gap-5 group">
              
              {/* Step Circle Badge */}
              <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500 text-indigo-300 font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all z-10">
                {st.step}
              </div>

              {/* Step Card */}
              <div 
                onClick={() => onSelectTopic(st.topicId || "javascript-closure")}
                className="flex-1 bg-[#0f172a] hover:bg-[#172033] border border-slate-800 hover:border-indigo-500/40 p-4 rounded-xl cursor-pointer transition-all space-y-1 shadow-md group-hover:translate-x-1"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    {st.title}
                  </h3>
                  <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                    Study Module <i className="fa-solid fa-arrow-right text-[8px]"></i>
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
