import React, { useState } from "react";
import { CURRICULUM_MODULES, CURRICULUM_DAYS } from "../data/curriculum.js";
import { Layers, CheckCircle2, ChevronRight, Sparkles, BookOpen, Wrench } from "lucide-react";

const CurriculumMatrix = ({ onSelectDay = null }) => {
  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);

  const activeModule = CURRICULUM_MODULES.find((m) => m.moduleId === selectedModuleId) || CURRICULUM_MODULES[0];
  const moduleDays = CURRICULUM_DAYS.filter((d) => d.moduleId === selectedModuleId);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-black uppercase tracking-tight text-white font-mono">
              31-Day Enterprise AI Curriculum Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured 7-module architecture covering RAG, Vector DBs, Prompting, Agentic AI, MCP, Deployment & Production Systems.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl">
            31 Days // 7 Modules
          </span>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 py-4 border-b border-white/5">
        {CURRICULUM_MODULES.map((m) => (
          <button
            key={m.moduleId}
            onClick={() => {
              setSelectedModuleId(m.moduleId);
              setExpandedDay(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
              selectedModuleId === m.moduleId
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-black scale-105"
                : "bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:border-white/10"
            }`}
          >
            <span>Module {m.moduleId}: {m.title.split("&")[0].split("(")[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Module Overview Banner */}
      <div className="my-6 p-4 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400">
            {activeModule.daysRange}
          </span>
          <h3 className="text-base font-black text-white mt-0.5">{activeModule.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{activeModule.description}</p>
        </div>
      </div>

      {/* Daily Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moduleDays.map((d) => {
          const isExpanded = expandedDay === d.day;
          return (
            <div
              key={d.day}
              className={`p-5 rounded-2xl border transition-all ${
                isExpanded
                  ? "bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-500/10"
                  : "bg-slate-950/60 border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/40 cursor-pointer"
              }`}
              onClick={() => setExpandedDay(isExpanded ? null : d.day)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-md">
                    Day {d.day}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2 leading-snug">{d.topic}</h4>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-90 text-cyan-400" : ""}`}
                />
              </div>

              {/* Tools Chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {d.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-300 rounded-md border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Expanded Learning Objectives & Concepts */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in duration-200 text-xs">
                  <div>
                    <p className="font-bold text-cyan-300 uppercase tracking-wider text-[10px] mb-1">
                      Learning Objectives
                    </p>
                    <ul className="space-y-1 text-slate-300">
                      {d.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-purple-300 uppercase tracking-wider text-[10px] mb-1">
                      Core Key Concepts
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.keyConcepts.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {onSelectDay && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDay(d.day);
                      }}
                      className="w-full mt-2 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-md"
                    >
                      Target Day {d.day} in Interview
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CurriculumMatrix;
