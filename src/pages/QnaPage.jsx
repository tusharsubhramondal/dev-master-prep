import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { qnaData } from '../data/qnaData';
import { technologiesData } from '../data/technologiesData';

export default function QnaPage() {
  const { techId: paramTechId } = useParams();
  const navigate = useNavigate();

  const [selectedTechId, setSelectedTechId] = useState(paramTechId || 'all');
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Senior'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState({});

  // Toggle item expansion
  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Expand or Collapse All
  const setAllExpanded = (status) => {
    const newStatus = {};
    allQuestions.forEach(q => { newStatus[q.id] = status; });
    setExpandedIds(newStatus);
  };

  // Aggregate all questions into single list
  const allQuestions = useMemo(() => {
    let list = [];
    Object.keys(qnaData).forEach(techKey => {
      list = [...list, ...qnaData[techKey]];
    });
    return list;
  }, []);

  // Filter questions based on selections
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(item => {
      const matchesTech = selectedTechId === 'all' || item.techId === selectedTechId;
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.companies && item.companies.some(c => c.toLowerCase().includes(q)));

      return matchesTech && matchesLevel && matchesSearch;
    });
  }, [allQuestions, selectedTechId, selectedLevel, searchQuery]);

  const handleTechChange = (techId) => {
    setSelectedTechId(techId);
    if (techId === 'all') {
      navigate('/qna');
    } else {
      navigate(`/qna/${techId}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">

      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-8 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
            <i className="fa-solid fa-clipboard-question"></i> Top-Company Interview Question Bank
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Interview Questions & Answers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Master real-world technical interview questions asked by FAANG and top product companies (**Google, Amazon, Meta, Netflix, Uber, Stripe**). Categorized across <strong className="text-emerald-400">Beginner</strong>, <strong className="text-amber-400">Intermediate</strong>, and <strong className="text-rose-400">Senior</strong> levels.
          </p>

          {/* Quick Search Input */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search questions, companies (e.g. Event Loop, Amazon, Redis)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111726]/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 transition-colors shadow-inner"
              />
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setAllExpanded(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111726] border border-slate-800 text-slate-300 hover:text-white"
              >
                Expand All
              </button>
              <button
                onClick={() => setAllExpanded(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111726] border border-slate-800 text-slate-300 hover:text-white"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls: Technology Dropdown & Level Selector */}
      <div className="space-y-4 bg-[#111726]/80 p-5 rounded-2xl border border-slate-800 shadow-xl">

        {/* Technology Selector: Dropdown + Scroll Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="tech-select" className="text-xs font-bold text-indigo-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
              <i className="fa-solid fa-layer-group"></i> Technology Dropdown:
            </label>
            <select
              id="tech-select"
              value={selectedTechId}
              onChange={(e) => handleTechChange(e.target.value)}
              className="w-full md:w-72 bg-[#090d16] border border-indigo-500/30 text-white font-bold text-xs rounded-xl px-3.5 py-2.5 focus:border-indigo-500 focus:outline-none transition-all shadow-inner"
            >
              <option value="all">⚡ All Technologies ({allQuestions.length} Questions)</option>
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

          <div className="text-xs text-slate-400 font-semibold">
            Active Filter: <span className="text-emerald-400 font-bold uppercase">{selectedTechId}</span>
          </div>
        </div>


        {/* Level Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Filter Level:
          </span>
          {['all', 'Beginner', 'Intermediate', 'Senior'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedLevel === lvl
                  ? lvl === 'Beginner'
                    ? 'bg-emerald-600 text-white shadow'
                    : lvl === 'Intermediate'
                      ? 'bg-amber-600 text-white shadow'
                      : lvl === 'Senior'
                        ? 'bg-rose-600 text-white shadow'
                        : 'bg-indigo-600 text-white shadow'
                  : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
                }`}
            >
              {lvl === 'all' ? 'All Levels' : lvl}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400">
            Showing <strong className="text-indigo-400">{filteredQuestions.length}</strong> questions
          </span>
        </div>
      </div>

      {/* QUESTIONS ACCORDION LIST */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-[#111726] rounded-2xl border border-slate-800 p-8 space-y-3">
            <i className="fa-solid fa-clipboard-question text-4xl text-slate-600"></i>
            <h3 className="text-lg font-bold text-white">No interview questions found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search query or technology filter.</p>
          </div>
        ) : (
          filteredQuestions.map((item, index) => {
            const isExpanded = expandedIds[item.id] !== false; // Default expanded for good UX
            const techMeta = technologiesData.find(t => t.id === item.techId);

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#111726] border border-slate-800 overflow-hidden transition-all shadow-md hover:border-slate-700"
              >
                {/* Question Header Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[#172033]/50 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 font-bold">
                        #{index + 1}
                      </span>
                      {techMeta && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-semibold">
                          <i className={techMeta.icon}></i> {techMeta.name}
                        </span>
                      )}
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${item.level === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.level === 'Intermediate'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                        {item.level}
                      </span>
                      {item.category && (
                        <span className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {item.question}
                    </h3>

                    {/* Company Badges */}
                    {item.companies && item.companies.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-500 uppercase font-extrabold">Asked at:</span>
                        {item.companies.map(comp => (
                          <span key={comp} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                            🏢 {comp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white flex-shrink-0 mt-1">
                    <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
                  </div>
                </button>

                {/* Expanded Answer Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-[#090d16]/60 animate-fade-in space-y-3">
                    <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase tracking-wider">
                      <span><i className="fa-solid fa-lightbulb"></i> Answer Explanation:</span>
                    </div>

                    <div className="text-slate-200 text-sm leading-relaxed font-sans space-y-2 bg-[#090d16] p-4 rounded-xl border border-slate-800">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
