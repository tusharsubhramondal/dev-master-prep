import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#090d16] py-6 px-4 text-center text-xs text-slate-400 space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="font-extrabold text-white tracking-tight">DEV MASTER</span>
        <span className="text-indigo-400 font-bold">by AppZone</span>
        <span className="text-slate-600">•</span>
        <span>Unified Developer Knowledge &amp; Learning Platform</span>
      </div>
      <p className="text-[11px] text-slate-400">
        BEGINNER → INTERMEDIATE → SENIOR
      </p>
    </footer>
  );
}
