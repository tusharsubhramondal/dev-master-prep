import React from 'react';
import { projectsData } from '../data/projectsData';

export default function ProjectsView() {
  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="glass-panel p-12 text-center space-y-4 max-w-2xl mx-auto my-12 rounded-2xl">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-blue-500/30">
          <i className="fa-solid fa-diagram-project"></i>
        </div>
        <h2 className="text-xl font-bold text-white">Projects Data Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          As configured, only the <strong>Technologies Tab</strong> has active content right now. Remaining feature datasets have been cleared.
        </p>
      </div>
    );
  }

  return null;
}
