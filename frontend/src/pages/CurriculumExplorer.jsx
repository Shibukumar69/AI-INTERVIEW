// frontend/src/pages/CurriculumExplorer.jsx
import React, { useState } from "react";
import { CURRICULUM_MODULES, CURRICULUM_DAYS } from "../data/curriculum";
import CurriculumMatrix from "../components/CurriculumMatrix";
import { Layers, Search, Filter, Sparkles, BookOpen, Terminal, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CurriculumExplorer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("all");

  const filteredDays = CURRICULUM_DAYS.filter((d) => {
    const matchesQuery =
      d.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.toolsUsed.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModule = selectedModuleFilter === "all" || d.moduleId.toString() === selectedModuleFilter;

    return matchesQuery && matchesModule;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              31-Day Enterprise AI Engineering Cohort
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase text-white font-mono tracking-tight">
            Curriculum & Topics Master Map
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Explore the complete 31-day journey structured into 7 core modules. Includes daily topics, learning objectives, tools, key concepts, and interview evaluation probes.
          </p>

          {/* Search & Filter Toolbar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, tools (e.g. vLLM, LangGraph, HNSW, FastMCP)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedModuleFilter}
                onChange={(e) => setSelectedModuleFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono focus:outline-none"
              >
                <option value="all">All 7 Modules</option>
                {CURRICULUM_MODULES.map((m) => (
                  <option key={m.moduleId} value={m.moduleId.toString()}>
                    Module {m.moduleId}: {m.title.split("&")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Filtered Days Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black uppercase text-white font-mono">
            Search Results ({filteredDays.length} Days)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDays.map((d) => (
            <div
              key={d.day}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-md">
                  Day {d.day}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Module {d.moduleId}</span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{d.topic}</h3>
              <p className="text-[11px] text-slate-400">{d.moduleTitle}</p>

              {/* Tools */}
              <div className="flex flex-wrap gap-1">
                {d.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 text-[9px] font-mono bg-slate-900 text-slate-300 rounded border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Sample Question Preview */}
              {d.sampleQuestions?.[0] && (
                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300">
                  <p className="font-mono text-[9px] text-cyan-400 uppercase font-bold">Interview Question Seed:</p>
                  <p className="line-clamp-2 mt-0.5 text-slate-400 italic">"{d.sampleQuestions[0]}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CurriculumExplorer;
