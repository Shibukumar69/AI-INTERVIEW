// frontend/src/components/TelemetryHUD.jsx
import React from "react";
import {
  HelpCircle,
  Layers,
  CheckCircle2,
  Zap,
  Target
} from "lucide-react";

const TelemetryHUD = ({
  turnCount = 1,
  minRequiredQuestions = 8,
  coveredDays = [1],
  minRequiredDays = 4,
  currentDayNumber = 1,
  moduleTitle = "Retrieval-Augmented Generation",
  topic = "Document Chunking",
  isFollowUp = false,
  isThinking = false
}) => {
  const isQuestionGoalMet = turnCount >= minRequiredQuestions;
  const isDayGoalMet = coveredDays.length >= minRequiredDays;

  return (
    <div className="glass-panel rounded-3xl p-5 border border-[#e5dfeb] dark:border-white/10 shadow-ia-card dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500 dark:from-cyan-500 dark:via-purple-500 dark:to-emerald-500" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* Metric 1: Question Progress Counter */}
        <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/60 border border-[#e5dfeb] dark:border-white/5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isQuestionGoalMet 
              ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30" 
              : "bg-purple-100 dark:bg-cyan-500/10 text-purple-700 dark:text-cyan-400 border border-purple-200 dark:border-cyan-500/30"
          }`}>
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-[#706879] dark:text-slate-400 font-bold">Interview Questions</span>
              {isQuestionGoalMet && (
                <span className="flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Spec Met (8+)
                </span>
              )}
            </div>
            <p className="text-xl font-black text-[#191522] dark:text-white font-mono mt-0.5">
              Q{turnCount} <span className="text-xs font-normal text-[#706879] dark:text-slate-500">/ min {minRequiredQuestions} required</span>
            </p>
          </div>
        </div>

        {/* Metric 2: Distinct Curriculum Days Covered */}
        <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/60 border border-[#e5dfeb] dark:border-white/5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDayGoalMet 
              ? "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30" 
              : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
          }`}>
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-[#706879] dark:text-slate-400 font-bold">Days Covered</span>
              {isDayGoalMet ? (
                <span className="flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Spec Met (4+)
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-500/30">
                  {minRequiredDays - coveredDays.length} more needed
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {coveredDays.map((d) => (
                <span
                  key={d}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                    d === currentDayNumber
                      ? "bg-purple-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm"
                      : "bg-purple-50 dark:bg-slate-900 text-purple-700 dark:text-cyan-300 border border-purple-200 dark:border-cyan-500/30"
                  }`}
                >
                  Day {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metric 3: Active Topic & Follow-up Telemetry */}
        <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/60 border border-[#e5dfeb] dark:border-white/5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isFollowUp 
              ? "bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 animate-pulse" 
              : "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30"
          }`}>
            {isFollowUp ? <Zap className="w-5 h-5" /> : <Target className="w-5 h-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-[#706879] dark:text-slate-400 font-bold">Interview State</span>
              {isFollowUp && (
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 rounded-full animate-pulse">
                  Adaptive Follow-Up
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#191522] dark:text-slate-200 truncate mt-0.5">
              Day {currentDayNumber}: {topic}
            </p>
            <p className="text-[10px] text-[#706879] dark:text-slate-400 truncate">{moduleTitle}</p>
          </div>
        </div>

      </div>

      {/* Live AI Reasoning Stream Indicator */}
      {isThinking && (
        <div className="mt-4 pt-3 border-t border-[#e5dfeb] dark:border-white/5 flex items-center space-x-3 text-xs text-purple-700 dark:text-cyan-300 font-mono animate-in fade-in duration-200">
          <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-cyan-400 animate-ping" />
          <span className="shimmer-text font-bold">
            AI Agent cross-referencing candidate learning signals & formulation graph...
          </span>
        </div>
      )}

    </div>
  );
};

export default TelemetryHUD;
