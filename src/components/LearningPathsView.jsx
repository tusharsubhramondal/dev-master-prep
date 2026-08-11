import React from 'react';
import { learningPathsData } from '../data/learningPathsData';

export default function LearningPathsView() {
  if (!learningPathsData || learningPathsData.length === 0) {
    return (
      <div className="glass-panel p-12 text-center space-y-4 max-w-2xl mx-auto my-12 rounded-2xl">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-indigo-500/30">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <h2 className="text-xl font-bold text-white">Learning Paths Data Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          As configured, only the <strong>Technologies Tab</strong> has active content right now. Remaining feature datasets have been cleared.
        </p>
      </div>
    );
  }

  return null;
}
