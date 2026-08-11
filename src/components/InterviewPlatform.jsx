import React from 'react';
import { interviewsData } from '../data/interviewsData';

export default function InterviewPlatform() {
  const hasData = Object.keys(interviewsData || {}).length > 0;

  if (!hasData) {
    return (
      <div className="glass-panel p-12 text-center space-y-4 max-w-2xl mx-auto my-12 rounded-2xl">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-rose-500/30">
          <i className="fa-solid fa-comments"></i>
        </div>
        <h2 className="text-xl font-bold text-white">Interview Questions Data Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          As configured, only the <strong>Technologies Tab</strong> has active content right now. Remaining feature datasets have been cleared.
        </p>
      </div>
    );
  }

  return null;
}
