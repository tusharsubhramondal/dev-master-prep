import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TechGrid({ filteredTechs = [] }) {
    const navigate = useNavigate();

    const goToRoadmap = (techId) => {
        navigate(`/roadmaps/${techId}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechs.map((tech) => (
                <div
                    key={tech.id}
                    onClick={() => goToRoadmap(tech.id)}
                    className="glass-panel p-6 flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-glow transition-all cursor-pointer"
                >
                    <div className="space-y-4">
                        {/* Card Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-700/50"
                                    style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                                >
                                    <i className={tech.icon}></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                                        {tech.name}
                                    </h3>
                                    <span className="text-xs text-slate-400 capitalize font-medium">
                                        {tech.category}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {tech.description}
                        </p>

                        {/* 3 Level Names Inside Card */}
                        <div className="pt-3 border-t border-slate-800/80 space-y-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                Available Levels:
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-bold flex items-center gap-1.5">
                                    🟢 Beginner
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold flex items-center gap-1.5">
                                    🟡 Intermediate
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/25 text-xs font-bold flex items-center gap-1.5">
                                    🔴 Senior
                                </span>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-800/80">
                            <div className="flex items-center gap-2 text-slate-300">
                                <i className="fa-solid fa-book text-indigo-400"></i>
                                <span><strong>{tech.topicsCount}</strong> Topics</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <i className="fa-solid fa-clipboard-question text-purple-400"></i>
                                <span><strong>{tech.interviewCount}</strong> Q&amp;As</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-slate-400">Mastery Progress</span>
                                <span className="text-indigo-400">{tech.learningProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                                    style={{ width: `${tech.learningProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => { goToRoadmap(tech.id) }}
                            className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
                        >
                            <span>Start Learning</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                        <button
                            onClick={() => { goToRoadmap(tech.id) }}
                            title="View Technology Roadmap"
                            className="py-2.5 px-3 bg-[#172033] hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs flex items-center justify-center transition-colors border border-slate-700"
                        >
                            <i className="fa-solid fa-route"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}