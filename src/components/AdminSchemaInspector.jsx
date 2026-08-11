import React, { useState } from 'react';
import { technologiesData } from '../data/technologiesData';
import { topicsData } from '../data/topicsData';

export default function AdminSchemaInspector() {
  const [activeSchema, setActiveSchema] = useState('technology');
  const [copiedStatus, setCopiedStatus] = useState(false);

  const sampleTechSchema = {
    id: "golang",
    name: "Go (Golang)",
    category: "backend",
    icon: "fa-solid fa-code",
    color: "#00add8",
    difficulty: "Intermediate",
    description: "Open-source programming language supported by Google designed for building fast, reliable, scalable cloud software.",
    versions: ["Go 1.22", "Go 1.21"],
    topicsCount: 18,
    interviewCount: 85,
    learningProgress: 0,
    relatedTechIds: ["docker", "system-design", "microservices"]
  };

  const sampleTopicSchema = {
    id: "golang-goroutines",
    techId: "golang",
    category: "Concurrency",
    title: "Goroutines & Channels",
    difficulty: "Advanced",
    experienceBand: "3–5 years",
    readingTime: "12 min",
    prerequisites: ["Go Functions", "Pointers"],
    definition: "A goroutine is a lightweight thread managed by the Go runtime.",
    simpleExplanation: "Goroutines cost only ~2KB memory compared to 1MB OS threads.",
    whyDoesItExist: "Eliminates OS thread creation overhead for massive concurrency.",
    basicExample: "go func() {\n  fmt.Println(\"Hello Goroutine\")\n}()",
    howItWorks: ["1. Go scheduler handles M:N green thread multiplexing."],
    visualDiagram: "<svg>...</svg>",
    realWorldExample: "// High-throughput log processor",
    commonUseCases: ["Concurrent API fetching", "Worker pools"],
    commonMistakes: ["Goroutine leaks without channel closing"],
    bestPractices: ["Use sync.WaitGroup or Context cancellation"],
    whenToUse: ["Async I/O tasks"],
    whenNotToUse: ["Simple linear sequential calculations"],
    relatedConcepts: ["Go Scheduler", "Channels", "Mutex"],
    comparison: { headers: ["Feature", "Goroutine", "OS Thread"], rows: [["RAM", "2KB", "1MB"]] },
    interviewQuestions: [{ level: "Senior", question: "How does Go scheduler work?", answer: "G-M-P model." }],
    practiceProblem: { description: "Write a channel reader.", starterCode: "package main", testAssertion: "true", solution: "// solution" },
    quickRevision: "★ Lightweight concurrent thread execution."
  };

  const currentJson = activeSchema === 'technology' ? sampleTechSchema : sampleTopicSchema;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(currentJson, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-semibold">
          <i className="fa-solid fa-sliders"></i> Content Architecture &amp; Admin Schema Inspector
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Data-Driven Extensible Content Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          DEV MASTER uses a strict data-driven content architecture. Adding new technologies (e.g. Go, Java, Kubernetes, Rust) or topics is purely a <strong>content operation</strong> without UI code modifications.
        </p>

        {/* Schema Switcher */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setActiveSchema('technology')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSchema === 'technology'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-[#111726] text-slate-400 border border-slate-800'
            }`}
          >
            Technology Data Schema
          </button>
          <button
            onClick={() => setActiveSchema('topic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSchema === 'topic'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-[#111726] text-slate-400 border border-slate-800'
            }`}
          >
            17-Part Topic Data Schema
          </button>
        </div>
      </div>

      {/* Schema Inspector JSON Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Canonical Data Model JSON ({activeSchema})
          </span>

          <button
            onClick={handleCopySchema}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
          >
            <i className={`fa-solid ${copiedStatus ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
            <span>{copiedStatus ? 'Copied JSON!' : 'Copy JSON Schema'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono bg-[#0d1117] text-indigo-300 p-5 rounded-2xl border border-slate-800 max-h-96 overflow-y-auto">
          <code>{JSON.stringify(currentJson, null, 2)}</code>
        </pre>
      </div>

    </div>
  );
}
