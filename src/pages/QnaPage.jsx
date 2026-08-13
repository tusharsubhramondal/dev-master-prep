import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { qnaData } from '../data/qnaData';
import { technologiesData } from '../data/technologiesData';

const PAGE_SIZE = 25;

export default function QnaPage() {
  const { techId: paramTechId } = useParams();
  const navigate = useNavigate();

  const [selectedTechId, setSelectedTechId] = useState(paramTechId || 'javascript');
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Senior'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState({});
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    if (paramTechId) {
      setSelectedTechId(paramTechId);
    }
  }, [paramTechId]);

  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [selectedTechId, selectedLevel, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setAllExpanded = (status) => {
    const newStatus = {};
    visibleQuestions.forEach(q => { newStatus[q.id] = status; });
    setExpandedIds(newStatus);
  };

  const baseQuestions = useMemo(() => {
    if (selectedTechId && selectedTechId !== 'all') {
      return qnaData[selectedTechId] || [];
    }
    let list = [];
    Object.keys(qnaData).forEach(techKey => {
      list = [...list, ...qnaData[techKey]];
    });
    return list;
  }, [selectedTechId]);

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (selectedLevel === 'all' && !q) {
      return baseQuestions;
    }

    return baseQuestions.filter(item => {
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const matchesSearch = !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.companies && item.companies.some(c => c.toLowerCase().includes(q)));

      return matchesLevel && matchesSearch;
    });
  }, [baseQuestions, selectedLevel, searchQuery]);

  const visibleQuestions = useMemo(() => {
    return filteredQuestions.slice(0, displayLimit);
  }, [filteredQuestions, displayLimit]);

  const handleTechChange = (techId) => {
    setSelectedTechId(techId);
    if (techId === 'all') {
      navigate('/qna');
    } else {
      navigate(`/qna/${techId}`);
    }
  };

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + PAGE_SIZE);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 w-full max-w-full overflow-hidden">
      
      {/* Hero Banner Header */}
      <div className="relative rounded-2xl bg-[#121722] border border-slate-800/80 p-5 sm:p-7 overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <i className="fa-solid fa-clipboard-question"></i> Top-Company Interview Question Vault
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Technical Interview Questions
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Master production-grade technical interview questions asked by top engineering organizations (**Google, Amazon, Meta, Netflix, Uber, Stripe**).
          </p>

          {/* Quick Search & Expand Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80 md:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              <input
                type="text"
                placeholder="Search questions, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0e14] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setAllExpanded(true)}
                className="px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-[#0b0e14] border border-slate-800 text-slate-300 hover:text-white"
              >
                Expand All
              </button>
              <button
                onClick={() => setAllExpanded(false)}
                className="px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-[#0b0e14] border border-slate-800 text-slate-300 hover:text-white"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="space-y-4 bg-[#121722] p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-lg">
        
        {/* Technology Selector Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
            <label htmlFor="tech-select" className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
              <i className="fa-solid fa-layer-group text-indigo-400"></i> Select Technology:
            </label>
            <select
              id="tech-select"
              value={selectedTechId}
              onChange={(e) => handleTechChange(e.target.value)}
              className="w-full md:w-72 bg-[#0b0e14] border border-slate-700 text-white font-bold text-xs rounded-xl px-3.5 py-2.5 focus:border-indigo-500 focus:outline-none transition-all shadow-inner cursor-pointer"
            >
              <option value="all">⚡ All Technologies (2,500 Questions)</option>
              {technologiesData.map((tech) => {
                const count = qnaData[tech.id]?.length || 0;
                return (
                  <option key={tech.id} value={tech.id}>
                    {tech.name} ({count} Questions)
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Active Stack: <span className="text-indigo-400 font-bold uppercase">{selectedTechId}</span>
          </div>
        </div>

        {/* Level Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filter Level:
            </span>
            {['all', 'Beginner', 'Intermediate', 'Senior'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>

          <span className="text-[11px] sm:text-xs text-slate-400">
            Showing <strong className="text-indigo-400">{visibleQuestions.length}</strong> of {filteredQuestions.length} questions
          </span>
        </div>
      </div>

      {/* QUESTIONS ACCORDION LIST */}
      <div className="space-y-3">
        {visibleQuestions.length === 0 ? (
          <div className="text-center py-16 bg-[#121722] rounded-2xl border border-slate-800 p-8 space-y-3">
            <i className="fa-solid fa-clipboard-question text-4xl text-slate-600"></i>
            <h3 className="text-base font-bold text-white">No interview questions found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or technology filter.</p>
          </div>
        ) : (
          visibleQuestions.map((item, index) => {
            const isExpanded = expandedIds[item.id] !== false;
            const techMeta = technologiesData.find(t => t.id === item.techId);

            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#121722] border border-slate-800/80 overflow-hidden transition-all hover:border-slate-700/80 shadow-md"
              >
                {/* Question Header Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 sm:gap-4 hover:bg-slate-800/20 transition-colors"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-bold">
                        #{index + 1}
                      </span>
                      {techMeta && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] sm:text-[11px] font-semibold">
                          <i className={techMeta.icon}></i> {techMeta.name}
                        </span>
                      )}
                      <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.level === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.level === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {item.level}
                      </span>
                      {item.category && (
                        <span className="text-[10px] sm:text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded truncate max-w-[120px] sm:max-w-none">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug break-words">
                      {item.question}
                    </h3>

                    {/* Company Badges */}
                    {item.companies && item.companies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold uppercase mr-0.5">Asked at:</span>
                        {item.companies.map(comp => (
                          <span key={comp} className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                            {comp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-white flex-shrink-0 mt-0.5">
                    <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
                  </div>
                </button>

                {/* Expanded Answer Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-800/60 bg-[#0b0e14]/50 animate-fade-in space-y-2">
                    <div className="text-[11px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider pt-1">
                      <span><i className="fa-solid fa-lightbulb"></i> Answer Explanation:</span>
                    </div>

                    <div className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans space-y-2 bg-[#0b0e14] p-3.5 sm:p-4 rounded-xl border border-slate-800/80 whitespace-pre-line break-words overflow-x-auto">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Load More Button */}
        {visibleQuestions.length < filteredQuestions.length && (
          <div className="text-center pt-4">
            <button
              onClick={handleLoadMore}
              className="px-5 sm:px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105"
            >
              Load More Questions ({filteredQuestions.length - visibleQuestions.length} Remaining)
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
