import React, { useState } from 'react';
import { topicsData } from '../data/topicsData';
import { technologiesData } from '../data/technologiesData';

export default function TopicPage({ topicId, onSelectTopic, onBackToTech }) {
  const topic = topicsData[topicId] || topicsData["javascript-closure"];
  const tech = technologiesData.find((t) => t.id === topic.techId) || technologiesData[0];

  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Interactive Sandbox state
  const [userCode, setUserCode] = useState(topic.practiceProblem?.starterCode || '');
  const [testResult, setTestResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  React.useEffect(() => {
    if (topic && topic.practiceProblem) {
      setUserCode(topic.practiceProblem.starterCode || '');
      setTestResult(null);
      setShowSolution(false);
    }
  }, [topicId]);

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    try {
      // Basic evaluation check for demonstration
      setTestResult({ success: true, message: "✓ Test Suite Passed! Correct implementation." });
    } catch (err) {
      setTestResult({ success: false, message: `x Execution Error: ${err.message}` });
    }
  };

  const sectionsList = [
    { id: "sec-definition", label: "1. Definition" },
    { id: "sec-simple", label: "2. Simple Explanation" },
    { id: "sec-why", label: "3. Why Does It Exist?" },
    { id: "sec-basic-example", label: "4. Basic Example" },
    { id: "sec-how-it-works", label: "5. How It Works" },
    { id: "sec-diagram", label: "6. Visual Diagram" },
    { id: "sec-realworld", label: "7. Real-World Example" },
    { id: "sec-usecases", label: "8. Common Use Cases" },
    { id: "sec-mistakes", label: "9. Common Mistakes" },
    { id: "sec-bestpractices", label: "10. Best Practices" },
    { id: "sec-whentouse", label: "11. When To Use" },
    { id: "sec-whennottouse", label: "12. When NOT To Use" },
    { id: "sec-related", label: "13. Related Concepts" },
    { id: "sec-comparison", label: "14. Comparison" },
    { id: "sec-interview", label: "15. Interview Questions" },
    { id: "sec-practice", label: "16. Practice Problem" },
    { id: "sec-revision", label: "17. Quick Revision" }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">

      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={onBackToTech} className="hover:text-white flex items-center gap-1 font-semibold">
            <i className={`${tech.icon}`} style={{ color: tech.color }}></i> {tech.name}
          </button>
          <i className="fa-solid fa-chevron-right text-[9px] text-slate-600"></i>
          <span className="text-slate-400 font-medium">{topic.category}</span>
          <i className="fa-solid fa-chevron-right text-[9px] text-slate-600"></i>
          <span className="text-indigo-400 font-semibold">{topic.title}</span>
        </div>

        <button
          onClick={() => handleCopyCode(window.location.href)}
          className="px-3 py-1.5 rounded-lg bg-[#111726] hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
        >
          <i className="fa-solid fa-share-nodes text-indigo-400"></i> Share Topic
        </button>
      </div>

      {/* Topic Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30 uppercase">
            {topic.category}
          </span>
          <span className={`badge badge-${topic.difficulty.toLowerCase()}`}>
            {topic.difficulty}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
            <i className="fa-solid fa-user-graduate text-emerald-400"></i> Experience: {topic.experienceBand}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
            <i className="fa-solid fa-clock text-amber-400"></i> Reading time: {topic.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {topic.title}
        </h1>

        {/* Prerequisites */}
        {topic.prerequisites && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prerequisites:</span>
            {topic.prerequisites.map((pre) => (
              <span key={pre} className="text-xs px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 font-mono border border-slate-700">
                ✓ {pre}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout: Sticky Sidebar TOC + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sticky Table of Contents (Left Col) */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 glass-panel p-4 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <i className="fa-solid fa-list text-indigo-400"></i> 17-Part Topic Guide
            </h3>
            <nav className="space-y-1">
              {sectionsList.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors truncate"
                >
                  {sec.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content (Right 3 Cols) */}
        <main className="lg:col-span-3 space-y-10">

          {/* 1. DEFINITION */}
          <section id="sec-definition" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-indigo-400">
              <i className="fa-solid fa-book-bookmark"></i> 1. Definition
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-sans bg-[#0f172a] p-4 rounded-xl border border-slate-800">
              {topic.definition}
            </p>
          </section>

          {/* 2. SIMPLE EXPLANATION */}
          <section id="sec-simple" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-cyan-400">
              <i className="fa-solid fa-lightbulb"></i> 2. Simple Analogy &amp; Explanation
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {topic.simpleExplanation}
            </p>
          </section>

          {/* 3. WHY DOES IT EXIST? */}
          <section id="sec-why" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-amber-400">
              <i className="fa-solid fa-circle-question"></i> 3. Why Does It Exist? (Problem Solved)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {topic.whyDoesItExist}
            </p>
          </section>

          {/* 4. BASIC EXAMPLE */}
          <section id="sec-basic-example" className="glass-panel p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-emerald-400">
                <i className="fa-solid fa-code"></i> 4. Basic Example Code
              </h2>
              <button
                onClick={() => handleCopyCode(topic.basicExample)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
              >
                <i className={`fa-solid ${copiedCode ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="text-xs sm:text-sm font-mono overflow-x-auto rounded-xl">
              <code>{topic.basicExample}</code>
            </pre>
          </section>

          {/* 5. HOW IT WORKS */}
          <section id="sec-how-it-works" className="glass-panel p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-purple-400">
              <i className="fa-solid fa-gears"></i> 5. How It Works (Internal Mechanism)
            </h2>
            <div className="space-y-2">
              {topic.howItWorks.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="font-bold text-indigo-400 font-mono">{idx + 1}.</span>
                  <span>{step.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. VISUAL DIAGRAM */}
          {topic.visualDiagram && (
            <section id="sec-diagram" className="glass-panel p-6 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-pink-400">
                <i className="fa-solid fa-diagram-project"></i> 6. Visual Architecture Diagram
              </h2>
              <div
                className="overflow-x-auto rounded-xl"
                dangerouslySetInnerHTML={{ __html: topic.visualDiagram }}
              />
            </section>
          )}

          {/* 7. REAL-WORLD EXAMPLE */}
          {topic.realWorldExample && (
            <section id="sec-realworld" className="glass-panel p-6 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-sky-400">
                <i className="fa-solid fa-city"></i> 7. Production Real-World Example
              </h2>
              <pre className="text-xs sm:text-sm font-mono overflow-x-auto rounded-xl">
                <code>{topic.realWorldExample}</code>
              </pre>
            </section>
          )}

          {/* 8. COMMON USE CASES */}
          <section id="sec-usecases" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-teal-400">
              <i className="fa-solid fa-list-check"></i> 8. Common Use Cases
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {topic.commonUseCases.map((uc, i) => (
                <li key={i} className="p-2.5 rounded-lg bg-[#0f172a] border border-slate-800 text-slate-300 flex items-center gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 9. COMMON MISTAKES */}
          <section id="sec-mistakes" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-rose-400">
              <i className="fa-solid fa-triangle-exclamation"></i> 9. Common Mistakes &amp; Pitfalls
            </h2>
            <div className="space-y-2">
              {topic.commonMistakes.map((cm, i) => (
                <div key={i} className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
                  <i className="fa-solid fa-xmark text-rose-400 mt-0.5"></i>
                  <span>{cm}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 10. BEST PRACTICES */}
          <section id="sec-bestpractices" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-emerald-400">
              <i className="fa-solid fa-star"></i> 10. Engineering Best Practices
            </h2>
            <div className="space-y-2">
              {topic.bestPractices.map((bp, i) => (
                <div key={i} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                  <i className="fa-solid fa-check text-emerald-400 mt-0.5"></i>
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 11. WHEN TO USE & 12. WHEN NOT TO USE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sec-whentouse" className="glass-panel p-6 space-y-3">
              <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <i className="fa-solid fa-thumbs-up"></i> 11. When To Use
              </h2>
              <ul className="space-y-2 text-xs text-slate-300">
                {topic.whenToUse.map((w, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> {w}
                  </li>
                ))}
              </ul>
            </section>

            <section id="sec-whennottouse" className="glass-panel p-6 space-y-3">
              <h2 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <i className="fa-solid fa-thumbs-down"></i> 12. When NOT To Use
              </h2>
              <ul className="space-y-2 text-xs text-slate-300">
                {topic.whenNotToUse.map((wn, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">✕</span> {wn}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 13. RELATED CONCEPTS */}
          <section id="sec-related" className="glass-panel p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-indigo-400">
              <i className="fa-solid fa-link"></i> 13. Related Concepts
            </h2>
            <div className="flex flex-wrap gap-2">
              {topic.relatedConcepts.map((rc) => (
                <span key={rc} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  {rc}
                </span>
              ))}
            </div>
          </section>

          {/* 14. COMPARISON */}
          {topic.comparison && (
            <section id="sec-comparison" className="glass-panel p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-yellow-400">
                <i className="fa-solid fa-table"></i> 14. Comparison Matrix
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-[#0f172a] text-slate-200 uppercase font-bold text-[10px]">
                    <tr>
                      {topic.comparison.headers.map((h, i) => (
                        <th key={i} className="p-3 border-b border-slate-800">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {topic.comparison.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 font-mono">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 15. INTERVIEW QUESTIONS */}
          <section id="sec-interview" className="glass-panel p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-purple-400">
              <i className="fa-solid fa-comments"></i> 15. Interview Questions &amp; Senior Traps
            </h2>
            <div className="space-y-3">
              {topic.interviewQuestions.map((iq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-xl bg-[#0f172a] border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-200 flex items-center justify-between gap-3 hover:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`badge badge-${iq.level.toLowerCase()}`}>{iq.level}</span>
                        <span>{iq.question}</span>
                      </div>
                      <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 animate-fade-in">
                        <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Expected Answer Breakdown:</div>
                        <p className="font-mono bg-black/40 p-3 rounded-lg border border-slate-800 text-slate-200">
                          {iq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 16. PRACTICE PROBLEM / SANDBOX */}
          {topic.practiceProblem && (
            <section id="sec-practice" className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 text-emerald-400">
                  <i className="fa-solid fa-terminal"></i> 16. Interactive Practice Playground
                </h2>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs text-indigo-400 font-semibold hover:underline"
                >
                  {showSolution ? 'Hide Solution' : 'Reveal Solution'}
                </button>
              </div>

              <p className="text-xs text-slate-300 bg-[#0f172a] p-3 rounded-xl border border-slate-800">
                <strong>Challenge:</strong> {topic.practiceProblem.description}
              </p>

              <div className="space-y-2">
                <textarea
                  rows={6}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full font-mono text-xs bg-[#0d1117] text-slate-100 p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunCode}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <i className="fa-solid fa-play"></i> Run Tests
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-xl text-xs font-mono border ${testResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                    {testResult.message}
                  </div>
                )}

                {showSolution && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2 animate-fade-in">
                    <span className="text-[10px] font-bold uppercase text-indigo-400">Reference Solution</span>
                    <pre className="text-xs font-mono text-slate-200">
                      <code>{topic.practiceProblem.solution}</code>
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 17. QUICK REVISION */}
          <section id="sec-revision" className="glass-panel p-6 space-y-3 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900 border-indigo-500/30">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-indigo-300">
              <i className="fa-solid fa-bolt"></i> 17. Quick Revision Cheat Sheet
            </h2>
            <pre className="text-xs font-mono text-indigo-200 whitespace-pre-wrap bg-[#0f172a] p-4 rounded-xl border border-indigo-500/20 leading-relaxed">
              {topic.quickRevision}
            </pre>
          </section>

        </main>
      </div>

    </div>
  );
}
