import React, { useState } from 'react';
import { interviewsData, interviewTraps } from '../data/interviewsData';
import { technologiesData } from '../data/technologiesData';

export default function InterviewPlatform() {
  const [selectedTech, setSelectedTech] = useState('laravel');
  const [selectedLevel, setSelectedLevel] = useState('Senior');
  const [inSession, setInSession] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [userScores, setUserScores] = useState({});

  const techQuestions = interviewsData[selectedTech] || interviewsData['laravel'];
  const currentQuestion = techQuestions[currentIndex] || techQuestions[0];
  const trapsForTech = interviewTraps.find((t) => t.tech.toLowerCase() === selectedTech.toLowerCase());

  const handleStartSession = () => {
    setInSession(true);
    setCurrentIndex(0);
    setUserAnswer('');
    setAnswerSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    setAnswerSubmitted(true);
  };

  const handleScore = (scoreType) => {
    setUserScores((prev) => ({
      ...prev,
      [currentQuestion.id]: scoreType
    }));

    if (currentIndex < techQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setAnswerSubmitted(false);
    } else {
      // Finished all
      setAnswerSubmitted(true);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold">
          <i className="fa-solid fa-comments"></i> Interactive Interview Platform
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Senior &amp; Architect Technical Interview Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Simulate real technical interview scenarios across technologies and experience bands (Junior to Architect 10+y).
        </p>
      </div>

      {!inSession ? (
        /* Setup Modal / Builder Form */
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <i className="fa-solid fa-sliders text-indigo-400"></i> Configure Interview Session
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Tech Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Target Technology
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-[#111726] border border-slate-700 text-slate-100 rounded-xl p-3 text-xs"
              >
                <option value="laravel">🐘 Laravel (PHP)</option>
                <option value="nodejs">💚 Node.js (JavaScript)</option>
                <option value="javascript">⚡ JavaScript Core</option>
                <option value="react">⚛️ React.js</option>
              </select>
            </div>

            {/* Level Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Interview Level / Experience Band
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#111726] border border-slate-700 text-slate-100 rounded-xl p-3 text-xs"
              >
                <option value="Beginner">🟢 Beginner (0–1 year)</option>
                <option value="Junior">🔵 Junior (1–2 years)</option>
                <option value="Intermediate">🟠 Intermediate (2–4 years)</option>
                <option value="Senior">🔴 Senior (6–10 years)</option>
                <option value="Architect">🟣 Architect (10+ years)</option>
              </select>
            </div>

          </div>

          {/* Trap Alert Summary Box */}
          {trapsForTech && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2 text-xs">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <i className="fa-solid fa-skull-crossbones"></i> Key Traps to Watch Out for ({selectedTech}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                {trapsForTech.traps.map((t, idx) => (
                  <div key={idx} className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-purple-300 block">{t.title}:</strong>
                    <span>{t.trap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleStartSession}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-play"></i> Start Interview Practice Session
          </button>
        </div>
      ) : (
        /* Question Runner & Scratchpad */
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className={`badge badge-${currentQuestion.level.toLowerCase()}`}>
                {currentQuestion.level}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Question {currentIndex + 1} of {techQuestions.length}
              </span>
            </div>

            <button
              onClick={() => setInSession(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Exit Session
            </button>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Topic: {currentQuestion.topic} ({currentQuestion.experienceBand})
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white whitespace-pre-wrap leading-relaxed bg-[#0f172a] p-5 rounded-2xl border border-slate-800">
              {currentQuestion.question}
            </h3>
          </div>

          {/* User Answer Scratchpad */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Write Your Technical Answer / Outline:
            </label>
            <textarea
              rows={6}
              placeholder="Type your explanation step-by-step before revealing expected criteria..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={answerSubmitted}
              className="w-full font-mono text-xs bg-[#0d1117] text-slate-100 p-4 rounded-xl border border-slate-700 focus:border-indigo-500"
            />
          </div>

          {!answerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!userAnswer.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <i className="fa-solid fa-paper-plane"></i> Submit Answer &amp; Reveal Criteria
            </button>
          ) : (
            /* Expected Answer Breakdown & Scoring */
            <div className="space-y-6 pt-2 border-t border-slate-800 animate-fade-in">
              
              {/* Expected Criteria List */}
              <div className="space-y-3 bg-[#0f172a] p-5 rounded-2xl border border-indigo-500/30">
                <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                  <i className="fa-solid fa-list-check"></i> Expected Answer Criteria &amp; Key Points:
                </h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  {currentQuestion.expectedAnswerPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="fa-solid fa-check text-emerald-400 mt-0.5"></i>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trap Warning Alert */}
              {currentQuestion.trapAlert && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-base mt-0.5"></i>
                  <span><strong>{currentQuestion.trapAlert}</strong></span>
                </div>
              )}

              {/* Self Evaluation Scoring */}
              <div className="space-y-3 pt-2 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  How well did your answer cover the criteria?
                </span>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleScore('nailed')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    🎯 Nailed It (100%)
                  </button>
                  <button
                    onClick={() => handleScore('partial')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    ⚡ Partial (50%)
                  </button>
                  <button
                    onClick={() => handleScore('review')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    📖 Needs Review
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
